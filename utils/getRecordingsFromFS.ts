import * as fs from "fs";
import * as path from "path";

import { Recording } from "../models/types";

export default function getRecordingsFromFS(root: string): Recording[] {
  const recordings: Recording[] = [];

  try {
    // Read forms file
    const formsPath = path.join(root, "public", "forms", "forms.json");

    // Check if forms.json exists
    if (!fs.existsSync(formsPath)) {
      console.warn("forms.json not found, returning empty recordings");
      return recordings;
    }

    // LEVEL 1: FORMS
    const formsDataRaw = fs.readFileSync(formsPath, { encoding: "utf8" });
    const formsData: any = JSON.parse(formsDataRaw);

    // Check if formsData has the expected structure
    if (!formsData || !formsData.results || !Array.isArray(formsData.results)) {
      console.warn("Invalid forms.json structure, returning empty recordings");
      return recordings;
    }

    const formTitles: string[] = formsData.results.map(
      (result: any): string => {
        return result.title || "Untitled";
      },
    );

    // LEVEL 2: FORM = ABSTIMMUNG
    for (const form of formsData.results) {
      const formId = form.form_id;
      const formTitle = form.title || "Untitled";

      try {
        const formDataPath = path.join(
          root,
          "public",
          "forms",
          formId,
          `${formId}.json`,
        );

        // Check if form data file exists
        if (!fs.existsSync(formDataPath)) {
          console.warn(`Form data file not found for ${formId}, skipping`);
          continue;
        }

        const formDataRaw = fs.readFileSync(formDataPath, { encoding: "utf8" });
        const formData: any = JSON.parse(formDataRaw);

        // Check if formData has questions
        if (!formData.questions || !Array.isArray(formData.questions)) {
          continue;
        }

        // LEVEL 3: QUESTION = EINZELNE FRAGE IN EINEM ABSTIMMUNGSFORM, ZB AUDIO ODER GRUPPE
        for (const question of formData.questions) {
          const questionId = question.question_id;
          try {
            const mediaFolderPath = path.join(
              root,
              "public",
              "forms",
              formId,
              questionId,
            );

            if (!fs.existsSync(mediaFolderPath)) {
              continue;
            }

            const mediaFolderContents = fs.readdirSync(mediaFolderPath);
            for (const mediaFilePath of mediaFolderContents) {
              // Only add audio/video files, skip other files
              if (mediaFilePath.match(/\.(mp3|mp4|webm|wav|m4a)$/i)) {
                recordings.push({
                  path: `/forms/${formId}/${questionId}/${mediaFilePath}`,
                  voting: formTitle,
                });
              }
            }
          } catch (error) {
            // Silently skip if question directory doesn't exist
          }
        }
      } catch (error) {
        console.warn(`Error processing form ${formId}:`, error);
        continue;
      }
    }
  } catch (error) {
    console.error("Error in getRecordingsFromFS:", error);
    return recordings;
  }

  console.log(`Found ${recordings.length} recordings`);
  return recordings;
}
