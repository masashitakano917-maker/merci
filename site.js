document.documentElement.classList.add("is-ready");

const introStorageKey = "merci-intro-entered-for-reload";
const oldIntroStorageKey = "merci-intro-entered";

const hasSeenIntro = () => {
  try {
    localStorage.removeItem(oldIntroStorageKey);
    return sessionStorage.getItem(introStorageKey) === "true";
  } catch {
    return false;
  }
};

const hasSkipIntroParam = () => {
  try {
    return new URLSearchParams(window.location.search).get("skipIntro") === "1";
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

const cleanSkipIntroParam = () => {
  if (!hasSkipIntroParam()) return;

  const cleanUrl = `${window.location.pathname}${window.location.hash}`;
  window.history.replaceState({}, "", cleanUrl);
};

if (hasSeenIntro() || hasSkipIntroParam()) {
  rememberIntro();
  document.body.classList.remove("intro-locked");
  document.body.classList.add("has-entered");
  cleanSkipIntroParam();
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
