/* Dynamic service detail renderer driven by ?id= */
(function () {
  var A = window.AURALIS;
  if (!A) return;

  var shell = document.getElementById("service-shell");
  if (!shell) return;

  var params = new URLSearchParams(window.location.search);
  var service = A.getService(params.get("id"));
  var missing = document.getElementById("service-missing");

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  if (!service) {
    shell.hidden = true;
    if (missing) missing.hidden = false;
    document.title = "Service not found | Auralis ENT Clinic";
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "The Auralis service you requested could not be found. Browse all ENT services or contact our clinic.");
    return;
  }

  document.title = service.title + " | Auralis ENT Clinic";
  var descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.setAttribute("content", service.description);

  var hero = document.getElementById("service-hero");
  if (hero) hero.style.backgroundImage = 'url("' + service.heroImage + '")';

  var eyebrow = document.querySelector("[data-service-eyebrow]");
  var crumb = document.querySelector("[data-service-crumb]");
  var heroTitle = document.querySelector("[data-service-title]");
  var heroText = document.querySelector("[data-service-desc]");
  if (eyebrow) eyebrow.textContent = "SERVICE " + service.number + " · " + service.category.toUpperCase();
  if (crumb) crumb.textContent = service.title;
  if (heroTitle) {
    var words = service.title.split(" ");
    var last = words.pop();
    heroTitle.innerHTML = escapeHtml(words.join(" ")) + " <em>" + escapeHtml(last) + "</em>";
  }
  if (heroText) heroText.textContent = service.description;

  var artLabel = document.querySelector("[data-service-art-label]");
  var artIcon = document.querySelector("[data-service-art-icon]");
  var artNote = document.querySelector("[data-service-art-note]");
  if (artLabel) artLabel.textContent = service.number + " / " + service.category.toUpperCase();
  if (artIcon) artIcon.innerHTML = A.icon(service.icon);
  if (artNote) artNote.textContent = service.tagline.toUpperCase();

  var tagline = document.querySelector("[data-service-tagline]");
  var intro = document.querySelector("[data-service-intro]");
  var features = document.querySelector("[data-service-features]");
  var facts = document.querySelector("[data-service-facts]");

  if (tagline) {
    var taglineWords = service.tagline.split(" ");
    var taglineLast = taglineWords.pop();
    tagline.innerHTML = escapeHtml(taglineWords.join(" ")) + " <em>" + escapeHtml(taglineLast) + "</em>";
  }
  if (intro) intro.textContent = service.intro;
  if (features) {
    features.innerHTML = service.features
      .map(function (feature) {
        return "<li>" + A.icon("check") + escapeHtml(feature) + "</li>";
      })
      .join("");
  }
  if (facts) {
    facts.innerHTML =
      '<div>' + A.icon("calendar") + "<span>" + escapeHtml(service.duration) + "</span></div>" +
      '<div>' + A.icon("heart") + "<span>Consultant-led care</span></div>" +
      '<div>' + A.icon("shield") + "<span>Clear written plan</span></div>" +
      '<div>' + A.icon("clock") + "<span>Evening appointments</span></div>";
  }

  var included = document.querySelector("[data-service-included]");
  if (included) {
    included.innerHTML = service.included
      .map(function (item) {
        return (
          '<article class="included-card">' +
          '<div class="icon-box">' + A.icon(item.icon) + "</div>" +
          "<h3>" + escapeHtml(item.title) + "</h3>" +
          "<p>" + escapeHtml(item.text) + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  var steps = document.querySelector("[data-service-steps]");
  if (steps) {
    steps.innerHTML = service.steps
      .map(function (step, index) {
        return (
          '<article class="process-card">' +
          "<span>" + String(index + 1).padStart(2, "0") + "</span>" +
          "<h3>" + escapeHtml(step.title) + "</h3>" +
          "<p>" + escapeHtml(step.text) + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  var tiers = document.querySelector("[data-service-tiers]");
  if (tiers) {
    tiers.innerHTML = service.plans
      .map(function (plan) {
        return (
          '<article class="tier-card' + (plan.featured ? " featured" : "") + '">' +
          (plan.featured ? '<span class="tier-badge">Most chosen</span>' : "") +
          "<h3>" + escapeHtml(plan.name) + "</h3>" +
          '<span class="tier-note">' + escapeHtml(plan.note) + "</span>" +
          '<div class="tier-price">' + escapeHtml(plan.price) + "</div>" +
          "<ul>" +
          plan.features.map(function (feature) { return "<li>" + escapeHtml(feature) + "</li>"; }).join("") +
          "</ul>" +
          '<a class="button ' + (plan.featured ? "button-white" : "button-outline") + '" href="contact.html?service=' +
          encodeURIComponent(service.id) + '#appointment">Book this plan <span>↗</span></a>' +
          "</article>"
        );
      })
      .join("");
  }

  var faqs = document.querySelector("[data-service-faqs]");
  if (faqs) {
    faqs.innerHTML = service.faqs
      .map(function (faq, index) {
        return (
          '<div class="faq-item' + (index === 0 ? " open" : "") + '">' +
          '<button class="faq-question" type="button" aria-expanded="' + (index === 0 ? "true" : "false") + '">' +
          "<span>" + escapeHtml(faq.q) + '</span><span class="faq-icon" aria-hidden="true">+</span></button>' +
          '<div class="faq-answer"><div class="faq-answer-inner">' + escapeHtml(faq.a) + "</div></div>" +
          "</div>"
        );
      })
      .join("");
  }

  var related = document.querySelector("[data-service-related]");
  if (related) {
    related.innerHTML = A.services
      .filter(function (item) { return item.id !== service.id; })
      .slice(0, 3)
      .map(function (item) {
        return (
          '<a class="related-card" href="service-details.html?id=' + encodeURIComponent(item.id) + '">' +
          "<span>" + item.number + " / " + escapeHtml(item.category) + "</span>" +
          "<h3>" + escapeHtml(item.title) + "</h3>" +
          "<p>" + escapeHtml(item.short) + "</p>" +
          '<span class="text-link">Explore service <span>→</span></span>' +
          "</a>"
        );
      })
      .join("");
  }

  var ctaService = document.querySelector("[data-service-cta]");
  if (ctaService) ctaService.textContent = service.title.toLowerCase();
})();
