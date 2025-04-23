import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  Users,
  MapPin,
  Building,
  Globe2,
  DollarSign,
  Languages,
} from "lucide-react";
import { Country } from "@/types/Country";
import {
  getCountryByCode,
  getAllCountries,
  fetchLocalData,
} from "@/services/countryService";

export default function CountryDetail() {
  const router = useRouter();
  const { code } = router.query;
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      if (!code) return;

      try {
        setLoading(true);
        let countryData = await getCountryByCode(code as string);

        if (!countryData) {
          // Try fetching from local data if API fails
          const allCountries = await fetchLocalData();
          countryData = allCountries.find((c) => c.cca3 === code) || null;
        }

        if (!countryData) {
          setError("Country not found");
          setLoading(false);
          return;
        }

        setCountry(countryData);

        // Fetch border countries if available
        if (countryData.borders && countryData.borders.length > 0) {
          const allCountries = await getAllCountries().catch(() =>
            fetchLocalData()
          );
          const borders = allCountries.filter((c) =>
            countryData.borders?.includes(c.cca3)
          );
          setBorderCountries(borders);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load country details");
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [code]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Link href="/">
          <button className="flex items-center gap-2 py-2 px-6 shadow-md rounded-md bg-white dark:bg-gray-700 dark:text-white mb-10 hover:shadow-lg transition-shadow">
            <ArrowLeft size={18} />
            Back
          </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-64 md:h-96 w-full bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>

          <div className="space-y-4">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"
                  ></div>
                ))}
              </div>

              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 animate-pulse mb-4"></div>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="px-6 py-3 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-24"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Link href="/">
          <button className="flex items-center gap-2 py-2 px-6 shadow-md rounded-md bg-white dark:bg-gray-700 dark:text-white mb-10">
            <ArrowLeft size={18} />
            Back
          </button>
        </Link>

        <div className="flex flex-col justify-center items-center py-12">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-8 shadow-md max-w-md text-center">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              {error || "Country not found"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We couldn't find the country you're looking for.
            </p>
            <Link href="/">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                View all countries
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format currencies and languages as strings
  const currencies = Object.values(country.currencies || {})
    .map((currency) => `${currency.name} (${currency.symbol})`)
    .join(", ");

  const languages = Object.values(country.languages || {}).join(", ");

  return (
    <>
      <Head>
        <title>{country.name.common} | World Explorer</title>
        <meta
          name="description"
          content={`Learn about ${country.name.common} - population, region, capital and more`}
        />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <Link href="/">
          <button className="flex items-center gap-2 py-3 px-6 bg-white dark:bg-gray-800 shadow rounded-lg mb-12 hover:shadow-lg transition-all duration-200 text-gray-700 dark:text-gray-200">
            <ArrowLeft size={18} />
            <span className="font-medium">Back</span>
          </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="relative aspect-[4/3] w-full shadow-lg rounded-xl overflow-hidden border-4 border-white dark:border-gray-800">
            <Image
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              layout="fill"
              objectFit="cover"
              priority
              className="hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="dark:text-white space-y-8">
            <h1 className="text-4xl font-bold mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">
              {country.name.common}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                  Basic Information
                </h3>

                <div className="flex items-center space-x-3 py-2">
                  <Globe size={20} className="text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Official Name
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {country.name.official}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 py-2">
                  <Users size={20} className="text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Population
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {country.population.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 py-2">
                  <Globe2 size={20} className="text-purple-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Region
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {country.region}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 py-2">
                  <MapPin size={20} className="text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sub Region
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {country.subregion || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 py-2">
                  <Building size={20} className="text-red-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Capital
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {country.capital?.[0] || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                  Additional Details
                </h3>

                <div className="flex items-center space-x-3 py-2">
                  <Globe size={20} className="text-indigo-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Top Level Domain
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {country.tld?.[0] || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 py-2">
                  <DollarSign
                    size={20}
                    className="text-emerald-500 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Currencies
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {currencies || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 py-2">
                  <Languages
                    size={20}
                    className="text-orange-500 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Languages
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {languages || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {borderCountries.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow mt-8">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                  Border Countries
                </h2>
                <div className="flex flex-wrap gap-3">
                  {borderCountries.map((border) => (
                    <Link href={`/country/${border.cca3}`} key={border.cca3}>
                      <span className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 inline-block">
                        {border.name.common}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
