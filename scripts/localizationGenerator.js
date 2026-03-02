import { readdirSync, readFileSync, writeFile } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class LocalizationGenerator {
  i18nPath;

  featurePath;

  jsonFileType;

  localizationFile;

  pathToWriteLocalization;

  pathToI18nFolder;

  pathToI18nFile;

  constructor(
    i18nPath = 'i18n',
    featurePath = 'src/features',
    jsonFileType = 'json',
    localizationFile = 'localization.json'
  ) {
    this.i18nPath = i18nPath;
    this.featurePath = featurePath;
    this.jsonFileType = jsonFileType;
    this.localizationFile = localizationFile;

    this.pathToWriteLocalization = `pages/${i18nPath}`;
    this.pathToI18nFolder = `${featurePath}/{folder}/${i18nPath}`;
    this.pathToI18nFile = `${featurePath}/{folder}/${i18nPath}/{file.name}`;
  }

  generateLocalizationFile() {
    const featureFolders = this.getFeatureFolders();

    if (!featureFolders.length) return;

    const localizationObj = featureFolders.reduce((acc, folder) => {
      const parsedLocalizationFromFolder = this.getLocalizationFromFolder(folder);

      return { ...acc, ...parsedLocalizationFromFolder };
    }, {});

    const filePath = join(
      dirname(__dirname),
      this.pathToWriteLocalization,
      this.localizationFile
    );
    const fileContent = JSON.stringify(localizationObj);

    this.writeLocalizationFile(fileContent, filePath);
  }

  getFeatureFolders() {
    const featureDirectories = readdirSync(this.featurePath, { withFileTypes: true });

    return featureDirectories
      .filter((directory) => directory.isDirectory())
      .map((directory) => directory.name);
  }

  getLocalizationFromFolder(folder) {
    const localizationFiles = readdirSync(this.pathToI18nFolder.replace('{folder}', folder), {
      withFileTypes: true,
    });

    return localizationFiles.reduce((localizations, file) => {
      if (!file.isFile()) return localizations;

      const [language, fileType] = file.name.split('.');

      if (fileType !== this.jsonFileType) return localizations;

      const localizationContent = readFileSync(
        this.pathToI18nFile.replace('{folder}', folder).replace('{file.name}', file.name),
        'utf8'
      );
      const parsedLocalization = JSON.parse(localizationContent);

      return {
        ...localizations,
        [language]: {
          translation: parsedLocalization,
        },
      };
    }, {});
  }

  writeLocalizationFile(fileContent, filePath) {
    writeFile(filePath, fileContent, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  }
}

export default LocalizationGenerator;
