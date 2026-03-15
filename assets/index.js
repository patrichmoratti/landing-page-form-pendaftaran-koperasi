// ═══════════════════════════════════════════════
//  index.js — Landing Page
//  Koperasi Charta Cempaka
// ═══════════════════════════════════════════════

// Smooth active state untuk nav links
document.addEventListener('DOMContentLoaded', function () {

  // Highlight nav link sesuai section yang sedang di-scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul a[href^="#"]');

  function onScroll() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('text-[#1A3D2E]', 'font-medium');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('text-[#1A3D2E]', 'font-medium');
      }
    });
  }

  window.addEventListener('scroll', onScroll);

  // Animasi fade-in saat elemen masuk viewport
  const fadeEls = document.querySelectorAll('.service-card, .about-card');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });

});
