import qs from 'qs';

import { flattenAttributes, getStrapiURL } from '@/lib/utils';
import { HeroSection } from '@/components/custom/HeroSection';

// Constructing the query for STRAPI
const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
        feature: {
          populate: true,
        }
      },
    },
  },
});

// Function to fetch the data from path
async function getStrapiData(path:string) {
  const baseURL = getStrapiURL();

  const url = new URL(path, baseURL);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href, {cache: 'no-store'});
    const data = await response.json();
    const flattenData = flattenAttributes(data);
    return flattenData;
  } catch (error) {
    console.error("ERROR::", error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  const { blocks } = strapiData;

  console.dir(blocks, {depth: null})

  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}
