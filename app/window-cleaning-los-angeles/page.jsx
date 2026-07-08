import CityWindowCleaningPage from "../_components/CityWindowCleaningPage";

export const metadata = {
  title: "Window Cleaning Los Angeles | Magic Glove Window Cleaning",
  description:
    "Get professional window cleaning in Los Angeles from Magic Glove. Residential, storefront, screens, tracks, sills, hard water help, and solar panel cleaning add-ons.",
  alternates: {
    canonical: "https://magicglovecleaning.com/window-cleaning-los-angeles",
  },
  openGraph: {
    title: "Window Cleaning in Los Angeles | Magic Glove",
    description:
      "Local Los Angeles window cleaning with detailed glass, screens, tracks, sills, hard water help, and solar panel cleaning add-ons.",
    url: "https://magicglovecleaning.com/window-cleaning-los-angeles",
    siteName: "Magic Glove Window Cleaning",
    type: "website",
  },
};

export default function LosAngelesWindowCleaningPage() {
  return (
    <CityWindowCleaningPage
      city="Los Angeles"
      areaDescription="Los Angeles and nearby neighborhoods across the LA area"
      nearbyAreas="Granada Hills, Northridge, Porter Ranch, Chatsworth, Reseda, Van Nuys, Burbank, Glendale, Pasadena, Sherman Oaks, Encino, and surrounding neighborhoods"
      localAngle="Los Angeles homes deal with dust, traffic film, pollen, hard water spots, and sun-baked buildup."
    />
  );
}
