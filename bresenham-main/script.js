function dibujarEscalas(ctx, width, height, paso = 50) {
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    ctx.font = "10px Arial";
    ctx.beginPath();

    // Eje Inferior (X)
    for (let x = 0; x <= width; x += paso) {
        ctx.moveTo(x, height);
        ctx.lineTo(x, height - 10);
        ctx.fillText(x, x + 2, height - 2);
    }

    // Eje Izquierdo (Y)
    for (let y = 0; y <= height; y += paso) {
        ctx.moveTo(0, y);
        ctx.lineTo(10, y);
        ctx.fillText(y, 12, y + 10);
    }
    
    ctx.stroke();
}

//limpia y prepara el canvas
function prepararCanvas() {
    const canvas = document.getElementById('canvasBresenham');
    const ctx = canvas.getContext('2d');
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar las escalas
    dibujarEscalas(ctx, canvas.width, canvas.height, 50);
    
    return { ctx, canvas };
}

prepararCanvas();

function bresenhamAdaptado(x0, y0, x1, y1, ctx) {
    let puntos = []; // Aquí guardaremos los pasos
    
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        puntos.push({ x: x0, y: y0, error: err });

        // Dibujar el punto 
        ctx.fillRect(x0, y0, 2, 2);

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
    return puntos;
}