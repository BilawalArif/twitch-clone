import { Suspense } from "react";

import { Container } from "./_components/container";
import { Sidebar } from "./_components/sidebar";
import Navbar from "./_components/navbar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;
