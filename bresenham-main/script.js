/**
 * Se dibuja una cuadrícula de fondo para mejor visualización.
 */
function dibujarCuadricula(ctx, width, height, paso = 25) {
    ctx.strokeStyle = "#e0e0e0"; // Gris muy claro
    ctx.lineWidth = 0.5;
    ctx.beginPath();

    for (let x = 0; x <= width; x += paso) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }

    for (let y = 0; y <= height; y += paso) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }
    ctx.stroke();
}

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

/**
 * Implementación adaptada del algoritmo de Bresenham.
 * Registra cada paso en un array para su posterior visualización en tabla.
 * @param {number} x0 - Coordenada X inicial.
 * @param {number} y0 - Coordenada Y inicial.
 * @param {number} x1 - Coordenada X final.
 * @param {number} y1 - Coordenada Y final.
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas.
 * @returns {Array} - Historial de pasos para la tabla.
 */
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

function generarTabla(pasos) {
    const contenedor = document.getElementById('tablaContenedor');
    let html = `<table>
                    <thead>
                        <tr>
                            Step</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>Error (err)</th>
                        </tr>
                    </thead>
                    <tbody>`;

    pasos.forEach((p, index) => {
        html += `<tr>
                    <td>${index}</td>
                    <td>${p.x}</td>
                    <td>${p.y}</td>
                    <td>${p.error}</td>
                 </tr>`;
    });

    html += '</tbody></table>';
    contenedor.innerHTML = html;
}


function ejecutarAlgoritmo() {
    //Obtener valores de los inputs
    const x0 = parseInt(document.getElementById('x0').value);
    const y0 = parseInt(document.getElementById('y0').value);
    const x1 = parseInt(document.getElementById('x1').value);
    const y1 = parseInt(document.getElementById('y1').value);

    // Limpiar canvas
    const { ctx } = prepararCanvas();

    //Ejecutar algoritmo 
    ctx.fillStyle = "red"; // Color de la línea
    const pasos = bresenhamAdaptado(x0, y0, x1, y1, ctx);

    // Mostrar tabla
    generarTabla(pasos);
}