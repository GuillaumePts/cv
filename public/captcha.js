const lebody = document.querySelector("body");
let countdeg = 0;

setInterval(() => {
    lebody.style.background = `linear-gradient(${countdeg}deg, rgb(34 193 195 / 56%) 0%, rgb(183 129 190 / 63%) 51%, rgb(249 184 53 / 25%) 100%)`;
    countdeg = (countdeg + 1) % 360; 
}, 15);