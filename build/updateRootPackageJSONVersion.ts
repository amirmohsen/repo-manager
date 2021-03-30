import { readJson, writeJson } from 'fs-extra';
import { ROOT_PACKAGE_JSON, LIB_PACKAGE_JSON } from './paths';

const updateVersion = async (): Promise<void> => {
  const rootPackageJson = await readJson(ROOT_PACKAGE_JSON);
  const libPackageJson = await readJson(LIB_PACKAGE_JSON);

  rootPackageJson.version = libPackageJson.version;

  await writeJson(ROOT_PACKAGE_JSON, rootPackageJson, {
    spaces: 2,
  });
};

updateVersion();
