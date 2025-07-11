const includes = ["nav", "hero", "speakers", "schedule", "venue", "hotels", "gallery", "sponsors", "faq", "buy-tickets", "contact", "footer", "scrollToTopBtn"];

window.addEventListener("DOMContentLoaded", () => {
  Promise.all(
    includes.map(section =>
      fetch(`./includes/${section}.html`)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load ${section}.html`);
          return res.text();
        })
        .then(data => {
          const container = document.getElementById(section);
          if (container) container.innerHTML = data;
        })
        .catch(err => console.error(err))
    )
  ).then(() => {
    // Dispatch custom event to signal includes are loaded
    document.dispatchEvent(new Event('includesLoaded'));
  });
});