"use client";

import React from "react";
import SkeletonCard from "./SkeletonCard";

export default function SkeletonGrid() {
  // Create an array of 12 elements to represent loading cards
  const skeletons = Array.from({ length: 12 }, (_, index) => index);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {skeletons.map((index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}
