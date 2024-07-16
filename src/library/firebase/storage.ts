import { 
    listAll,
    ref,
    getDownloadURL,
    getMetadata,

} from "firebase/storage";
import { fireStorage } from "./clientApp";
import { getAlbums } from "./firestore";

export async function getUrl(filepath: string, storage = fireStorage): Promise<{ string: string; type: string | undefined | void }> {
    const fileRef = ref(storage, filepath);
    let url = {string: "", type: ("" as string | undefined | void)};
    url.string = await getDownloadURL(fileRef);
    url.type = await getMetadata(fileRef).then((metadata) => {
        return metadata.contentType;
    }).catch((error) => {
        console.log(error);
        return undefined;
    });
    return url;
}

export async function getSponsorLogoUrl(sponsor: string, storage = fireStorage) {
    const sponsorRef = ref(storage, `sponsors/${sponsor}`);
    return getDownloadURL(sponsorRef);
}

export async function getAllPhotos() {
    const albums = await getAlbums();
    var photos: { [key: string]: {photos: any, name: string, sub_name: string} } = {};
    for (const album of albums) {
        const album_dir = album.album_dir;
        photos[album_dir] = {photos: await getPhotos(album_dir), name: album.name, sub_name: album.sub_name};
    }
    return photos;
}

export async function getAlbumCover() {
    const albums = await getAlbums();
    var photos: { [key: string]: {coverPhoto: any, name: string, sub_name: string} } = {};
    for (const album of albums) {
        const album_dir = album.album_dir;
        photos[album_dir] = {coverPhoto: (await getUrl(['photo-albums', album.album_dir, album.coverFile].join('/'))).string, name: album.name, sub_name: album.sub_name};
    }
    return photos;
}

export async function getPhotos(album_dir: string, storage = fireStorage) {
    const listRef = ref(storage, `photo-albums/${album_dir}`);
    const list = (await listAll(listRef)).items;
    return await Promise.all(list.map(async (photo) => {
        const photoUrl = await getUrl(["photo-albums", album_dir, photo.name].join("/"));
        return ({
            name: photo.name,
            url: photoUrl.string,
            type: photoUrl.type
        });
    }));
}