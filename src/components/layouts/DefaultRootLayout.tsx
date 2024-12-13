import { ReactNode } from "react";
import { DefaultHeader, DefaultMain } from "./ClientComponents";
import BgGifs from "./BgGifs";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DefaultHeader />
      <DefaultMain>{children}</DefaultMain>
      <BgGifs />
    </>
  );
}
