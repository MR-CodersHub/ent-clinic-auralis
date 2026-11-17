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
    "home-2.html": "home",
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

  var navItems = [
    { key: "home", label: "Home", href: url("index.html") },
    { key: "services", label: "Services", href: url("pages/services.html") },
    { key: "about", label: "About", href: url("pages/about.html") },
    { key: "pricing", label: "Pricing", href: url("pages/pricing.html") },
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
      '<header class="site-header">' +
      '<div class="container nav-wrap">' +
      '<a class="brand" href="' + url("index.html") + '" aria-label="Auralis ENT Clinic home">' +
      '<span class="brand-mark" aria-hidden="true">✳</span>' +
      "<span>AURALIS<small>EAR · NOSE · THROAT</small></span>" +
      "</a>" +
      '<button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span></button>' +
      '<nav class="main-nav" id="primary-nav" aria-label="Primary navigation">' + navMarkup + "</nav>" +
      '<div class="nav-tools">' +
      '<button class="icon-btn" type="button" data-theme-toggle aria-label="Switch to dark mode" title="Toggle dark / light mode">' +
      '<span data-theme-icon>' + icons.moon + "</span>" +
      "</button>" +
      '<button class="icon-btn dir-btn" type="button" data-dir-toggle aria-label="Switch to right-to-left layout" title="Toggle writing direction">' +
      icons.swap + '<span data-dir-label>RTL</span>' +
      "</button>" +
      "</div>" +
      '<a class="nav-cta" href="' + url("pages/contact.html") + '#appointment">Book an appointment <span>↗</span></a>' +
      "</div>" +
      "</header>";
  }

  var footerHost = document.querySelector("[data-site-footer]");
  if (footerHost) {
    footerHost.innerHTML =
      '<footer class="site-footer">' +
      '<div class="container footer-top">' +
      '<a class="brand brand-footer" href="' + url("index.html") + '"><span class="brand-mark" aria-hidden="true">✳</span><span>AURALIS<small>EAR · NOSE · THROAT</small></span></a>' +
      "<p>Clear answers. Thoughtful care.<br>A healthier you.</p>" +
      '<div class="footer-links">' +
      '<a href="' + url("pages/services.html") + '">Services</a>' +
      '<a href="' + url("pages/about.html") + '">About</a>' +
      '<a href="' + url("pages/pricing.html") + '">Pricing</a>' +
      '<a href="' + url("pages/blog.html") + '">Blog</a>' +
      '<a href="' + url("pages/contact.html") + '">Contact</a>' +
      '<a href="' + url("pages/home-2.html") + '">Home II</a>' +
      '<a href="' + url("pages/login.html") + '">Patient login</a>' +
      "</div>" +
      "</div>" +
      '<div class="container footer-bottom">' +
      '<span>© <span data-year></span> Auralis ENT Clinic. All rights reserved.</span>' +
      '<span class="footer-utility">' +
      '<a href="' + url("pages/FAQ.html") + '">FAQ</a>' +
      '<a href="' + url("pages/Privacy-policy.html") + '">Privacy</a>' +
      '<a href="' + url("pages/Terms-of-service.html") + '">Terms</a>' +
      "</span>" +
      '<span>Designed around your wellbeing.</span>' +
      "</div>" +
      "</footer>";
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

  var themeButton = document.querySelector("[data-theme-toggle]");
  var themeIcon = document.querySelector("[data-theme-icon]");
  function syncThemeButton() {
    var theme = document.documentElement.getAttribute("data-theme") || "light";
    if (!themeButton) return;
    themeButton.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    themeButton.setAttribute("aria-pressed", String(theme === "dark"));
    if (themeIcon) themeIcon.innerHTML = theme === "dark" ? icons.sun : icons.moon;
  }
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (error) {
        /* storage can be unavailable on file:// */
      }
      syncThemeButton();
      document.dispatchEvent(new CustomEvent("auralis:themechange", { detail: { theme: next } }));
    });
  }
  syncThemeButton();

  var dirButton = document.querySelector("[data-dir-toggle]");
  var dirLabel = document.querySelector("[data-dir-label]");
  function syncDirButton() {
    var dir = document.documentElement.getAttribute("dir") || "ltr";
    if (!dirButton) return;
    dirButton.setAttribute("aria-label", dir === "rtl" ? "Switch to left-to-right layout" : "Switch to right-to-left layout");
    dirButton.setAttribute("aria-pressed", String(dir === "rtl"));
    if (dirLabel) dirLabel.textContent = dir === "rtl" ? "LTR" : "RTL";
  }
  if (dirButton) {
    dirButton.addEventListener("click", function () {
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
  }
  syncDirButton();

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
