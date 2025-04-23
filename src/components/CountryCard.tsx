"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, Users, MapPin } from "lucide-react";
import { Country } from "@/types/Country";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.cca3}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md h-full group-hover:shadow-xl transition-all duration-300 transform group-hover:translate-y-1 border border-gray-100 dark:border-gray-700">
        <div className="h-48 relative overflow-hidden">
          <Image
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            layout="fill"
            objectFit="cover"
            priority
            className="group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h2 className="text-lg font-bold truncate">
              {country.name.common}
            </h2>
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {country.name.common}
          </h2>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Users size={18} className="text-indigo-500 flex-shrink-0" />
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  Population
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {country.population.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Globe size={18} className="text-green-500 flex-shrink-0" />
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  Region
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {country.region}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin size={18} className="text-red-500 flex-shrink-0" />
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  Capital
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {country.capital?.[0] || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
