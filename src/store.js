var firebase = require('firebase/app');
require("firebase/firestore");

const config = {
    apiKey: "AIzaSyDWreJfi_oPfo2JsGimL8jK9gO2j3KXlIQ",
    authDomain: "tsd-data-viz.firebaseapp.com",
    databaseURL: "https://tsd-data-viz.firebaseio.com",
    projectId: "tsd-data-viz",
    storageBucket: "tsd-data-viz.appspot.com",
    messagingSenderId: "149492626063"
};
firebase.initializeApp(config);

export default async (data) => {
    var db = firebase.firestore();
    await db.collection("modeling-the-draw-2019").add({...data, date: new Date()});
}