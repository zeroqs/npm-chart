const fetchUrl = 'https://npm.chart.dev/api/react';

export interface FetchData {
  name: string
  description: string
  homepage: string
  version: string
  total: number
  downloads: Record<string, number>
}

export const fetchNpmData = async (packageName: string) => {
  return await fetch(`${fetchUrl}/${packageName}`).then((response) => response.json());
};
