
function filterSkills(category, event) {
    // Remove a classe "active" de todos os botões
    document.querySelectorAll('.skills__filter button').forEach(button => {
        button.classList.remove('active');
    });

    // Adiciona a classe "active" ao botão clicado
    if (event) {
        event.target.classList.add('active');
    } else {
        // Se não houver evento (ao carregar a página), ativa o botão "Todas"
        const allButton = document.querySelector('.skills__filter button[onclick*="filterSkills(\'all\'"]');
        allButton.classList.add('active');
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

// Mostra todas as habilidades e ativa o botão "Todas" ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    filterSkills('all');
});
