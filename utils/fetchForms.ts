import * as fs from "fs";
import * as path from "path";

import { NextConfig } from "../pages";

interface FormsData {
  formIds: string[];
  formCount: number;
}

/*
 Fetch all forms from Videoask (all votes)
*/
export async function fetchForms(nextConfig: NextConfig): Promise<FormsData> {
  try {
    // Check if token exists
    if (!nextConfig.serverRuntimeConfig.store.token) {
      console.warn("No Videoask token available, skipping form fetch");
      return { formIds: [], formCount: 0 };
    }

    // Check if API URL is configured
    if (!process.env.VIDEOASK_API_BASE_URL) {
      console.warn("VIDEOASK_API_BASE_URL not configured, skipping form fetch");
      return { formIds: [], formCount: 0 };
    }

    const headers = new Headers();
    headers.append(
      "Authorization",
      `Bearer ${nextConfig.serverRuntimeConfig.store.token}`,
    );

    const requestOptions: RequestInit = {
      method: "GET",
      headers,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.VIDEOASK_API_BASE_URL}/forms?limit=0&offset=0&title=`,
      requestOptions,
    );

    if (!res.ok) {
      console.error(`Failed to fetch forms: ${res.status} ${res.statusText}`);
      return { formIds: [], formCount: 0 };
    }

    const data = await res.json();

    // Check if data has the expected structure
    if (!data || !data.results || !Array.isArray(data.results)) {
      console.warn("Unexpected response structure from Videoask API");
      return { formIds: [], formCount: 0 };
    }

    const filename = "forms.json";
    const formsDir = path.join(
      nextConfig.serverRuntimeConfig.store.projectRoot,
      "public",
      "forms",
    );

    // Create forms directory if it doesn't exist
    if (!fs.existsSync(formsDir)) {
      fs.mkdirSync(formsDir, { recursive: true });
    }

    fs.writeFileSync(path.join(formsDir, filename), JSON.stringify(data));

    const formIds = data.results.map((form: any) => form.form_id);
    const formCount = data.count || 0;
    return { formIds, formCount };
  } catch (error) {
    console.error("Error fetching forms:", error);
    return { formIds: [], formCount: 0 };
  }
}
