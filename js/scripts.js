document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // SELEÇÃO DOS ELEMENTOS DO DOM
  // ==========================================================================

  const astro = document.querySelector(".hero-media");
  const text = document.querySelector(".hero-text");
  const bodyEl = document.body;
  const cards = document.querySelectorAll(".stat-item");
  const heatWidget = document.getElementById("heat-widget");
  const heatCount = document.getElementById("heat-count");
  const heatTime = document.getElementById("heat-time");

  // ==========================================================================
  // VARIÁVEIS DE CONTROLE DO EFEITO PARALLAX
  // ==========================================================================

  let mouseX = 0;
  let mouseY = 0;
  let smoothX = 0;
  let smoothY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let lastX = null;
  let lastY = null;

  // ==========================================================================
  // CAPTURA A POSIÇÃO DO CURSOR OU TOQUE NA TELA
  // ==========================================================================

  function handleMove(clientX, clientY) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    mouseX = (clientX - centerX) / 50;
    mouseY = (clientY - centerY) / 50;

    if (lastX !== null && lastY !== null) {
      velocityX = clientX - lastX;
      velocityY = clientY - lastY;
    } else {
      velocityX = 0;
      velocityY = 0;
    }

    lastX = clientX;
    lastY = clientY;
  }

  // ==========================================================================
  // EVENTO DE MOVIMENTO DO MOUSE
  // ==========================================================================

  document.addEventListener("mousemove", (e) => {
    handleMove(e.clientX, e.clientY);
  });

  // ==========================================================================
  // EVENTO DE MOVIMENTO EM DISPOSITIVOS TOUCH
  // ==========================================================================

  document.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true },
  );

  // ==========================================================================
  // REGISTRA A POSIÇÃO INICIAL DO TOQUE
  // ==========================================================================

  document.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length > 0) {
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      }
    },
    { passive: true },
  );

  // ==========================================================================
  // RENDERIZAÇÃO DO EFEITO PARALLAX
  // Move os elementos suavemente conforme o usuário movimenta o mouse
  // ==========================================================================

  function renderParallax() {
    smoothX += (mouseX - smoothX) * 0.06;
    smoothY += (mouseY - smoothY) * 0.06;

    velocityX *= 0.9;
    velocityY *= 0.9;

    const speed = Math.min(Math.abs(velocityX) + Math.abs(velocityY), 40);

    // ----------------------------------------------------------------------
    // Astronauta
    // ----------------------------------------------------------------------

    if (astro) {
      astro.style.transform = `translate3d(${smoothX * 2}px, ${smoothY * 2}px, 0) rotate(${smoothX * 0.3 + speed * 0.02}deg)`;
    }

    // ----------------------------------------------------------------------
    // Texto principal
    // ----------------------------------------------------------------------

    if (text) {
      text.style.transform = `translate3d(${smoothX * 0.6}px, ${smoothY * 0.6}px, 0)`;
    }

    // ----------------------------------------------------------------------
    // Fundo animado
    // ----------------------------------------------------------------------

    if (bodyEl) {
      bodyEl.style.setProperty("--bg-parallax-x", `${smoothX * 0.2}px`);
      bodyEl.style.setProperty("--bg-parallax-y", `${smoothY * 0.2}px`);
    }

    // ----------------------------------------------------------------------
    // Widget de focos de calor
    // ----------------------------------------------------------------------

    if (heatWidget) {
      heatWidget.style.transform = `translate3d(${smoothX * 0.8}px, ${smoothY * 0.8}px, 0)`;
    }

    // ----------------------------------------------------------------------
    // Cards de estatísticas
    // ----------------------------------------------------------------------

    cards.forEach((card, i) => {
      const depth = (i + 1) * 0.15;
      const x = smoothX * depth;
      const y = smoothY * depth;
      card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    requestAnimationFrame(renderParallax);
  }

  renderParallax();

  // ==========================================================================
  // WIDGET DE FOCOS DE CALOR
  // Simula atualização automática dos dados
  // ==========================================================================

  let currentValue = 127;

  function updateHeat() {
    if (!heatCount || !heatTime) return;

    // Gera uma pequena variação aleatória
    const variation = Math.floor(Math.random() * 10 - 4);
    currentValue = Math.max(0, currentValue + variation);

    // Atualiza o contador
    heatCount.textContent = currentValue;

    // Atualiza o horário da última atualização
    const now = new Date();
    heatTime.textContent = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  // Atualização inicial
  updateHeat();

  // Atualiza a cada 3 segundos
  const heatInterval = setInterval(updateHeat, 3000);
});
