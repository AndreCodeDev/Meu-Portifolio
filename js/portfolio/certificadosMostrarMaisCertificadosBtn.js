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
