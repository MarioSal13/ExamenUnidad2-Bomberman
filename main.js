const canvas = document.querySelector('canvas');

canvas.width = 1500;
canvas.height = 900;
const ctx = canvas.getContext('2d');

const LinkQuieto = document.getElementById('linkQuietoFrente');
const linkMueAbaj = document.getElementById('linkCorreAba');
const pared = document.getElementById('bloque');
const bloqueDestruido = document.getElementById('muroD');
const trifuerza = document.getElementById('tri')


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
var triforce =  new entidad (750,500, 70,70);

var titulo = new sound("sounds/titulo.mp3");
var game = new sound("sounds/overWorld.mp3");
var ponerBomb = new sound("sounds/poner.mp3");
var explo = new sound("sounds/explota.mp3");
var triEncontrada = new sound ("sounds/obtener.mp3");

var bomaPosicion = [];
var muros = [];
var murosCentrales= [];
var explosion = [];
var explosiones = [];
var obstaculosDestruibles = [];

var direction = "";
var bombas = false;
var bombaActiva = false;
var dibujados = false;

var frameIndex = 0; 
var frameDelay = 0; 

var bombFrameIndex = 0; 
var bombFrameDelay = 0; 

const bombFrameRate = 20; 

const bombaTiempoExplo = 2000;
const explosionDuration = 50;

var gameStart = false;
var encontrada = false;

var startTime = null;

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
    }else if (e.key == "f") {
        if (gameStart==false) { 
            gameStart = true;
            startTime = Date.now(); 
        }

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
        if (bomaPosicion.length === 0) {
            bomaPosicion.push({x:link.x+10, y:link.y+10, tiempoBomba: Date.now()});
            ponerBomb.play();
            bombas = false; 
        }
        
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

    obstaculosDestruibles.forEach(obstaculosDestruibles => {
        if(link.colision(obstaculosDestruibles)){
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


    obstaculosDestruibles.forEach((obstaculo, index) => {
        explosiones.forEach((exp) => {
            if (obstaculo.colision(exp)) {
                obstaculosDestruibles.splice(index, 1); 
            }
        });
    });

    
    explosion.forEach((exp, index) => {
        if (exp.explosionCompleteTime !== null && Date.now() - exp.explosionCompleteTime > explosionDuration) {
            explosion.splice(index, 1);
        }
    });

    if(link.colision(triforce)){
        encontrada = true;
    }

}

generarObstaculos();
function pintar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(gameStart == false){
        titulo.play();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
    
        ctx.fillText('Presione F para empezar', canvas.width / 2, canvas.height / 2 );
        ctx.fillText('Movimeinto: w,a,s,d  Colocar Bomba: E', canvas.width / 2, canvas.height / 2  + 100);
        ctx.fillText('objetivo: encontrar la trifuerza escondida en los bloques', canvas.width / 2, canvas.height / 2  + 200);

    }else if(encontrada==true){
        mostrarVictoria();


    }else{
        titulo.stop();
        game.play();
        
        move();
        dibujarTrifuerza();
        dibujarObstaculos();
        explotar();
        mapa();

        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Tiempo: ' + elapsedTime + 's', 10, 30);

        
    }

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

function explotar() {
    const tiempoActual = Date.now();

    bomaPosicion.forEach((bombPos, index) => {
        const correTiempo = tiempoActual - bombPos.tiempoBomba;

        if (correTiempo > bombaTiempoExplo) {
            explosiones = [];
           explo.play();
            if (!explosion.some(expl => expl.x === bombPos.x && expl.y === bombPos.y)) {
                explosion.push({
                    x: bombPos.x,
                    y: bombPos.y,
                    w: 40,  
                    h: 40,  
                    frameIndex: 0,
                    frameDelay: 0,
                    explosionCompleteTime: null
                });
            }

            // Dibujar y manejar la explosión
            explosion.forEach((expl, explIndex) => {
                if (expl.frameDelay % 5 === 0 && expl.frameIndex < bombExplisionCentro.length - 1) {
                    expl.frameIndex++;
                }

                // Dibujar la explosión central
                ctx.drawImage(bombExplisionCentro[Math.min(expl.frameIndex, bombExplisionCentro.length - 1)], expl.x, expl.y, expl.w, expl.h);
                
                for (let i = 1; i <= 3; i++) {
                    explosiones.push(new entidad(expl.x - i * 35, expl.y, 40, 40)); 
                    explosiones.push(new entidad(expl.x + i * 35, expl.y, 40, 40)); 
                    explosiones.push(new entidad(expl.x, expl.y - i * 35, 40, 40)); 
                    explosiones.push(new entidad(expl.x, expl.y + i * 35, 40, 40)); 
                }

                // Dibujar explosiones en cada dirección (arriba, abajo, izquierda, derecha)
                for (let i = 1; i <= 3; i++) {
                    // Izquierda
                    let explIzqX = expl.x - i * 35 + 20;
                    ctx.save();
                    ctx.translate(explIzqX, expl.y + 20);
                    ctx.rotate(-Math.PI / 2);
                    ctx.drawImage(bombExplisionMedio[Math.min(expl.frameIndex, bombExplisionMedio.length - 1)], -20, -20, expl.w, expl.h);
                    ctx.restore();

                    // Derecha
                    let explDerX = expl.x + i * 35 + 20;
                    ctx.save();
                    ctx.translate(explDerX, expl.y + 20);
                    ctx.rotate(Math.PI / 2);
                    ctx.drawImage(bombExplisionMedio[Math.min(expl.frameIndex, bombExplisionMedio.length - 1)], -20, -20, expl.w, expl.h);
                    ctx.restore();
                
                    // Arriba
                    let explArrY = expl.y - i * 35;
                    ctx.drawImage(bombExplisionMedio[Math.min(expl.frameIndex, bombExplisionMedio.length - 1)], expl.x, explArrY, expl.w, expl.h);
                   

                    // Abajo
                    let explAbaY = expl.y + i * 35;
                    ctx.drawImage(bombExplisionMedio[Math.min(expl.frameIndex, bombExplisionMedio.length - 1)], expl.x, explAbaY, expl.w, expl.h);
                  
                }

                // Dibujar los extremos de la explosión
                ctx.save();
                ctx.translate(expl.x - 4 * 35 + 20, expl.y + 20);
                ctx.rotate(-Math.PI);
                ctx.drawImage(bombExplisionFin[Math.min(expl.frameIndex, bombExplisionFin.length - 1)], -20, -20, expl.w, expl.h);
                ctx.restore();
               

                ctx.drawImage(bombExplisionFin[Math.min(expl.frameIndex, bombExplisionFin.length - 1)], expl.x + 4 * 35, expl.y, expl.w, expl.h);

                ctx.save();
                ctx.translate(expl.x, expl.y - 4 * 35);
                ctx.rotate(-Math.PI / 2);
                ctx.drawImage(bombExplisionFin[Math.min(expl.frameIndex, bombExplisionFin.length - 1)], -40, 0, expl.w, expl.h);
                ctx.restore();
                

                ctx.save();
                ctx.translate(expl.x + 20, expl.y + 4 * 35);
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(bombExplisionFin[Math.min(expl.frameIndex, bombExplisionFin.length - 1)], 0, -20, expl.w, expl.h);
                ctx.restore();
                

                expl.frameDelay++;

                if (expl.frameIndex >= bombExplisionCentro.length - 1 && expl.explosionCompleteTime === null) {
                    expl.explosionCompleteTime = tiempoActual;
                }

                if (expl.explosionCompleteTime !== null && tiempoActual - expl.explosionCompleteTime > explosionDuration) {
                    explosion.splice(explIndex, 1);
                }
            });

            if (explosion.every(expl => expl.x !== bombPos.x || expl.y !== bombPos.y)) {
                bomaPosicion.splice(index, 1);
            }

        } else {
            if (bombFrameDelay % bombFrameRate === 0) {
                bombFrameIndex = (bombFrameIndex + 1) % bomb.length;
                bombaActiva = false;
            }

            ctx.drawImage(bomb[bombFrameIndex], bombPos.x, bombPos.y, 35, 35);
            bombFrameDelay++;
        }
    });
}

function generarObstaculos() {
    obstaculosDestruibles = [];
    var f = 200;
    for (let i = 0; i < 14; i++) {
        obstaculosDestruibles.push(new entidad(f+=100, 90, 100, 80));
    }

    var f = 100;
    for (let i = 0; i < 14; i++) {
        obstaculosDestruibles.push(new entidad((f+=100)+100, 160, 100, 80));
    }

    for (let i = 0; i < 14; i++) {
        obstaculosDestruibles.push(new entidad(i*100, 230, 100, 80));
    }

    for (let i = 0; i < 14; i++) {
        obstaculosDestruibles.push(new entidad((i*100)+100, 300, 100, 80));
    }
    
    for (let i = 0; i < 14; i++) {
        obstaculosDestruibles.push(new entidad(i*100, 370, 100, 80));
    }

    for (let i = 0; i < 14; i++) {
        obstaculosDestruibles.push(new entidad((i*100)+100, 440, 100, 80));
    }

    for (let i = 0; i < 14; i++) {
        obstaculosDestruibles.push(new entidad(i*100, 510, 100, 80));
    }

    for (let i = 0; i < 14; i++) {
        obstaculosDestruibles.push(new entidad((i*100)+100, 580, 100, 80));
    }

    for (let i = 0; i < 14; i++) {
        obstaculosDestruibles.push(new entidad(i*100, 650, 100, 80));
    }

    for (let i = 0; i < 14; i++) {
        obstaculosDestruibles.push(new entidad((i*100)+100, 720, 100, 80));
    }

    for (let i = 0; i < 14; i++) {
        obstaculosDestruibles.push(new entidad(i*100, 790, 100, 80));
    }


}

function dibujarObstaculos() {
    obstaculosDestruibles.forEach(obstaculo => {
        ctx.drawImage(bloqueDestruido, obstaculo.x, obstaculo.y, obstaculo.w, obstaculo.h);
    });
}

function dibujarTrifuerza() {
    ctx.drawImage(trifuerza,triforce.x,triforce.y,triforce.w,triforce.h);
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function() {
        this.sound.play();
    }

    this.stop = function() {
        this.sound.pause();
    }
}

function mostrarVictoria() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    triEncontrada.play(); 
    game.stop();  
    
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('¡Ganaste!', canvas.width / 2, canvas.height / 2);
    
    ctx.font = '24px Arial';
    ctx.fillText('Presiona F5 para volver al título', canvas.width / 2, canvas.height / 2 + 60);
}







