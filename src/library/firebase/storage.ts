import { 
    listAll,
    ref,
    getDownloadURL,
    getMetadata,

} from "firebase/storage";
import { fireStorage } from "./clientApp";

export async function getAllPhotos(storage = fireStorage) {
    const listRef = ref(storage, 'photo-albums');
    const list = await listAll(listRef);
    var photos: { [key: string]: any } = {};
    for (const folderRef of list.prefixes) {
        const album = folderRef.name;
        photos[album] = await getPhotos(album);
    }
    return photos;
}

export async function getPhotos(album: string, storage = fireStorage) {
    const listRef = ref(storage, `photo-albums/${album}`);
    const list = (await listAll(listRef)).items;
    return await Promise.all(list.map(async (photo) => {
        console.log(await getMetadata(photo));
        const photoUrl = await getPhotoUrl(album, photo.name);
        return ({
            name: photo.name,
            url: photoUrl
        });
    }));
}

async function getAlbums(storage = fireStorage) {
    const listRef = ref(storage, 'photo-albums');
    const list = await listAll(listRef);
    return list.prefixes.map((folderRef) => {
        return {
            name: folderRef.name,
        };
    });
}

async function getPhotoUrl(album: string, photo: string, storage = fireStorage) {
    const photoRef = ref(storage, `photo-albums/${album}/${photo}`);
    return getDownloadURL(photoRef);
}