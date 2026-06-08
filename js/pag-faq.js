// ==========================================================================
// INTERATIVIDADE DA PÁGINA FAQ (PARALLAX ORBITAL E ACCORDION)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Seleção dos elementos para o Parallax
  const bodyEl = document.body;
  const heroGlow = document.querySelector(".faq-hero .hero-efeito");
  const heroContent = document.querySelector(".hero-content");

  // Se nenhum elemento do parallax existir, evita rodar o loop à toa
  const temParallax = bodyEl || heroGlow || heroContent;

  // ==========================================================================
  // 1. EFEITO PARALLAX DE FUNDO E HERO EFEITO
  // ==========================================================================
  let mouseX = 0;
  let mouseY = 0;
  let smoothX = 0;
  let smoothY = 0;

  function handleMove(clientX, clientY) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

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

  function renderParallax() {
    if (!temParallax) return;

    smoothX += (mouseX - smoothX) * 0.08;
    smoothY += (mouseY - smoothY) * 0.08;

    if (bodyEl) {
      bodyEl.style.setProperty("--bg-parallax-x", `${smoothX * 0.25}px`);
      bodyEl.style.setProperty("--bg-parallax-y", `${smoothY * 0.25}px`);
    }

    if (heroGlow) {
      heroGlow.style.transform = `translate3d(calc(-50% + ${-smoothX * 0.8}px), calc(-50% + ${-smoothY * 0.8}px), 0)`;
    }

    if (heroContent) {
      heroContent.style.transform = `translate3d(${smoothX * 0.3}px, ${smoothY * 0.3}px, 0)`;
    }

    requestAnimationFrame(renderParallax);
  }

  renderParallax();

  // ==========================================================================
  // 2. ABRIR E FECHAR AS PERGUNTAS (ACCORDION)
  // ==========================================================================
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-pergunta");
    const answer = item.querySelector(".faq-resposta");

    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("ativo");

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("ativo");
          const otherAnswer = otherItem.querySelector(".faq-resposta");
          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
            otherAnswer.style.paddingTop = null;
            otherAnswer.style.paddingBottom = null;
          }
        }
      });

      if (isActive) {
        item.classList.remove("ativo");
        answer.style.maxHeight = null;
        answer.style.paddingTop = null;
        answer.style.paddingBottom = null;
      } else {
        item.classList.add("ativo");

        // Ajusta dinamicamente o espaçamento da resposta aberta
        answer.style.paddingTop = "10px";
        answer.style.paddingBottom = "20px";
        // Define a altura baseada no scroll real + padding adicionado manualmente
        answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
      }
    });
  });
});
