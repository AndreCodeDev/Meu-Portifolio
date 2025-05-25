  document.addEventListener("DOMContentLoaded", function() {
    const mostrarMaisBtn = document.querySelector(".formations-toggle");
    const textoBotao = document.getElementById("formacaoTextoBotao");
    const formationsContent = document.querySelector(".formations-content");
    
    mostrarMaisBtn.addEventListener("click", function() {
      // Alternar a visibilidade do conteúdo
      formationsContent.classList.toggle("show");
      
      // Rotacionar a seta
      this.classList.toggle("rotated");
      
      // Alterar o texto do botão
      if (this.classList.contains("rotated")) {
        textoBotao.textContent = "Ver menos formações";
      } else {
        textoBotao.textContent = "Minhas Formações";
      }
    });
  });