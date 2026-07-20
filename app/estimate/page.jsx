import { redirect } from "next/navigation";

export const metadata = {
  title: "Free Window Cleaning Estimate | Magic Glove Window Cleaning",
  description:
    "Request a free window cleaning estimate from Magic Glove Window Cleaning.",
  alternates: {
    canonical: "https://www.magicglovecleaning.com/window-cleaning-thousand-oaks#quote",
  },
};

export default function EstimateRedirectPage() {
  redirect("/window-cleaning-thousand-oaks#quote");
}
