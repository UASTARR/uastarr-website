import {
    google,   // The top level object used to access services
    drive_v3, // For every service client, there is an exported namespace
} from 'googleapis';
import { cacheLife } from 'next/cache';
import dotenv from 'dotenv';
dotenv.config();

function removeExtension(filename: string): string {
    return filename.split('.').slice(0, -1).join('.');
}

export async function getImagesFromFolder(driveId: string, folderId: string): Promise<{ id: string; name: string; webViewLink: string }[]> {
    'use cache'
    cacheLife('days')
    if (process.env.google_api_key === undefined) {
        return Promise.resolve([]);
    }
    
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

    const files: { id: string; name: string; webViewLink: string }[] = [];
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
            name: file.name!,
            webViewLink: file.webViewLink || ''
        })) as { id: string; name: string; webViewLink: string }[] ?? []));
        pageToken = res.data.nextPageToken ?? undefined;
    } while (pageToken);

    return files;
}

// Get the image URL from an image id
export function getImageUrlFromId(imageId: string): string {
    return `https://drive.google.com/uc?export=view&id=${imageId}`;
}

export interface SponsorshipPackageDetails {
    title: string;
    pdfUrl: string;
    coverImageUrl: string;
}

export async function getSponsorshipPackageDetails(driveId: string, folderId: string): Promise<SponsorshipPackageDetails> {
    'use cache'
    cacheLife('days')

    const fallback: SponsorshipPackageDetails = {
        title: 'Sponsorship Package 2026/2027',
        pdfUrl: '/assets/sponsor_package/Sponsorship Package - STARR.pdf',
        coverImageUrl: '/assets/sponsor_package/sponsorsCover.jpg'
    };

    if (process.env.google_api_key === undefined || !folderId) {
        return fallback;
    }

    try {
        const drive: drive_v3.Drive = google.drive({
            version: 'v3',
            auth: process.env.google_api_key
        });

        const query = `'${folderId}' in parents and trashed = false`;
        const params: drive_v3.Params$Resource$Files$List = {
            corpora: 'drive',
            driveId: driveId,
            q: query,
            fields: 'nextPageToken, files(id, name, mimeType, webViewLink, thumbnailLink)',
            includeItemsFromAllDrives: true,
            supportsAllDrives: true,
            orderBy: 'modifiedTime desc'
        };

        const res = await drive.files.list(params);
        const files = res.data.files || [];

        if (files.length === 0) {
            return fallback;
        }

        const pdfFile = files.find(f => f.mimeType === 'application/pdf' || f.name?.toLowerCase().endsWith('.pdf')) || files[0];
        const coverImageFile = files.find(f => f.mimeType?.startsWith('image/') || /\.(jpe?g|png|webp|avif)$/i.test(f.name || ''));

        let title = fallback.title;
        if (pdfFile && pdfFile.name) {
            title = removeExtension(pdfFile.name);
        }

        let pdfUrl = fallback.pdfUrl;
        if (pdfFile && pdfFile.id) {
            pdfUrl = pdfFile.webViewLink || `https://drive.google.com/file/d/${pdfFile.id}/view`;
        }

        let coverImageUrl = fallback.coverImageUrl;
        if (coverImageFile && coverImageFile.id) {
            coverImageUrl = getImageUrlFromId(coverImageFile.id);
        } else if (pdfFile && pdfFile.id) {
            coverImageUrl = getImageUrlFromId(pdfFile.id);
        }

        return {
            title,
            pdfUrl,
            coverImageUrl
        };
    } catch (error) {
        console.error('Failed to get sponsorship package details from Google Drive:', error);
        return fallback;
    }
}

export async function getSponsorshipPdfUrlFromFolder(driveId: string, folderId: string): Promise<string | null> {
    const details = await getSponsorshipPackageDetails(driveId, folderId);
    return details.pdfUrl;
}


export async function getImageUrlDicts(driveId: string, imageFolderId: string): Promise<{ [key: string]: string }> {
    'use cache'
    cacheLife('days')
    const images = await getImagesFromFolder(driveId, imageFolderId);
    // Key is the image name, value is the image URL
    const nameImageUrlDict: { [key: string]: string } = {};
    images.forEach((image) => {
        nameImageUrlDict[removeExtension(image.name)] = getImageUrlFromId(image.id);
    });
    return nameImageUrlDict;
}