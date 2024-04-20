import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDbxrNWrVzEsUa19l4fuawUnuKlWXdg0Vw",
    authDomain: "storageimagefoodapp.firebaseapp.com",
    projectId: "storageimagefoodapp",
    storageBucket: "storageimagefoodapp.appspot.com",
    messagingSenderId: "717101518369",
    appId: "1:717101518369:web:f07cdd8d9049dff6289d60",
    measurementId: "G-KNL2K5NZFT"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };