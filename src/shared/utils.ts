const packages = ['vue', 'react', 'svelte', '@angular/core', 'solid-js', 'next', 'hono', 'fastify', 'nuxt', 'astro', 'supabase', '@adonisjs/core', '@strapi/strapi', '@nestjs/core', 'directus', 'lodash', 'date-fns', 'express', 'h3', 'nitropack', 'typescript', 'vite'];

export const randomPackages = () => {
  return packages.sort(() => 0.5 - Math.random()).slice(0, 4);
};
