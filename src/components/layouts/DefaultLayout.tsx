import * as React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DefaultHeader, DefaultMain } from "./ClientComponents";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <SidebarInset>
        <DefaultHeader />

        <DefaultMain>{children}</DefaultMain>
      </SidebarInset>
    </SidebarProvider>
  );
}
