const apiKey: string =  process.env.FIREBASE_API_KEY;
const authDomain: string = process.env.FIREBASE_AUTH_DOMAIN;
const databaseURL: string = process.env.FIREBASE_DATABASE_URL;
const storageBucket: string = process.env.FIREBASE_STORAGE_BUCKET;

export const firebaseConfig = {
    apiKey, authDomain, databaseURL, storageBucket
};
