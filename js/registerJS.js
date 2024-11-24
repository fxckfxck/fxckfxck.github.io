import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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

const db = getDatabase();
const auth = getAuth();

var name = document.querySelector("#name");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var password2 = document.querySelector("#password2");
var registerButton = document.querySelector("#registerBut");

function InsertData(user) {
  var alTxt;

  // Проверка, существует ли пользователь с таким логином в базе данных
  const dbref = ref(db);
  const username = name.value;
  get(child(dbref, "Користувачі АЗС/" + username))
    .then((snapshot) => {
      if (snapshot.exists() && username === snapshot.val().Login) {
        alTxt = "Ой, такий логін вже зареєстровано, будь ласка оберіть інший!";
        document.getElementById("alertText").innerHTML = alTxt;
      } else {
        // Запись данных о пользователе в базу данных
        if (
          username !== "" &&
          email !== "" &&
          password !== "" &&
          password === password2 &&
          password.length >= 6
        ) {
          set(ref(db, "Користувачі АЗС/" + username), {
            Login: username,
            Email: email,
            Password: password,
            Name: 0,
            DataBuy1: password,
            TypeGas1: 0,
            liters1: 0,
            Sum1: 0,
            BonusInTable1: 0,
            Bonus1: 0,
            Bonus2: 0,
            Discont: 0,
          });
          alTxt = "Користувач успішно зареєстрований!";
          document.getElementById("alertText").innerHTML = alTxt;
        } else {
          alTxt = "Помилка, переконайтесь, що всі поля заповнені правильно!";
          document.getElementById("alertText").innerHTML = alTxt;
        }
      }
    })
    .catch((error) => {
      alert(error);
    });
}

function registerUser() {
  const emailValue = email.value;
  const passwordValue = password.value;

  // Создание пользователя с email и паролем
  createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      const user = userCredential.user;
      InsertData(user); // Вставка данных пользователя в базу данных
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Ошибка регистрации:", errorCode, errorMessage);
      alert(errorMessage);
    });
}

registerButton.addEventListener("click", registerUser);

function isValidname(username) {
  return /^[a-zA-Z0-9]+$/.test(username);
}
