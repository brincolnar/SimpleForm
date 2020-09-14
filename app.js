let stepCounter = 1;
const user = {
  id: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
};

const welcomeBanner = document.querySelector("#welcome-banner");
const firstNameItem = document.querySelector("#firstName-item");
const lastNameItem = document.querySelector("#lastName-item");
const emailItem = document.querySelector("#email-item");
const uniqid = require("uniqid");

const stepProgress = () => {
  let steps = document.querySelectorAll(`.step-${stepCounter}`);

  for (let i = 0; i < stepCounter; i++) {
    const step = steps[i];

    if (i == stepCounter - 1) {
      step.style.backgroundColor = "black";
    } else {
      step.style.backgroundColor = "gray";
    }
  }
};

const nextStep = () => {
  stepCounter++;
  console.log(stepCounter);

  const stepDivs = document.querySelectorAll(".basic-info");

  // show next step
  stepDivs[stepCounter - 2].classList.add("inactive");
  stepDivs[stepCounter - 1].classList.remove("inactive");

  // update progress
  if (stepCounter != 3) stepProgress();

  if (stepCounter === 3) {
    console.log(user);

    const finalBanner = document.querySelector("#final");

    finalBanner.classList.add("finalAnimation");

    welcomeBanner.innerHTML = `Welcome, ${user.username}!`;
    firstNameItem.innerHTML = "first name: " + user.firstName;
    lastNameItem.innerHTML = "last name: " + user.lastName;
    emailItem.innerHTML = "email: " + user.email;
  }
};

const validate = (e) => {
  e.preventDefault();

  const input1Value = e.target.previousElementSibling.children[0].value;
  const input2Value =
    e.target.previousElementSibling.previousElementSibling.children[0].value;

  if (stepCounter == 1) {
    // first/last name must start with capital letter
    if (
      input1Value[0] === input1Value[0].toUpperCase() &&
      input2Value[0] === input2Value[0].toUpperCase()
    ) {
      user.firstName = input2Value;
      user.lastName = input1Value;
      console.log(user);
      nextStep();
      return true;
    } else {
      alert("First and last name should start with a capital letter");

      const firstNameField = document.querySelector("#firstName-field");
      const lastNameField = document.querySelector("#lastName-field");

      firstNameField.classList.add("animation");
      lastNameField.classList.add("animation");

      setTimeout(() => {
        firstNameField.classList.remove("animation");
        lastNameField.classList.remove("animation");
      }, 500);

      return false;
    }
  } else {
    // check email and username
    if (/\S+@\S+\.\S+/.test(input2Value) && input1Value.length > 5) {
      console.log("Email is fine");
      user.email = input2Value;
      user.username = input1Value;
      user.id = uniqid(); // generate unique id for user
      nextStep();

      return true;
    } else {
      alert("Email or username not valid.");

      const emailField = document.querySelector("#email-field");
      const usernameField = document.querySelector("#username-field");

      emailField.classList.add("animation");
      usernameField.classList.add("animation");

      setTimeout(() => {
        emailField.classList.remove("animation");
        usernameField.classList.remove("animation");
      }, 500);

      return false;
    }
  }
};

const nextBtn = document.querySelectorAll(".next");

nextBtn.forEach((btn) => {
  btn.addEventListener("click", validate);
});

stepProgress();
