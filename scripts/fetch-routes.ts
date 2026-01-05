import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { extractRouteId, fetchRouteData, type RouteData } from '../src/lib/ridewithgps.js';

const CONTENT_DIR = join(process.cwd(), 'src/content/rides');
const DATA_DIR = join(process.cwd(), 'data/routes');

interface RideFrontmatter {
  ridewithgps_url: string;
}

async function parseFrontmatter(content: string): Promise<RideFrontmatter | null> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = match[1];
  const urlMatch = frontmatter.match(/ridewithgps_url:\s*(.+)/);
  if (!urlMatch) return null;

  return { ridewithgps_url: urlMatch[1].trim() };
}

async function main() {
  // Ensure data directory exists
  await mkdir(DATA_DIR, { recursive: true });

  // Read all markdown files from content directory
  const files = await readdir(CONTENT_DIR);
  const mdFiles = files.filter((f) => f.endsWith('.md'));

  console.log(`Found ${mdFiles.length} ride file(s)`);

  for (const file of mdFiles) {
    const slug = file.replace('.md', '');
    const content = await readFile(join(CONTENT_DIR, file), 'utf-8');
    const frontmatter = await parseFrontmatter(content);

    if (!frontmatter) {
      console.warn(`⚠️  ${file}: No valid frontmatter found, skipping`);
      continue;
    }

    const routeId = extractRouteId(frontmatter.ridewithgps_url);
    const cacheFile = join(DATA_DIR, `${slug}.json`);

    console.log(`Fetching route ${routeId} for ${slug}...`);

    try {
      const routeData = await fetchRouteData(routeId);
      await writeFile(cacheFile, JSON.stringify(routeData, null, 2));
      console.log(`✓ ${slug}: "${routeData.name}" cached`);
    } catch (error) {
      console.error(`✗ ${slug}: Failed to fetch route -`, error);
    }
  }

  console.log('Done!');
}

main().catch(console.error);
