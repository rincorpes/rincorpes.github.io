import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as ParadoxModule from "@rincorpes/paradoxjs";

function resolveParadox(moduleValue) {
  if (moduleValue?.buildElement) {
    return moduleValue;
  }

  if (moduleValue?.default?.buildElement) {
    return moduleValue.default;
  }

  if (moduleValue?.default?.default?.buildElement) {
    return moduleValue.default.default;
  }

  throw new Error("Unable to resolve ParadoxJS public API");
}

const Paradox = resolveParadox(ParadoxModule);

const EMAIL_ADDRESS = "rincorpes@gmail.com";

const selectedWork = [
  {
    index: "01",
    title: "TATUY",
    summary:
      "Python-first 2D game engine focused on explicit architecture, reusable gameplay systems, developer tooling, and AI-assisted development workflows.",
    href: "https://github.com/rincorpes/tatuy",
    tags: [
      "Python",
      "ECS",
      "Game Engine",
      "Developer Tools",
      "MCP",
    ],
  },
  {
    index: "02",
    title: "TORN SDK",
    summary:
      "Typed Python SDK for the Torn API with synchronous and asynchronous clients, structured models, and a developer-focused API.",
    href: "https://github.com/rincorpes/torn-sdk",
    tags: ["Python", "SDK Design", "APIs", "Async"],
  },
  {
    index: "03",
    title: "ENDR",
    summary:
      "Experimental AI agent platform combining structured knowledge, tool execution, RAG, runtime communication, and interaction with a persistent Minecraft world.",
    note: "PRIVATE R&D",
    tags: ["Python", "FastAPI", "AI Agents", "RAG"],
  },
  {
    index: "04",
    title: "PARADOXJS",
    summary:
      "Lightweight browser toolkit for DOM construction, event delegation, routing, and client-side application glue without a large frontend framework.",
    href: "https://github.com/rincorpes/paradoxjs",
    tags: ["TypeScript", "DOM", "Developer Tools", "npm"],
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
    title: "Platform Engineering",
    body:
      "Internal platforms, reusable infrastructure, runtime systems, and shared foundations that make teams faster without hiding how the system works.",
  },
  {
    index: "02",
    title: "Developer Tools",
    body:
      "SDKs, CLIs, automation, debugging tools, development interfaces, and workflows designed with developer experience as a product concern.",
  },
  {
    index: "03",
    title: "Backend Systems",
    body:
      "Python services, APIs, integrations, orchestration layers, and production infrastructure built around clear boundaries, reliability, and operational visibility.",
  },
  {
    index: "04",
    title: "AI Systems",
    body:
      "Agent orchestration, RAG, evaluation workflows, LLM integrations, tool execution, observability, and infrastructure around production AI applications.",
  },
];

const experience = [
  {
    title: "Perficient",
    meta: "AI / platform engineering",
    role: "Lead Technical Consultant — Python & AI Systems",
    body:
      "Platform and backend engineering for production AI systems, working across agent infrastructure, integrations, evaluation, observability, and developer workflows while balancing experimentation with enterprise reliability and maintainability.",
  },
  {
    title: "ICVR / Craftology",
    meta: "Immersive / creative technology",
    role: "Software engineering and technical production",
    body:
      "Engineering across interactive and creative-production environments where software, real-time systems, content pipelines, and technical workflows meet.",
  },
  {
    title: "K2",
    meta: "Software engineering / implementation",
    role: "Systems engineering in execution-heavy environments",
    body:
      "Translated operational and business requirements into working software and repeatable technical processes, developing a strong bias toward automation, reusable systems, and practical delivery.",
  },
];

const openSource = [
  {
    title: "Tatuy",
    body:
      "Python game-engine architecture and developer tooling built around explicit systems, reusable gameplay features, profiling, and backend abstraction.",
    href: "https://github.com/rincorpes/tatuy",
    tags: ["Python", "Game Technology", "Architecture"],
  },
  {
    title: "Torn SDK",
    body:
      "Typed Python API client with synchronous and asynchronous interfaces designed around a predictable developer experience.",
    href: "https://github.com/rincorpes/torn-sdk",
    tags: ["Python", "SDK", "APIs"],
  },
  {
    title: "Rincorpes Workflows",
    body:
      "Reusable GitHub Actions building blocks for release automation, CI consistency, and reducing duplicated workflow configuration.",
    href: "https://github.com/rincorpes/rincorpes-workflows",
    tags: ["GitHub Actions", "CI/CD", "Automation"],
  },
  {
    title: "ParadoxJS",
    body:
      "Minimal browser-side toolkit for DOM construction, event delegation, routing, and client application utilities.",
    href: "https://github.com/rincorpes/paradoxjs",
    tags: ["TypeScript", "DOM", "npm"],
  },
  {
    title: "Relict",
    body:
      "Python logging infrastructure focused on preserving useful operational context and creating clearer debugging surfaces.",
    href: "https://github.com/rincorpes/relict",
    tags: ["Python", "Logging", "Observability"],
  },
  {
    title: "Onomasticon",
    body:
      "Typed implementation registry exploring discoverability, extension points, and cleaner boundaries between pluggable systems.",
    href: "https://github.com/rincorpes/onomasticon",
    tags: ["Python", "Registry", "Architecture"],
  },
];

const values = [
  "Build for reuse.",
  "Prefer explicit architecture over hidden magic.",
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
