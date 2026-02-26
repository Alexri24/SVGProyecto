// --- 1. LÓGICA SVG (TEATRO) ---
const butacas = document.querySelectorAll('.butaca');

butacas.forEach(butaca => {
    butaca.addEventListener('click', function() {
        this.classList.toggle('seleccionada');
        // Mover al frente para evitar solapamientos visuales
        this.parentElement.appendChild(this);
    });
});

// --- 2. LÓGICA CANVAS  ---

// 1. Selección del elemento y el contexto 2D 
const canvas = document.getElementById('canvasLogo');
const ctx = canvas.getContext('2d');

// 2. Definición de la Clase siguiendo el boilerplate 
class LogoTeatro {
    constructor(x, y) {
        this.x = x; 
        this.y = y; 
        this.floatAnim = 0; // Reloj de animación
        this.partScale = 1; // Escala inicial
        this.isHover = false; // Estado de interactividad
    }

    // Método que controla la lógica y el movimiento (
    actualiza() {
        // Avanzamos el reloj de la animación para los senos matemáticos
        this.floatAnim += 0.05;

        // Suavizado de la escala al pasar el ratón
        let targetScale = this.isHover ? 1.05 : 1.0;
        this.partScale += (targetScale - this.partScale) * 0.1;

        this.dibuja();
    }

    // Método que pinta en el Canvas 
    dibuja() {
        // PARTE 1: Círculo de fondo con resplandor
        ctx.save();
        ctx.translate(this.x, this.y - 20);
        let circlePulse = this.isHover ? this.partScale + Math.sin(this.floatAnim) * 0.02 : this.partScale;
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
        ctx.translate(this.x, this.y - 10);
        let hoverOffset = this.isHover ? Math.sin(this.floatAnim * 0.8) * 8 : 0;
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

        // PARTE 3: Icono del Helado 
        ctx.save();
        ctx.translate(this.x, this.y + 35);
        if(this.isHover) ctx.rotate(Math.sin(this.floatAnim * 1.5) * 0.15);
        
        // Bola de helado (ctx.arc)
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Cono (Uso de beginPath, moveTo y lineTo)
        ctx.fillStyle = "#d2b48c";
        ctx.beginPath();
        ctx.moveTo(-8, 3);
        ctx.lineTo(8, 3);
        ctx.lineTo(0, 18);
        ctx.fill();
        ctx.restore();

        // EXTRA: Texto inferior 
        ctx.save();
        ctx.translate(this.x, this.y + 90);
        let textBounce = this.isHover ? 1.2 : 1.0;
        ctx.scale(textBounce, textBounce);
        
        ctx.fillStyle = "#ff0000";
        ctx.shadowColor = "red";
        ctx.shadowBlur = this.isHover ? 15 : 5;
        ctx.font = "bold 24px Georgia";
        ctx.textAlign = "center";
        ctx.fillText("5 Salas!", 0, 0);
        ctx.restore();
    }
}

// 3. Instanciamos el objeto único pasándole el centro del canvas 
let miLogo = new LogoTeatro(canvas.width / 2, canvas.height / 2);

// --- INTERACTIVIDAD (Eventos de Hover) ---
// Modificamos directamente la propiedad del objeto instanciado
canvas.addEventListener('mouseenter', () => miLogo.isHover = true);
canvas.addEventListener('mouseleave', () => miLogo.isHover = false);

// 4. Bucle de animación usando requestAnimationFrame 
function anima() {
    requestAnimationFrame(anima); 
    // Borrado obligatorio del canvas para evitar rastro 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Ejecutamos la lógica de actualización 
    miLogo.actualiza();
}

// Arrancamos la animación 
anima();