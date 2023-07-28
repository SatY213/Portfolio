// JavaScript code for auto-scrolling to the answer section
document.addEventListener("DOMContentLoaded", function () {
  var questionButtons = document.querySelectorAll(".question");

  questionButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      var answerSection = document.getElementById("answer");

      // Scroll to the answer section using smooth behavior
      answerSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});

function music() {
  var audio = document.getElementById("myAudio");
  audio.volume = 0.26; // Set the volume to half (50%)
  audio.play();
  audio.scrollIntoView({ behavior: "smooth" });
}
