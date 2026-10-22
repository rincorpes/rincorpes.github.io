# AGENTS.md

## Scope

This guide applies to `apps/rincorpes.github.io`.

## Purpose

This directory contains the public personal website and professional
portfolio for Santiago Rincón.

The site is intended to represent the canonical public version of his
professional identity, engineering work, experience, writing, and
availability.

## Working Rules

- Treat this directory as its own web project.
- Preserve the existing static Vite-based architecture unless a larger
  migration is explicitly requested.
- Keep changes easy to preview locally and safe to publish.
- Do not invent professional experience, project claims, technologies,
  results, metrics, or employment details.
- Prefer specific engineering evidence over generic marketing language.
- Keep public professional information consistent across the hero,
  projects, experience, about, and availability sections.
- Never add private career information such as salary targets,
  application history, recruiter notes, private employer research,
  immigration documents, or interview notes.
- Public client-sensitive information must remain appropriately generic.
- Projects should reflect their current public names and status.
- Featured work should prioritize projects that best demonstrate the
  current professional positioning.

## Professional Positioning

The site currently positions Santiago primarily around:

- Senior Python engineering
- Platform engineering
- Developer tooling
- Backend systems
- AI infrastructure
- SDK and API design
- Automation
- Creative technology

The site should show evidence for those claims through projects,
experience, open-source work, and technical writing.

## Geographic / Opportunity Context

Santiago is currently based in Medellín, Colombia and is preparing to
relocate to Spain.

The site may publicly communicate interest in remote European
opportunities that can begin internationally from Colombia and continue
after relocation.

Do not expose private visa, compensation, application, or relocation
details beyond what has been explicitly approved for public use.

## Typical Files

- `index.html`
- `assets/js/index.js`
- `assets/scss/main.scss`
- supporting static assets

## Future Direction

The current content is embedded in the site implementation.

A future iteration may move professional information into structured
public content files that become the canonical data source for:

- the website
- an MCP server
- profile audits
- résumé generation
- LinkedIn/GitHub consistency checks
- content workflows

When that migration happens, presentation code must not introduce
professional facts that are absent from the structured content model.
