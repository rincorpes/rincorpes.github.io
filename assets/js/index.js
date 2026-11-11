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
      "I wanted to make games in Python without treating the engine like a black box. Tatuy is the experimental 2D engine I'm building to explore scenes, gameplay systems, and rendering.",
    href: "https://rincorpes.github.io/tatuy/",
    tags: ["Python", "Game Engine", "ECS", "Open Source"],
  },
  {
    index: "02",
    title: "STUDIO",
    summary:
      "I wanted less friction between an idea and a working change. Studio is my private development control plane for tools, checks, and visual feedback.",
    note: "PRIVATE PROJECT",
    tags: ["Python", "Developer Tools", "Automation", "MCP"],
  },
  {
    index: "03",
    title: "ENDR",
    summary:
      "What would it take for an AI assistant to interact with a Minecraft world? Endr is a private experiment with structured knowledge, agents, and a changing game environment.",
    note: "PRIVATE R&D",
    tags: ["Python", "AI Agents", "Minecraft", "Runtime"],
  },
  {
    index: "04",
    title: "PARADOXJS",
    summary:
      "Sometimes I want a few good browser utilities, not an entire framework. ParadoxJS brings together DOM helpers, event delegation, routing, and PubSub.",
    href: "https://github.com/rincorpes/paradoxjs",
    tags: ["JavaScript", "TypeScript", "DOM", "Open Source"],
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
      "I like the bigger picture: how services fit together, where responsibilities belong, and what should stay simple as software grows.",
  },
  {
    index: "02",
    title: "Developer Tools",
    body:
      "The little tools and automations that save someone ten repeated steps. Good developer experience is part of making good software.",
  },
  {
    index: "03",
    title: "Backend Systems",
    body:
      "APIs, services, and integrations that are easier to reason about when they fail, change, or need to grow.",
  },
  {
    index: "04",
    title: "AI Systems",
    body:
      "The less flashy parts of AI: connecting agents to useful tools and knowledge, checking what they do, and handling real-world constraints.",
  },
];

const experience = [
  {
    title: "Perficient",
    meta: "AI / platform engineering",
    role: "Lead Technical Consultant — Python & AI Systems",
    body:
      "I work on backend and platform pieces behind AI-driven experiences: connecting services and agents, making behavior easier to evaluate, and helping teams build on reliable foundations.",
  },
  {
    title: "ICVR / Craftology",
    meta: "Immersive / creative technology",
    role: "Software engineering and technical production",
    body:
      "My work in interactive and creative-production environments taught me how much good tools depend on understanding the people and workflows around them.",
  },
  {
    title: "K2",
    meta: "Software engineering / implementation",
    role: "Systems engineering in execution-heavy environments",
    body:
      "Worked on software for operational needs, turning recurring processes into repeatable tools and learning to value clear, practical solutions.",
  },
];

const openSource = [
  {
    title: "Tatuy",
    body:
      "A Python-first game engine I’m building to understand the machinery behind games, from scene updates to rendering.",
    href: "https://github.com/rincorpes/tatuy",
    tags: ["Python", "Game Technology", "Architecture"],
  },
  {
    title: "Torn SDK",
    body:
      "A Python client for the Torn API, with typed models and sync/async ways to make requests.",
    href: "https://github.com/rincorpes/torn-sdk",
    tags: ["Python", "SDK", "APIs"],
  },
  {
    title: "Rincorpes Workflows",
    body:
      "GitHub Actions I reuse to spend less time copying release and CI workflows between projects.",
    href: "https://github.com/rincorpes/rincorpes-workflows",
    tags: ["GitHub Actions", "CI/CD", "Automation"],
  },
  {
    title: "ParadoxJS",
    body:
      "Browser utilities for when plain JavaScript needs a little help, but a whole framework feels unnecessary.",
    href: "https://github.com/rincorpes/paradoxjs",
    tags: ["TypeScript", "DOM", "npm"],
  },
  {
    title: "Relict",
    body:
      "A Python logging library built around the idea that useful context should be easy to find when something breaks.",
    href: "https://github.com/rincorpes/relict",
    tags: ["Python", "Logging", "Observability"],
  },
  {
    title: "Onomasticon",
    body:
      "A typed implementation registry for software that needs to discover and swap components cleanly.",
    href: "https://github.com/rincorpes/onomasticon",
    tags: ["Python", "Registry", "Architecture"],
  },
];

const values = [
  "Build what helps.",
  "Make the moving parts understandable.",
  "Give each piece a clear job.",
  "Make it possible to see what happened.",
  "Automate the boring repetitions.",
  "Care about the person using the tool.",
  "Don’t complicate what already works.",
  "Try it. Learn. Improve it.",
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
