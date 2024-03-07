import { type MetaFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { allMusicLoader, homePageLoader } from "~/data/loaders.server";

import { HeroSection } from "~/components/custom/HeroSection";
import { Search } from "~/components/custom/Search";
import { InlineMusicPlayer } from "~/components/custom/InlineMusicPlayer";
import { PaginationComponent } from "~/components/custom/Pagination";

export interface StrapiAudioData {
  id: number;
  title: string;
  artist: {
    id: number;
    name: string;
  };
  image: {
    id: number;
    url: string;
    alternativeText: string;
  };
  audio: {
    id: number;
    url: string;
  };
}

export const meta: MetaFunction = () => {
  return [
    { title: "My Music Buddy" },
    { name: "description", content: "Welcome to Remix Music!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") ?? "";
  const page = url.searchParams.get("page") ?? "1";

  const homePageData = await homePageLoader();
  const musicData = await allMusicLoader(query, page);
  return json({ musicData: musicData, homePageData: homePageData, query});
}

export default function HomeRoute() {
  const { musicData, homePageData, query } = useLoaderData<typeof loader>();
  const pageCount = musicData.meta.pagination.pageCount;

  return (
    <div>
      <HeroSection data={homePageData}>
        <Search query={query} />
      </HeroSection>
      <div className="container mx-auto grid my-2 sm:grid-cols-1 md:grid-cols-2 gap-4">
        {musicData.data.map((audio: StrapiAudioData) => (
          <InlineMusicPlayer key={audio.id} audio={audio} />
        ))}
      </div>
      <PaginationComponent pageCount={pageCount} />
    </div>
  );
}
