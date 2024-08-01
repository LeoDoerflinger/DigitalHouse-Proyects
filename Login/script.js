document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmError = document.getElementById("confirmPasswordError");
  const showHideButton = document.getElementById("show-hide");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
  });

  emailInput.addEventListener("blur", function () {
    validateMail();
  });

  emailInput.addEventListener("change", function () {
    clearError(emailError);
  });

  passwordInput.addEventListener("change", function () {
    clearError(passwordError);
  });

  confirmPasswordInput.addEventListener("change", function () {
    clearError(confirmError);
  });

  showHideButton.addEventListener("click", function () {
    if (passwordInput.type == "password") {
      passwordInput.type = "text";
      confirmPasswordInput.type = "text";
    } else {
      passwordInput.type = "password";
      confirmPasswordInput.type = "password";
    }
  });

  function validateForm() {
    const isValidEmail = validateMail();
    const isValidPassword = validatePassword();
    const passwordMatch = validateConfirmPassword();
    if (isValidEmail && isValidPassword && passwordMatch) {
      saveToLS();
      alert("¡Bienvenido!");
    }
  }

  function validateMail() {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const mailValue = emailInput.value.trim();
    if (!emailRegex.test(mailValue)) {
      showError(emailError, "Ingrese un mail válido");
      return false;
    } else {
      clearError(emailError);
      return true;
    }
  }

  function validatePassword() {
    const passwordValue = passwordInput.value.trim();
    if (passwordValue.length < 8) {
      showError(
        passwordError,
        "La contraseña debe tener al menos 8 caracteres"
      );
      return false;
    } else {
      clearError(passwordError);
      return true;
    }
  }

  function validateConfirmPassword() {
    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();
    if (passwordValue !== confirmPasswordValue) {
      showError(confirmError, "Las contraseñas no coinciden");
      return false;
    } else {
      clearError(confirmError);
      return true;
    }
  }

  function showError(errorElement, message) {
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
  }

  function clearError(errorElement) {
    errorElement.innerHTML = "";
    errorElement.style.display = "none";
  }

  function saveToLS() {
    const emailValue = emailInput.value.trim();
    localStorage.setItem("email", emailValue);
    const body = bodyBuilderJSON();
    console.log(body);
  }

  function bodyBuilderJSON() {
    return {
      email: emailInput.value,
      password: passwordInput.value,
    };
  }
});
