import * as fs from 'fs';
import * as path from 'path';

import { NextConfig } from "../pages";
import { downloadAudioFile } from './downloadAudioFile';

export async function fetchContacts(nextConfig: NextConfig, formId: string, contactId: string): Promise<void> {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${nextConfig.serverRuntimeConfig.store.token}`);
  // headers.append("organization-id", `6f58d21d-d307-49f9-9bdd-86cdde31feed`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    // redirect: 'follow'
  };

  console.log(headers)

  console.log(`${process.env.VIDEOASK_API_BASE_URL}/forms/${formId}/contacts/${contactId}?include_answers=true`)

  const res = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/forms/${formId}/contacts/${contactId}?include_answers=true`);
  const data = await res.json();

  console.log('fetchContacts data', data)

//   try {
//     fs.readdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, contactId))
//   } catch {
//     fs.mkdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, contactId), )
//   }

  console.log('Contacts success')

//   const filename = `${contactId}.json`
//   fs.writeFileSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, contactId, filename), JSON.stringify(data));

//   for (const question of data.results) {
//     switch (question.type) {
//       case 'audio':
//         await downloadAudioFile(nextConfig, formId, contactId, question.media_id, question.media_url)
//         break;
//       default:
//         break;
//     }
//   }
}