import CityWindowCleaningPage from "../_components/CityWindowCleaningPage";

export const metadata = {
  title: "Window Cleaning Valencia CA | Magic Glove Window Cleaning",
  description:
    "Get professional window cleaning in Valencia and Santa Clarita from Magic Glove. Residential glass, screens, tracks, sills, hard water help, and solar panel cleaning add-ons.",
  alternates: {
    canonical: "https://magicglovecleaning.com/window-cleaning-valencia",
  },
  openGraph: {
    title: "Window Cleaning in Valencia, CA | Magic Glove",
    description:
      "Local Valencia window cleaning for homes and storefronts, including screens, tracks, sills, hard water help, and solar panel cleaning add-ons.",
    url: "https://magicglovecleaning.com/window-cleaning-valencia",
    siteName: "Magic Glove Window Cleaning",
    type: "website",
  },
};

export default function ValenciaWindowCleaningPage() {
  return (
    <CityWindowCleaningPage
      city="Valencia"
      areaDescription="Valencia, Santa Clarita, and nearby neighborhoods"
      nearbyAreas="Santa Clarita, Newhall, Saugus, Canyon Country, Stevenson Ranch, Castaic, and surrounding neighborhoods"
      localAngle="Valencia homes often deal with dust, wind, pollen, hard water spots, and large second-story windows."
    />
  );
}
