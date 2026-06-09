// Place your Javascript Here
/* Leave Warning */
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = "";
});
