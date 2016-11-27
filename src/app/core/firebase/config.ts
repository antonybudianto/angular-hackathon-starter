let firebaseConfig: any = {};
firebaseConfig['apiKey'] =  process.env.FIREBASE_API_KEY;
firebaseConfig['authDomain'] = process.env.FIREBASE_AUTH_DOMAIN;
firebaseConfig['databaseURL'] = process.env.FIREBASE_DATABASE_URL;
firebaseConfig['storageBucket'] = process.env.FIREBASE_STORAGE_BUCKET;

export {firebaseConfig};
