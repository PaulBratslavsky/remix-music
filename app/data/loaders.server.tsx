import qs from "qs";
import { flattenAttributes } from "~/lib/utils";

const baseUrl = ENV.STRAPI_API_URL ?? "http://localhost:1337";

async function fetchData(url: URL) {
  try {
    const response = await fetch(url.href);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function allMusicLoader() {
  const path = "/api/songs";
  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    sort: ["createdAt:desc"],
    populate: {
      artist: {
        fields: ["name"],
      },
      image: {
        fields: ["url", "alternativeText"],
      },
      audio: {
        fields: ["url", "alternativeText"],
      },
    },
  });

  return await fetchData(url);
}

export async function homePageLoader() {
  const path = "/api/home-page";
  const url = new URL(path, baseUrl);
  url.search = qs.stringify({
    populate: {
      hero: {
        populate: {
          imageAvatar: {
            fields: ["url", "alternativeText"],
          },
          imageBackground: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    },
  });  return await fetchData(url);
}