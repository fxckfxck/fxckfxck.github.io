// Импорты Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQ9oYExUZ580AJ_HUbnZ0C6qot24F3yE4",
  authDomain: "firstproj-536ff.firebaseapp.com",
  databaseURL: "https://firstproj-536ff-default-rtdb.firebaseio.com",
  projectId: "firstproj-536ff",
  storageBucket: "firstproj-536ff.appspot.com",
  messagingSenderId: "812751731917",
  appId: "1:812751731917:web:2e215c1562146bed7c7d84",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getDatabase();

// Получение элементов DOM
const googleLoginButton = document.querySelector("#googleLogin");
const alertText = document.getElementById("alertText");

// Функция аутентификации через Google
function authenticateWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Пользователь успешно аутентифицирован
      const user = result.user;

      // Проверяем пользователя в базе данных
      verifyUserInDatabase(user)
        .then((isNewUser) => {
          if (isNewUser) {
            alertText.innerHTML =
              "Вхід виконано. Новий користувач доданий у базу.";
          } else {
            alertText.innerHTML = "Вхід виконано. Користувач існує у базі.";
          }
        })
        .catch((error) => {
          console.error("Ошибка проверки пользователя в базе:", error);
          alertText.innerHTML = "Сталася помилка: " + error.message;
        });
    })
    .catch((error) => {
      console.error("Ошибка аутентификации:", error);
      alertText.innerHTML = "Помилка входу: " + error.message;
    });
}

// Функция проверки или добавления пользователя в базу данных
function verifyUserInDatabase(user) {
  return new Promise((resolve, reject) => {
    const userRef = ref(db, "Користувачі АЗС/" + user.uid);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Пользователь существует
          resolve(false);
        } else {
          // Новый пользователь, добавляем в базу
          set(userRef, {
            Login: user.displayName,
            Email: user.email,
            UID: user.uid,
            CreatedAt: new Date().toISOString(),
          })
            .then(() => resolve(true))
            .catch((error) => reject(error));
        }
      })
      .catch((error) => reject(error));
  });
}

// Привязка события к кнопке входа через Google
googleLoginButton.addEventListener("click", authenticateWithGoogle);
