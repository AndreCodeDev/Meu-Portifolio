

const dots = document.querySelectorAll('.code-dot');
let index = 0;

function lightRayEffect() {
    dots.forEach(dot => dot.classList.remove('active'));

    let currentIndex = index;
    const interval = setInterval(() => {
        if (currentIndex < dots.length) {
            dots[currentIndex].classList.add('active');
            if (currentIndex > 0) {
                dots[currentIndex - 1].classList.remove('active');
            }
            currentIndex++;
        } else {
            clearInterval(interval);
            dots[dots.length - 1].classList.remove('active');
            setTimeout(lightRayEffect, 3000); 
        }
    }, 250); 
}

setTimeout(lightRayEffect, 1000);
