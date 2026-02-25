// --- 1. LÓGICA SVG (TEATRO) ---
const butacas = document.querySelectorAll('.butaca');

butacas.forEach(butaca => {
    butaca.addEventListener('click', function() {
        this.classList.toggle('seleccionada');
        // Mover al frente para evitar solapamientos visuales
        this.parentElement.appendChild(this);
    });
});

// --- 2. LÓGICA CANVAS (LOGO JOKI'S THEATER) ---
const canvas = document.getElementById('canvasLogo');
const ctx = canvas.getContext('2d');

let isHover = false;
let floatAnim = 0; 
let partScale = 1; 

canvas.addEventListener('mouseenter', () => isHover = true);
canvas.addEventListener('mouseleave', () => isHover = false);

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    floatAnim += 0.05;

    // Suavizado general de la escala al pasar el ratón
    let targetScale = isHover ? 1.05 : 1.0;
    partScale += (targetScale - partScale) * 0.1;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // PARTE 1: Círculo de fondo con resplandor
    ctx.save();
    ctx.translate(cx, cy - 20);
    // Latido independiente del círculo
    let circlePulse = isHover ? partScale + Math.sin(floatAnim) * 0.02 : partScale;
    ctx.scale(circlePulse, circlePulse);
    
    let grd = ctx.createRadialGradient(0, 0, 10, 0, 0, 80);
    grd.addColorStop(0, "#f9d423");
    grd.addColorStop(0.8, "#f3b55a");
    grd.addColorStop(1, "transparent");
    
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(0, 0, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // PARTE 2: Franja central y Título
    ctx.save();
    ctx.translate(cx, cy - 10);
    // Movimiento vertical independiente de la franja
    let hoverOffset = isHover ? Math.sin(floatAnim * 0.8) * 8 : 0;
    ctx.translate(0, hoverOffset);
    
    ctx.fillStyle = "#8d6352";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.fillRect(-90, -20, 180, 40);
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Joki's", 0, -25);
    ctx.font = "bold 20px Arial";
    ctx.fillText("Theater", 0, 7);
    ctx.restore();

    // PARTE 3: Icono del Helado (La parte diferenciada que faltaba)
    ctx.save();
    ctx.translate(cx, cy + 35);
    // Rotación independiente del icono al pasar el ratón
    if(isHover) ctx.rotate(Math.sin(floatAnim * 1.5) * 0.15);
    
    // Bola de helado
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    // Cono
    ctx.fillStyle = "#d2b48c";
    ctx.beginPath();
    ctx.moveTo(-8, 3);
    ctx.lineTo(8, 3);
    ctx.lineTo(0, 18);
    ctx.fill();
    ctx.restore();

    // EXTRA: Texto inferior "5 Salas!"
    ctx.save();
    ctx.translate(cx, cy + 90);
    let textBounce = isHover ? 1.2 : 1.0;
    ctx.scale(textBounce, textBounce);
    
    ctx.fillStyle = "#ff0000";
    ctx.shadowColor = "red";
    ctx.shadowBlur = isHover ? 15 : 5;
    ctx.font = "bold 24px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("5 Salas!", 0, 0);
    ctx.restore();

    requestAnimationFrame(dibujar);
}

dibujar();