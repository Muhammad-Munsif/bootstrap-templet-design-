// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  // Toggle theme
  themeToggle.addEventListener("click", function () {
    if (body.getAttribute("data-theme") === "dark") {
      body.removeAttribute("data-theme");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    } else {
      body.setAttribute("data-theme", "dark");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    }
  });

  // Back to top functionality
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  });

  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add animation to elements on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".service-card, .testimonial-card, .blog-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animation
  document
    .querySelectorAll(".service-card, .testimonial-card, .blog-card")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  // Initial check
  animateOnScroll();
});
