'use server';

import { endOfMonth, format, subMonths } from 'date-fns';

export interface FetchData {
  name: string;
  description: string;
  homepage: string;
  version: string;
  total: number;
  downloads: Record<string, number>;
}

const fetchNpmPackage = async (
  packageName: string
): Promise<{ name: string; description: string; homepage: string; version: string } | undefined> => {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    if (!response.ok) throw new Error('Failed to fetch package data');
    const data = await response.json();

    return {
      name: data.name,
      description: data.description,
      version: data['dist-tags'].latest,
      homepage: data.homepage
    };
  } catch (error) {
    console.error('Error fetching NPM package:', error);
  }
};

const fetchNpmDownloads = async (packageName: string): Promise<Record<string, number> | undefined> => {
  const until = format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd');

  try {
    const response = await fetch(
      `https://npm-stat.com/api/download-counts?package=${packageName}&from=2010-01-01&until=${until}`
    );
    if (!response.ok) throw new Error('Failed to fetch download data');

    const data = await response.json();
    const downloads = data[packageName] as Record<string, number>;

    // Фильтруем данные, убираем те, где загрузок нет
    const filteredDownloads: Record<string, number> = {};
    for (const date in downloads) {
      if (downloads[date] > 0) {
        filteredDownloads[date] = downloads[date];
      }
    }
    return filteredDownloads;
  } catch (error) {
    console.error('Error fetching NPM downloads:', error);
  }
};

export const fetchNpmData = async (packageName: string): Promise<FetchData | undefined> => {
  try {
    const packageData = await fetchNpmPackage(packageName);
    if (!packageData) throw new Error('No package data found');

    const downloads = await fetchNpmDownloads(packageName);
    if (!downloads) throw new Error('No download data found');

    const total = Object.entries(downloads).reduce((acc, [_date, amount]) => acc + amount, 0);

    return {
      name: packageData.name,
      description: packageData.description,
      homepage: packageData.homepage,
      version: packageData.version,
      total,
      downloads
    };
  } catch (error) {
    console.error('Error fetching NPM data:', error);
  }
};
