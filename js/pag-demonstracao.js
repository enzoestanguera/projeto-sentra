
// roda somente dps do html carregar
document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.querySelector('.dash-map-container');
    const mapImage = document.querySelector('.map-bg');

    // verifica se existem
    if (!mapContainer || !mapImage) return;

    // criando tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    tooltip.style.display = 'none';
    tooltip.innerHTML = `
        <h4 id="tooltip-biome-container"><i class="fa-solid fa-location-dot"></i> <span id="tooltip-biome">Bioma</span></h4>
        <p class="tooltip-subtitle"><strong class="tooltip-highlight">Raio analisado:</strong> <span>1 km</span></p>
        <p class="tooltip-subtitle"><strong class="tooltip-highlight">Coordenadas:</strong> <span id="tooltip-coords"></span></p>
        <div class="divider"></div>
        <p class="tooltip-subtitle"><strong class="tooltip-highlight">Risco Alto:</strong> <span id="tooltip-risk-high" class="text-danger" style="font-weight: bold; font-size: 1rem;"></span></p>
        <p class="tooltip-subtitle"><strong class="tooltip-highlight">Risco Médio:</strong> <span id="tooltip-risk-med" style="color: #F1C40F; font-weight: bold; font-size: 1rem;"></span></p>
        <p class="tooltip-subtitle"><strong class="tooltip-highlight">Risco Baixo:</strong> <span id="tooltip-risk-low" class="text-success" style="font-weight: bold; font-size: 1rem;"></span></p>
        <div class="divider"></div>
        <p class="tooltip-subtitle"><strong class="tooltip-highlight">Casos Resolvidos:</strong> <span id="tooltip-cases-solved" class="text-success" style="font-weight: bold; font-size: 1rem;"></span></p>
        <p class="tooltip-subtitle"><strong class="tooltip-highlight">Casos Pendentes:</strong> <span id="tooltip-cases-unsolved" class="text-danger" style="font-weight: bold; font-size: 1rem;"></span></p>
    `;
    // adiciona na pagina
    document.body.appendChild(tooltip);

    // cria o circulo do raio
    const radiusCircle = document.createElement('div');
    radiusCircle.className = 'map-radius';
    radiusCircle.style.display = 'none';
    document.body.appendChild(radiusCircle);

    // serve para analisar os pixels do mapa
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    let isCanvasReady = false;
    // ve se a imagem foi carregada e determina o tamanho do canvas conforme imagem
    function initCanvas() {
        if (!mapImage.complete || mapImage.naturalWidth === 0) return;

        canvas.width = mapImage.width;
        canvas.height = mapImage.height;
        ctx.drawImage(mapImage, 0, 0, mapImage.width, mapImage.height);
        isCanvasReady = true;
    }

    if (mapImage.complete) {
        initCanvas();
    } else {
        mapImage.addEventListener('load', initCanvas);
    }

    // movimento do mouse
    mapContainer.addEventListener('mousemove', (e) => {
        // se o canvas nao estiver pronto, nao executa
        if (!isCanvasReady) return;

        // pega infos da posicao e tamanho da img na tela
        const rect = mapImage.getBoundingClientRect();

        // posicao relativa a img
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // mostra o tooltip
        tooltip.style.display = 'block';

        // tooltip acompanhando cursor
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top = (e.clientY + 15) + 'px';

        // mostra o raio
        radiusCircle.style.display = 'block';

        // raio acompanhando cursor
        radiusCircle.style.left = e.clientX + 'px';
        radiusCircle.style.top = e.clientY + 'px';

        // bioma conforme posicao do mapa
        const isNorth = y < canvas.height * 0.45;
        let bioma = "Amazônia";

        if (!isNorth) {
            bioma = "Mata Atlântica";
        }

        // coordenadas conforme posicao do ponteiro
        const lat = (-5 - (y / rect.height) * 25).toFixed(2);
        const lng = (-70 + (x / rect.width) * 35).toFixed(2);

        // dados consistentes baseados na posicao
        const seed = Math.floor(x + y);
        const highRisk = (seed % 5) + 1;
        const medRisk = (seed % 12) + 5;
        const lowRisk = (seed % 25) + 10;
        const solved = (seed % 60) + 15;
        const unsolved = (seed % 10) + 1;

        // alterando no html
        document.getElementById('tooltip-biome').textContent = bioma;
        document.getElementById('tooltip-coords').textContent = `${lat}°, ${lng}°`;
        document.getElementById('tooltip-risk-high').textContent = highRisk;
        document.getElementById('tooltip-risk-med').textContent = medRisk;
        document.getElementById('tooltip-risk-low').textContent = lowRisk;
        document.getElementById('tooltip-cases-solved').textContent = solved;
        document.getElementById('tooltip-cases-unsolved').textContent = unsolved;
    });
    //  ponteiro fora do mapa
    mapContainer.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
        radiusCircle.style.display = 'none';
    });

    //  remove raio e tooltip ao scrollar, evitando erros
    window.addEventListener('scroll', () => {
        tooltip.style.display = 'none';
        radiusCircle.style.display = 'none';
    });

});
