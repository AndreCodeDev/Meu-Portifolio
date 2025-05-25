const dots = document.querySelectorAll('.code-dot');
let index = 0;

function lightRayEffect() {
    dots.forEach(dot => dot.classList.remove('active'));

    let currentIndex = index;
    const interval = setInterval(() => {
        if (currentIndex < dots.length) {
            dots[currentIndex].classList.add('active');
            if (currentIndex > 0) {
                dots[currentIndex - 1].classList.remove('active');
            }
            currentIndex++;
        } else {
            clearInterval(interval);
            dots[dots.length - 1].classList.remove('active');
            setTimeout(lightRayEffect, 500); 
        }
    }, 250); 
}

setTimeout(lightRayEffect, 1000);





  // Scroll suave personalizado com efeito de easing
  document.querySelectorAll('.scroll-down__link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // 1 segundo de duração
        let startTime = null;
        
        // Função de easing (suavização) - easeInOutQuad
        function easeInOutQuad(t, b, c, d) {
          t /= d/2;
          if (t < 1) return c/2*t*t + b;
          t--;
          return -c/2 * (t*(t-2) - 1) + b;
        }
        
        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        requestAnimationFrame(animation);
      }
    });
  });