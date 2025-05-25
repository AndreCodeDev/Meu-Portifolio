document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('#desktopPortfolioMenu button');
  
  // Ativa o primeiro botão por padrão (opcional)
  if(buttons.length > 0) {
    buttons[0].classList.add('active');
    const activeImg = buttons[0].querySelector('img');
    if(activeImg) {
      activeImg.src = activeImg.getAttribute('data-active');
    }
  }
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove a classe 'active' de todos os botões e volta para imagem inativa
      buttons.forEach(btn => {
        btn.classList.remove('active');
        const img = btn.querySelector('img');
        if(img) {
          img.src = img.getAttribute('data-inactive');
        }
      });
      
      // Adiciona a classe 'active' e troca para imagem ativa
      this.classList.add('active');
      const activeImg = this.querySelector('img');
      if(activeImg) {
        activeImg.src = activeImg.getAttribute('data-active');
      }
    });
  });
});