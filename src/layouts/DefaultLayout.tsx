"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ChildrenType } from "@/core/types";
import { useState } from "react";

const DefaultLayout = (props: ChildrenType) => {
  const { children } = props;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-gray-100 `}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="layout-page">
        <Header toggleSidebar={setIsSidebarOpen} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
