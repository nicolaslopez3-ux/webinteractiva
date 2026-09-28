// Funciones matemáticas auxiliares
const functions = {
    x2: (x) => x * x,
    invX: (x) => 1 / x,
    exp: (x) => Math.exp(x),
    sin: (x) => Math.sin(x)
};

// Módulo 1: Visualizador de Sumas de Riemann
function plotRiemann(funcKey, a, b, n, type) {
    const f = functions[funcKey];
    const dx = (b - a) / n;
    
    // Curva f(x)
    const xCurve = [];
    const yCurve = [];
    for (let x = a - 0.5; x <= b + 0.5; x += 0.02) {
        xCurve.push(x);
        yCurve.push(f(x));
    }

    const traces = [{
        x: xCurve,
        y: yCurve,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x)',
        line: { color: '#004b87', width: 2 }
    }];

    // Rectángulos de Riemann
    let areaSum = 0;
    for (let i = 0; i < n; i++) {
        let xEval;
        const x0 = a + i * dx;
        const x1 = a + (i + 1) * dx;

        if (type === 'left') xEval = x0;
        else if (type === 'right') xEval = x1;
        else xEval = (x0 + x1) / 2; // Midpoint

        const height = f(xEval);
        areaSum += height * dx;

        traces.push({
            x: [x0, x0, x1, x1, x0],
            y: [0, height, height, 0, 0],
            fill: 'toself',
            fillcolor: 'rgba(0, 168, 150, 0.3)',
            line: { color: '#00a896' },
            type: 'scatter',
            mode: 'lines',
            showlegend: false
        });
    }

    const layout = {
        title: `Sumas de Riemann (${type}) - Área aprox: ${areaSum.toFixed(4)}`,
        xaxis: { title: 'x' },
        yaxis: { title: 'y' }
    };

    Plotly.newPlot('riemann-plot', traces, layout);
}

// Módulo 2: Regla del Trapecio
function plotTrapezoid(a, b, n) {
    const f = functions['x2'];
    const dx = (b - a) / n;
    
    const xCurve = [], yCurve = [];
    for (let x = a - 0.2; x <= b + 0.2; x += 0.02) {
        xCurve.push(x); yCurve.push(f(x));
    }

    const traces = [{
        x: xCurve, y: yCurve, type: 'scatter', mode: 'lines', name: 'f(x)', line: { color: '#004b87' }
    }];

    let area = 0;
    for (let i = 0; i < n; i++) {
        const x0 = a + i * dx;
        const x1 = a + (i + 1) * dx;
        const y0 = f(x0);
        const y1 = f(x1);
        area += ((y0 + y1) / 2) * dx;

        traces.push({
            x: [x0, x0, x1, x1, x0],
            y: [0, y0, y1, 0, 0],
            fill: 'toself',
            fillcolor: 'rgba(230, 126, 34, 0.3)',
            line: { color: '#e67e22' },
            type: 'scatter',
            mode: 'lines',
            showlegend: false
        });
    }

    Plotly.newPlot('trapecio-plot', traces, {
        title: `Regla del Trapecio (n=${n}) - Área aprox: ${area.toFixed(4)}`
    });
}