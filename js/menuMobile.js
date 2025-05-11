document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('#menuMobile button');
    
    // Ativa o botão "Início" por padrão
    const defaultButton = document.querySelector('[data-mobile="inicio"]');
    if(defaultButton) {
        defaultButton.classList.add('active');
        const activeImg = defaultButton.querySelector('img');
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