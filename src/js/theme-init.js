(function () {
  var THEME_KEY = "auralis-theme";
  var DIR_KEY = "auralis-dir";
  var savedTheme = null;
  var savedDir = null;

  try {
    savedTheme = localStorage.getItem(THEME_KEY);
    savedDir = localStorage.getItem(DIR_KEY);
  } catch (error) {
    savedTheme = null;
    savedDir = null;
  }

  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : prefersDark ? "dark" : "light";
  var rtlLanguages = ["ar", "he", "fa", "ur", "ps", "sd", "ug", "yi", "dv", "ku"];
  var browserLanguage = ((navigator.language || navigator.userLanguage || "en") + "").toLowerCase().split("-")[0];
  var systemDir = rtlLanguages.indexOf(browserLanguage) > -1 ? "rtl" : "ltr";
  var dir = savedDir === "rtl" || savedDir === "ltr" ? savedDir : systemDir;

  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("data-theme-source", savedTheme ? "saved" : "system");
  document.documentElement.setAttribute("data-dir-source", savedDir ? "saved" : "system");
})();
