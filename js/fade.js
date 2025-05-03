

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          observer.unobserve(entry.target); // Anima só uma vez
        }
      });
    }, { threshold: 0.1 }); // 10% visível já ativa
  
    elements.forEach((el) => observer.observe(el));
  });