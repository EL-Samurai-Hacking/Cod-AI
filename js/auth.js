// js/auth.js

import { auth } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// إنشاء UID من 9 أرقام
function generateCustomUID() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

// تسجيل مستخدم جديد
export async function registerUser(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const db = getDatabase();
    const customUID = generateCustomUID();

    await set(ref(db, 'users/' + customUID), {
      email: email,
      username: name,
      isActive: false,
      subscriptionEnd: null,
      firebaseUID: firebaseUser.uid
    });

    // حفظ UID المحلي في التخزين المؤقت
    localStorage.setItem('customUID', customUID);

    alert("تم إنشاء الحساب بنجاح ✅");
    window.location.href = "waiting.html";
  } catch (error) {
    alert("فشل التسجيل: " + error.message);
  }
}

// تسجيل الدخول
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const db = getDatabase();
    const usersRef = ref(db, 'users/');

    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const users = snapshot.val();
      let foundUID = null;
      let isActive = false;

      for (let uid in users) {
        if (users[uid].email === email) {
          foundUID = uid;
          isActive = users[uid].isActive;
          break;
        }
      }

      if (foundUID) {
        localStorage.setItem('customUID', foundUID);
        if (isActive) {
          window.location.href = "user.html";
        } else {
          window.location.href = "waiting.html";
        }
      } else {
        alert("لم يتم العثور على بيانات المستخدم.");
      }
    } else {
      alert("لا توجد بيانات مستخدم.");
    }

  } catch (error) {
    alert("فشل تسجيل الدخول: " + error.message);
  }
}