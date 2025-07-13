// auth-guard.js
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const uid = localStorage.getItem("customUID");

// لو مفيش UID → يرجع لصفحة تسجيل الدخول
if (!uid) {
  location.href = "login.html";
}

const db = getDatabase();
const userRef = ref(db, "users/" + uid);

get(userRef).then(snapshot => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    const now = Date.now();

    // لو مفيش اشتراك أو الاشتراك منتهي → يروح لصفحة الانتظار
    if (!data.subscriptionEnd || data.subscriptionEnd < now) {
      location.href = "waiting.html";
    }
  } else {
    location.href = "login.html";
  }
});