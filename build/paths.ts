import { resolve, join } from 'path';

export const ROOT = resolve(__dirname, '..');

export const PACKAGE_JSON = 'package.json';
export const OUT_DIST_DIR = 'out/dist';
export const DOCS_API_REFERENCE = 'docs/api-reference.md';

export const LIB_PACKAGE_JSON = join(ROOT, OUT_DIST_DIR, PACKAGE_JSON);
export const ROOT_PACKAGE_JSON = join(ROOT, PACKAGE_JSON);

export const DOCS_API_REFERENCE_PATH = join(ROOT, DOCS_API_REFERENCE);
