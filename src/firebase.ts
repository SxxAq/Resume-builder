import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAVF-O0TBM4kT62BMEkay2G9-gVR7zW--E",
    authDomain: "resume-builder-16dfc.firebaseapp.com",
    projectId: "resume-builder-16dfc",
    storageBucket: "resume-builder-16dfc.appspot.com",
    messagingSenderId: "752649752931",
    appId: "1:752649752931:web:bc9e1bc280a05cc82e0356",
    measurementId: "G-MB852912HZ"
  };


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }