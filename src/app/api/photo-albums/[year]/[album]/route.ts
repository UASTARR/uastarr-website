import { NextRequest, NextResponse } from 'next/server';
import { getPhotos } from '@/library/firebase/storage';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ year: string; album: string }> }
) {
  const params = await props.params;
  const { year, album } = params;
  const albumName = `${year}/${album}`;

  try {
    const photos = await getPhotos(albumName);
    return NextResponse.json(photos, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}
