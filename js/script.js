// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const backToTop = document.getElementById("backToTop");
  const body = document.body;

  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Toggle theme
  themeToggle.addEventListener("click", function () {
    if (body.getAttribute("data-theme") === "dark") {
      body.removeAttribute("data-theme");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light");
    } else {
      body.setAttribute("data-theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark");
    }
  });

  // Back to top functionality
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Add animation to service boxes on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);
  // Observe service boxes
  document.querySelectorAll(".service-box").forEach((box) => {
    box.style.opacity = "0";
    box.style.transform = "translateY(20px)";
    box.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(box);
  });
  // Observe news posts
  document.querySelectorAll(".news-post").forEach((post) => {
    post.style.opacity = "0";
    post.style.transform = "translateY(20px)";
    post.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(post);
  });
});
