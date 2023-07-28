// Lazy-load the slide images when they become visible
const slides = document.querySelectorAll(".slide");
const options = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target.querySelector("img");
      const src = img.getAttribute("data-src");
      img.setAttribute("src", src);
      observer.unobserve(entry.target);
    }
  });
}, options);

slides.forEach((slide) => {
  observer.observe(slide);
});

