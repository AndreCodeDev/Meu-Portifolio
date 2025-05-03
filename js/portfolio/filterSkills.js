


//--------------------------------------------------------------------------

function filterSkills(category, event) {
    // Remove a classe "active" de todos os botões
    document.querySelectorAll('.skills__filter button').forEach(button => {
        button.classList.remove('active');
        // Restaura os estilos padrão do botão
        button.style.backgroundColor = '';
        button.style.borderColor = '';
        button.style.color = '';
    });

    // Adiciona a classe "active" ao botão clicado sem sobrescrever estilos hover
    if (event) {
        const button = event.target;
        button.classList.add('active');
        // Aplica estilos apenas quando não está em hover
        if (!button.matches(':hover')) {
            button.style.backgroundColor = 'var(--effect-highlight-blue)';
            button.style.borderColor = 'var(--primary)';
            button.style.color = 'var(--text-secondary)';
        }
    } else {
        // Se não houver evento (ao carregar a página), ativa o botão "Todas"
        const allButton = document.querySelector('.skills__filter button[onclick*="filterSkills(\'all\'"]');
        if (allButton) {
            allButton.classList.add('active');
            if (!allButton.matches(':hover')) {
                allButton.style.backgroundColor = 'var(--effect-highlight-blue)';
                allButton.style.borderColor = 'var(--primary)';
                allButton.style.color = 'var(--text-secondary)';
            }
        }
    }

    // Oculta todos os cards de habilidades
    document.querySelectorAll('.skill__card').forEach(card => {
        card.classList.remove('show');
    });

    // Mostra os cards da categoria selecionada
    if (category === 'all') {
        document.querySelectorAll('.skill__card').forEach(card => {
            card.classList.add('show');
        });
    } else {
        document.querySelectorAll(`.skill__card.${category}`).forEach(card => {
            card.classList.add('show');
        });
    }
}

// Adiciona listeners para restaurar estilos hover quando o mouse entra/sai dos botões
document.querySelectorAll('.skills__filter button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (button.classList.contains('active')) {
            button.style.backgroundColor = '';
            button.style.borderColor = '';
            button.style.color = '';
        }
    });

    button.addEventListener('mouseleave', () => {
        if (button.classList.contains('active')) {
            button.style.backgroundColor = 'var(--effect-highlight-blue)';
            button.style.borderColor = 'var(--primary)';
            button.style.color = 'var(--text-secondary)';
        }
    });
});

// Mostra todas as habilidades e ativa o botão "Todas" ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    filterSkills('all');
});

