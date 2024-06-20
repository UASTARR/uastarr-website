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

import { promises as fs } from 'fs';

export async function getProjects(projectType: string, db = firestoreDb) {
    const q = query(collection(db, "projects"), where("type", "==", projectType), orderBy("ordering"));
    const results = await getDocs(q);
    return results.docs.map(doc => {
        return {
            id: doc.id,
            type: doc.data().type,
            name: doc.data().name,
            description: doc.data().description,
            logoRef: doc.data().logoRef,
            ordering: doc.data().ordering,
            playlistLink: doc.data().playlistLink,
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
    const q = query(collection(db, "albums"), orderBy("ordering"));
    const results = await getDocs(q);
    return results.docs.map(doc => {
        return {
            id: doc.id,                 // The folder name under storage
            name: doc.data().name,      // The name of the album to display
            sub_name: doc.data().sub_name, // The sub name of the album to display
            ...doc.data(),
        };
    });
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

async function getSponsorsJson() {
    const file = await fs.readFile(process.cwd() + '/public/assets/database/sponsors.json', 'utf-8');
    const data = JSON.parse(file);
    return data;
}

async function resetSponsors() {
    await deleteSponsors()
    const data = await getSponsorsJson();
    for (const sponsor of data) {
        await putSponsor([sponsor[5], sponsor[6]].join(''), {imgref: sponsor[0], link: sponsor[1], name: sponsor[2], description: sponsor[3], background: sponsor[4], rank: sponsor[5], rank_id: sponsor[6]});
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

async function getHeadshotsJson() {
    const file = await fs.readFile(process.cwd() + '/public/assets/database/headshots.json', 'utf-8');
    const data = JSON.parse(file);
    return data;
}

async function resetHeadshots() {
    await deleteHeadshots()
    const data = await getHeadshotsJson();
    for (const headshot of data) {
        await putHeadshot(headshot[0], {ordering: parseInt(headshot[0]), name: headshot[1], title: headshot[2], imgref: headshot[3]});
    }
}

// Uncomment the following lines to reset the sponsors and headshots from the JSON files to Firestore
// resetSponsors();
// resetHeadshots();