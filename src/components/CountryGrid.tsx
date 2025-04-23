"use client";

import React from "react";
import CountryCard from "./CountryCard";
import { Country } from "@/types/Country";

interface CountryGridProps {
  countries: Country[];
}

export default function CountryGrid({ countries }: CountryGridProps) {
  if (countries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-lg mx-auto text-center overflow-hidden relative">
          {/* Animated Globe - SVG animation */}
          <div className="w-full h-48 mb-6 flex items-center justify-center">
            <div className="relative">
              <svg
                className="w-32 h-32 animate-bounce"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Confused Globe Face */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="#60A5FA"
                  className="dark:fill-blue-600"
                />
                <path
                  d="M30 30 Q50 10 70 30"
                  stroke="#1E3A8A"
                  strokeWidth="2"
                  fill="none"
                  className="dark:stroke-blue-300"
                />
                <path
                  d="M30 70 Q50 90 70 70"
                  stroke="#1E3A8A"
                  strokeWidth="2"
                  fill="none"
                  className="dark:stroke-blue-300"
                />
                <circle
                  cx="30"
                  cy="50"
                  r="5"
                  fill="#1E3A8A"
                  className="dark:fill-blue-300"
                />
                <circle
                  cx="70"
                  cy="50"
                  r="5"
                  fill="#1E3A8A"
                  className="dark:fill-blue-300"
                />
                <path
                  d="M15 40 Q50 20 85 40"
                  stroke="#1E3A8A"
                  strokeWidth="2"
                  fill="none"
                  className="dark:stroke-blue-300"
                />
                <path
                  d="M15 60 Q50 80 85 60"
                  stroke="#1E3A8A"
                  strokeWidth="2"
                  fill="none"
                  className="dark:stroke-blue-300"
                />
                <path
                  d="M40 15 Q60 35 40 55"
                  stroke="#1E3A8A"
                  strokeWidth="2"
                  fill="none"
                  className="dark:stroke-blue-300"
                />
                <path
                  d="M60 15 Q40 35 60 55"
                  stroke="#1E3A8A"
                  strokeWidth="2"
                  fill="none"
                  className="dark:stroke-blue-300"
                />
                {/* Question marks floating around */}
                <text
                  x="20"
                  y="25"
                  fontSize="12"
                  fill="#1E3A8A"
                  className="dark:fill-blue-300 animate-pulse"
                >
                  ?
                </text>
                <text
                  x="75"
                  y="30"
                  fontSize="14"
                  fill="#1E3A8A"
                  className="dark:fill-blue-300 animate-pulse"
                >
                  ?
                </text>
                <text
                  x="15"
                  y="70"
                  fontSize="16"
                  fill="#1E3A8A"
                  className="dark:fill-blue-300 animate-pulse"
                >
                  ?
                </text>
                <text
                  x="80"
                  y="65"
                  fontSize="12"
                  fill="#1E3A8A"
                  className="dark:fill-blue-300 animate-pulse"
                >
                  ?
                </text>
              </svg>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">
            Oops! Country Not Found
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Looks like this country is playing hide and seek! Try a different
            search or reset your filters to bring it back on the map.
          </p>

          {/* Fun footer message */}
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 italic">
            "Not all who wander are lost... but your search results definitely
            are!"
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}
