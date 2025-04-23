import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";
import { Country } from "@/types/Country";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Country[]>
) {
  try {
    // Path to the data.json file
    const filePath = path.join(process.cwd(), "data", "data.json");

    // Read the file contents
    const fileContents = await fs.readFile(filePath, "utf8");

    // Parse the JSON data
    const countries: Country[] = JSON.parse(fileContents);

    // Send the data as a response
    res.status(200).json(countries);
  } catch (error) {
    console.error("Error reading local data:", error);
    res.status(500).json([]);
  }
}
