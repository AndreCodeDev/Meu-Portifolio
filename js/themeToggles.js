document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const rootElement = document.documentElement;
  
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

  // Sempre aplicar o tema escuro como padrão, ignorando localStorage e preferências do sistema
  applyTheme('dark');

  // Evento de clique
  themeToggle.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  // Removemos o observador de mudanças no tema do sistema pois não é mais necessário
});