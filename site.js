document.documentElement.classList.add("is-ready");

const introStorageKey = "merci-intro-entered-for-reload";
const oldIntroStorageKey = "merci-intro-entered";

const getNavigationType = () => {
  const navigationEntry = performance.getEntriesByType("navigation")[0];
  return navigationEntry?.type || "navigate";
};

const hasSeenIntro = () => {
  try {
    localStorage.removeItem(oldIntroStorageKey);
    return sessionStorage.getItem(introStorageKey) === "true" && getNavigationType() === "reload";
  } catch {
    return false;
  }
};

const rememberIntro = () => {
  try {
    sessionStorage.setItem(introStorageKey, "true");
  } catch {
    // Storage can be unavailable in private or restricted browser modes.
  }
};

if (hasSeenIntro()) {
  document.body.classList.remove("intro-locked");
  document.body.classList.add("has-entered");
}

const enterSite = () => {
  rememberIntro();
  document.body.classList.remove("intro-locked");
  document.body.classList.add("has-entered");
};

document.querySelector("[data-enter-site]")?.addEventListener("click", enterSite);

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    enterSite();
  }
});
