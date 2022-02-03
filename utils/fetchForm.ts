import * as fs from 'fs';
import * as path from 'path';

import { NextConfig } from "../pages";
import { fetchQuestion } from './fetchQuestion';

export async function fetchForm(nextConfig: NextConfig, formId: string): Promise<void> {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${nextConfig.serverRuntimeConfig.store.token}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };

  const res = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/forms/${formId}`, requestOptions);
  const data = await res.json();
  console.log('form endpoint success')

  try {
    fs.readdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId))
  } catch {
    fs.mkdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId), )
  }

  const filename = `${formId}.json`
  fs.writeFileSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, filename), JSON.stringify(data));

  for (const question of data.questions) {
      await fetchQuestion(nextConfig, formId, question.question_id)
  }
}