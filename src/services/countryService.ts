import { Country } from "@/types/Country";

// This should move to env. But we dealing with a public API here. So it is okay for this case.
const API_URL = "https://restcountries.com/v3.1";

export async function getAllCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) throw new Error("Failed to fetch countries");
    return response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
    return fetchLocalData();
  }
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  try {
    const response = await fetch(`${API_URL}/alpha/${code}`);

    if (!response.ok) throw new Error("Failed to fetch country");
    const data = await response.json();

    return data[0] || null;
  } catch (error) {
    console.error("Error fetching country:", error);
    const allCountries = await fetchLocalData();
    return allCountries.find((country) => country.cca3 === code) || null;
  }
}

// Backup solution in case the API is down
export async function fetchLocalData(): Promise<Country[]> {
  console.log("Falling back to local data");
  const response = await fetch("/api/countries");
  const data = await response.json();
  return data;
}
