import * as fs from 'fs';
import * as path from 'path';

import { NextConfig } from "../pages";

interface FormsData {
  formIds: string[],
  formCount: number
}

/*
 Fetch all forms from Videoask (all votes)
*/
export async function fetchForms(nextConfig: NextConfig): Promise<FormsData> {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${nextConfig.serverRuntimeConfig.store.token}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };

  const res = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/forms?limit=0&offset=0&title=`, requestOptions);
  const data = await res.json();

  const filename = 'forms.json'
  fs.writeFileSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', filename), JSON.stringify(data));

  const formIds = data.results.map((form: any) => form.form_id)
  const formCount = data.count
  return { formIds,  formCount }
}