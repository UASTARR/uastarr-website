const firebaseConfig = {
    apiKey: process.env.firebase_apiKey,
    authDomain: process.env.firebase_authDomain,
    projectId: process.env.firebase_projectId,
    storageBucket: process.env.firebase_storageBucket,
    messagingSenderId: process.env.firebase_messagingSenderId,
    appId: process.env.firebase_appId,
};

Object.keys(firebaseConfig).forEach((key) => {
    const configValue = firebaseConfig[key] + "";
    if (configValue.charAt(0) === '"') {
        firebaseConfig[key] = configValue.substring(1, configValue.length - 1);
    }
});

export default firebaseConfig;