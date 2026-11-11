// Progressive enhancement: all portfolio projects remain visible without JS.
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projects = [...document.querySelectorAll("[data-portfolio-project]")];
const count = document.getElementById("portfolio-count");

function applyFilter(filter) {
  const supported = filterButtons.some((button) => button.dataset.filter === filter);
  const selected = supported ? filter : "all";
  let visible = 0;

  for (const project of projects) {
    const categories = (project.dataset.categories || "").split(/\s+/);
    const show = selected === "all" || categories.includes(selected);
    project.hidden = !show;
    if (show) visible += 1;
  }

  for (const button of filterButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === selected));
  }

  if (count) {
    count.textContent = "Showing " + visible + " " + (visible === 1 ? "project" : "projects") + ".";
  }

  return selected;
}

if (filterButtons.length && projects.length) {
  const initial = new URL(window.location.href).searchParams.get("focus") || "all";
  applyFilter(initial);

  for (const button of filterButtons) {
    button.addEventListener("click", () => {
      const selected = applyFilter(button.dataset.filter);
      const url = new URL(window.location.href);
      if (selected === "all") {
        url.searchParams.delete("focus");
      } else {
        url.searchParams.set("focus", selected);
      }
      window.history.replaceState(null, "", url);
    });
  }

  window.addEventListener("popstate", () => {
    const selected = new URL(window.location.href).searchParams.get("focus") || "all";
    applyFilter(selected);
  });
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
