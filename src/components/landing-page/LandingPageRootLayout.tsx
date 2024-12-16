import { ReactNode } from "react";
import { DefaultHeader, DefaultMain } from "./LandingPageClientComponents";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          background-attachment: local;
        }
      `}</style>
      <DefaultHeader />
      <DefaultMain>{children}</DefaultMain>
    </>
  );
}
