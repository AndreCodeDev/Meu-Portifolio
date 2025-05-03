




// =============================================
// TEXT ANIMATION SYSTEM (LAST TO INITIALIZE)
// =============================================

class TextAnimation {
    constructor() {
        this.messages = [
            { text: "Bem-Vindo(a) ao meu Portfólio Tech", class: "hero__animation" },
            { text: "Meu nome é André Vitor", class: "hero__animation" },
        ];
        this.container = document.getElementById("hero__animacaoText");
        this.messageIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.waitTime = 2000;
        
        if (this.container) this.init();
    }

    init() {
        this.typeMessage();
    }

    typeMessage() {
        const currentMessage = this.messages[this.messageIndex % this.messages.length];
        
        if (this.isDeleting) {
            this.container.textContent = currentMessage.text.substring(0, this.charIndex - 1);
            this.charIndex--;
            
            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.messageIndex = (this.messageIndex + 1) % this.messages.length;
                setTimeout(() => this.typeMessage(), 500);
            } else {
                setTimeout(() => this.typeMessage(), 50);
            }
        } else {
            this.container.textContent = currentMessage.text.substring(0, this.charIndex + 1);
            this.container.className = `hero__typing-text ${currentMessage.class}`;
            this.charIndex++;
            
            if (this.charIndex === currentMessage.text.length) {
                this.isDeleting = true;
                setTimeout(() => this.typeMessage(), this.waitTime);
            } else {
                setTimeout(() => this.typeMessage(), 100);
            }
        }
    }
}


// Initialize text animation only after everything is ready
document.addEventListener('loadingComplete', function() {
    new TextAnimation();
});