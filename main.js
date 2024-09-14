const canvas = document.querySelector('canvas');

canvas.width = 1500;
canvas.height = 900;
const ctx = canvas.getContext('2d');

const LinkQuieto = document.getElementById('linkQuietoFrente');
const linkMueAbaj = document.getElementById('linkCorreAba');
const pared = document.getElementById('bloque');

const moveDown = [
    document.getElementById('linkAbajoM1'),
    document.getElementById('linkAbajoM2'),
    document.getElementById('linkAbajoM3'),
    document.getElementById('linkAbajoM4'),
    document.getElementById('linkAbajoM5'),
    document.getElementById('linkAbajoM6'),
    document.getElementById('linkAbajoM7'),
    document.getElementById('linkAbajoM8'),
    document.getElementById('linkAbajoM9'),
    document.getElementById('linkAbajoM10')
];

const moves = [
    document.getElementById('LinkLados1'),
    document.getElementById('LinkLados2'),
    document.getElementById('LinkLados3'),
    document.getElementById('LinkLados4'),
    document.getElementById('LinkLados5'),
    document.getElementById('LinkLados6'),
    document.getElementById('LinkLados7'),
    document.getElementById('LinkLados8'),
    document.getElementById('LinkLados9'),
    document.getElementById('LinkLados10'),
    document.getElementById('LinkLados11')
];

const moveUp = [
    document.getElementById('LinkArribaM1'),
    document.getElementById('LinkArribaM2'),
    document.getElementById('LinkArribaM3'),
    document.getElementById('LinkArribaM4'),
    document.getElementById('LinkArribaM5'),
    document.getElementById('LinkArribaM6'),
    document.getElementById('LinkArribaM7'),
    document.getElementById('LinkArribaM8'),
    document.getElementById('LinkArribaM9'),
    document.getElementById('LinkArribaM10'),
    document.getElementById('LinkArribaM11')
];

class entidad {
    constructor(x, y, w, h, s) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.s = s;
    }

    colision(otro) {
        if (this.x < otro.x + otro.w &&
            this.x + this.w > otro.x &&
            this.y < otro.y + otro.h &&
            this.y + this.h > otro.y) {
            return true;
        }
        return false;
    }
}

var link = new entidad(200, 200, 50, 60, 1.5);
var muros = new entidad(0,0,100,100);
var direction = "";
var frameIndex = 0; 
var frameDelay = 0; 

document.addEventListener("keydown", function(e) {
    if (e.key == "w") {
        direction = "arriba";
        console.log(direction);
    } else if (e.key == "a") {
        direction = "izquierda";
        console.log(direction);
    } else if (e.key == "s") {
        direction = "abajo";
        console.log(direction);
    } else if (e.key == "d") {
        direction = "derecha";
        console.log(direction);
    }


});

document.addEventListener("keyup", function(e) {
    direction = "";
    frameDelay = 0;
    frameIndex = 0; 
});

function update() {
    if (direction == "arriba") {
        link.y -= link.s;
    } else if (direction == "derecha") {
        link.x += link.s;
    } else if (direction == "abajo") {
        link.y += link.s;
    } else if (direction == "izquierda") {
        link.x -= link.s;
    }
}

function pintar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja los muros
    for (let i = 0; i <= 15; i++) {
        // lados Arriba y abajo
        ctx.drawImage(pared, i * 100, 0, muros.w, muros.h);
        ctx.drawImage(pared, i * 100, 845, muros.w, muros.h);
    }

   
    for (let i = 0; i <= 12; i++) { 
         //lados <-  -> 
        ctx.drawImage(pared, 1400, i * 70, muros.w, muros.h); 
        ctx.drawImage(pared, 0, i * 70, muros.w, muros.h);
    }

    if (direction == "abajo") {
        if (frameDelay % 5 === 0) { 
            frameIndex = (frameIndex + 1) % moveDown.length;
        }
        ctx.drawImage(moveDown[frameIndex], link.x, link.y, link.w, link.h);
        frameDelay++; 

    }else if (direction == "derecha") {
        if (frameDelay % 5 === 0) { 
            frameIndex = (frameIndex + 1) % moves.length;
        }

        ctx.save(); 
        ctx.translate(link.x + link.w / 2, link.y + link.h / 2); 
        ctx.scale(-1, 1); 
        ctx.drawImage(moves[frameIndex], -link.w / 2, -link.h / 2, link.w, link.h);
        ctx.restore(); 
        frameDelay++;

    }else if (direction == "izquierda") {
        if (frameDelay % 5 === 0) { 
            frameIndex = (frameIndex + 1) % moves.length;
        }
        ctx.drawImage(moves[frameIndex], link.x, link.y, link.w, link.h);
        frameDelay++; 

    }else if (direction == "arriba") {
        if (frameDelay % 5 === 0) { 
            frameIndex = (frameIndex + 1) % moveUp.length;
        }
        ctx.drawImage(moveUp[frameIndex], link.x, link.y, link.w, link.h);
        frameDelay++; 

    } else {
        ctx.drawImage(LinkQuieto, link.x, link.y, link.w, link.h);
        frameDelay=0;
    }

    
    update();
    requestAnimationFrame(pintar);
}

pintar();





