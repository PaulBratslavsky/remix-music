import { BackgroundImage } from "~/components/custom/BackgroundImage";

interface HeroSectionProps {
  data: {
    hero: {
      heading: string;
      text: string;
      imageBackground: {
        url: string;
      };
    };
  };
  children?: React.ReactNode;
}

export function HeroSection({ data, children}: Readonly<HeroSectionProps>) {

  const hero = data.hero;
  const backgroundImage = hero.imageBackground.url;

  return (
    <header className="relative h-[450px] overflow-hidden">
      <BackgroundImage backgroundImage={backgroundImage} />
      <div className="relative z-10  h-full flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-60">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl ">
          {hero.heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl mb-4">{hero.text}</p>
        <div className="container sm:w-full  md:w-[575px] text-pink-600 font-semibold">
          {children}
        </div>
      </div>
    </header>
  );
}
