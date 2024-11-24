import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

// Инициализация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQ9oYExUZ580AJ_HUbnZ0C6qot24F3yE4",
  authDomain: "firstproj-536ff.firebaseapp.com",
  databaseURL: "https://firstproj-536ff-default-rtdb.firebaseio.com",
  projectId: "firstproj-536ff",
  storageBucket: "firstproj-536ff.appspot.com",
  messagingSenderId: "812751731917",
  appId: "1:812751731917:web:2e215c1562146bed7c7d84",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Получаем ссылки на элементы
const googleLoginButton = document.querySelector("#googleLogin");
const registrationFields = document.querySelector("#registrationFields");
const registerButton = document.querySelector("#registerBut");
const inputs = document.querySelectorAll(
  "#name, #email, #password, #password2"
);

// Добавляем обработчик нажатия на кнопку Google
googleLoginButton.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Успешный вход
      const user = result.user;
      console.log("Вошёл пользователь:", user);

      // Записываем данные пользователя в базу данных
      const db = getDatabase();
      const userRef = ref(db, "Користувачі АЗС/" + user.displayName);

      set(userRef, {
        Login: user.displayName,
        Email: user.email,
        Name: 0,
        DataBuy1: "",
        TypeGas1: 0,
        liters1: 0,
        Sum1: 0,
        BonusInTable1: 0,
        Bonus1: 0,
        Bonus2: 0,
        Discont: 0,
      })
        .then(() => {
          console.log("Данные записаны в базу");

          // Разблокируем поля и кнопку регистрации
          inputs.forEach((input) => (input.disabled = false));
          registrationFields.style.display = "block";
          registerButton.disabled = false;
        })
        .catch((error) => {
          console.error("Ошибка записи данных:", error);
        });
    })
    .catch((error) => {
      console.error("Ошибка входа:", error.message);
      alert("Ошибка входа: " + error.message);
    });
});
