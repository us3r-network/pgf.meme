import { ReactNode } from "react";
import { DefaultHeader, DefaultMain } from "./LandingPageClientComponents";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DefaultHeader />
      <DefaultMain>{children}</DefaultMain>
    </>
  );
}
