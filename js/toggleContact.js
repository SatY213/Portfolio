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

