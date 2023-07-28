<<<<<<< HEAD
function toggleContactForm() {
  var contactFormWrapper = document.getElementById("contactFormWrapper");
  var toggleFormBtn = document.getElementById("toggleFormBtn");

  if (contactFormWrapper.style.display === "none") {
    contactFormWrapper.style.display = "block";
    contactFormWrapper.scrollIntoView({ behavior: "smooth" });

    toggleFormBtn.textContent = "Close";
  } else {
    contactFormWrapper.style.display = "none";
    toggleFormBtn.textContent = "Contact";
  }
}
=======
function toggleContactForm() {
  var contactFormWrapper = document.getElementById("contactFormWrapper");
  var toggleFormBtn = document.getElementById("toggleFormBtn");

  if (contactFormWrapper.style.display === "none") {
    contactFormWrapper.style.display = "block";
    toggleFormBtn.textContent = "Close";
  } else {
    contactFormWrapper.style.display = "none";
    toggleFormBtn.textContent = "Contact";
  }
}
>>>>>>> d2f1e5e02a79d26231082864801eaf85738ea326
