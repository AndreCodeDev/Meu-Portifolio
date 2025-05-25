const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch('https://formsubmit.co/ajax/salesdias1207@gmail.com', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      form.reset();
      showToast("✅ Mensagem enviada com sucesso!");
    } else {
      showToast("❌ Erro ao enviar a mensagem.");
    }
  })
  .catch(() => {
    showToast("❌ Erro ao enviar a mensagem.");
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.style.display = 'block';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 500);
  }, 5000);
}






document.addEventListener('DOMContentLoaded', function() {
    // Remove tooltips padrão do navegador
    document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(el => {
        el.title = ''; // Remove o title padrão
        
        el.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.setCustomValidity('');
        });
    });
});