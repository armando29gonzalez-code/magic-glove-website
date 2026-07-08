import CityWindowCleaningPage from "../_components/CityWindowCleaningPage";

export const metadata = {
  title: "Window Cleaning Thousand Oaks | Magic Glove Window Cleaning",
  description:
    "Get professional window cleaning in Thousand Oaks and Conejo Valley from Magic Glove. Residential glass, patio doors, screens, tracks, hard water help, and solar panel cleaning add-ons.",
  alternates: {
    canonical: "https://magicglovecleaning.com/window-cleaning-thousand-oaks",
  },
  openGraph: {
    title: "Window Cleaning in Thousand Oaks | Magic Glove",
    description:
      "Local Thousand Oaks window cleaning for homes, large glass, patio doors, screens, tracks, hard water help, and solar panel cleaning add-ons.",
    url: "https://magicglovecleaning.com/window-cleaning-thousand-oaks",
    siteName: "Magic Glove Window Cleaning",
    type: "website",
  },
};

export default function ThousandOaksWindowCleaningPage() {
  return (
    <CityWindowCleaningPage
      city="Thousand Oaks"
      areaDescription="Thousand Oaks, Conejo Valley, and nearby neighborhoods"
      nearbyAreas="Westlake Village, Newbury Park, Agoura Hills, Oak Park, Moorpark, Camarillo, and surrounding neighborhoods"
      localAngle="Thousand Oaks and Conejo Valley homes often have larger glass, patio doors, hillside dust, pollen, and solar panels that need detailed exterior care."
    />
  );
}
