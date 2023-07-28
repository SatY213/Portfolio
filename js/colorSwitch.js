<<<<<<< HEAD
// Define the event listener function
function handleColorSwitchChange(event) {
  const body = document.body;
  const slider = document.querySelector(".slider");
  const languageSelector = document.querySelector(".languageSelect");
  const questions = document.querySelectorAll(".question");
  const photoDemoi = document.getElementById("photodemoi");
  const test = document.querySelector(".test");
  const contactForm = document.getElementById("contactFormWrapper");
  const isChecked = event.target.checked;
  const inputs = document.querySelectorAll(".in-form");
  const btn = document.querySelector(".btn");

  if (isChecked) {
    // Checked state styles
    body.style.color = "rgb(22, 21, 21)";
    body.style.backgroundColor = "aliceblue";
    body.style.color = "rgb(22, 21, 21)";
    languageSelector.style.color = "rgb(22, 21, 21)";
    questions.forEach(function (question) {
      question.style.boxShadow = "0 0 2px 0.5px rgb(167, 202, 233)";
    });
    photoDemoi.style.boxShadow = "0 0 10px rgb(167, 202, 233)";
    slider.style.boxShadow = "0 0 20px 10px rgb(167, 202, 233)";
    test.style.boxShadow = "0 0 2px 0.5px rgb(167, 202, 233)";
    test.style.border = "1px solid rgb(167, 202, 233);";
    contactForm.style.backgroundColor = "rgba(240, 248, 255, 0.945)";
    contactForm.style.color = "rgb(22, 21, 21)";
    contactForm.style.boxShadow = "0 0 2px 0.5px rgb(167, 202, 233)";

    inputs.forEach(function (input) {
      input.style.border = "1px solid rgb(22, 21, 21)";
      input.style.color = "rgb(22, 21, 21)";
      input.style.backgroundColor = "rgb(207, 232, 253)";
    });
    btn.style.color = "rgb(22, 21, 21)";
    btn.style.boxShadow = "0 0 2px 0.5px rgb(167, 202, 233)";
  } else {
    // Unchecked state styles
    body.style.color = "aliceblue";
    languageSelector.style.color = "aliceblue";
    questions.forEach(function (question) {
      question.style.boxShadow = "0 0 2px 0.5px rgba(255, 255, 255, 0.8)";
    });
    photoDemoi.style.boxShadow = "0px 0px 10px 0px rgba(255, 255, 255, 0.477)";
    slider.style.boxShadow = "0 0 20px 2px rgba(255, 255, 255, 0.8)";
    body.style.backgroundColor = "rgb(22, 21, 21)";
    test.style.boxShadow = "0 0 2px 0.5px rgba(255, 255, 255, 0.8)";
    test.style.border = "1px solid aliceblue";
    contactForm.style.backgroundColor = "#2b2b2bf5";
    contactForm.style.color = "aliceblue";
    contactForm.style.boxShadow = "0 0 2px 0.5px rgba(231, 230, 227, 0.8)";

    inputs.forEach(function (input) {
      input.style.border = " 1px solid #ccc";
      input.style.color = "aliceblue";
      input.style.backgroundColor = "rgb(39, 39, 39)";
    });
    btn.style.color = "aliceblue";
    btn.style.boxShadow = "0 0 2px 0.5px rgba(231, 230, 227, 0.8)";
  }
}

// Add event listener to the color switch element
document
  .getElementById("colorSwitch")
  .addEventListener("change", handleColorSwitchChange);
=======
document.getElementById("colorSwitch").addEventListener("change", function () {
  const body = document.body;
  const slider = document.querySelector(".slider");
  const languageSelector = document.querySelector(".languageSelect");
  const questions = document.querySelectorAll(".question");

  if (this.checked) {
    body.style.color = "black";
    body.style.backgroundColor = "aliceblue";
    document.getElementById("test").style.boxShadow =
      "0 0 2px 0.5px rgb(167, 202, 233)";
    languageSelector.style.color = "rgb(22, 21, 21)";
    questions.forEach(function (question) {
      question.style.boxShadow = "0 0 2px 0.5px rgb(167, 202, 233)";
    });
    document.getElementById("photodemoi").style.boxShadow =
      "0 0 10px rgb(167, 202, 233)";
    slider.style.boxShadow = "0 0 20px 10px rgb(167, 202, 233)";
    body.style.color = "rgb(22, 21, 21)";
  } else {
    body.style.color = "aliceblue";
    languageSelector.style.color = "aliceblue";
    questions.forEach(function (question) {
      question.style.boxShadow = "0 0 2px 0.5px rgba(255, 255, 255, 0.8)";
    });
    document.getElementById("photodemoi").style.boxShadow =
      "0px 0px 10px 0px rgba(255, 255, 255, 0.477)";

    slider.style.boxShadow = "0 0 20px 10px rgba(255, 255, 255, 0.8)";
    body.style.backgroundColor = "rgb(22, 21, 21)";
  }
});
>>>>>>> d2f1e5e02a79d26231082864801eaf85738ea326
