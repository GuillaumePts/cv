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
    const beta = event.beta || 0;   
    const gamma = event.gamma || 0; 
    const alpha = event.alpha || 0; 

    
    const transX = Math.min(Math.max(gamma, -10), 10); 
    const transY = Math.min(Math.max(beta, -10), 10);  
    const transZ = alpha * 0.1; 

    animatedDiv.style.transform = `translate(-50%, -50%) translateX(${transX}px) translateY(${transY}px) translateZ(${transZ}px)`;
});

// ---------------------------------------------------------
//anime logo + tel et mail

const phoneDiv = document.querySelector('#phone');
const mailDiv = document.querySelector('#mail');
const tel = document.querySelector('#tel');
const mail = document.querySelector('#lemail');

phoneDiv.addEventListener('click', () => {
    window.location.href = 'tel:0777770667';  
});

const recipient = 'guillaume.pitois@proton.me'; 
mailDiv.addEventListener('click', () => {
    const subject = 'Rendez-vous';
    const body = '';
    
    
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
});

setInterval(() => {
    tel.classList.toggle('anime')
    mail.classList.toggle('anime')
},1000);









