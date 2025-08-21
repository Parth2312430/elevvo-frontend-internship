// ===== Year Auto Update =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById("themeToggle");

// Load saved preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// ===== Testimonial Slider =====
const testimonials = [
  { text: "“TechPro transformed our workflow. We’re shipping faster than ever!”", author: "— Sarah J, Product Manager" },
  { text: "“The easiest tool I’ve used for collaboration. Highly recommend.”", author: "— Mark L, Developer" },
  { text: "“Amazing tool! Easy to use and great customer support.”", author: "— David Lee, Developer" }
];

let index = 0;
const slider = document.getElementById("testimonialSlider");

setInterval(() => {
  index = (index + 1) % testimonials.length;
  slider.innerHTML = `<div class="testimonial"><p>${testimonials[index].text}</p><h5>${testimonials[index].author}</h5></div>`;
}, 4000);

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => observer.observe(el));
