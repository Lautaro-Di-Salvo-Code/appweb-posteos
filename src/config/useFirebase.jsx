import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore} from "firebase/firestore"
import {getStorage } from "firebase/storage"

        
    export const firebaseConfig = {
            apiKey: "AIzaSyDseONHLeefqqzSWwQK8eeb8NK5Uy0F138",
            authDomain: "res-social-posteos.firebaseapp.com",
            projectId: "res-social-posteos",
            storageBucket: "res-social-posteos.appspot.com",
            messagingSenderId: "1011492405878",
            appId: "1:1011492405878:web:5e400e680271e66a545557"
        };
        
        
    export const app = initializeApp(firebaseConfig);

    export const ProveedorGoogle = new GoogleAuthProvider()

    export const Autenticacion = getAuth(app)
    export const database = getFirestore(app)
    export const ObtenerAlmacenamientoImagenes = getStorage(app)
