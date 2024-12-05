// animation du background de body
const lebody = document.querySelector("body");
let countdeg = 0;

setInterval(() => {
    lebody.style.background = `linear-gradient(${countdeg}deg, rgb(34 193 195 / 56%) 0%, rgb(183 129 190 / 63%) 51%, rgb(249 184 53 / 25%) 100%)`;
    countdeg = (countdeg + 1) % 360; 
}, 15);

// -------------------------------------------------------
// animation des axes X Y Z

const animatedDiv = document.querySelector('#content');

window.addEventListener('deviceorientation', (event) => {
    const beta = event.beta || 0;   // Inclinaison avant/arrière
    const gamma = event.gamma || 0; // Inclinaison gauche/droite
    const alpha = event.alpha || 0; // Rotation autour de l'axe Z

    // Limiter les déplacements (entre -10px et 10px)
    const transX = Math.min(Math.max(gamma, -10), 10); // Limite translation X
    const transY = Math.min(Math.max(beta, -10), 10);  // Limite translation Y
    const transZ = alpha * 0.1; // Optionnel : légère translation en profondeur

    // Appliquer les translations pour centrer la div
    animatedDiv.style.transform = `translate(-50%, -50%) translateX(${transX}px) translateY(${transY}px) translateZ(${transZ}px)`;
});

// ---------------------------------------------------------
// appel
const phoneDiv = document.querySelector('#phone');
const tel = document.querySelector('#tel');

phoneDiv.addEventListener('click', () => {
    window.location.href = 'tel:0777770667';  // Remplacez le numéro par le vôtre ou laissez-le vide
});

setInterval(() => {
    tel.classList.toggle('anime')
},1000);






