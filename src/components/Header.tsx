"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="shadow-md py-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="font-bold text-2xl md:text-3xl tracking-wide text-gray-900 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              World <span className="font-extrabold">Explorer</span>
            </span>
          </h1>
        </Link>

        <div
          onClick={toggleTheme}
          className="cursor-pointer h-10 w-10 flex justify-center items-center rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          {theme === "light" ? (
            <>
              <Moon size={20} />
            </>
          ) : (
            <>
              <Sun size={20} color="white" />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
