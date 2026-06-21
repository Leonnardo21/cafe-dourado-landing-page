// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
  
  // Trigger initial scroll check to set header background if page starts scrolled
  checkHeaderScroll();
});

// Mobile menu toggle
function toggleMenu() {
  if (window.innerWidth <= 768) {
    const navLinks = document.getElementById("navLinks");
    const menuToggleIcon = document.querySelector("#menuToggle i");
    
    if (navLinks && menuToggleIcon) {
      navLinks.classList.toggle("active");
      
      const isOpen = navLinks.classList.contains("active");
      menuToggleIcon.setAttribute("data-lucide", isOpen ? "x" : "menu");
      
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Only intercept if we have a valid hash target
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      
      // Close mobile menu if open
      const navLinks = document.getElementById("navLinks");
      const menuToggleIcon = document.querySelector("#menuToggle i");
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        if (menuToggleIcon) {
          menuToggleIcon.setAttribute("data-lucide", "menu");
          if (typeof lucide !== "undefined") {
            lucide.createIcons();
          }
        }
      }
      
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header scroll effect
function checkHeaderScroll() {
  const header = document.getElementById("header");
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
}

window.addEventListener("scroll", checkHeaderScroll);

// Specialties Menu filtering logic
const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((button) => button.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    menuItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (category === "all" || itemCategory === category) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

// Form submission handler with Modal Success
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Open success modal
    const modal = document.getElementById("successModal");
    if (modal) {
      modal.classList.add("active");
    }
    
    // Reset form fields
    this.reset();
  });
}

// Close Success Modal
function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

// Intersection Observer for scroll animation reveals
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      // Stop observing once it has been revealed
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with .reveal class
document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});
