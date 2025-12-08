import * as fs from "fs";
import * as path from "path";

import { NextConfig } from "../pages";

export async function fetchContacts(
  nextConfig: NextConfig,
  formId: string,
  formCount: number,
): Promise<string[]> {
  try {
    // Check if required environment variables are set
    if (
      !process.env.VIDEOASK_API_BASE_URL ||
      !nextConfig.serverRuntimeConfig.store.token
    ) {
      console.warn("Missing Videoask configuration, skipping contacts fetch");
      return [];
    }

    // We can only fetch 20 (*twenty*) contacts at a time, otherwise get BANNED.
    const contactsLimit = 20;
    let offset = 0;
    let contactIds: string[] = [];

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

    // TODO: iterate (steps of 20) until you have all contact ids
    while (offset <= formCount) {
      const res = await fetch(
        `${process.env.VIDEOASK_API_BASE_URL}/forms/${formId}/contacts?limit=${contactsLimit}&offset=${offset}`,
        requestOptions,
      );

      if (!res.ok) {
        console.error(
          `Failed to fetch contacts for form ${formId}: ${res.status} ${res.statusText}`,
        );
        break;
      }

      const data = await res.json();

      // Check if data has expected structure
      if (!data || !data.results || !Array.isArray(data.results)) {
        console.warn(
          `Unexpected response structure for contacts of form ${formId}`,
        );
        break;
      }

      // Create the folder for every form if it doesn't exist (where we then place the answers)
      try {
        fs.readdirSync(
          path.join(
            nextConfig.serverRuntimeConfig.store.projectRoot,
            "public",
            "forms",
            formId,
          ),
        );
      } catch {
        fs.mkdirSync(
          path.join(
            nextConfig.serverRuntimeConfig.store.projectRoot,
            "public",
            "forms",
            formId,
          ),
          { recursive: true },
        );
      }

      contactIds = [
        ...contactIds,
        ...data.results.map((contact: any) => contact.contact_id),
      ];
      offset += contactsLimit;
    }

    return contactIds;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}
