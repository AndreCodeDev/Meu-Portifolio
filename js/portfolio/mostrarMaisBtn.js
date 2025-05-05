
document.addEventListener("DOMContentLoaded", function () {
    const mostrarMaisProjetosBtn = document.getElementById("ProjectMostrarMaisProjetosBtn");
    const textoBotaoProjetos = document.getElementById("ProjectTextoBotaoProjetos");
    const projetosOcultos = document.querySelectorAll(".project-card.hidden");

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






document.addEventListener("DOMContentLoaded", function () {
    const mostrarMaisCodelabBtn = document.getElementById("codelabMostrarMaisCodelabBtn");
    const textoBotaoCodelab = document.getElementById("codelabTextoBotaoCodelab");
    const CodelabOcultos = document.querySelectorAll(".codelab-card.hidden");

    mostrarMaisCodelabBtn.addEventListener("click", function () {
        // Alternar a visibilidade dos Codelab ocultos
        CodelabOcultos.forEach(Codelab => {
            Codelab.classList.toggle("hidden");
        });

        // Rotacionar a seta do botão
        mostrarMaisCodelabBtn.classList.toggle("rotated");

        // Alterar o texto do botão
        if (mostrarMaisCodelabBtn.classList.contains("rotated")) {
            textoBotaoCodelab.textContent = "Ver menos Codelab";
        } else {
            textoBotaoCodelab.textContent = "Ver mais Codelab";
        }
    });
});
 









document.addEventListener("DOMContentLoaded", function () {
    const mostrarMaisCertificadosBtn = document.getElementById("certificadosMostrarMaisCertificadosBtn");
    const textoBotaoCertificados = document.getElementById("certificadosTextoBotaoCertificados");
    const CertificadosOcultos = document.querySelectorAll(".certificados-item.hidden");

    mostrarMaisCertificadosBtn.addEventListener("click", function () {
        // Alternar a visibilidade dos Certificados ocultos
        CertificadosOcultos.forEach(Certificados => {
            Certificados.classList.toggle("hidden");
        });

        // Rotacionar a seta do botão
        mostrarMaisCertificadosBtn.classList.toggle("rotated");

        // Alterar o texto do botão
        if (mostrarMaisCertificadosBtn.classList.contains("rotated")) {
            textoBotaoCertificados.textContent = "Ver menos certificados";
        } else {
            textoBotaoCertificados.textContent = "Ver mais certificados";
        }
    });
});













document.addEventListener("DOMContentLoaded", function () {
    const mostrarMaisBtn = document.getElementById("formacaoMostrarMaisBtn");
    const textoBotao = document.getElementById("formacaoTextoBotao");
    const cardsOcultos = document.querySelectorAll(".formacao-card.hidden");
    let cardsVisiveis = false;

    mostrarMaisBtn.addEventListener("click", function () {
        // Alternar a visibilidade dos cards ocultos
        cardsOcultos.forEach(card => {
            card.classList.toggle("hidden");
        });

        // Alterar o estado e o texto do botão
        cardsVisiveis = !cardsVisiveis;
        textoBotao.textContent = cardsVisiveis ? "Ver menos formações" : "Ver mais formações";

        // Rotacionar a seta (se necessário, mas sem afetar o hover)
        mostrarMaisBtn.classList.toggle("rotated");
    });
});


