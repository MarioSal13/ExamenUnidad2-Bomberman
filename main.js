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

const bomb = [
    document.getElementById('bomba-1'),
    document.getElementById('bomba-2'),
    document.getElementById('bomba-3')
];

const bombExplisionCentro = [
    document.getElementById('bomba-exc-1'),
    document.getElementById('bomba-exc-2'),
    document.getElementById('bomba-exc-3'),
    document.getElementById('bomba-exc-4')
];

const bombExplisionMedio = [
    document.getElementById('bomba-exl-1'),
    document.getElementById('bomba-exl-2'),
    document.getElementById('bomba-exl-3'),
    document.getElementById('bomba-exl-4')
];

const bombExplisionFin = [
    document.getElementById('bomba-exf-1'),
    document.getElementById('bomba-exf-2'),
    document.getElementById('bomba-exf-3'),
    document.getElementById('bomba-exf-4')
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

var link = new entidad(150, 150, 40, 50, 1.5);

var bomaPosicion = [];
var muros = [];
var murosCentrales=[];
var explosion = [];

var direction = "";
var bombas = false;

var frameIndex = 0; 
var frameDelay = 0; 

var bombFrameIndex = 0; 
var bombFrameDelay = 0; 

const bombFrameRate = 20; 

const bombaTiempoExplo = 5000;




document.addEventListener("keydown", function(e) {
    if (e.key == "w") {
        direction = "arriba";
        
    } else if (e.key == "a") {
        direction = "izquierda";
        
    } else if (e.key == "s") {
        direction = "abajo";
        
    } else if (e.key == "d") {
        direction = "derecha";
        
    } else if (e.key == "e") {
       bombas = true;
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
    }else if (bombas == true) {
        bomaPosicion.push({x:link.x+10, y:link.y+10, tiempoBomba: Date.now()});
        bombas=false;
    }

    muros.forEach(muros => {
        if(link.colision(muros)){
            if (direction == "arriba") {
                link.y += link.s;
            } else if (direction == "derecha") {
                link.x -= link.s;
            } else if (direction == "abajo") {
                link.y -= link.s;
            } else if (direction == "izquierda") {
                link.x += link.s;
            }
        }
    });

    murosCentrales.forEach(murosCentrales => {
        if(link.colision(murosCentrales)){
            if (direction == "arriba") {
                link.y += link.s;
            } else if (direction == "derecha") {
                link.x -= link.s;
            } else if (direction == "abajo") {
                link.y -= link.s;
            } else if (direction == "izquierda") {
                link.x += link.s;
            }
        }
    });
}

function pintar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //decoraciones 

    move();
    mapa();
    
    const tiempoActul = Date.now();

    bomaPosicion.forEach((bombPos, index) => {
        const correTiempo = tiempoActul - bombPos.tiempoBomba;

        if (correTiempo > bombaTiempoExplo) {
            // Mostrar animación de explosión inicial
            bomaPosicion.splice(index, 1);
            
        } else {
            // Mostrar la animación de la bomba
            if (bombFrameDelay % bombFrameRate === 0) {
                bombFrameIndex = (bombFrameIndex + 1) % bomb.length;
            }

            ctx.drawImage(bomb[bombFrameIndex], bombPos.x, bombPos.y, 35, 35);
            bombFrameDelay++;
        }
    });


    update();
    requestAnimationFrame(pintar);
}

pintar();

function move() {
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
}

function mapa(){  
    //para no llenar tanto la memoria vacio los arreglos antes
    muros= [];
    murosCentrales = [];                  

    // Dibuja los muros
    for (let i = 0; i <= 15; i++) {
        // lados Arriba y abajo
        ctx.drawImage(pared, i * 100, 0, 100, 100);
        muros.push(new entidad(i * 100, 20, 80, 80));

        ctx.drawImage(pared, i * 100, 845, 100, 100);
        muros.push(new entidad(i * 100, 865, 100, 100));
    }

    for (let i = 0; i <= 12; i++) { 
        //lados <-  -> 
        ctx.drawImage(pared, 1400, i * 70, 100, 100); 
        muros.push(new entidad(1400, i * 70, 100, 100));
        ctx.drawImage(pared, 0, i * 70, 100, 100);
        muros.push(new entidad(0, i * 70, 100, 100));
    }

    for (let i = 1; i <= 6; i++) {
        ctx.drawImage(pared,i*200,140,100, 100); 
        murosCentrales.push(new entidad((i*200)+5,170,90, 70));

        ctx.drawImage(pared,i*200,280,100, 100);
        murosCentrales.push(new entidad((i*200)+5,310,90, 70));

        ctx.drawImage(pared,i*200,420,100, 100); 
        murosCentrales.push(new entidad((i*200)+5,450,90, 70));

        ctx.drawImage(pared,i*200,560,100, 100); 
        murosCentrales.push(new entidad((i*200)+5,590,90, 70));

        ctx.drawImage(pared,i*200,700,100, 100); 
        murosCentrales.push(new entidad((i*200)+5,730,90, 70));
    }
}

function generarObstaculos(){

}





