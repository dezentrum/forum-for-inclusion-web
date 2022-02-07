import * as fs from 'fs';
import * as path from 'path';

import { NextConfig } from "../pages";
import { fetchQuestion } from './fetchQuestion';
import { fetchContacts } from './fetchContacts';

export async function fetchForm(nextConfig: NextConfig, formId: string): Promise<void> {
  const limit: number = 1;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${nextConfig.serverRuntimeConfig.store.token}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };

  const res = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/forms/${formId}/contacts?limit=${limit}`, requestOptions);
  const data = await res.json();

  console.log('form endpoint success')

  let results = data.results;
  const contactIdList = results.map((contact: any) => {
    return contact.contact_id
  })

  // todo: iterate (steps of 20) until you have all contact ids


  for (const contactId of contactIdList) {
    const res2 = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/forms/${formId}/contacts/${contactId}?include_answers=true`, requestOptions);
    const data2 = await res2.json();
  }

  try {
    fs.readdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId))
  } catch {
    fs.mkdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId), )
  }

  const filename = `${formId}.json`
  fs.writeFileSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, filename), JSON.stringify(data));

  for (const contactId of contactIdList) {
      await fetchContacts(nextConfig, formId, contactId)
  }

  // for (const question of data.questions) {
  //     await fetchQuestion(nextConfig, formId, question.question_id)
  // }
}