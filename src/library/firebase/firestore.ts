import {
	collection,
	onSnapshot,
	query,
	getDocs,
	doc,
	getDoc,
    setDoc,
	updateDoc,
	orderBy,
	Timestamp,
	runTransaction,
	where,
	addDoc,
	getFirestore,
    deleteDoc,
} from "firebase/firestore";

import { firestoreDb } from "./clientApp";

export async function getProjects(projectType: string, db = firestoreDb) {
    const q = query(collection(db, "projects"), where("type", "==", projectType), orderBy("ordering", "desc"));
    const results = await getDocs(q);
    return results.docs.map(doc => {
        return {
            id: doc.id,
            type: doc.data().type,
            name: doc.data().name,
            description: doc.data().description,
            logosRef: doc.data().logosRef,
            ordering: doc.data().ordering,
            playlistLink: doc.data().playlistLink,
            albumRef: doc.data().albumRef,
            coverFile: doc.data().coverFile,
            albumName: doc.data().albumName,
            launchDate: doc.data().launchDate,
            ...doc.data(),
        };
    });
}

export async function getHeadshots(db = firestoreDb) {
    const q = query(collection(db, "headshots"), orderBy("ordering"));
    const results = await getDocs(q);
    return results.docs.map(doc => {
        return {
            id: doc.id,
            name: doc.data().name,
            title: doc.data().title,
            imgref: doc.data().imgref,
            ordering: doc.data().ordering,
            ...doc.data(),
        };
    });
}

export async function getSponsorRanks(db = firestoreDb) {
    const q = query(collection(db, "sponsors"), orderBy("rank_id"));
    const results = await getDocs(q);
    return results.docs.map(doc => {
        return {
            id: doc.id,
            title: doc.data().title,
            colour: doc.data().colour,
            rank_id: doc.data().rank_id,
            ...doc.data(),
        };
    });
}

export async function getSponsors(rank: string, db = firestoreDb) {
    const q = query(collection(db, "sponsors", rank, "sponsors"), orderBy("rank_id"));
    const results = await getDocs(q);
    return results.docs.map(doc => {
        return {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            imgref: doc.data().imgref,
            link: doc.data().link,
            background: doc.data().background,
            rank_id: doc.data().rank_id,
            ...doc.data(),
        };
    });
}

export async function getAlbums(db = firestoreDb) {
    const q = query(collection(db, "albums"), orderBy("ordering", "desc"));
    const results = await getDocs(q);
    return results.docs.map(doc => {
        return {
            id: doc.id,                     // The folder name under storage
            album_dir: doc.data().album_dir, // The folder name under storage
            name: doc.data().name,          // The name of the album to display
            sub_name: doc.data().sub_name,  // The sub name of the album to display
            coverFile: doc.data().coverFile,
            ...doc.data(),
        };
    });
}

export async function getAlbumNameFromPath(album_dir: string, db = firestoreDb) {
    const q = query(collection(db, "albums"), where("album_dir", "==", album_dir));
    const results = await getDocs(q);
    return results.docs.map(doc => {
        return {
            id: doc.id,                     // The folder name under storage
            album_dir: doc.data().album_dir, // The folder name under storage
            name: doc.data().name,          // The name of the album to display
            sub_name: doc.data().sub_name,  // The sub name of the album to display
            ...doc.data(),
        };
    });
}

export async function getMerchItems(db = firestoreDb) {
    const q = query(collection(db, "merch"), orderBy("name"));
    const results = await getDocs(q);

    return results.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            description: data.description,
            price: data.price,
            imgrefs: data.images,
            ...data,
        };
    });
}

export async function getMerchItemById(id: string, db = firestoreDb) {
    const docRef = doc(db, "merch", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new Error("Merch item not found");
    }
    const data = docSnap.data();

    return {
        id: docSnap.id,
        name: data.name,
        description: data.description,
        price: data.price,
        imgrefs: data.images,
        ...data,
    };
}

// The following function is used to update the sponsors collection in Firestore

async function putSponsor(id: string, sponsor: any, db = firestoreDb) {
    const docRef = await setDoc(doc(db, "sponsors", id), sponsor);
    // return docRef.id;
}

async function deleteSponsors(db = firestoreDb) {
    const q = query(collection(db, "sponsors"));
    const results = await getDocs(q);
    for (const document of results.docs) {
        await deleteDoc(doc(db, "sponsors", document.id));
    }
}

async function putHeadshot(id: string, sponsor: any, db = firestoreDb) {
    const docRef = await setDoc(doc(db, "headshots", id), sponsor);
    // return docRef.id;
}

async function deleteHeadshots(db = firestoreDb) {
    const q = query(collection(db, "headshots"));
    const results = await getDocs(q);
    for (const document of results.docs) {
        await deleteDoc(doc(db, "headshots", document.id));
    }
}

// Uncomment the following lines to reset the sponsors and headshots from the JSON files to Firestore
// resetSponsors();
// resetHeadshots();