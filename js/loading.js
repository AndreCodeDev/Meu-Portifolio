

// =============================================
// CORE LOADING SYSTEM (FIRST TO EXECUTE)
// =============================================

class PortfolioLoading {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.animatedUrl = document.getElementById('animated-url');
        this.url = "https://andrecode.dev.br";
        this.typingSpeed = 120;

        this.initLoading();
    }

    initLoading() {
        if (!this.loadingScreen) return;

        document.documentElement.style.overflow = 'hidden';
        document.documentElement.classList.add('loading-theme');

        this.prepareZoomOut();
        this.waitForLoadingScreen();
    }

    waitForLoadingScreen() {
        // Espera que o loading screen apareça por um tempo antes de começar a digitação da URL
        setTimeout(() => {
            this.typeUrl();
        }, 1000); // Aumento do delay para garantir que a tela de loading apareça adequadamente
    }

    typeUrl() {
        if (!this.animatedUrl) return;

        let i = 0;
        const typing = setInterval(() => {
            if (i < this.url.length) {
                this.animatedUrl.textContent += this.url.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // Espera 2 segundos antes de começar a transição de zoom para frente
                setTimeout(() => {
                    this.completeLoading();  // Inicia o desaparecimento do loading após o delay
                }, 200);
            }
        }, this.typingSpeed);
    }

    prepareZoomOut() {
        // A transição de zoom e opacidade será aplicada de forma mais suave
        setTimeout(() => {
            if (!this.loadingScreen.dataset.complete) {
                this.loadingScreen.style.transition = 'transform 1.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        }, 2000);
    }
    
    completeLoading() {
        if (!this.loadingScreen) return;
    
        this.loadingScreen.dataset.complete = 'true';
    
        // Aplicar o zoom e opacidade para desaparecer a tela de loading
        this.loadingScreen.style.transform = 'scale(1.2)';  // Zoom mais suave
        this.loadingScreen.style.opacity = '0';
    
        // Após o efeito de zoom e opacidade, esconder a tela de loading
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            document.documentElement.style.overflow = 'auto';
            document.documentElement.classList.remove('loading-theme');
            document.dispatchEvent(new CustomEvent('loadingComplete'));
        }, 1600); // Igual à duração da transição
    }
    
}

// =============================================
// INICIALIZAR O SISTEMA DE LOADING IMEDIATAMENTE
// =============================================
const loadingSystem = new PortfolioLoading();



