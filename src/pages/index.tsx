"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { Country } from "@/types/Country";
import { getAllCountries } from "@/services/countryService";
import SearchFilter from "@/components/SearchFilter";
import CountryGrid from "@/components/CountryGrid";
import SkeletonGrid from "@/components/SkeletonGrid";
import { Globe } from "@/components/Globe";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get unique regions from countries
  const regions = [
    ...new Set(countries.map((country) => country.region)),
  ].sort();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load countries. Please try again later.");
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search term and selected region
  useEffect(() => {
    const results = countries.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion
        ? country.region === selectedRegion
        : true;
      return matchesSearch && matchesRegion;
    });
    setFilteredCountries(results);
  }, [countries, searchTerm, selectedRegion]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Country Explorer</title>
        <meta name="description" content="Explore countries around the world" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="relative w-full max-w-xs ">
            <Globe className="w-full h-auto transition-opacity duration-1000" />
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-center bg-gradient-to-br from-primary to-[#7E69AB] bg-clip-text text-transparent animate-fade-in font-playfair">
            Explore the World,
            <br className="hidden md:block" /> One Country at a Time
          </h1>
        </div>

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          regions={regions}
        />

        {loading ? (
          <SkeletonGrid />
        ) : error ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <CountryGrid countries={filteredCountries} />
        )}
      </div>
    </div>
  );
}
