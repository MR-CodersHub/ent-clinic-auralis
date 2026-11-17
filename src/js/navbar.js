(function () {
  var THEME_KEY = "auralis-theme";
  var DIR_KEY = "auralis-dir";

  var pathname = window.location.pathname.replace(/\\/g, "/");
  var inPagesFolder = /\/pages\//i.test(pathname);
  var root = inPagesFolder ? "../" : "./";
  var currentPage = (pathname.split("/").pop() || "index.html").toLowerCase();

  function url(target) {
    return root + target;
  }

  var activeMap = {
    "index.html": "home",
    "home-2.html": "home-2",
    "about.html": "about",
    "services.html": "services",
    "service-details.html": "services",
    "pricing.html": "pricing",
    "blog.html": "blog",
    "blog-details.html": "blog",
    "contact.html": "contact",
    "faq.html": "faq",
    "404.html": "",
    "coming-soon.html": "",
    "privacy-policy.html": "",
    "terms-of-service.html": "",
    "login.html": "",
    "signup.html": ""
  };
  var active = activeMap[currentPage] || "";

  var icons = {
    sun:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>',
    moon:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z"></path></svg>',
    swap:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h15l-3-3M20 17H5l3 3"></path></svg>'
  };

  var socialIcons = {
    fb: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    li: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    tw: '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>'
  };

  var navItems = [
    { key: "home", label: "Home", href: url("index.html") },
    { key: "home-2", label: "Home 2", href: url("pages/home-2.html") },
    { key: "about", label: "About", href: url("pages/about.html") },
    { key: "services", label: "Services", href: url("pages/services.html") },
    { key: "blog", label: "Blog", href: url("pages/blog.html") },
    { key: "contact", label: "Contact", href: url("pages/contact.html") }
  ];

  var navMarkup = navItems
    .map(function (item) {
      var cls = item.key === active ? ' class="active"' : "";
      var aria = item.key === active ? ' aria-current="page"' : "";
      return '<a href="' + item.href + '"' + cls + aria + ">" + item.label + "</a>";
    })
    .join("");

  var headerHost = document.querySelector("[data-site-header]");
  if (headerHost) {
    headerHost.innerHTML =
      '<header class="site-header site-header-floating">' +
      '<div class="scroll-progress-bar" id="scroll-progress" aria-hidden="true"></div>' +
      '<div class="nav-pill-container">' +
      '<a class="nav-brand" href="' + url("index.html") + '" aria-label="Auralis ENT Clinic home">' +
      '<span class="nav-brand-emblem">' +
      '<img src="' + url("assets/logo.png") + '" alt="Auralis Logo" class="brand-logo-img">' +
      '</span>' +
      '<span class="nav-brand-text">AURALIS</span>' +
      '</a>' +
      '<nav class="main-nav" id="primary-nav" aria-label="Primary navigation">' +
      navMarkup +
      '<div class="menu-dropdown-tools">' +
      '<button class="menu-tool-btn" type="button" data-theme-toggle aria-label="Switch to dark mode">' +
      '<span data-theme-icon>' + icons.moon + '</span><span data-theme-text>Dark mode</span>' +
      '</button>' +
      '<button class="menu-tool-btn" type="button" data-dir-toggle aria-label="Switch to right-to-left layout">' +
      icons.swap + '<span data-dir-label>RTL</span>' +
      '</button>' +
      '</div>' +
      '</nav>' +
      '<div class="nav-right-group">' +
      '<div class="nav-tools nav-tools-desktop">' +
      '<button class="icon-btn" type="button" data-theme-toggle aria-label="Switch to dark mode" title="Toggle dark / light mode">' +
      '<span data-theme-icon>' + icons.moon + '</span>' +
      '</button>' +
      '<button class="icon-btn dir-btn" type="button" data-dir-toggle aria-label="Switch to right-to-left layout" title="Toggle writing direction">' +
       '<span data-dir-label>RTL</span>' +
      '</button>' +
      '</div>' +
      '<a class="nav-pill-cta" href="' + url("pages/contact.html") + '#appointment" aria-label="Book appointment" title="Book appointment">' +
      '<span class="cta-text">Book appointment</span><span class="cta-arrow">↗</span>' +
      '</a>' +
      '<button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span></button>' +
      '</div>' +
      '</div>' +
      '</header>';
  }

  var footerHost = document.querySelector("[data-site-footer]");
  if (footerHost) {
    footerHost.innerHTML =
      '<footer class="site-footer">' +
      '<div class="container footer-main-grid">' +
      '<div class="footer-brand-box">' +
      '<a class="footer-brand-link" href="' + url("index.html") + '" aria-label="Auralis home">' +
      '<span class="footer-brand-emblem"><img src="' + url("assets/logo.png") + '" alt="Auralis Logo"></span>' +
      '<span class="footer-brand-title">Auralis</span>' +
      '</a>' +
      '<p class="footer-brand-desc">445 Stanningley Road, Leeds, LS13 4PN, United Kingdom.<br>Specialist ENT &amp; Hearing Care built around you.</p>' +
      '<div class="footer-social-row">' +
      '<a href="https://facebook.com" class="social-btn" target="_blank" rel="noopener" aria-label="Facebook">' + socialIcons.fb + '</a>' +
      '<a href="https://linkedin.com" class="social-btn" target="_blank" rel="noopener" aria-label="LinkedIn">' + socialIcons.li + '</a>' +
      '<a href="https://twitter.com" class="social-btn" target="_blank" rel="noopener" aria-label="Twitter / X">' + socialIcons.tw + '</a>' +
      '<a href="https://instagram.com" class="social-btn" target="_blank" rel="noopener" aria-label="Instagram">' + socialIcons.ig + '</a>' +
      '</div>' +
      '</div>' +
      '<div class="footer-col">' +
      '<h4 class="footer-col-title">EXPLORE</h4>' +
      '<ul class="footer-col-links">' +
      '<li><a href="' + url("pages/service-details.html?id=ear-hearing") + '">Ear &amp; Hearing Care</a></li>' +
      '<li><a href="' + url("pages/service-details.html?id=nose-sinus") + '">Nose &amp; Sinus Treatment</a></li>' +
      '<li><a href="' + url("pages/service-details.html?id=throat-voice") + '">Throat &amp; Voice Care</a></li>' +
      '<li><a href="' + url("pages/services.html#paediatric") + '">Paediatric ENT Care</a></li>' +
      '<li><a href="' + url("pages/services.html") + '">View All Services</a></li>' +
      '</ul>' +
      '</div>' +
      '<div class="footer-col">' +
      '<h4 class="footer-col-title">KNOW MORE</h4>' +
      '<ul class="footer-col-links">' +
      '<li><a href="' + url("pages/home-2.html") + '">Hearing Studio</a></li>' +
      '<li><a href="' + url("pages/pricing.html") + '">Pricing &amp; Health Plans</a></li>' +
      '<li><a href="' + url("pages/FAQ.html") + '">Frequently Asked Questions</a></li>' +
      '<li><a href="' + url("pages/blog.html") + '">Clinical Blog &amp; Guides</a></li>' +
      '<li><a href="' + url("pages/login.html") + '">Patient Portal Login</a></li>' +
      '</ul>' +
      '</div>' +
      '<div class="footer-col">' +
      '<h4 class="footer-col-title">ABOUT</h4>' +
      '<ul class="footer-col-links">' +
      '<li><a href="' + url("pages/about.html") + '">Our Story &amp; Mission</a></li>' +
      '<li><a href="' + url("pages/about.html#team") + '">Consultant Doctors</a></li>' +
      '<li><a href="' + url("pages/about.html#facilities") + '">Clinic Facilities</a></li>' +
      '<li><a href="' + url("pages/contact.html") + '">Contact &amp; Directions</a></li>' +
      '<li><a href="' + url("pages/contact.html#appointment") + '">Book a Consultation</a></li>' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '<div class="container"><div class="footer-divider-line"></div></div>' +
      '<div class="container footer-bottom-bar">' +
      '<span>© <span data-year></span> Auralis ENT Clinic. All rights reserved.</span>' +
      '<div class="footer-legal-links">' +
      '<a href="' + url("pages/Privacy-policy.html") + '">Privacy Policy</a>' +
      '<a href="' + url("pages/Terms-of-service.html") + '">Terms of Service</a>' +
      '<a href="' + url("pages/FAQ.html") + '">Patient FAQ</a>' +
      '</div>' +
      '</div>' +
      '</footer>';
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var menuButton = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });
    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(event.target) || menuButton.contains(event.target)) return;
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  }

  function syncThemeButton() {
    var theme = document.documentElement.getAttribute("data-theme") || "light";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("aria-pressed", String(theme === "dark"));
      var icon = btn.querySelector("[data-theme-icon]");
      if (icon) icon.innerHTML = theme === "dark" ? icons.sun : icons.moon;
      var text = btn.querySelector("[data-theme-text]");
      if (text) text.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    });
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.documentElement.classList.add("theme-transitioning");
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (error) {
        /* storage can be unavailable on file:// */
      }
      syncThemeButton();
      document.dispatchEvent(new CustomEvent("auralis:themechange", { detail: { theme: next } }));
      setTimeout(function () {
        document.documentElement.classList.remove("theme-transitioning");
      }, 400);
    });
  });
  syncThemeButton();

  function syncDirButton() {
    var dir = document.documentElement.getAttribute("dir") || "ltr";
    document.querySelectorAll("[data-dir-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", dir === "rtl" ? "Switch to left-to-right layout" : "Switch to right-to-left layout");
      btn.setAttribute("aria-pressed", String(dir === "rtl"));
      var label = btn.querySelector("[data-dir-label]");
      if (label) label.textContent = dir === "rtl" ? "LTR" : "RTL";
    });
  }

  document.querySelectorAll("[data-dir-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
      document.documentElement.setAttribute("dir", next);
      try {
        localStorage.setItem(DIR_KEY, next);
      } catch (error) {
        /* storage can be unavailable on file:// */
      }
      syncDirButton();
      document.dispatchEvent(new CustomEvent("auralis:dirchange", { detail: { dir: next } }));
    });
  });
  syncDirButton();

  /* ---------- Scroll listener (header elevation, progress bar, back to top) ---------- */
  var header = document.querySelector(".site-header");
  var progressBar = document.getElementById("scroll-progress");
  var backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.setAttribute("title", "Back to top");
  backToTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>';
  document.body.appendChild(backToTop);

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  var ticking = false;
  function onScroll() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (header) {
      if (scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    if (progressBar && docHeight > 0) {
      var progress = Math.min(Math.max((scrollY / docHeight) * 100, 0), 100);
      progressBar.style.width = progress + "%";
    }

    if (backToTop) {
      if (scrollY > 320) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }

    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- Scroll reveal IntersectionObserver ---------- */
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.08
    });

    function initScrollReveals() {
      var targets = document.querySelectorAll(
        ".service-card, .service-tile, .doctor-card, .pricing-card, .blog-card, " +
        ".trust-grid > div, .care-points > div, .intro-visual, .intro-copy, " +
        ".section-heading, .process-step, .value-card, .stat-item, .contact-method, " +
        ".form-card, .hours-box, .appointment-inner, .reveal-on-scroll"
      );

      targets.forEach(function (el) {
        if (!el.classList.contains("reveal-ready")) {
          el.classList.add("reveal-ready");

          var parent = el.parentElement;
          if (parent && (parent.classList.contains("service-cards") ||
                         parent.classList.contains("trust-grid") ||
                         parent.classList.contains("doctor-grid") ||
                         parent.classList.contains("care-points") ||
                         parent.classList.contains("grid"))) {
            var siblings = Array.prototype.slice.call(parent.children);
            var childIndex = siblings.indexOf(el);
            if (childIndex > 0) {
              el.style.transitionDelay = (childIndex * 0.09) + "s";
            }
          }

          revealObserver.observe(el);
        }
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initScrollReveals);
    } else {
      initScrollReveals();
    }

    document.addEventListener("auralis:render", function () {
      setTimeout(initScrollReveals, 60);
    });
  }

  if (window.matchMedia) {
    var media = window.matchMedia("(prefers-color-scheme: dark)");
    var handleSystemChange = function (event) {
      var stored = null;
      try {
        stored = localStorage.getItem(THEME_KEY);
      } catch (error) {
        stored = null;
      }
      if (stored) return;
      document.documentElement.setAttribute("data-theme", event.matches ? "dark" : "light");
      syncThemeButton();
    };
    if (media.addEventListener) media.addEventListener("change", handleSystemChange);
    else if (media.addListener) media.addListener(handleSystemChange);
  }
})();
