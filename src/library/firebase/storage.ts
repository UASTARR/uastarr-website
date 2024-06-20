import { 
    listAll,
    ref,
    getDownloadURL,

} from "firebase/storage";
import { fireStorage } from "./clientApp";
import { getAlbums } from "./firestore";

export async function getSponsorLogoUrl(sponsor: string, storage = fireStorage) {
    const sponsorRef = ref(storage, `sponsors/${sponsor}`);
    return getDownloadURL(sponsorRef);
}

export async function getAllPhotos() {
    const albums = await getAlbums();
    var photos: { [key: string]: {photos: any, name: string, sub_name: string} } = {};
    for (const album of albums) {
        const album_dir = album.id;
        photos[album_dir] = {photos: await getPhotos(album_dir), name: album.name, sub_name: album.sub_name};
    }
    return photos;
}

export async function getPhotos(album_dir: string, storage = fireStorage) {
    const listRef = ref(storage, `photo-albums/${album_dir}`);
    const list = (await listAll(listRef)).items;
    return await Promise.all(list.map(async (photo) => {
        const photoUrl = await getPhotoUrl(album_dir, photo.name);
        return ({
            name: photo.name,
            url: photoUrl
        });
    }));
}

async function getPhotoUrl(album: string, photo: string, storage = fireStorage) {
    const photoRef = ref(storage, `photo-albums/${album}/${photo}`);
    return getDownloadURL(photoRef);
}