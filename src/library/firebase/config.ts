
const firebaseConfig = {
    apiKey: process.env.firebase_apiKey as string,
    authDomain: process.env.firebase_authDomain as string,
    projectId: process.env.firebase_projectId as string,
    storageBucket: process.env.firebase_storageBucket as string,
    messagingSenderId: process.env.firebase_messagingSenderId as string,
    appId: process.env.firebase_appId as string,
};

export default firebaseConfig;