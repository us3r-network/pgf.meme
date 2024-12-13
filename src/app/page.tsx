import * as React from "react";
import LandingPageHome from "@/components/landing-page/LandingPageHome";
import Home from "@/components/Home";
import { CAST_LANDING_PAGE } from "@/constants";

export default function HomePage() {
  if (CAST_LANDING_PAGE) {
    return <LandingPageHome />;
  }
  return <Home />;
}
