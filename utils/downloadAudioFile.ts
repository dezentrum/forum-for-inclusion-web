import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

import { NextConfig } from "../pages";

export async function downloadAudioFile(nextConfig: NextConfig, formId: string, questionId: string, mediaId: string, mediaSrc: string): Promise<void> {

    const questionFolderPath = path.join(nextConfig.serverRuntimeConfig.store.projectRoot, 'public', 'forms', formId, questionId)
    const locallyAvailableAudioFiles = fs.readdirSync(questionFolderPath);
    const filename = `${mediaId}.mp3`

    const downloadFile = () => {
        // ...we need to wrap the asynchronous 'downloading' behaviour into a promise, in order to be able to using async / await, which we need in this case to avoid race conditions.
        return new Promise<any>((resolve, reject) => {
            https.get(mediaSrc, (res) => {
              const file = fs.createWriteStream(path.join(questionFolderPath, filename));
              res.pipe(file);
              file.on('finish',() => {
                file.close();
                resolve('success');
              })
              file.on('error', (e) => {
                reject(e);
              })
            });
          })
        }

    if (!locallyAvailableAudioFiles.includes(filename)) {
        const downloadStatus = await downloadFile()
        if (downloadStatus !== 'success') {
            console.error(`ERROR: Audio file could not be downloaded from Videoask API. Err Msg: ${downloadStatus}`)
        }
    }
}