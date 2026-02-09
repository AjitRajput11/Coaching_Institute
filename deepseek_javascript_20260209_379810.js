// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Tab Switching for Programs
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));
        
        // Add active class to clicked button
        button.classList.add("active");
        
        // Show corresponding tab content
        const tabId = button.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
    });
});

// Form Submission
const demoForm = document.getElementById("demoForm");

demoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(demoForm);
    const data = Object.fromEntries(formData);
    
    // In a real application, you would send this data to your server
    // For now, we'll just show a success message
    alert("Thank you! Your request for a free demo class has been received. We will contact you within 24 hours.");
    
    // Reset form
    demoForm.reset();
    
    // Scroll to top for better UX
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks2 = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });
    
    navLinks2.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute("href") === "#") return;
        
        e.preventDefault();
        
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial Slider (Simple auto-rotate)
let testimonialIndex = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    // Remove active class from all
    testimonialCards.forEach(card => {
        card.style.opacity = '0.7';
        card.style.transform = 'scale(0.95)';
    });
    
    // Add active class to current
    testimonialCards[testimonialIndex].style.opacity = '1';
    testimonialCards[testimonialIndex].style.transform = 'scale(1)';
    
    // Update index
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
}

// Initialize testimonials
testimonialCards.forEach((card, index) => {
    if (index !== 0) {
        card.style.opacity = '0.7';
        card.style.transform = 'scale(0.95)';
    }
});

// Rotate every 5 seconds
setInterval(rotateTestimonials, 5000);

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .program-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});