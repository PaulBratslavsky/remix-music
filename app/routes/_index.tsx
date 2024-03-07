import { type MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { HeroSection } from "~/components/custom/HeroSection";
import { InlineMusicPlayer } from "~/components/custom/InlineMusicPlayer";
import { allMusicLoader, homePageLoader } from "~/data/loaders.server";

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

export async function loader() {
  const musicData = await allMusicLoader();
  const homePageData = await homePageLoader();
  return json({ musicData: musicData, homePageData: homePageData });
}

export default function HomeRoute() {
  const { musicData, homePageData } = useLoaderData<typeof loader>();
  return (
    <div>
      <HeroSection data={homePageData} />
      <div className="container mx-auto grid my-2 sm:grid-cols-1 md:grid-cols-2 gap-4">
        {musicData.data.map((audio: StrapiAudioData) => (
          <InlineMusicPlayer key={audio.id} audio={audio} />
        ))}
      </div>
    </div>
  );
}
