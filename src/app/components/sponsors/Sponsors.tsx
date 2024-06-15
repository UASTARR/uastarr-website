import { promises as fs } from 'fs';

export default async function getSponsorLogos() {
    const file = await fs.readFile(process.cwd() + '/public/assets/database/sponsors.json', 'utf-8');
    const data = JSON.parse(file);
    return data;
}