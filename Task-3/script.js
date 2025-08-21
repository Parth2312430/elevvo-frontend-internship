// Smooth scroll for CTA buttons
document.querySelectorAll('[data-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    const sel = btn.getAttribute('data-target');
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// IntersectionObserver for reveal-on-scroll
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target); // animate once
    }
  });
}, {
  root: null,
  threshold: 0.15,
  rootMargin: "0px 0px -5% 0px"
});

// Observe sections/cards for nicer staggering
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// Optional: stagger child cards inside a revealed section
document.querySelectorAll('.features .card, .testimonials .card, .pricing-options .card').forEach((card, i) => {
  card.classList.add('reveal');
  card.style.transitionDelay = (0.06 * i) + 's';
  observer.observe(card);
});
