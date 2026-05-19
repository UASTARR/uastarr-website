import {
    google,   // The top level object used to access services
    drive_v3, // For every service client, there is an exported namespace
} from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

function removeExtension(filename: string): string {
    return filename.split('.').slice(0, -1).join('.');
}

export async function getImagesFromFolder(driveId: string, folderId: string): Promise<{ id: string; name: string; imageUrl: string }[]> {
    const drive: drive_v3.Drive = google.drive({
      version: 'v3',
      auth: process.env.google_api_key
    });

    const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
    const params: drive_v3.Params$Resource$Files$List = {
        corpora: 'drive',   // Search within the specified drive
        driveId: driveId,   // Specify the drive ID to search within
        q: query,
        fields: 'nextPageToken, files(id, name)',
        includeItemsFromAllDrives: true,
        supportsAllDrives: true
    };

    const files: { id: string; name: string; imageUrl: string }[] = [];
    let pageToken: string | undefined;

    do {
        if (pageToken) {
            params['pageToken'] = pageToken;
        } else {
            delete params['pageToken'];
        }

        const res = await drive.files.list(params);
        files.push(...(res.data.files?.filter((file) => file.id && file.name).map((file) => ({
            id: file.id!,
            name: removeExtension(file.name!),
            imageUrl: getImageUrlFromId(file.id!)
        })) as { id: string; name: string; imageUrl: string }[] ?? []));
        pageToken = res.data.nextPageToken ?? undefined;
    } while (pageToken);

    return files;
}

// Get the image URL from an image id
export function getImageUrlFromId(imageId: string): string {
    return `https://drive.google.com/uc?export=view&id=${imageId}`;
}

export async function getSponsorshipPdfUrlFromFolder(driveId: string, folderId: string): Promise<string | null> {
    const drive: drive_v3.Drive = google.drive({
      version: 'v3',
      auth: process.env.google_api_key
    });

    const query = `'${folderId}' in parents and trashed = false`;
    const params: drive_v3.Params$Resource$Files$List = {
        corpora: 'drive',
        driveId: driveId,
        q: query,
        fields: 'nextPageToken, files(id)',
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        orderBy: 'modifiedTime desc' // Get the most recently created PDF
    };

    const res = await drive.files.list(params);
    const pdfFile = res.data.files?.[0]; // Get the first (most recent) PDF file

    if (pdfFile && pdfFile.id) {
        return pdfFile.webViewLink || `https://drive.google.com/file/d/${pdfFile.id}/view`;
    } else {
        return null; // No PDF found
    }
}

export async function getSponsorLogoDicts(driveId: string, logoFolderId: string): Promise<{ [key: string]: string }> {
    const sponsorLogos = await getImagesFromFolder(driveId, logoFolderId);
    // Key is the image name, value is the image URL
    const sponsorLogoDict: { [key: string]: string } = {};
    sponsorLogos.forEach((logo) => {
        sponsorLogoDict[logo.name] = logo.imageUrl;
    });
    return sponsorLogoDict;
}