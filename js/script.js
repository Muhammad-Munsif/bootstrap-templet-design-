document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle Functionality
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

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
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

  // Animated number counting for stats
  const statNumbers = document.querySelectorAll(".stat-number");
  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const finalValue = parseInt(element.getAttribute("data-count"));
        const duration = 2000; // 2 seconds
        const step = finalValue / (duration / 16); // 60fps
        let currentValue = 0;

        const timer = setInterval(() => {
          currentValue += step;
          if (currentValue >= finalValue) {
            element.textContent = finalValue;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(currentValue);
          }
        }, 16);

        observer.unobserve(element);
      }
    });
  }, observerOptions);

  statNumbers.forEach((number) => {
    observer.observe(number);
  });

  // Fade-in animation on scroll
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  fadeElements.forEach((element) => {
    fadeObserver.observe(element);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile navbar if open
        const navbarCollapse = document.getElementById("navbarNav");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      }
    });
  });

  // Add hover effect to service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput.value) {
        // In a real application, you would send this to a server
        alert("Thank you for subscribing to our newsletter!");
        emailInput.value = "";
      }
    });
  }

  // Add floating animation to elements
  const floatingElements = document.querySelectorAll(".floating-element");
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * -5}s`;
  });

  // Set current year in footer
  const currentYear = new Date().getFullYear();
  const yearElement = document.querySelector(".footer-bottom p");
  if (yearElement) {
    yearElement.innerHTML = yearElement.innerHTML.replace("2024", currentYear);
  }
});
