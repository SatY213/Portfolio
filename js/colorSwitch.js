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
