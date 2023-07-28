i18next.use(i18nextXHRBackend).init(
  {
    lng: "en",
    fallbackLng: "en",
    backend: {
      loadPath: "translations/{{lng}}.json",
    },
  },
  function (err, t) {
    if (err) {
      console.log("Error initializing translation:", err);
      return;
    }
    updateContent();
  }
);

// Initialize the typed1 variable outside the updateContent function
var typed1;
function updateContent() {
  document.querySelector('[data-i18n="name"]').textContent = i18next.t("name");
  document.querySelector('[data-i18n="welcome"]').textContent =
    i18next.t("welcome");
  // Destroy the previous typed1 instance if it exists
  if (typed1) {
    typed1.destroy();
  }
  if (typedAnswer) {
    typedAnswer.destroy();
  }

  var direction = i18next.language === "ar" ? "rtl" : "ltr";
  var paragraph1 = document.querySelector("#paragraph1");

  // Set text direction using CSS styles
  if (direction === "rtl") {
    paragraph1.style.direction = "rtl";
    paragraph1.style.textAlign = "right";
    document.getElementById("containername").style.textAlign = "right";
  } else {
    paragraph1.style.direction = "ltr";
    paragraph1.style.textAlign = "left";
    document.getElementById("containername").style.textAlign = "left";
  }

  typed1 = new Typed("#paragraph1", {
    strings: [i18next.t("description")],
    typeSpeed: 0.022,
    loop: false,
    showCursor: false,
    typeDirection: direction,
  });
  showQuestion(i18next.language);
}

function changeLanguage() {
  var select = document.getElementById("languageSelect");
  var language = select.value;
  i18next.changeLanguage(language, function (err, t) {
    if (err) {
      console.log("Error changing language:", err);
      return;
    }
    updateContent();
  });
}

document
  .getElementById("languageSelect")
  .addEventListener("change", changeLanguage);

updateContent();
