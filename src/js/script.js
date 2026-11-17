// Small progressive enhancements shared by the public pages.
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

var dateInput = document.getElementById("appointment-date");
if (dateInput) {
  var today = new Date();
  var localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  dateInput.min = localToday;
}

document.querySelectorAll("[data-current-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});
