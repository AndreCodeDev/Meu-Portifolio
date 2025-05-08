document.querySelectorAll('#menuMobile button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove a classe 'active' de todos os botões
        document.querySelectorAll('#menuMobile button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Adiciona a classe 'active' apenas ao botão clicado
        this.classList.add('active');
    });
  });