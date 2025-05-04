
  let lastScrollTop = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Só aplica no mobile (largura < 700px)
    if (window.innerWidth < 700) {
      if (currentScroll > lastScrollTop) {
        // Scroll para baixo – esconder
        header.classList.add('hide');
      } else {
        // Scroll para cima – mostrar
        header.classList.remove('hide');
      }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Evita valor negativo
  });