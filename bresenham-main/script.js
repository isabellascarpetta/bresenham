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