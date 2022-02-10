import * as fs from 'fs';
import * as path from 'path';

import { Recording } from '../models/types';

export default function getRecordingsFromFS(root: string) {
  // Read forms file

  // LEVEL 1: FORMS
  const formsData: any = JSON.parse(fs.readFileSync(path.join(root, 'public', 'forms', 'forms.json'), { encoding: 'utf8' }));
  const formTitles: string[] = formsData.results.map((result: any): string => {
    return result.title
  })
  const recordings: Recording[] = []

  // LEVEL 2: FORM = ABSTIMMUNG
  for (const form of formsData.results) {
    const formId = form.form_id;
    const formTitle = form.title;
    const formData: any = JSON.parse(fs.readFileSync(path.join(root, 'public', 'forms', formId, `${formId}.json`), { encoding: 'utf8' }));

    // LEVEL 3: QUESTION = EINZELNE FRAGE IN EINEM ABSTIMMUNGSFORM, ZB AUDIO ODER GRUPPE
    for (const question of formData.questions) {
      const questionId = question.question_id
      try {
        const mediaFolderContents = fs.readdirSync(path.join(root, 'public', 'forms', formId, questionId))
        for (const mediaFilePath of mediaFolderContents) {
          recordings.push({ path: path.join('forms', formId, questionId, mediaFilePath), voting: formTitle })
        }
      } catch {

      }
    }
  }

  return recordings;
}