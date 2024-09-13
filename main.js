const canvas = document.querySelector('canvas');

canvas.width = 500;
canvas.height = 400;
const ctx = canvas.getContext('2d');

const LinkQuieto = document.getElementById('linkQuietoFrente')
const linkMueAbaj = document.getElementById('linkCorreAba')
var direction = "";

class entidad {
    constructor(x, y, w, h, s) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.s = s;
    }

    colicion(otro) {
        if (this.x < otro.x + otro.w &&
            this.x + this.w > otro.x &&
            this.y < otro.y + otro.h &&
            this.y + this.h > otro.y) {
            return true;
        }
        return false;
    }
}

var link = new entidad(200, 200, 50, 60, 1);

console.log(link.x);

document.addEventListener("keydown", function(e) {
    if (e.key == "w") {
        direction = "arriba";
    } else if (e.key == "a") {
        direction = "izquierda";
    } else if (e.key == "s") {
        direction = "abajo";
    } else if (e.key == "d") {
        direction = "derecha";
    }
});

document.addEventListener("keyup", function(e){
    direction=""
} );

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
    
    if(direction=="abajo"){
        ctx.drawImage(linkMueAbaj , link.x,link.y,link.w,link.h)
    }else{
        ctx.drawImage(LinkQuieto , link.x,link.y,link.w,link.h)
    }

    update();
    requestAnimationFrame(pintar);
}

pintar();





