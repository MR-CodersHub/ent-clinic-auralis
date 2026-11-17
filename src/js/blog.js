/* Blog listing (search / filter / sort) and dynamic article rendering. */
(function () {
  var A = window.AURALIS;
  if (!A) return;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function slugify(value, index) {
    var base = String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return base + (index ? "-" + index : "");
  }

  function metaMarkup(post) {
    return (
      '<div class="post-meta">' +
      "<span>" + A.icon("calendar") + escapeHtml(post.dateLabel) + "</span>" +
      "<span>" + A.icon("clock") + escapeHtml(post.read) + "</span>" +
      "<span>" + A.icon("user") + escapeHtml(post.author) + "</span>" +
      "</div>"
    );
  }

  /* =========================================================
     Listing page
     ========================================================= */
  var blogGrid = document.getElementById("blog-grid");
  if (blogGrid) {
    var featuredHost = document.getElementById("featured-post");
    var filterHost = document.getElementById("blog-filters");
    var searchInput = document.getElementById("blog-search");
    var sortSelect = document.getElementById("blog-sort");
    var resultsHost = document.getElementById("blog-results");
    var emptyHost = document.getElementById("blog-empty");

    var categories = [];
    A.posts.forEach(function (post) {
      if (categories.indexOf(post.category) === -1) categories.push(post.category);
    });

    var params = new URLSearchParams(window.location.search);
    var initialCategory = params.get("category") || "All";
    if (
      initialCategory !== "All" &&
      !categories.some(function (category) {
        return category.toLowerCase() === initialCategory.toLowerCase();
      })
    ) {
      initialCategory = "All";
    }

    var state = {
      category: initialCategory,
      query: params.get("q") || "",
      sort: "newest"
    };
    if (searchInput) searchInput.value = state.query;

    function renderFilters() {
      if (!filterHost) return;
      var pills = ['<button class="pill" type="button" data-category="All" aria-pressed="false">All</button>'];
      categories.forEach(function (category) {
        var count = A.posts.filter(function (post) {
          return post.category === category;
        }).length;
        pills.push(
          '<button class="pill" type="button" data-category="' + escapeHtml(category) + '" aria-pressed="false">' +
            escapeHtml(category) + " <small>(" + count + ")</small></button>"
        );
      });
      filterHost.innerHTML = pills.join("");
      filterHost.querySelectorAll("[data-category]").forEach(function (button) {
        var match = button.getAttribute("data-category").toLowerCase() === state.category.toLowerCase();
        button.classList.toggle("active", match);
        button.setAttribute("aria-pressed", String(match));
        button.addEventListener("click", function () {
          state.category = button.getAttribute("data-category");
          renderFilters();
          render();
        });
      });
    }

    function renderFeatured(post) {
      if (!featuredHost) return;
      if (!post) {
        featuredHost.innerHTML = "";
        return;
      }
      featuredHost.innerHTML =
        '<article class="featured-post">' +
        '<a class="featured-media" href="blog-details.html?id=' + encodeURIComponent(post.id) + '">' +
        '<img src="' + post.image + '" alt="' + escapeHtml(post.title) + '" loading="lazy">' +
        "</a>" +
        '<div class="featured-copy">' +
        '<span class="featured-label">Editor’s pick · ' + escapeHtml(post.category) + "</span>" +
        "<h2><a href=\"blog-details.html?id=" + encodeURIComponent(post.id) + "\">" + escapeHtml(post.title) + "</a></h2>" +
        "<p>" + escapeHtml(post.excerpt) + "</p>" +
        metaMarkup(post) +
        '<a class="text-link mt-5" href="blog-details.html?id=' + encodeURIComponent(post.id) + '">Read the article <span>→</span></a>' +
        "</div>" +
        "</article>";
    }

    function cardMarkup(post) {
      return (
        '<article class="post-card">' +
        '<a class="post-thumb" href="blog-details.html?id=' + encodeURIComponent(post.id) + '">' +
        '<img src="' + post.image + '" alt="' + escapeHtml(post.title) + '" loading="lazy">' +
        "</a>" +
        '<div class="post-body">' +
        '<span class="post-tag">' + escapeHtml(post.category) + "</span>" +
        '<h3 class="post-title"><a href="blog-details.html?id=' + encodeURIComponent(post.id) + '">' + escapeHtml(post.title) + "</a></h3>" +
        '<p class="post-excerpt">' + escapeHtml(post.excerpt) + "</p>" +
        metaMarkup(post) +
        "</div>" +
        "</article>"
      );
    }

    function getFiltered() {
      var query = state.query.trim().toLowerCase();
      var items = A.posts.filter(function (post) {
        var categoryMatch = state.category === "All" || post.category.toLowerCase() === state.category.toLowerCase();
        if (!categoryMatch) return false;
        if (!query) return true;
        var haystack = [post.title, post.excerpt, post.category, post.author, post.tags.join(" ")].join(" ").toLowerCase();
        return haystack.indexOf(query) !== -1;
      });
      if (state.sort === "oldest") {
        items.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
      } else if (state.sort === "az") {
        items.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
      } else {
        items.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
      }
      return items;
    }

    function render() {
      var filtered = getFiltered();
      var isFiltered = state.category !== "All" || state.query.trim() !== "";
      var featuredSection = featuredHost ? featuredHost.closest("section") : null;
      var featured = isFiltered ? null : filtered[0] || null;
      var rest = isFiltered ? filtered : filtered.slice(1);
      if (featuredSection) featuredSection.hidden = isFiltered;
      renderFeatured(featured);
      blogGrid.innerHTML = rest.map(cardMarkup).join("");
      if (emptyHost) emptyHost.hidden = filtered.length > 0;
      if (resultsHost) {
        var label = filtered.length === 1 ? "article" : "articles";
        resultsHost.textContent = filtered.length + " " + label;
      }
      if (searchInput) {
        searchInput.setAttribute("aria-label", "Search articles");
      }
      try {
        var query = new URLSearchParams();
        if (state.category !== "All") query.set("category", state.category);
        if (state.query) query.set("q", state.query);
        var next = window.location.pathname.split("/").pop() + (query.toString() ? "?" + query.toString() : "");
        window.history.replaceState(null, "", next);
      } catch (error) {
        /* history is not available in every preview context */
      }
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.query = searchInput.value;
        render();
      });
    }
    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        state.sort = sortSelect.value;
        render();
      });
    }

    renderFilters();
    render();
  }

  /* =========================================================
     Detail page
     ========================================================= */
  var postShell = document.getElementById("post-shell");
  if (postShell) {
    var params = new URLSearchParams(window.location.search);
    var post = A.getPost(params.get("id"));
    var missing = document.getElementById("post-missing");

    if (!post) {
      postShell.hidden = true;
      if (missing) missing.hidden = false;
      document.title = "Article not found | Auralis ENT Clinic";
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", "The Auralis journal article you requested could not be found. Browse all articles or contact our team.");
      return;
    }

    document.title = post.title + " | Auralis Journal";
    var descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) descriptionMeta.setAttribute("content", post.excerpt);

    var hero = document.getElementById("post-hero");
    if (hero) hero.style.backgroundImage = 'url("' + post.image + '")';
    var categoryEl = document.querySelector("[data-post-category]");
    var titleEl = document.querySelector("[data-post-title]");
    var metaEl = document.querySelector("[data-post-meta]");
    var crumbEl = document.querySelector("[data-post-crumb]");
    var catLink = document.querySelector("[data-post-category-link]");

    if (categoryEl) categoryEl.textContent = post.category;
    if (titleEl) titleEl.textContent = post.title;
    if (crumbEl) crumbEl.textContent = post.title;
    if (catLink) {
      catLink.textContent = post.category;
      catLink.setAttribute("href", "blog.html?category=" + encodeURIComponent(post.category));
    }
    if (metaEl) {
      metaEl.innerHTML =
        "<span>" + A.icon("calendar") + escapeHtml(post.dateLabel) + "</span>" +
        "<span>" + A.icon("user") + escapeHtml(post.author) + "</span>" +
        "<span>" + A.icon("clock") + escapeHtml(post.read) + "</span>";
    }

    var body = document.getElementById("post-body");
    if (body) {
      var html = post.content
        .map(function (block, index) {
          if (block.type === "h2") return '<h2 id="' + slugify(block.text, index) + '">' + escapeHtml(block.text) + "</h2>";
          if (block.type === "h3") return "<h3>" + escapeHtml(block.text) + "</h3>";
          if (block.type === "p") return "<p>" + escapeHtml(block.text) + "</p>";
          if (block.type === "quote") return "<blockquote>" + escapeHtml(block.text) + "</blockquote>";
          if (block.type === "ul") {
            return "<ul>" + block.items.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + "</ul>";
          }
          if (block.type === "ol") {
            return "<ol>" + block.items.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + "</ol>";
          }
          return "";
        })
        .join("");
      html +=
        '<div class="article-tags">' +
        post.tags
          .map(function (tag) {
            return '<a href="blog.html?q=' + encodeURIComponent(tag) + '">#' + escapeHtml(tag) + "</a>";
          })
          .join("") +
        "</div>";
      body.innerHTML = html;
    }

    var tocHost = document.getElementById("post-toc");
    if (tocHost && body) {
      var headings = body.querySelectorAll("h2");
      if (headings.length) {
        tocHost.innerHTML =
          "<h3>In this article</h3><ol>" +
          Array.prototype.map
            .call(headings, function (heading) {
              return '<li><a href="#' + heading.id + '">' + escapeHtml(heading.textContent) + "</a></li>";
            })
            .join("") +
          "</ol>";
      } else {
        var tocCard = tocHost.closest(".sidebar-card");
        if (tocCard) tocCard.hidden = true;
      }
    }

    var authorHost = document.getElementById("post-author");
    if (authorHost) {
      var initials = post.author
        .replace(/^Dr\.\s*/, "")
        .split(" ")
        .map(function (part) { return part.charAt(0); })
        .join("")
        .slice(0, 2)
        .toUpperCase();
      authorHost.innerHTML =
        '<div class="author-box">' +
        '<div class="author-avatar" aria-hidden="true">' + initials + "</div>" +
        "<div><small>Written by</small><h3>" + escapeHtml(post.author) + "</h3>" +
        "<p>" + escapeHtml(post.role) + " · Auralis ENT Clinic</p></div>" +
        "</div>";
    }

    var shareHost = document.getElementById("post-share");
    if (shareHost) {
      var pageUrl = encodeURIComponent(window.location.href);
      var pageTitle = encodeURIComponent(post.title);
      shareHost.innerHTML =
        '<span>Share</span>' +
        '<a href="https://twitter.com/intent/tweet?text=' + pageTitle + '&url=' + pageUrl + '" target="_blank" rel="noopener" aria-label="Share on X">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20"/></svg></a>' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + pageUrl + '" target="_blank" rel="noopener" aria-label="Share on Facebook">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4v4h-3a1 1 0 0 0-1 1v3h4l-.5 4H15v8h-4v-8H8v-4h3V8a5 5 0 0 1 5-5Z"/></svg></a>' +
        '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl + '" target="_blank" rel="noopener" aria-label="Share on LinkedIn">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9v11M6 5v.01M11 20v-6a3 3 0 0 1 6 0v6M11 14v-5"/></svg></a>';
    }

    var recentHost = document.getElementById("post-recent");
    if (recentHost) {
      recentHost.innerHTML = A.posts
        .filter(function (item) { return item.id !== post.id; })
        .slice(0, 4)
        .map(function (item) {
          return (
            '<li><a href="blog-details.html?id=' + encodeURIComponent(item.id) + '">' + escapeHtml(item.title) +
            "<small>" + escapeHtml(item.category) + " · " + escapeHtml(item.read) + "</small></a></li>"
          );
        })
        .join("");
    }

    var categorySidebar = document.getElementById("post-categories");
    if (categorySidebar) {
      categorySidebar.innerHTML = A.posts
        .reduce(function (acc, item) {
          var current = acc.filter(function (entry) { return entry.category === item.category; })[0];
          if (current) current.count += 1;
          else acc.push({ category: item.category, count: 1 });
          return acc;
        }, [])
        .map(function (entry) {
          return (
            '<li><a href="blog.html?category=' + encodeURIComponent(entry.category) + '">' +
            escapeHtml(entry.category) + "<small>" + entry.count + " articles</small></a></li>"
          );
        })
        .join("");
    }

    var tagHost = document.getElementById("post-tags");
    if (tagHost) {
      var allTags = [];
      A.posts.forEach(function (item) {
        item.tags.forEach(function (tag) {
          if (allTags.indexOf(tag) === -1) allTags.push(tag);
        });
      });
      tagHost.innerHTML = allTags
        .map(function (tag) {
          return '<a href="blog.html?q=' + encodeURIComponent(tag) + '">#' + escapeHtml(tag) + "</a>";
        })
        .join("");
    }

    var relatedHost = document.getElementById("post-related");
    if (relatedHost) {
      var related = A.posts
        .filter(function (item) { return item.id !== post.id; })
        .sort(function (a, b) {
          var aScore = a.category === post.category ? 1 : 0;
          var bScore = b.category === post.category ? 1 : 0;
          return bScore - aScore;
        })
        .slice(0, 3);
      relatedHost.innerHTML = related
        .map(function (item) {
          return (
            '<article class="post-card"><a class="post-thumb" href="blog-details.html?id=' + encodeURIComponent(item.id) + '">' +
            '<img src="' + item.image + '" alt="' + escapeHtml(item.title) + '" loading="lazy"></a>' +
            '<div class="post-body"><span class="post-tag">' + escapeHtml(item.category) + "</span>" +
            '<h3 class="post-title"><a href="blog-details.html?id=' + encodeURIComponent(item.id) + '">' + escapeHtml(item.title) + "</a></h3>" +
            '<p class="post-excerpt">' + escapeHtml(item.excerpt) + "</p>" + metaMarkup(item) + "</div></article>"
          );
        })
        .join("");
    }

    var sidebarSearch = document.querySelector("[data-sidebar-search]");
    if (sidebarSearch) sidebarSearch.value = "";
  }
})();
