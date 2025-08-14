import * as cheerio from 'cheerio';

const URL_TECHCRUNCH_AI = 'https://techcrunch.com/category/artificial-intelligence/';
const FETCH_COUNT = 5;
export const scrape = async (fetchCount: number = FETCH_COUNT): Promise<{
  title: string;
  age: string;
}[] | {
  error: string;
  status: number;
  details?: undefined;
} | {
  error: string;
  details: string;
  status?: undefined;
}> => {
  const url = URL_TECHCRUNCH_AI;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      },
    });

    if (!res.ok) {
      return { error: 'Failed to fetch TechCrunch page', status: res.status }
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const articles = $('.loop-card')
      .slice(0, fetchCount || FETCH_COUNT)
      .map((_, el) => {
        const title = $(el).find('.loop-card__title-link').text().trim();
        const age = $(el).find('.loop-card__meta time').text().trim();
        return title ? { title, age } : null;
      })
      .get()
      .filter(Boolean);

    return articles;
  } catch (error) {
    return { error: 'Scraping failed', details: String(error) };
  }
}