import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Paradox from "@rincorpes/paradoxjs";

const EMAIL_ADDRESS = "hello@rincorpes.dev";

const selectedWork = [
  {
    index: "01",
    title: "ENDR",
    summary: "AI-native research platform for complex document analysis.",
    note: "PRIVATE R&D",
    tags: ["Python", "FastAPI", "Postgres"],
  },
  {
    index: "02",
    title: "SABLE",
    summary: "Secure automation layer for LLM workflows and tool orchestration.",
    tags: ["Python", "Ray", "Docker"],
  },
  {
    index: "03",
    title: "PARADOXJS",
    summary: "Lightweight JavaScript toolkit for browser-side DOM work and client glue code.",
    href: "https://github.com/rincorpes/paradoxjs",
    tags: ["TypeScript", "DOM", "npm"],
  },
  {
    index: "04",
    title: "ONOMASTICON",
    summary: "Typed implementation registry for graph-shaped naming and pluggable systems.",
    href: "https://github.com/rincorpes/onomasticon",
    tags: ["Python", "Neo4j", "APIs"],
  },
  {
    index: "05",
    title: "RELICT",
    summary: "Python logging infrastructure focused on preserving context and operational clarity.",
    href: "https://github.com/rincorpes/relict",
    tags: ["Python", "Logging", "Infra"],
  },
];

const productionTools = [
  { symbol: "M", title: "Maya", caption: "Pipeline tools" },
  { symbol: "H", title: "Houdini", caption: "Procedural FX" },
  { symbol: "B", title: "Blender", caption: "Assets & tools" },
  { symbol: "U", title: "Unreal", caption: "Real-time systems" },
  { symbol: "D", title: "DaVinci", caption: "Color & edit" },
];

const systems = [
  {
    index: "01",
    title: "AI Platforms",
    body: "Scalable systems for LLM operations, orchestration, and intelligent automation that can survive real production use.",
  },
  {
    index: "02",
    title: "Developer Tools",
    body: "CLIs, SDKs, and platform helpers that make building faster, safer, and more deliberate for the teams using them.",
  },
  {
    index: "03",
    title: "Backend Systems",
    body: "APIs, services, internal infrastructure, and workflow layers designed for clarity, reliability, and long-term maintenance.",
  },
  {
    index: "04",
    title: "Creative Technology",
    body: "Custom tools and integrations for 3D, real-time, and post-production workflows where technical systems meet content creation.",
  },
];

const experience = [
  {
    title: "Perficient",
    meta: "Consulting / software engineering",
    role: "Production delivery for platforms and technical teams",
    body: "Experience in delivery-oriented environments where software has to balance client realities, maintainability, and operational trust.",
  },
  {
    title: "ICVR / Craftology",
    meta: "Immersive / creative technology",
    role: "Technical production across interactive contexts",
    body: "Work shaped by interactive systems, real-time constraints, and the need to build tools that support creative work without slowing it down.",
  },
  {
    title: "K2",
    meta: "Implementation / systems thinking",
    role: "Engineering in execution-heavy environments",
    body: "A strong foundation in turning requirements into dependable delivery, with a bias toward structure, repeatability, and practical outcomes.",
  },
];

const openSource = [
  {
    title: "Onomasticon",
    body: "Typed implementation registry work focused on discoverability, extension points, and cleaner boundaries between systems.",
    href: "https://github.com/rincorpes/onomasticon",
    tags: ["Python", "Registry", "Architecture"],
  },
  {
    title: "Relict",
    body: "Shared logging infrastructure for applications that need consistent operational signals and more intentional debugging surfaces.",
    href: "https://github.com/rincorpes/relict",
    tags: ["Python", "Logging", "Observability"],
  },
  {
    title: "Rincorpes Workflows",
    body: "Reusable GitHub Actions building blocks for release automation, CI consistency, and less duplicated workflow plumbing.",
    href: "https://github.com/rincorpes/rincorpes-workflows",
    tags: ["GitHub Actions", "CI/CD", "Automation"],
  },
  {
    title: "ParadoxJS",
    body: "A small browser-side utility belt for DOM creation, event delegation, routing, and client-side glue code.",
    href: "https://github.com/rincorpes/paradoxjs",
    tags: ["TypeScript", "DOM", "Utilities"],
  },
];

const values = [
  "Build for reuse.",
  "Design clear boundaries.",
  "Make important systems observable.",
  "Automate recurring friction.",
  "Treat developer experience as product design.",
  "Keep simple things simple.",
  "Ship. Learn. Refactor.",
];

function buildTag(tag) {
  return Paradox.buildElement("span", {
    className: "card-tag",
    text: tag,
  });
}

function buildLinkTitle(title, href, className) {
  if (!href) {
    return Paradox.buildElement("h3", {
      className,
      text: title,
    });
  }

  return Paradox.buildElement("h3", {
    className,
    children: [
      Paradox.buildElement("a", {
        text: title,
        attributes: {
          href,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ],
  });
}

function renderSelectedWork() {
  const root = document.getElementById("selected-work-grid");

  if (!root) {
    return;
  }

  root.replaceChildren(
    ...selectedWork.map((item) =>
      Paradox.buildElement("article", {
        className: "project-card",
        children: [
          Paradox.buildElement("span", {
            className: "card-index",
            text: item.index,
          }),
          Paradox.buildElement("div", {
            className: "project-diagram",
            aria: {
              hidden: "true",
            },
          }),
          buildLinkTitle(item.title, item.href, "card-title"),
          Paradox.buildElement("p", {
            className: "card-summary",
            text: item.summary,
          }),
          item.note
            ? Paradox.buildElement("p", {
                className: "card-note",
                text: item.note,
              })
            : "",
          Paradox.buildElement("div", {
            className: "card-tags",
            children: item.tags.map(buildTag),
          }),
        ],
      })
    )
  );
}

function renderProductionTools() {
  const root = document.getElementById("production-tool-grid");

  if (!root) {
    return;
  }

  root.replaceChildren(
    ...productionTools.map((tool, index) =>
      Paradox.buildElement("article", {
        className: "tool-card",
        children: [
          Paradox.buildElement("span", {
            className: "tool-index",
            text: String(index + 1).padStart(2, "0"),
          }),
          Paradox.buildElement("div", {
            className: "tool-symbol",
            text: tool.symbol,
          }),
          Paradox.buildElement("h3", {
            className: "tool-title",
            text: tool.title,
          }),
          Paradox.buildElement("p", {
            className: "tool-caption",
            text: tool.caption,
          }),
        ],
      })
    )
  );
}

function renderSystems() {
  const root = document.getElementById("systems-list");

  if (!root) {
    return;
  }

  root.replaceChildren(
    ...systems.map((item) =>
      Paradox.buildElement("article", {
        className: "system-card",
        children: [
          Paradox.buildElement("span", {
            className: "system-index",
            text: item.index,
          }),
          Paradox.buildElement("div", {
            children: [
              Paradox.buildElement("h3", {
                className: "system-title",
                text: item.title,
              }),
              Paradox.buildElement("p", {
                className: "system-body",
                text: item.body,
              }),
            ],
          }),
        ],
      })
    )
  );
}

function renderExperience() {
  const root = document.getElementById("experience-list");

  if (!root) {
    return;
  }

  root.replaceChildren(
    ...experience.map((item) =>
      Paradox.buildElement("article", {
        className: "experience-card",
        children: [
          Paradox.buildElement("div", {
            className: "experience-header",
            children: [
              Paradox.buildElement("h3", {
                className: "experience-title",
                text: item.title,
              }),
              Paradox.buildElement("span", {
                className: "experience-meta",
                text: item.meta,
              }),
            ],
          }),
          Paradox.buildElement("p", {
            className: "experience-role",
            text: item.role,
          }),
          Paradox.buildElement("p", {
            text: item.body,
          }),
        ],
      })
    )
  );
}

function renderOpenSource() {
  const root = document.getElementById("open-source-grid");

  if (!root) {
    return;
  }

  root.replaceChildren(
    ...openSource.map((item) =>
      Paradox.buildElement("article", {
        className: "open-source-card",
        children: [
          buildLinkTitle(item.title, item.href, "open-source-title"),
          Paradox.buildElement("p", {
            text: item.body,
          }),
          Paradox.buildElement("div", {
            className: "card-tags",
            children: item.tags.map(buildTag),
          }),
        ],
      })
    )
  );
}

function renderValues() {
  const root = document.getElementById("values-list");

  if (!root) {
    return;
  }

  root.replaceChildren(
    ...values.map((value, index) =>
      Paradox.buildElement("div", {
        className: "value-item",
        children: [
          Paradox.buildElement("span", {
            className: "value-index",
            text: String(index + 1).padStart(2, "0"),
          }),
          Paradox.buildElement("span", {
            className: "value-text",
            text: value,
          }),
        ],
      })
    )
  );
}

function setupEmailLinks() {
  const emailLinks = document.querySelectorAll("[data-contact='email']");

  emailLinks.forEach((link) => {
    link.href = `mailto:${EMAIL_ADDRESS}`;
  });
}

function setupYear() {
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function setCopyButtonLabel(button, label) {
  const labelNode = button.querySelector("span");

  if (labelNode) {
    labelNode.textContent = label;
  } else {
    button.textContent = label;
  }
}

function setupInteractions() {
  Paradox.delegate(document, {
    click: {
      "[data-copy-email]": async (_event, button) => {
        const defaultLabel = button.dataset.defaultLabel || "Copy Email";

        try {
          if (!navigator.clipboard) {
            throw new Error("Clipboard API unavailable");
          }

          await navigator.clipboard.writeText(EMAIL_ADDRESS);
          setCopyButtonLabel(button, "Copied");
        } catch {
          setCopyButtonLabel(button, "Use Email Link");
        }

        window.setTimeout(() => {
          setCopyButtonLabel(button, defaultLabel);
        }, 1800);
      },
    },
  });
}

function init() {
  renderSelectedWork();
  renderProductionTools();
  renderSystems();
  renderExperience();
  renderOpenSource();
  renderValues();
  setupEmailLinks();
  setupYear();
  setupInteractions();
}

window.addEventListener("DOMContentLoaded", init);
