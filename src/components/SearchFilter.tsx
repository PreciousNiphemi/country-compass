"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Globe, X, ChevronDown, Map, Filter } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  regions: string[];
}

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  regions,
}: SearchFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle clearing the search input
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Handle region selection
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setIsDropdownOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Search Input with Animation */}
        <div className="relative max-w-md w-full group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search
              size={20}
              className="text-blue-500 group-hover:text-blue-600 transition-colors"
            />
          </div>

          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-10 py-4 w-full rounded-full border-2 border-gray-200 dark:border-gray-600  shadow-lg focus:shadow-blue-200 dark:focus:shadow-blue-900/30 focus:outline-none focus:border-blue-500  dark:bg-gray-800 dark:text-white transition-all duration-300 bg-white text-gray-800"
          />

          {/* Clear button - only shows when there's text */}
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-1 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                <X size={16} />
              </div>
            </button>
          )}

          {/* Animated border effect on focus */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-1/2 transition-all duration-300"></div>
        </div>

        {/* Custom Dropdown for Region Filter */}
        <div className="relative w-64" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center justify-between w-full py-4 px-5 rounded-full
                      border-2 ${
                        selectedRegion
                          ? "border-blue-400 dark:border-blue-600"
                          : "border-gray-200 dark:border-gray-600"
                      } 
                      shadow-md hover:shadow-lg
                      dark:bg-gray-800 dark:text-white bg-white text-gray-800
                      transition-all duration-300 focus:outline-none`}
          >
            <div className="flex items-center gap-3">
              {selectedRegion ? (
                <Globe size={20} className="text-blue-500" />
              ) : (
                <Filter size={20} className="text-gray-400" />
              )}

              <span
                className={
                  selectedRegion
                    ? "font-medium text-blue-700 dark:text-blue-400"
                    : "text-gray-500"
                }
              >
                {selectedRegion || "Filter by Region"}
              </span>
            </div>

            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform duration-300 ${
                isDropdownOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu with Animation */}
          {isDropdownOpen && (
            <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-10 transform origin-top transition-all duration-200 animate-dropdown">
              {selectedRegion && (
                <button
                  onClick={() => handleRegionSelect("")}
                  className="w-full text-left px-5 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-500"
                >
                  <X size={16} />
                  <span>Clear filter</span>
                </button>
              )}

              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionSelect(region)}
                  className={`w-full text-left px-5 py-3
                            hover:bg-blue-50 dark:hover:bg-gray-700
                            flex items-center gap-3
                            ${
                              selectedRegion === region
                                ? "bg-blue-50 dark:bg-gray-700/60 text-blue-600 dark:text-blue-400 font-medium"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                >
                  <Map
                    size={16}
                    className={
                      selectedRegion === region
                        ? "text-blue-500"
                        : "text-gray-400"
                    }
                  />
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active filters display - shows when either search or filter is active */}
      {(searchTerm || selectedRegion) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchTerm && (
            <div className="inline-flex items-center gap-2 py-1 px-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              <span>Search: {searchTerm}</span>
              <button
                onClick={handleClearSearch}
                className="hover:text-blue-900 dark:hover:text-blue-100"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {selectedRegion && (
            <div className="inline-flex items-center gap-2 py-1 px-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
              <Globe size={14} className="text-indigo-500" />
              <span>{selectedRegion}</span>
              <button
                onClick={() => setSelectedRegion("")}
                className="hover:text-indigo-900 dark:hover:text-indigo-100"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Custom animation for dropdown */}
      <style jsx global>{`
        @keyframes dropdownOpen {
          0% {
            opacity: 0;
            transform: scaleY(0.95) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scaleY(1) translateY(0);
          }
        }
        .animate-dropdown {
          animation: dropdownOpen 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
