document.querySelectorAll('[data-scroll]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (!targetElement) return;
    
    // Configurações da animação
    const duration = 1200; // 1.2 segundos
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    // Função de easing personalizada (mais suave)
    function ease(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2 * t * t * t + b;
      t -= 2;
      return c/2 * (t * t * t + 2) + b;
    }
    
    // Animação usando requestAnimationFrame
    function animateScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo(0, ease(progress, startPosition, distance, 1));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    }
    
    requestAnimationFrame(animateScroll);
  });
});