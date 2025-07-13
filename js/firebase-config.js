// js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// إعدادات مشروعك من Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCTQ7sUS5VrIY7wIIq-BVjYYWLygCtQOHY",
  authDomain: "el-samurai-cod-ai.firebaseapp.com",
  projectId: "el-samurai-cod-ai",
  storageBucket: "el-samurai-cod-ai.appspot.com",
  messagingSenderId: "947619246455",
  appId: "1:947619246455:web:df4fe0fae7f5d5aee73172",
  measurementId: "G-EYR30QTGLS"
};

// بدء الاتصال بـ Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };