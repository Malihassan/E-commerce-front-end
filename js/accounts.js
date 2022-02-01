import { login, newAccount } from "../modal/accountsModal.js";
window.addEventListener("load", () => {
  styleWindowTab();
  signInHandler();
  signupHandler();
});
function styleWindowTab() {
  let registerWindow = document.getElementById("register-window");
  let singinWindow = document.getElementById("singin-window");
  let li = document.querySelectorAll(".form-tab li");
  li.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.target.classList.add("active-tab");
      if (event.target.id == "singin-btn") {
        document.getElementById("register-btn").classList.remove("active-tab");
        singinWindow.classList.remove("d-none");
        registerWindow.classList.add("d-none");
      }
      if (event.target.id == "register-btn") {
        document.getElementById("singin-btn").classList.remove("active-tab");
        registerWindow.classList.remove("d-none");
        singinWindow.classList.add("d-none");
      }
    });
  });
}
function signInHandler() {
  let singinEmail = document.getElementById("singin-email");
  let singinPassword = document.getElementById("singin-password");

  let validEmail = false,
    validPass = false;
  singinEmail.addEventListener("change", (event) => {
    try {
      validEmailTextFields(event.target.value);
      acceptedMessage("singin-email-message", "Success Email");
      validEmail = true;
    } catch (error) {
      validEmail = false;
      warnningMessage("singin-email-message", error.message);
    }
  });
  singinPassword.addEventListener("change", (event) => {
    try {
      validPasswordTextFields(event.target.value);
      validPass = true;
    } catch (error) {
      validEmail = false;
      warnningMessage("singin-password-message", error.message);
    }
  });
  document.getElementById("signin-form").addEventListener("submit", (event) => {
    event.preventDefault();

    if (!singinEmail.value) {
      warnningMessage("singin-email-message", "field is required");
    }
    if (!singinPassword.value) {
      warnningMessage("singin-password-message", "field is required");
    }
    if (validEmail && validPass) {
      let logRes= login(singinEmail.value, singinPassword.value)
      //   console.log("formValid");
      if (!logRes) {
          document.getElementById("login-form-msg").innerHTML ="Incorrect Email or Password"
          return
      }
      window.location.href = "index.html";
    }
  });
}
function signupHandler() {
  let registerEmail = document.getElementById("register-email");
  let registerPhone = document.getElementById("register-phone");
  let registerPassword = document.getElementById("register-password");
  let validEmail = false,
    validPhone = false,
    validPass = false;
  registerEmail.addEventListener("change", (event) => {
    try {
      validEmailTextFields(event.target.value);
      acceptedMessage("register-email-message", "Success Email");
      validEmail = true;
    } catch (error) {
      validEmail = false;
      warnningMessage("register-email-message", error.message);
    }
  });
  registerPassword.addEventListener("change", (event) => {
    try {
      validPasswordTextFields(event.target.value);
      acceptedMessage("register-password-message", "Success Password");
      validPhone = true;
    } catch (error) {
      validPhone = false;
      warnningMessage("register-password-message", error.message);
    }
  });
  registerPhone.addEventListener("change", (event) => {
    try {
      validPhoneTextFields(event.target.value);
      acceptedMessage("register-phone-message", "Success Phone");
      validPass = true;
    } catch (error) {
      validEmail = false;
      warnningMessage("register-phone-message", error.message);
    }
  });
  document
    .getElementById("register-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      if (!registerEmail.value) {
        warnningMessage("register-email-message", "field is required");
      }
      if (!registerPassword.value) {
        warnningMessage("register-password-message", "field is required");
      }
      if (!registerPhone.value) {
        warnningMessage("register-phone-message", "field is required");
      }
      if (validEmail && validPass && validPhone) {
        let res = newAccount(
          registerEmail.value,
          registerPhone.value,
          registerPassword.value
        );
        document.getElementById("form-msg").innerHTML = res;
      }
    });
}

function validEmailTextFields(email) {
  try {
    const regEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.trim().length == 0) {
      throw new Error("Email is required");
    }
    if (!email.toLowerCase().match(regEx)) {
      throw new Error("Invalid email address");
    }
    return true;
  } catch (error) {
    error.name = "InvalidEmail";
    error.message = error.message;
    throw error;
  }
}
function validPasswordTextFields(pass) {
  try {
    if (pass.trim().length == 0) {
      throw new Error("Password is required");
    }
    if (pass.trim().length <= 6) {
      throw new Error("Password should more (6) character");
    }
    return true;
  } catch (error) {
    error.name = "InvalidPassword";
    error.message = error.message;
    throw error;
  }
}
function validPhoneTextFields(phone) {
  try {
    if (!phone.match("^01[0125][0-9]{8}$")) {
      throw new Error("Invalid Phone Number");
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}
function warnningMessage(element, message) {
  let TagMessage = document.getElementById(element);
  TagMessage.innerHTML = message;
  TagMessage.classList.remove("text-success");
  TagMessage.classList.add("text-danger");
}
function acceptedMessage(element, message) {
  let TagMessage = document.getElementById(element);
  TagMessage.innerHTML = message;
  TagMessage.classList.remove("text-danger");
  TagMessage.classList.add("text-success");
}
