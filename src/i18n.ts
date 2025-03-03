import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'hi'];

export default getRequestConfig(async context => {
  const { locale } = await context;

  if (!locales.includes(locale)) {
    notFound();
  }

  try {
    return {
      messages: (await import(`../messages/${locale}.json`)).default
    };
  } catch (error) {
    console.error(`Translation file for locale '${locale}' not found.`);
    notFound();
  }
});
