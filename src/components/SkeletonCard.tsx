"use client";

import React from "react";

export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md h-full animate-pulse">
      <div className="h-40 bg-gray-300 dark:bg-gray-600"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
      </div>
    </div>
  );
}
