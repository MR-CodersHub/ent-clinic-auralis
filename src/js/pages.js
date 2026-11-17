/* Shared interactive behaviour for the public pages. */
(function () {
  var A = window.AURALIS;

  /* ---------------- services listing ---------------- */
  var serviceGrid = document.getElementById("services-grid");
  if (serviceGrid && A && A.services.length) {
    var serviceState = { category: "All" };

    function renderServiceGrid() {
      var items = A.services.filter(function (service) {
        return serviceState.category === "All" || service.category === serviceState.category;
      });
      serviceGrid.innerHTML = items
        .map(function (service) {
          return (
            '<a class="service-tile" href="service-details.html?id=' + encodeURIComponent(service.id) + '">' +
            '<div class="tile-top">' +
            '<span class="tile-cat">' + service.number + " / " + service.category + "</span>" +
            '<span class="tile-icon">' + A.icon(service.icon) + "</span>" +
            "</div>" +
            "<h3>" + service.title + "</h3>" +
            "<p>" + service.short + "</p>" +
            '<div class="tile-foot"><strong>' + service.price + "</strong><span class=\"arrow\">↗</span></div>" +
            "</a>"
          );
        })
        .join("");
      var count = document.querySelector("[data-service-count]");
      if (count) count.textContent = items.length + (items.length === 1 ? " service" : " services");
      var empty = document.getElementById("services-empty");
      if (empty) empty.hidden = items.length > 0;
    }

    document.querySelectorAll("[data-service-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        serviceState.category = button.getAttribute("data-service-filter");
        document.querySelectorAll("[data-service-filter]").forEach(function (item) {
          var active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        renderServiceGrid();
      });
    });

    renderServiceGrid();
  }

  /* ---------------- FAQ accordions ---------------- */
  document.addEventListener("click", function (event) {
    var question = event.target.closest(".faq-question");
    if (!question) return;
    var item = question.closest(".faq-item");
    if (!item) return;
    var wasOpen = item.classList.contains("open");
    var list = item.parentElement;
    if (list) {
      list.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          var openButton = openItem.querySelector(".faq-question");
          if (openButton) openButton.setAttribute("aria-expanded", "false");
        }
      });
    }
    item.classList.toggle("open", !wasOpen);
    question.setAttribute("aria-expanded", String(!wasOpen));
  });

  /* ---------------- FAQ search + category filter ---------------- */
  var faqSearch = document.getElementById("faq-search");
  var faqEmpty = document.getElementById("faq-empty");
  var faqGroups = document.querySelectorAll("[data-faq-group]");
  var faqCategory = "All";

  function filterFaqs() {
    if (!faqGroups.length) return;
    var term = faqSearch ? faqSearch.value.trim().toLowerCase() : "";
    var visibleTotal = 0;

    faqGroups.forEach(function (group) {
      var groupCategory = group.getAttribute("data-faq-category") || "";
      var categoryMatch = faqCategory === "All" || groupCategory === faqCategory;
      var groupVisible = 0;

      group.querySelectorAll(".faq-item").forEach(function (item) {
        var textMatch = !term || item.textContent.toLowerCase().indexOf(term) !== -1;
        var visible = categoryMatch && textMatch;
        item.hidden = !visible;
        if (visible) {
          groupVisible += 1;
          visibleTotal += 1;
        }
      });

      group.hidden = !categoryMatch || groupVisible === 0;
    });

    if (faqEmpty) faqEmpty.hidden = visibleTotal > 0;
    var count = document.querySelector("[data-faq-count]");
    if (count) count.textContent = visibleTotal + (visibleTotal === 1 ? " answer" : " answers");
  }

  if (faqSearch) {
    faqSearch.addEventListener("input", filterFaqs);
  }
  document.querySelectorAll("[data-faq-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      faqCategory = button.getAttribute("data-faq-filter");
      document.querySelectorAll("[data-faq-filter]").forEach(function (item) {
        var active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      filterFaqs();
    });
  });
  if (faqGroups.length) filterFaqs();

  /* ---------------- pricing billing toggle ---------------- */
  var billingButtons = document.querySelectorAll("[data-billing]");
  if (billingButtons.length) {
    var applyBilling = function (mode) {
      billingButtons.forEach(function (button) {
        var active = button.getAttribute("data-billing") === mode;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      document.querySelectorAll("[data-price-monthly]").forEach(function (el) {
        el.textContent = mode === "annual" ? el.getAttribute("data-price-annual") : el.getAttribute("data-price-monthly");
      });
      document.querySelectorAll("[data-price-suffix]").forEach(function (el) {
        el.textContent = mode === "annual" ? "/ year" : "/ month";
      });
      document.querySelectorAll("[data-save-note]").forEach(function (el) {
        el.textContent = mode === "annual" ? "Save 15% with annual billing" : "Flexible monthly billing";
      });
    };
    billingButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyBilling(button.getAttribute("data-billing"));
      });
    });
    applyBilling("monthly");
  }

  /* ---------------- countdown ---------------- */
  var countdowns = document.querySelectorAll("[data-countdown]");
  countdowns.forEach(function (countdown) {
    var target = new Date(countdown.getAttribute("data-countdown")).getTime();
    var daysEl = countdown.querySelector("[data-cd-days]");
    var hoursEl = countdown.querySelector("[data-cd-hours]");
    var minutesEl = countdown.querySelector("[data-cd-minutes]");
    var secondsEl = countdown.querySelector("[data-cd-seconds]");

    function pad(value) {
      return String(value).padStart(2, "0");
    }

    function tick() {
      var diff = target - Date.now();
      if (isNaN(target)) return;
      if (diff <= 0) {
        if (daysEl) daysEl.textContent = "00";
        if (hoursEl) hoursEl.textContent = "00";
        if (minutesEl) minutesEl.textContent = "00";
        if (secondsEl) secondsEl.textContent = "00";
        return;
      }
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var minutes = Math.floor((diff % 3600000) / 60000);
      var seconds = Math.floor((diff % 60000) / 1000);
      if (daysEl) daysEl.textContent = pad(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minutesEl) minutesEl.textContent = pad(minutes);
      if (secondsEl) secondsEl.textContent = pad(seconds);
    }

    tick();
    setInterval(tick, 1000);
  });

  /* ---------------- stat counters ---------------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var end = parseFloat(el.getAttribute("data-count"));
          var suffix = el.getAttribute("data-suffix") || "";
          var decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals"), 10) : 0;
          var started = performance.now();
          var duration = 1200;
          function step(now) {
            var progress = Math.min((now - started) / duration, 1);
            var value = end * (1 - Math.pow(1 - progress, 3));
            el.textContent = value.toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = end.toFixed(decimals) + suffix;
          }
          requestAnimationFrame(step);
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }
})();
