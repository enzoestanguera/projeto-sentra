document.addEventListener("DOMContentLoaded", () => {
  // Seleção dos elementos do DOM
  const bodyEl = document.body;
  const heroGlow = document.querySelector(".sobre-hero .hero-efeito");
  const heroContent = document.querySelector(".hero-content");
  const valueCards = document.querySelectorAll(".valor-card");
  const memberCards = document.querySelectorAll(".membro-card");

  // ==========================================================================
  // 1. EFEITO PARALLAX DE FUNDO E HERO EFEITO
  // ==========================================================================
  let mouseX = 0;
  let mouseY = 0;
  let smoothX = 0;
  let smoothY = 0;

  // Captura o movimento do cursor ou toque na tela
  function handleMove(clientX, clientY) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Fatores de movimentação (divisores controlam a amplitude)
    mouseX = (clientX - centerX) / 45;
    mouseY = (clientY - centerY) / 45;
  }

  document.addEventListener("mousemove", (e) => {
    handleMove(e.clientX, e.clientY);
  });

  document.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true },
  );

  // Renderização em tempo de execução via RequestAnimationFrame
  function renderParallax() {
    smoothX += (mouseX - smoothX) * 0.08;
    smoothY += (mouseY - smoothY) * 0.08;

    // 1. Parallax sutil no fundo espacial fixo do body
    if (bodyEl) {
      bodyEl.style.setProperty("--bg-parallax-x", `${smoothX * 0.25}px`);
      bodyEl.style.setProperty("--bg-parallax-y", `${smoothY * 0.25}px`);
    }

    // 2. Parallax reverso no glow de luz orbital do Hero
    if (heroGlow) {
      heroGlow.style.transform = `translate3d(calc(-50% + ${-smoothX * 0.8}px), calc(-50% + ${-smoothY * 0.8}px), 0)`;
    }

    // 3. Parallax sutil no bloco de texto principal do Hero
    if (heroContent) {
      heroContent.style.transform = `translate3d(${smoothX * 0.3}px, ${smoothY * 0.3}px, 0)`;
    }

    requestAnimationFrame(renderParallax);
  }

  // Inicia a animação de parallax
  renderParallax();
});
