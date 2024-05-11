import qs from 'qs';
import { flattenAttributes, getStrapiURL } from '@/lib/utils';

const baseURL = getStrapiURL();

async function fetchData(url: string) {
  const authToken = null;
  const headers = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data::", error);
    throw error;
  }
}

export async function getHomePageData() {
  const url = new URL("/api/home-page", baseURL);

  url.search = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: {
            poulate: true,
          },
          feature: {
            populate: true,
          }
        }
      }
    }
  })

  return await fetchData(url.href);
}

export async function getGlobalData() {
  const url = new URL("/api/global", baseURL);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });

  return await fetchData(url.href);
}