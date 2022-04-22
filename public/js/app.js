const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Vitesse sur X (en px)
vx = 10;

// Vitesse sur Y (en px)
vy = -0;

// Coordonnées de la pomme
let pommeX = 0;
let pommeY = 0;

let score = 0;

let snake = [
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

function animation() {
  setTimeout(function () {
    nettoieCanvas();
    dessinePomme();
    faireAvancerSerpent();
    dessineLeSerpent();
    animation();
  }, 100);
}
animation();
creerPomme();


function nettoieCanvas() {
  ctx.fillStyle = "#ececec";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}


function dessineLesMorceaux(morceau) {
  ctx.fillStyle = "#00fe14";
  ctx.strokeStyle = "black";
  ctx.fillRect(morceau.x, morceau.y, 10, 10);
  ctx.strokeRect(morceau.x, morceau.y, 10, 10);
}


function dessineLeSerpent() {
  snake.forEach((morceau) => {
    dessineLesMorceaux(morceau);
  });
}


function faireAvancerSerpent() {
  const head = {
    x: snake[0].x + vx,
    y: snake[0].y + vy,
  };
  snake.unshift(head);
  
  const serpentMangePomme = snake[0].x === pommeX && snake[0].y === pommeY;

  if (serpentMangePomme) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    creerPomme();
  } else {
      snake.pop();
  }
}
dessineLeSerpent();


document.addEventListener("keydown", changerDirection);

function changerDirection(event) {
    const FLECHE_GAUCHE = 37;
    const FLECHE_DROITE = 39;
    const FLECHE_ENHAUT = 38;
    const FLECHE_ENBAS = 40;

    const monter    = vy === -10;
    const descendre = vy ===  10;
    const adroite   = vx ===  10;
    const agauche   = vx === -10;

    // Si on veut aller dans une direction, on interdis le retour du serpent sur soi même
    if(event.keyCode === FLECHE_DROITE && !agauche)   { vx = 10; vy = 0; }
    if(event.keyCode === FLECHE_GAUCHE && !adroite)   { vx = -10; vy = 0; }
    if(event.keyCode === FLECHE_ENHAUT && !descendre) { vx = 0; vy = -10; }
    if(event.keyCode === FLECHE_ENBAS  && !monter)    { vx = 0; vy = 10; }
}


// Génère un nombre aléatoire entre 0 et 290.
// On fait x10 pour avoir un multiple de 10 de sorte à pouvoir le placer sur le canvas.
function nbAleatoire() {
    return Math.round((Math.random() * 290) / 10) * 10;
}

function creerPomme() {
    pommeX = nbAleatoire();
    pommeY = nbAleatoire();

    // Si une partie du serpent est sur la pomme alors serpentSurPomme === true
    snake.forEach(function(partie) {
        const serpentSurPomme = partie.x === pommeX && partie.y === pommeY;

        if(serpentSurPomme) {
            creerPomme();
        }
    })
}

function dessinePomme() {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.beginPath();
    ctx.arc(pommeX + 5, pommeY + 5, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}