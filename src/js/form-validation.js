/* Client-side validation and acknowledgement messages for every public form. */
(function () {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var phonePattern = /^[+()\d\s.-]{7,22}$/;

  function textFor(field) {
    if (field.getAttribute("data-label")) return field.getAttribute("data-label");
    var label = field.closest("label");
    if (label) {
      var clone = label.cloneNode(true);
      clone.querySelectorAll("input,select,textarea,.field-error,.form-error-text").forEach(function (node) {
        node.remove();
      });
      var text = clone.textContent.replace(/\s+/g, " ").trim();
      if (text) return text;
    }
    var name = field.getAttribute("name") || "This field";
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/[-_]/g, " ");
  }

  function errorHost(field) {
    if (field.type === "checkbox") {
      return field.closest(".consent") || field.closest("label") || field.parentElement;
    }
    return field.closest(".field") || field.parentElement;
  }

  function clearError(field) {
    field.classList.remove("invalid");
    field.removeAttribute("aria-invalid");
    var host = errorHost(field);
    if (!host) return;
    host.querySelectorAll(".field-error").forEach(function (error) {
      error.remove();
    });
  }

  function setError(field, message) {
    clearError(field);
    field.classList.add("invalid");
    field.setAttribute("aria-invalid", "true");
    var host = errorHost(field);
    if (!host) return;
    var error = document.createElement("span");
    error.className = "field-error";
    error.textContent = message;
    error.id = (field.id || field.name || "field") + "-error";
    field.setAttribute("aria-describedby", error.id);
    host.appendChild(error);
  }

  function isValidField(field) {
    var value = (field.value || "").trim();
    var required = field.hasAttribute("required");
    if (field.type === "checkbox") {
      if (required && !field.checked) {
        setError(field, "Please confirm before continuing.");
        return false;
      }
      clearError(field);
      return true;
    }
    if (required && !value) {
      setError(field, textFor(field) + " is required.");
      return false;
    }
    if (!value) {
      clearError(field);
      return true;
    }
    if (field.type === "email" && !emailPattern.test(value)) {
      setError(field, "Enter a valid email address, for example name@example.com.");
      return false;
    }
    if (field.type === "tel") {
      var digits = value.replace(/\D/g, "");
      if (!phonePattern.test(value) || digits.length < 7 || digits.length > 15) {
        setError(field, "Enter a valid phone number with 7–15 digits.");
        return false;
      }
    }
    if (field.type === "date" && field.min) {
      if (value < field.min) {
        setError(field, "Please choose today or a future date.");
        return false;
      }
    }
    if (field.getAttribute("minlength") && value.length < parseInt(field.getAttribute("minlength"), 10)) {
      setError(field, textFor(field) + " needs at least " + field.getAttribute("minlength") + " characters.");
      return false;
    }
    var matchId = field.getAttribute("data-match");
    if (matchId) {
      var target = document.getElementById(matchId);
      if (target && target.value !== field.value) {
        setError(field, "Passwords do not match.");
        return false;
      }
    }
    clearError(field);
    field.classList.add("field-valid");
    return true;
  }

  function statusElement(form) {
    return (
      form.querySelector("[data-form-status]") ||
      form.querySelector(".form-status") ||
      form.querySelector(".form-success") ||
      form.querySelector("[data-newsletter-success]")
    );
  }

  function showStatus(form, message, isError) {
    var status = statusElement(form);
    if (!status) return;
    status.hidden = false;
    status.textContent = message;
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.classList.toggle("error", Boolean(isError));
    if (status.classList.contains("newsletter-success")) {
      status.classList.toggle("error", Boolean(isError));
    }
  }

  function clearStatus(form) {
    var status = statusElement(form);
    if (!status) return;
    status.hidden = true;
    status.textContent = "";
    status.classList.remove("error");
  }

  function validateForm(form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll("input, select, textarea")).filter(function (field) {
      return field.type !== "hidden" && field.type !== "submit" && field.type !== "button";
    });
    var firstInvalid = null;
    fields.forEach(function (field) {
      var valid = isValidField(field);
      if (!valid && !firstInvalid) firstInvalid = field;
    });
    return firstInvalid;
  }

  function resetForm(form) {
    form.reset();
    form.querySelectorAll(".field-valid,.invalid").forEach(function (field) {
      field.classList.remove("field-valid", "invalid");
      field.removeAttribute("aria-invalid");
    });
    form.querySelectorAll(".field-error,.form-error-text").forEach(function (error) {
      error.remove();
    });
  }

  function prepare(form) {
    form.setAttribute("novalidate", "novalidate");
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        if (field.classList.contains("invalid")) isValidField(field);
      });
      field.addEventListener("blur", function () {
        if ((field.value || "").trim() || field.hasAttribute("required")) isValidField(field);
      });
    });
  }

  function messageFor(form, kind) {
    var nameField = form.querySelector('[name="name"], [name="full-name"], [name="first-name"]');
    var name = nameField && nameField.value.trim() ? nameField.value.trim().split(" ")[0] : "";
    if (kind === "newsletter") {
      return "Thank you" + (name ? ", " + name : "") + ". You are on the list — look out for our next Auralis note.";
    }
    if (kind === "auth") {
      return "Success. Your details have been received securely. This demo has no server, so no account was created.";
    }
    if (kind === "signup") {
      return "Welcome to Auralis" + (name ? ", " + name : "") + ". Your patient account request has been received. Our team will email you next steps.";
    }
    if (kind === "login") {
      return "Welcome back" + (name ? ", " + name : "") + ". You are signed in for this demo session. No real credentials were sent.";
    }
    return (
      "Thank you" + (name ? ", " + name : "") + ". Your request has been received. " +
      "A member of the Auralis team will contact you within one working day to confirm your appointment."
    );
  }

  /* Contact / appointment forms */
  document.querySelectorAll("#appointment-form, #contact-form").forEach(function (form) {
    prepare(form);

    var serviceParam = new URLSearchParams(window.location.search).get("service");
    if (serviceParam) {
      var select = form.querySelector('select[name="service"]');
      if (select) {
        Array.prototype.forEach.call(select.options, function (option) {
          if (option.value === serviceParam) select.value = serviceParam;
        });
      }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearStatus(form);
      var invalid = validateForm(form);
      if (invalid) {
        showStatus(form, "Please check the highlighted fields and try again.", true);
        invalid.focus();
        invalid.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      var success = messageFor(form, "contact");
      showStatus(form, success, false);
      resetForm(form);
      var status = statusElement(form);
      if (status) status.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  /* Newsletter + coming-soon notification forms */
  document.querySelectorAll("#newsletter-form, #coming-soon-form, [data-newsletter-form]").forEach(function (form, index) {
    prepare(form);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearStatus(form);
      var email = form.querySelector('input[type="email"]');
      if (!email) return;
      if (!isValidField(email)) {
        showStatus(form, "Please enter a valid email address.", true);
        email.focus();
        return;
      }
      showStatus(form, messageFor(form, "newsletter"), false);
      var success = form.querySelector("[data-newsletter-success]");
      if (success) success.hidden = false;
      resetForm(form);
      if (success) success.hidden = false;
      var status = statusElement(form);
      if (status) status.hidden = false;
    });
  });

  /* Login */
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    prepare(loginForm);
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      clearStatus(loginForm);
      var invalid = validateForm(loginForm);
      if (invalid) {
        showStatus(loginForm, "Please check your email and password.", true);
        invalid.focus();
        return;
      }
      showStatus(loginForm, messageFor(loginForm, "login"), false);
      resetForm(loginForm);
      var status = statusElement(loginForm);
      if (status) status.hidden = false;
    });
  }

  /* Sign up */
  var signupForm = document.getElementById("signup-form");
  if (signupForm) {
    prepare(signupForm);
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      clearStatus(signupForm);
      var invalid = validateForm(signupForm);
      if (invalid) {
        showStatus(signupForm, "Please review the highlighted fields before creating your account.", true);
        invalid.focus();
        return;
      }
      showStatus(signupForm, messageFor(signupForm, "signup"), false);
      resetForm(signupForm);
      var status = statusElement(signupForm);
      if (status) status.hidden = false;
    });
  }

  /* Preselect a start date where a date input exists */
  document.querySelectorAll('input[type="date"]').forEach(function (input) {
    if (!input.min) {
      var today = new Date();
      input.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    }
  });
})();
