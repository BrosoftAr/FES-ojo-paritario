import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDOS5awNqANoF1IItq09CNol0OJR-fRO8o",
  authDomain: "ojo-paritario.firebaseapp.com",
  projectId: "ojo-paritario",
  storageBucket: "ojo-paritario.appspot.com",
  messagingSenderId: "793997687357",
  appId: "1:793997687357:web:5427d843790f4325b44854",
  measurementId: "G-8GKLX44WXL"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const requestPermission = async () => {
  if (window.cordova && window.cordova.plugins){
    const { requestPermission } = window.cordova.plugins.firebase.messaging;
    try {
      requestPermission({forceShow: false})
      console.log("Push messaging is allowed");
    } catch (error) {
      console.error(error);
    }
  }
};

export const requestToken = async () => {
  if (window.cordova && window.cordova.plugins){
    const { getToken } = window.cordova.plugins.firebase.messaging;
    try {
      const token = await getToken();
      console.log("Got device token: ", token);
    } catch (error) {
      console.error(error);
    }
  }
};

export const onMessageListener = (action) => {
    if (window.cordova && window.cordova.plugins){
      const { onMessage } = window.cordova.plugins.firebase.messaging;
      onMessage(action);
    }
  };

export const onBackgroundMessageListener = (action) => {
    if (window.cordova && window.cordova.plugins){
      const { onBackgroundMessage } = window.cordova.plugins.firebase.messaging;
      onBackgroundMessage(action);
    }
  };