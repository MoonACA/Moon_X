"use client";

import { ReactNode } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

function Skeleton({ children }: { children: ReactNode }) {
  return (
    <SkeletonTheme baseColor="rgb(0,18,44, 0.5)" highlightColor="#525252">
      {children}
    </SkeletonTheme>
  );
}

export default Skeleton;
