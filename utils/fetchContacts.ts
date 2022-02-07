import * as fs from 'fs';
import * as path from 'path';

import { NextConfig } from "../pages";

export async function fetchContacts(nextConfig: NextConfig, formId: string): Promise<string[]> {
  // We can only fetch 20 (*twenty*) contacts at a time, otherwise get BANNED.
  const contactsLimit = 1;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${nextConfig.serverRuntimeConfig.store.token}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };

  // TODO: iterate (steps of 20) until you have all contact ids 
  const res = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/forms/${formId}/contacts?limit=${contactsLimit}`, requestOptions);
  const data = await res.json();

  // Create the folder for every form if it doesn't exist (where we then place the answers)
  try {
    fs.readdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId))
  } catch {
    fs.mkdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId))
  }

  const filename = `${formId}.json`
  fs.writeFileSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, filename), JSON.stringify(data));

  const contactIds = data.results.map((contact: any) => contact.contact_id)
  return contactIds
}