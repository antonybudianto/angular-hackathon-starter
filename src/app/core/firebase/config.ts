export const apiKey: string =  process.env.FIREBASE_API_KEY;
export const authDomain: string = process.env.FIREBASE_AUTH_DOMAIN;
export const databaseURL: string = process.env.FIREBASE_DATABASE_URL;
export const storageBucket: string = process.env.FIREBASE_STORAGE_BUCKET;

export const firebaseConfig = {
    apiKey, authDomain, databaseURL, storageBucket
};
