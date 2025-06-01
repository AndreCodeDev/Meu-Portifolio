document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const rootElement = document.documentElement;
  
<<<<<<< HEAD
  function applyTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.setAttribute('aria-pressed', theme === 'dark');
    updateTooltipText(theme);
  }

  function updateTooltipText(theme) {
    const tooltip = themeToggle.querySelector('.theme-toggle__tooltip');
    if (tooltip) {
      tooltip.textContent = theme === 'dark' ? 'Tema Claro' : 'Tema Escuro';
    }
  }

  // Inicialização correta
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  applyTheme(initialTheme);

  // Evento de clique
=======
  // Função para aplicar o tema
  function applyTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleUI(theme);
    console.log('Tema aplicado:', theme); // Debug
  }
  
  // Atualiza a UI do toggle
  function updateToggleUI(theme) {
    const tooltip = document.querySelector('.theme-toggle__tooltip');
    if (tooltip) {
      tooltip.textContent = theme === 'light' ? 'Tema Escuro' : 'Tema Claro';
    }
  }
  
  // Verifica o tema salvo ou preferência do sistema
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // Aplica o tema inicial
  //const preferredTheme = getPreferredTheme();
  //applyTheme(preferredTheme);
  
  // Alternar tema ao clicar
>>>>>>> 4d98d54790e29ca06285f44294714b0be5a6e166
  themeToggle.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });
<<<<<<< HEAD

=======
  
>>>>>>> 4d98d54790e29ca06285f44294714b0be5a6e166
  // Observar mudanças no tema do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
});