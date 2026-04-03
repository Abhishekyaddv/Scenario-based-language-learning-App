import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');

const getLanguageFolders = () => {
    return fs.readdirSync(dataDir).filter(file => {
        return fs.statSync(path.join(dataDir, file)).isDirectory() && file !== 'spanish';
    });
};

const processChapters = (chapters) => {
    let modified = false;
    for (let chapter of chapters) {
        if (!chapter.learningMaterial) {
            modified = true;
            chapter.learningMaterial = {
                title: chapter.title,
                intro: chapter.description || `Let's practice the concepts for ${chapter.title}.`,
                concepts: chapter.lessons.map(lesson => ({
                    term: lesson.correctAnswer || "Vocabulary Term",
                    explanation: lesson.explanation || lesson.hint || "Review this concept."
                }))
            };
        }
    }
    return modified;
};

const main = () => {
    const folders = getLanguageFolders();
    let totalFilesUpdated = 0;

    for (let folder of folders) {
        const folderPath = path.join(dataDir, folder);
        const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));

        for (let file of files) {
            const filePath = path.join(folderPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            let data = JSON.parse(content);
            let isModified = false;

            if (Array.isArray(data)) {
                for (let levelData of data) {
                    if (levelData.chapters) {
                        const changed = processChapters(levelData.chapters);
                        if (changed) isModified = true;
                    }
                }
            } else {
                if (data.chapters) {
                    const changed = processChapters(data.chapters);
                    if (changed) isModified = true;
                }
            }

            if (isModified) {
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
                console.log(`Updated: ${folder}/${file}`);
                totalFilesUpdated++;
            }
        }
    }

    console.log(`Finished processing. Total files updated: ${totalFilesUpdated}`);
};

main();
