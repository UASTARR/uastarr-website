import { type NextRequest } from 'next/server'
import { getPhotos } from '@/library/firebase/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: { album: string } }
) {
  const album_name = params.album;
  try {
    // Correct usage of req to access query parameters
    const photos = await getPhotos(album_name);
    return new Response(JSON.stringify(photos), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Failed to fetch photos:', error);
    return new Response(`Failed to fetch photos: ${error}`, {
      status: 500,
    });
  }
}