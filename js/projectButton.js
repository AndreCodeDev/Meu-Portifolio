
document.addEventListener("DOMContentLoaded", function () {
    const mostrarMaisProjetosBtn = document.getElementById("ProjectMostrarMaisProjetosBtn");
    const textoBotaoProjetos = document.getElementById("ProjectTextoBotaoProjetos");
    const projetosOcultos = document.querySelectorAll(".project-item.hidden");

    mostrarMaisProjetosBtn.addEventListener("click", function () {
        // Alternar a visibilidade dos projetos ocultos
        projetosOcultos.forEach(projeto => {
            projeto.classList.toggle("hidden");
        });

        // Rotacionar a seta do botão
        mostrarMaisProjetosBtn.classList.toggle("rotated");

        // Alterar o texto do botão
        if (mostrarMaisProjetosBtn.classList.contains("rotated")) {
            textoBotaoProjetos.textContent = "Ver menos projetos";
        } else {
            textoBotaoProjetos.textContent = "Ver mais projetos";
        }
    });
});

// Este código adiciona um efeito de hover a elementos com a classe 'project-image-container':
document.querySelectorAll('.project-image-container').forEach(container => {
    container.addEventListener('mouseenter', () => {
        container.querySelector('.project-overlay').style.opacity = '1';
    });

    container.addEventListener('mouseleave', () => {
        container.querySelector('.project-overlay').style.opacity = '0';
    });
});
