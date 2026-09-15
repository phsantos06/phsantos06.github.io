/* =========================================================
   LINGUAGEM DE MOVIMENTO
   - Principais (orb, seções):  lentos, expo.out, 1.4–1.8s
   - Textos:                    rápidos e precisos, power4.out, .8–1s
   - Imagens:                   fluidos e profundos, scrub com inércia
   - Micro:                     .35s (CSS)
   - Transições:                scrub ligado ao scroll
   ========================================================= */
(() => {
  const root = document.documentElement;

  /* ---------- Menu mobile + header que some ao rolar (independe de libs) ---------- */
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const mmenu = document.getElementById("menu-mobile");
  const toggleLabel = toggle.querySelector(".nav__toggle-label");
  let menuAberto = false;

  function abrirMenu(abrir) {
    menuAberto = abrir;
    toggle.setAttribute("aria-expanded", abrir);
    toggleLabel.textContent = abrir ? "Fechar" : "Menu";
    document.body.classList.toggle("menu-open", abrir);
    nav.classList.remove("is-hidden");
    if (abrir) {
      mmenu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => mmenu.classList.add("is-open")));
      mmenu.querySelector("a").focus({ preventScroll: true });
    } else {
      mmenu.classList.remove("is-open");
      setTimeout(() => { if (!menuAberto) mmenu.hidden = true; }, 700);
    }
  }
  toggle.addEventListener("click", () => abrirMenu(!menuAberto));
  mmenu.addEventListener("click", (e) => { if (e.target.closest("a")) abrirMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuAberto) { abrirMenu(false); toggle.focus(); }
  });
  matchMedia("(min-width: 821px)").addEventListener("change", (e) => { if (e.matches && menuAberto) abrirMenu(false); });

  // no celular/tablet o header sai do caminho ao descer e volta ao subir
  let ultimoY = scrollY, ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      const esconder = innerWidth <= 820 && !menuAberto && y > 120 && y > ultimoY + 4;
      if (esconder) nav.classList.add("is-hidden");
      else if (y < ultimoY - 4 || y <= 120) nav.classList.remove("is-hidden");
      ultimoY = y;
      ticking = false;
    });
  }, { passive: true });

  if (!window.gsap || !window.ScrollTrigger) return; // sem libs: site estático e legível

  gsap.registerPlugin(ScrollTrigger);
  const M = {
    main: { duration: 1.6, ease: "expo.out" },
    text: { duration: 0.9, ease: "power4.out" },
  };

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- split em palavras (mantém <em>) ---------- */
  function splitWords(el) {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.append(" ");
            const w = document.createElement("span");
            w.className = "word";
            w.textContent = part;
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains("word")) {
          if (n.tagName === "EM") n.classList.add("word");
          else walk(n);
        }
      });
    };
    walk(el);
    return el.querySelectorAll(".word");
  }

  /* ---------- Smooth scroll (não em reduced motion / touch) ---------- */
  let lenis;
  if (!reduce && window.Lenis && finePointer) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        const target = id === "#top" ? 0 : document.querySelector(id);
        if (target === null) return;
        e.preventDefault();
        lenis.scrollTo(target, { duration: 1.6 });
      })
    );
  }

  /* ---------- Progresso (sempre: é informação, não enfeite) ---------- */
  gsap.to(".progress__bar", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: reduce ? true : 0.3 } });

  /* ---------- Contadores (conteúdo, funciona em todos) ---------- */
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = +el.dataset.count;
    if (reduce) return (el.textContent = end);
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: "top 85%", once: true,
      onEnter: () => gsap.to(o, { v: end, duration: 1.8, ease: "expo.out", onUpdate: () => (el.textContent = Math.round(o.v)) }),
    });
  });

  /* ==========================================================
     REDUCED MOTION: só transições essenciais e curtas
     ========================================================== */
  if (reduce) {
    gsap.utils.toArray(".project, .system, .lab__list, .step, .about__grid, .contact__title").forEach((el) =>
      gsap.from(el, { autoAlpha: 0, duration: 0.4, scrollTrigger: { trigger: el, start: "top 90%", once: true } })
    );
    return;
  }

  const heroWords = splitWords(document.querySelector("[data-split]"));
  const manifestoWords = splitWords(document.querySelector("[data-words]"));
  const mm = gsap.matchMedia();

  /* ==========================================================
     1. HERO — abertura cinematográfica (~2.2s até CTA)
     ========================================================== */
  const intro = gsap.timeline({ defaults: M.text });
  intro
    .from(".hero__bg", { autoAlpha: 0, duration: 1.4, ease: "power2.out" })                         // 1. fundo
    .from(".hero__orb", { scale: 0.35, autoAlpha: 0, rotate: -25, ...M.main }, 0.1)                 // 2. elemento principal
    .from(".nav", { yPercent: -100, autoAlpha: 0, duration: 0.8, clearProps: "transform,opacity,visibility" }, 0.5)
    .from(".hero__eyebrow", { y: 16, autoAlpha: 0, duration: 0.6 }, 0.45)                           // 3. eyebrow
    .from(heroWords, { yPercent: 115, rotate: 4, stagger: 0.07 }, 0.55)                             // 4. headline
    .from(".hero__title .accent", { color: "#efeae1", duration: 0.9, ease: "power2.inOut" }, "-=.3") // 5. destaque
    .from(".hero__desc", { y: 24, autoAlpha: 0 }, "-=.7")                                          // 6. descrição
    .from(".hero .btn", { y: 30, scale: 0.9, autoAlpha: 0, ...M.main, duration: 1.1 }, "-=.65")     // 7. CTA por último
    .from(".hero__scroll", { autoAlpha: 0, duration: 0.6 }, "-=.6");

  // 8. decorativo sutil: orb "respira" depois da entrada
  intro.add(() => gsap.to(".hero__orb-core", { rotate: 360, duration: 60, ease: "none", repeat: -1 }));

  /* ---------- HERO → MANIFESTO: transição por profundidade ---------- */
  mm.add("(min-width: 721px)", () => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 } });
    tl.to(".hero__inner", { yPercent: -18, autoAlpha: 0, ease: "none" }, 0)              // texto sai rápido
      .to(".hero__depth", { yPercent: 35, scale: 1.6, autoAlpha: 0.15, ease: "none" }, 0) // orb atravessa, mais lento/profundo
      .to(".hero__bg", { yPercent: 25, ease: "none" }, 0);

    // parallax do orb com o mouse — camada de profundidade
    const xTo = gsap.quickTo(".hero__orb-core", "x", { duration: 1.2, ease: "power3" });
    const yTo = gsap.quickTo(".hero__orb-core", "y", { duration: 1.2, ease: "power3" });
    const onMove = (e) => { xTo((e.clientX / innerWidth - 0.5) * 40); yTo((e.clientY / innerHeight - 0.5) * 40); };
    if (finePointer) addEventListener("pointermove", onMove);
    return () => removeEventListener("pointermove", onMove);
  });
  mm.add("(max-width: 720px)", () => {
    // mobile: só um deslocamento curto, sem escala grande
    gsap.to(".hero__depth", { yPercent: 20, autoAlpha: 0.4, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  });

  /* ==========================================================
     2. MANIFESTO — pausa; o scroll "escreve" o texto
     ========================================================== */
  gsap.set(manifestoWords, { opacity: 0.12 });
  gsap.to(manifestoWords, {
    opacity: 1, ease: "none", stagger: 0.1,
    scrollTrigger: { trigger: ".manifesto", start: "top 30%", end: "bottom bottom", scrub: 0.4 },
  });
  gsap.from(".manifesto .eyebrow", { x: -20, autoAlpha: 0, ...M.text, scrollTrigger: { trigger: ".manifesto", start: "top 60%" } });

  /* ==========================================================
     3. PROJETOS — protagonistas
     ========================================================== */
  gsap.from("[data-reveal-title]", { yPercent: 100, clipPath: "inset(0 0 100% 0)", ...M.text, duration: 1.1, scrollTrigger: { trigger: ".section-head", start: "top 80%" } });
  gsap.from(".section-count", { yPercent: 60, autoAlpha: 0, ...M.text, delay: 0.2, scrollTrigger: { trigger: ".section-head", start: "top 80%" } });

  mm.add({ desktop: "(min-width: 821px)", mobile: "(max-width: 820px)" }, (ctx) => {
    const { desktop } = ctx.conditions;

    gsap.utils.toArray("[data-project]").forEach((p) => {
      const media = p.querySelector(".project__media");
      const img = p.querySelector(".project__img");
      const info = p.querySelectorAll(".project__index, .project__title, .project__cat, .project__stack");
      const right = p.classList.contains("project--right");

      // máscara abre + imagem assenta, controlados pelo scroll
      gsap.fromTo(media,
        { clipPath: desktop ? (right ? "inset(12% 0% 12% 40%)" : "inset(12% 40% 12% 0%)") : "inset(8% 8% 8% 8%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: p, start: "top 95%", end: desktop ? "top 30%" : "top 45%", scrub: 0.8 } }
      );
      gsap.fromTo(img, { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "top 25%", scrub: 1 } });

      // imagem continua com parallax lento enquanto atravessa (profundidade)
      if (desktop) {
        gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } });
      }

      // informação entra depois da imagem: título → categoria → resto
      gsap.from(info, {
        y: desktop ? 40 : 20, autoAlpha: 0, stagger: 0.09, ...M.text,
        scrollTrigger: { trigger: p, start: desktop ? "top 45%" : "top 70%" },
      });
    });
  });

  /* ==========================================================
     SISTEMAS — cartões empilham: o anterior recua em profundidade
     ========================================================== */
  gsap.from(".section-head--systems .section-title", { yPercent: 60, autoAlpha: 0, ...M.text, duration: 1.1, scrollTrigger: { trigger: ".systems", start: "top 75%" } });
  gsap.from(".systems__intro", { y: 20, autoAlpha: 0, ...M.text, delay: 0.15, scrollTrigger: { trigger: ".systems", start: "top 75%" } });

  mm.add({ desktop: "(min-width: 821px)", mobile: "(max-width: 820px)" }, (ctx) => {
    const { desktop } = ctx.conditions;
    const systems = gsap.utils.toArray("[data-system]");

    systems.forEach((s, i) => {
      const card = s.querySelector(".system__card");
      const media = s.querySelector(".system__media img");
      const body = s.querySelectorAll(".system__index, .system__title, .system__desc, .project__stack");

      // imagem entra por máscara vertical, corpo em sequência
      gsap.fromTo(media, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 }, {
        clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none",
        scrollTrigger: { trigger: s, start: desktop ? "top 90%" : "top 95%", end: desktop ? "top 30%" : "top 50%", scrub: 0.8 },
      });
      gsap.from(body, { y: 30, autoAlpha: 0, stagger: 0.08, ...M.text, scrollTrigger: { trigger: s, start: desktop ? "top 40%" : "top 65%" } });

      // desktop: quando o próximo sobe, este recua
      const next = systems[i + 1];
      if (desktop && next) {
        gsap.to(card, {
          scale: 0.93, filter: "brightness(0.55)", ease: "none",
          scrollTrigger: { trigger: next, start: "top 75%", end: "top 14%", scrub: true },
        });
      }
    });
  });

  /* ==========================================================
     4. PROCESSO — scroll horizontal controlado (desktop)
     ========================================================== */
  mm.add("(min-width: 901px)", () => {
    const track = document.querySelector(".process__track");
    const dist = () => track.scrollWidth - innerWidth;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ".process", start: "top top", end: () => "+=" + dist(), pin: ".process__pin", scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
    });
    tl.to(track, { x: () => -dist(), ease: "none" }, 0)
      .to(".process__meter i", { scaleX: 1, ease: "none" }, 0);
    gsap.utils.toArray(".step__n").forEach((n) =>
      gsap.fromTo(n, { yPercent: 40 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: n.parentElement, containerAnimation: tl, start: "left right", end: "left 55%", scrub: true } })
    );

    // transição de cor: escuro → papel ao chegar
    gsap.fromTo(".process", { backgroundColor: "#0d0d0c" }, { backgroundColor: "#efeae1", ease: "none", scrollTrigger: { trigger: ".process", start: "top 90%", end: "top 20%", scrub: true } });
    gsap.from(".process__head", { y: 60, autoAlpha: 0, ...M.text, scrollTrigger: { trigger: ".process", start: "top 60%" } });
  });
  mm.add("(max-width: 900px)", () => {
    gsap.utils.toArray(".step").forEach((s) =>
      gsap.from(s, { y: 30, autoAlpha: 0, ...M.text, scrollTrigger: { trigger: s, start: "top 85%" } })
    );
  });

  /* ==========================================================
     ESTUDOS — só as linhas se desenham: um respiro entre
     o empilhamento dos sistemas e o texto do Sobre
     ========================================================== */
  gsap.from(".lab__list li", {
    y: 16, autoAlpha: 0, stagger: 0.07, ...M.text,
    scrollTrigger: { trigger: ".lab__list", start: "top 80%" },
  });

  /* ==========================================================
     5. SOBRE — quase estático (espaço negativo)
     Um único gesto: a linha de destaque sobe. Nada mais.
     ========================================================== */
  gsap.from(".about__lead", { y: 40, autoAlpha: 0, ...M.text, duration: 1.2, scrollTrigger: { trigger: ".about", start: "top 65%" } });

  /* ==========================================================
     6. CONTATO — novo impacto: a seção "abre" sobre a anterior
     ========================================================== */
  mm.add({ desktop: "(min-width: 721px)", mobile: "(max-width: 720px)" }, (ctx) => {
    const { desktop } = ctx.conditions;
    gsap.fromTo(".contact",
      { clipPath: desktop ? "inset(18% 8% 0% 8% round 24px)" : "inset(6% 4% 0% 4% round 16px)" },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "top 15%", scrub: 0.6 } }
    );
    gsap.utils.toArray(".contact__line").forEach((l, i) =>
      gsap.fromTo(l, { xPercent: desktop ? (i ? 18 : -18) : 0, yPercent: desktop ? 0 : 30, autoAlpha: desktop ? 1 : 0 },
        { xPercent: 0, yPercent: 0, autoAlpha: 1, ease: desktop ? "none" : "power4.out",
          scrollTrigger: desktop ? { trigger: ".contact", start: "top 80%", end: "top 10%", scrub: 0.8 } : { trigger: l, start: "top 90%" } })
    );
  });

  /* ==========================================================
     CURSOR + MAGNÉTICO (apenas ponteiro fino)
     ========================================================== */
  if (!finePointer) return;
  root.classList.add("has-cursor");
  const cursor = document.querySelector(".cursor");
  const dot = cursor.querySelector(".cursor__dot");
  const ring = cursor.querySelector(".cursor__ring");
  const dx = gsap.quickTo(dot, "x", { duration: 0.08 }), dy = gsap.quickTo(dot, "y", { duration: 0.08 });
  const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" }), ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
  addEventListener("pointermove", (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
  document.addEventListener("pointerleave", () => gsap.to(cursor, { autoAlpha: 0, duration: 0.3 }));
  document.addEventListener("pointerenter", () => gsap.to(cursor, { autoAlpha: 1, duration: 0.3 }));

  const label = cursor.querySelector(".cursor__label");
  document.querySelectorAll("[data-cursor]").forEach((el) => {
    const cls = "is-" + el.dataset.cursor;
    el.addEventListener("pointerenter", () => { label.textContent = el.dataset.label || "Ver projeto"; cursor.classList.add(cls); });
    el.addEventListener("pointerleave", () => cursor.classList.remove(cls));
  });

  // projetos: imagem segue levemente o mouse
  document.querySelectorAll(".project__link").forEach((link) => {
    const word = link.querySelector(".project__img");
    const media = link.querySelector(".project__media");
    link.addEventListener("pointermove", (e) => {
      const r = media.getBoundingClientRect();
      gsap.to(word, { x: ((e.clientX - r.left) / r.width - 0.5) * 24, y: ((e.clientY - r.top) / r.height - 0.5) * 16, duration: 1, ease: "power3" });
    });
    link.addEventListener("pointerleave", () => gsap.to(word, { x: 0, y: 0, duration: 1.2, ease: "expo.out" }));
  });

  // botões magnéticos
  document.querySelectorAll(".magnetic").forEach((el) => {
    const strength = el.classList.contains("contact__mail") ? 0.15 : 0.35;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" }), yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * strength);
      yTo((e.clientY - r.top - r.height / 2) * strength);
    });
    el.addEventListener("pointerleave", () => { gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, .4)" }); });
  });

  addEventListener("load", () => ScrollTrigger.refresh());
})();
