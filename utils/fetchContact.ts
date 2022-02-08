import * as fs from 'fs';
import * as path from 'path';

import { NextConfig } from "../pages";
import { downloadAudioFile } from './downloadAudioFile';

export async function fetchContact(nextConfig: NextConfig, formId: string, contactId: string): Promise<void> {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${nextConfig.serverRuntimeConfig.store.token}`);
    // headers.append("organization-id", `6f58d21d-d307-49f9-9bdd-86cdde31feed`);

    const requestOptions: RequestInit = {
        method: 'GET',
        headers,
        redirect: 'follow'
    };
    const res = await fetch(`${process.env.VIDEOASK_API_BASE_URL}/forms/${formId}/contacts/${contactId}?include_answers=true`, requestOptions);
    const data = await res.json();

    // Read all of the contact's answers and save the audio files into the correct questionId folder
    for (const answer of data.answers) {
        switch (answer.type) {
            case 'audio':
                try {
                    fs.readdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, answer.question_id))
                } catch {
                    fs.mkdirSync(path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, answer.question_id))
                }

                await downloadAudioFile(nextConfig, formId, answer.question_id, answer.media_id, answer.media_url)
                break;
            default:
                break;
        }
    }
}