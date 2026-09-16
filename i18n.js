/* =========================================================
   IDIOMAS — PT / EN / ES
   O português vem do próprio HTML (data-i18n / data-i18n-attr);
   aqui ficam só as traduções e o que existe apenas no JS.
   ========================================================= */
window.I18N = (() => {
  const LANGS = ["pt", "en", "es"];

  const dict = {
    pt: {
      "menu.open": "Menu",
      "menu.close": "Fechar",
      "cursor.project": "Ver projeto",
    },

    en: {
      "meta.title": "Paulo Henrique — Software Developer",
      "meta.desc": "Portfolio of Paulo Henrique: business websites and web systems — VOS Advocacia, Avanço Engenharia, AABB Ipiaú, Cambio Express, Master Art and Frame, Coxinha do Barão and PDV Boa Praça.",
      "menu.open": "Menu",
      "menu.close": "Close",
      "cursor.project": "View project",
      "cursor.system": "View system",
      "lang.aria": "Language",
      "nav.aria": "Main",
      "nav.mobileAria": "Mobile menu",
      "nav.sites": "Websites",
      "nav.systems": "Systems",
      "nav.us": "US",
      "nav.lab": "Lab",
      "nav.about": "About",
      "nav.contact": "Contact",

      "hero.eyebrow": "Available for projects — 2026",
      "hero.title": '<span class="line">Websites &amp; systems</span> <span class="line">built with <em class="accent">intent</em></span>',
      "hero.desc": "I’m Paulo Henrique, a software developer. I build business websites and web systems — from landing pages to cloud-based POS — for businesses that need real results.",
      "hero.cta": "See my work",
      "hero.scroll": "Scroll",

      "manifesto.eyebrow": "(01) — Manifesto",
      "manifesto.text": "A club, a law firm, a construction company, a snack shop. Different businesses, the same question: what does this person need to find first? Every website and every system I build starts with the answer.",

      "sites.eyebrow": "(02) — Recent websites",
      "sites.title": "Websites",
      "cta.site": "Visit website <i>↗</i>",
      "stack.calc": "Calculator",
      "vos.cat": "Law firm · Itabuna, Brazil",
      "vos.aria": "Open the VOS Advocacia website (new tab)",
      "vos.alt": "Homepage of the Victor Menezes Advocacia website",
      "avanco.cat": "Construction &amp; real estate · Ipiaú, Brazil",
      "avanco.aria": "Open the Avanço Engenharia website (new tab)",
      "avanco.alt": "Homepage of the Avanço Engenharia website",
      "aabb.cat": "Leisure &amp; sports club · Ipiaú, Brazil",
      "aabb.aria": "Open the AABB Ipiaú website (new tab)",
      "aabb.alt": "Homepage of the AABB Ipiaú club website",
      "cambio.cat": "Currency exchange · Daily rates &amp; WhatsApp",
      "cambio.aria": "Open the Cambio Express website (new tab)",
      "cambio.alt": "Homepage of the Cambio Express website showing today’s rates",
      "vidaleve.cat": "Health &amp; weight loss · 2026 redesign",
      "vidaleve.aria": "Open the Vida Leve website (new tab)",
      "vidaleve.alt": "Homepage of the Vida Leve weight-loss website",

      "systems.eyebrow": "(03) — Systems",
      "systems.title": 'Systems that <em class="accent">run</em>',
      "systems.intro": "Behind the counter: login, checkout, inventory and finances working every single day.",
      "cta.system": "Open system <i>↗</i>",
      "coxinha.desc": "Sales and finance control for a snack shop: fast checkout, per-product inventory and a dashboard filtered by period. Installs as an app (PWA) on the counter laptop.",
      "coxinha.aria": "Open the Coxinha do Barão system (new tab)",
      "coxinha.alt": "Login screen of the Coxinha do Barão system",
      "pdv.desc": "Cloud-based, multi-tenant point of sale for supermarkets: barcode scanning, real-time inventory, finances, HR and audit logs with per-store isolation.",
      "pdv.aria": "Open the PDV Boa Praça system (new tab)",
      "pdv.alt": "Login screen of the Boa Praça supermarket point of sale",

      "us.eyebrow": "(04) — United States",
      "us.title": 'Projects in the <em class="accent">US</em>',
      "us.status": "First project live",
      "us.intro": "Websites and systems for businesses in the United States, in English and Spanish, with fully remote collaboration. The first one is already live in Tampa, Florida.",
      "us.slot": "Open slot",
      "maf.cat": "Custom picture framing · Tampa, FL",
      "maf.en": "English",
      "maf.seo": "Local SEO",
      "maf.aria": "Open the Master Art and Frame website (new tab)",
      "maf.alt": "Homepage of the Master Art and Frame website",
      "us.s1.t": "Small business websites",
      "us.s1.d": "Restaurants, clinics and local services: a clear, fast, bilingual online presence.",
      "us.s2.t": "Web systems",
      "us.s2.d": "Scheduling, orders, inventory and dashboards built around how you operate.",
      "us.s3.t": "Landing pages",
      "us.s3.d": "Conversion-focused campaign pages in English and Spanish.",
      "us.cta": "Start a project",

      "lab.eyebrow": "(05) — Lab",
      "lab.intro": "Smaller projects where I practice the fundamentals: vanilla JavaScript, accessibility and interface design.",
      "lab.clock.name": "Digital Clock",
      "lab.clock.desc": "Clock, stopwatch with laps and a timer with alarm",
      "lab.login.name": "Login Screen",
      "lab.login.desc": "Accessible validation, show password and loading states",
      "lab.calc.name": "Digital Calculator",
      "lab.calc.desc": "Keyboard support, history and math without eval()",
      "lab.simple.name": "Simple Portfolio",
      "lab.simple.desc": "A lightweight version of this portfolio, with filters and dark mode",

      "about.eyebrow": "(06) — About",
      "about.lead": 'I turn the needs of local businesses into digital products — balancing <em class="accent">aesthetics</em>, clarity and engineering.',
      "about.s1": "websites and systems live",
      "about.s2": "public repositories",
      "about.s3": "commits on recent projects",

      "process.eyebrow": "(07) — Process",
      "process.title": 'From problem<br>to <em class="accent">product</em>',
      "step1.t": "Understand",
      "step1.d": "Talk to the business: who the customer is, what they’re looking for and what needs to happen.",
      "step2.t": "Structure",
      "step2.d": "Sections, flows and hierarchy. In systems, the data and each user’s permissions.",
      "step3.t": "Design",
      "step3.d": "Typography, color and visual identity true to the brand — on any screen.",
      "step4.t": "Build",
      "step4.d": "Fast, accessible, responsive code, with security wherever there’s data.",
      "step5.t": "Launch",
      "step5.d": "Deployment, domain and fine-tuning with the website or system already in use.",

      "contact.eyebrow": "(08) — Contact",
      "contact.l1": "Is your business",
      "contact.l2": '<em class="accent">next?</em>',
      "contact.cta": "Talk to me on GitHub ↗",
      "footer.top": "Back to top ↑",
    },

    es: {
      "meta.title": "Paulo Henrique — Desarrollador de Software",
      "meta.desc": "Portafolio de Paulo Henrique: sitios web corporativos y sistemas web — VOS Advocacia, Avanço Engenharia, AABB Ipiaú, Cambio Express, Master Art and Frame, Coxinha do Barão y PDV Boa Praça.",
      "menu.open": "Menú",
      "menu.close": "Cerrar",
      "cursor.project": "Ver proyecto",
      "cursor.system": "Ver sistema",
      "lang.aria": "Idioma",
      "nav.aria": "Principal",
      "nav.mobileAria": "Menú móvil",
      "nav.sites": "Sitios",
      "nav.systems": "Sistemas",
      "nav.us": "EE.&nbsp;UU.",
      "nav.lab": "Lab",
      "nav.about": "Sobre mí",
      "nav.contact": "Contacto",

      "hero.eyebrow": "Disponible para proyectos — 2026",
      "hero.title": '<span class="line">Sitios y sistemas</span> <span class="line">hechos con <em class="accent">intención</em></span>',
      "hero.desc": "Soy Paulo Henrique, desarrollador de software. Creo sitios web corporativos y sistemas web — desde landing pages hasta puntos de venta en la nube — para negocios que necesitan resultados reales.",
      "hero.cta": "Ver trabajos",
      "hero.scroll": "Desliza",

      "manifesto.eyebrow": "(01) — Manifiesto",
      "manifesto.text": "Un club, un despacho de abogados, una constructora, una tienda de salados. Negocios distintos, la misma pregunta: ¿qué necesita encontrar primero esta persona? Cada sitio y cada sistema que construyo empieza por la respuesta.",

      "sites.eyebrow": "(02) — Sitios recientes",
      "sites.title": "Sitios",
      "cta.site": "Visitar sitio <i>↗</i>",
      "stack.calc": "Calculadora",
      "vos.cat": "Despacho de abogados · Itabuna, Brasil",
      "vos.aria": "Abrir el sitio de VOS Advocacia (nueva pestaña)",
      "vos.alt": "Página de inicio del sitio de Victor Menezes Advocacia",
      "avanco.cat": "Constructora e inmobiliaria · Ipiaú, Brasil",
      "avanco.aria": "Abrir el sitio de Avanço Engenharia (nueva pestaña)",
      "avanco.alt": "Página de inicio del sitio de Avanço Engenharia",
      "aabb.cat": "Club de ocio y deporte · Ipiaú, Brasil",
      "aabb.aria": "Abrir el sitio de AABB Ipiaú (nueva pestaña)",
      "aabb.alt": "Página de inicio del sitio del club AABB Ipiaú",
      "cambio.cat": "Casa de cambio · Cotizaciones y WhatsApp",
      "cambio.aria": "Abrir el sitio de Cambio Express (nueva pestaña)",
      "cambio.alt": "Página de inicio del sitio de Cambio Express con las cotizaciones del día",
      "vidaleve.cat": "Salud y pérdida de peso · Rediseño 2026",
      "vidaleve.aria": "Abrir el sitio de Vida Leve (nueva pestaña)",
      "vidaleve.alt": "Página de inicio del sitio Vida Leve sobre pérdida de peso",

      "systems.eyebrow": "(03) — Sistemas",
      "systems.title": 'Sistemas que <em class="accent">operan</em>',
      "systems.intro": "Detrás del mostrador: acceso, caja, inventario y finanzas funcionando todos los días.",
      "cta.system": "Abrir sistema <i>↗</i>",
      "coxinha.desc": "Control de ventas y finanzas para una tienda de salados: caja rápida, inventario por producto y panel con filtro por período. Se instala como aplicación (PWA) en la laptop del mostrador.",
      "coxinha.aria": "Abrir el sistema Coxinha do Barão (nueva pestaña)",
      "coxinha.alt": "Pantalla de acceso del sistema Coxinha do Barão",
      "pdv.desc": "Punto de venta en la nube, multi-tenant, para supermercados: lectura de código de barras, inventario en tiempo real, finanzas, RR. HH. y auditoría con aislamiento por tienda.",
      "pdv.aria": "Abrir el sistema PDV Boa Praça (nueva pestaña)",
      "pdv.alt": "Pantalla de acceso del punto de venta del supermercado Boa Praça",

      "us.eyebrow": "(04) — Estados Unidos",
      "us.title": 'Proyectos en <em class="accent">EE.&nbsp;UU.</em>',
      "us.status": "Primer proyecto en línea",
      "us.intro": "Sitios y sistemas para empresas en Estados Unidos, en inglés y español, con trabajo 100% remoto. El primero ya está en línea en Tampa, Florida.",
      "us.slot": "Cupo abierto",
      "maf.cat": "Enmarcado a medida · Tampa, FL",
      "maf.en": "En inglés",
      "maf.seo": "SEO local",
      "maf.aria": "Abrir el sitio de Master Art and Frame (nueva pestaña)",
      "maf.alt": "Página de inicio del sitio de Master Art and Frame",
      "us.s1.t": "Sitios para pequeñas empresas",
      "us.s1.d": "Restaurantes, clínicas y servicios locales: presencia clara, rápida y bilingüe.",
      "us.s2.t": "Sistemas web",
      "us.s2.d": "Reservas, pedidos, inventario y paneles hechos a la medida de tu operación.",
      "us.s3.t": "Landing pages",
      "us.s3.d": "Páginas de campaña enfocadas en conversión, en inglés y español.",
      "us.cta": "Empezar un proyecto",

      "lab.eyebrow": "(05) — Laboratorio",
      "lab.intro": "Proyectos más pequeños donde practico los fundamentos: JavaScript puro, accesibilidad e interfaz.",
      "lab.clock.name": "Reloj Digital",
      "lab.clock.desc": "Reloj, cronómetro con vueltas y temporizador con alarma",
      "lab.login.name": "Pantalla de Acceso",
      "lab.login.desc": "Validación accesible, mostrar contraseña y estados de carga",
      "lab.calc.name": "Calculadora Digital",
      "lab.calc.desc": "Teclado, historial y cálculos sin eval()",
      "lab.simple.name": "Portafolio Simple",
      "lab.simple.desc": "Versión ligera de este portafolio, con filtro y tema oscuro",

      "about.eyebrow": "(06) — Sobre mí",
      "about.lead": 'Transformo las necesidades de negocios locales en productos digitales — equilibrando <em class="accent">estética</em>, claridad e ingeniería.',
      "about.s1": "sitios y sistemas en línea",
      "about.s2": "repositorios públicos",
      "about.s3": "commits en proyectos recientes",

      "process.eyebrow": "(07) — Proceso",
      "process.title": 'Del problema<br>al <em class="accent">producto</em>',
      "step1.t": "Entender",
      "step1.d": "Conversar con el negocio: quién es el cliente, qué busca y qué tiene que pasar.",
      "step2.t": "Estructurar",
      "step2.d": "Secciones, flujos y jerarquía. En los sistemas, los datos y los permisos de cada usuario.",
      "step3.t": "Diseñar",
      "step3.d": "Tipografía, color e identidad visual coherentes con la marca — en cualquier pantalla.",
      "step4.t": "Construir",
      "step4.d": "Código rápido, accesible y responsivo, con seguridad donde hay datos.",
      "step5.t": "Publicar",
      "step5.d": "Despliegue, dominio y ajustes finos con el sitio o sistema ya en uso.",

      "contact.eyebrow": "(08) — Contacto",
      "contact.l1": "¿Tu negocio",
      "contact.l2": 'es el <em class="accent">próximo?</em>',
      "contact.cta": "Háblame por GitHub ↗",
      "footer.top": "Volver arriba ↑",
    },
  };

  let lang = LANGS.includes(window.__lang) ? window.__lang : "pt";
  const ouvintes = [];
  const t = (k) => dict[lang][k] ?? dict.pt[k] ?? k;
  const pares = (el) => el.dataset.i18nAttr.split(";").map((p) => p.split(":").map((s) => s.trim()));

  // o português é colhido do HTML antes de qualquer troca (e antes do split das animações)
  document.querySelectorAll("[data-i18n]").forEach((el) => { dict.pt[el.dataset.i18n] ??= el.innerHTML.trim(); });
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => pares(el).forEach(([a, k]) => { dict.pt[k] ??= el.getAttribute(a); }));

  function aplicar() {
    const d = document.documentElement;
    d.lang = lang === "pt" ? "pt-BR" : lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.dataset.i18n);
      if (el.innerHTML.trim() !== v) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => pares(el).forEach(([a, k]) => el.setAttribute(a, t(k))));
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    d.classList.remove("i18n-wait");
  }

  function definir(novo) {
    if (!LANGS.includes(novo) || novo === lang) return;
    lang = novo;
    try { localStorage.setItem("lang", novo); } catch (e) {}
    // link compartilhável: ?lang=en / ?lang=es (português é o padrão, sem parâmetro)
    const url = new URL(location.href);
    if (novo === "pt") url.searchParams.delete("lang");
    else url.searchParams.set("lang", novo);
    history.replaceState(history.state, "", url);
    aplicar();
    ouvintes.forEach((fn) => fn(lang));
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lang]");
    if (b) definir(b.dataset.lang);
  });

  aplicar();
  return { t, definir, on: (fn) => ouvintes.push(fn), get lang() { return lang; } };
})();
