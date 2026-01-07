import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.shoshiy.uz';
  const currentDate = new Date();

  // Основные страницы
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/#nav_works`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#nav_services`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#nav_about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#nav_contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Проекты из портфолио
  const projects = [
    { url: 'https://fruit-rosy-three.vercel.app', name: 'Fruit Exim' },
    { url: 'https://dresshub.vercel.app', name: 'DressHub' },
    { url: 'https://www.chesterfrontline.com', name: 'Chester Frontline' },
    { url: 'https://futureengineers.cmspace.uz', name: 'Future Engineers' },
    { url: 'https://training.cmspace.uz', name: 'Training Academy' },
    { url: 'https://dalayongini.cmspace.uz', name: 'DalayOnGini' },
  ];

  return [...routes];
}