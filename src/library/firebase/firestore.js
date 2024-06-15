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

import { firestoreDb } from "./clientApp.js";

import { promises as fs } from 'fs';

export async function getSponsors(db = firestoreDb) {
    const q = query(collection(db, "sponsors"), orderBy("rank"), orderBy("rank_id"));
    const results = await getDocs(q);
    return results.docs.map(doc => {
        return {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            imgref: doc.data().imgref,
            link: doc.data().link,
            background: doc.data().background,
            rank: doc.data().rank,
            rank_id: doc.data().rank_id,
            ...doc.data(),
        };
    });
}

// The following function is used to update the sponsors collection in Firestore

async function putSponsor(id, sponsor, db = firestoreDb) {
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


// resetSponsors();