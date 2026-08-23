---
name: Signal Ledger
description: A quiet field instrument for reading performance signals.
colors:
  paper: "#f2eee4"
  paper-deep: "#e8e1d3"
  ink: "#1d2422"
  muted: "#5d665f"
  rule: "#c8c3b8"
  accent-rust: "#b34b31"
  accent-rust-deep: "#803723"
typography:
  display:
    fontFamily: "IBM Plex Sans, Arial, sans-serif"
    fontSize: "clamp(3.4rem, 9vw, 7.5rem)"
    fontWeight: 650
    lineHeight: 0.88
    letterSpacing: "-0.075em"
  body:
    fontFamily: "IBM Plex Sans, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  data:
    fontFamily: "IBM Plex Mono, SFMono-Regular, Consolas, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  pill: "999px"
spacing:
  section: "70px"
  content: "24px"
components:
  window-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "4px 14px"
---

# Design System: Signal Ledger

## Overview

**Creative North Star: "The field notebook meets the strip-chart recorder."**

Signal Ledger treats analytics as an act of observation. The page is a quiet paper surface with ruled dividers, a single rust trace, and enough empty space for a visitor to notice an interruption instead of flattening it into a decorative KPI wall. The interface is intentionally closer to a working instrument than a SaaS marketing dashboard.

The visual world is product-specific: data gets a measured mono voice, narrative gets a calm sans voice, and the rust accent is reserved for movement and the plotted signal. Depth comes from rules and tonal paper changes, not cards or shadows.

**Key Characteristics:**

- Paper, ink, graphite-rule, and rust signal palette.
- One continuous reading flow: window → trace → field note → next question.
- Flat surfaces with editorial spacing and no generic card grid.

## Colors

The palette is a warm paper field with near-black ink and one deliberately scarce rust signal.

### Primary

- **Signal Rust** (`#b34b31`): plotted movement, selected emphasis, and the copy action.

### Neutral

- **Ledger Paper** (`#f2eee4`): page ground and inactive controls.
- **Deep Paper** (`#e8e1d3`): reserved for future tonal surfaces.
- **Ledger Ink** (`#1d2422`): headings, active controls, and structural rules.
- **Reading Gray** (`#5d665f`): supporting copy and labels; chosen to preserve AA contrast.
- **Graphite Rule** (`#c8c3b8`): dividers and chart grid.

### Named Rules

**The Scarce Signal Rule.** Rust marks movement or an action; it does not become a general decoration color.

## Typography

**Display Font:** IBM Plex Sans (with Arial, sans-serif)

**Body Font:** IBM Plex Sans (with Arial, sans-serif)

**Label/Mono Font:** IBM Plex Mono (with SFMono-Regular, Consolas, monospace)

**Character:** Display and body text are calm and highly legible. Mono is reserved for measured values, labels, and controls so it reads as data rather than a costume.

### Hierarchy

- **Display** (650, `clamp(3.4rem, 9vw, 7.5rem)`, `0.88`): the first statement of the reading surface.
- **Headline** (620, `clamp(1.55rem, 3vw, 2.4rem)`, normal): section titles such as Traffic trace.
- **Body** (400, `1rem`, `1.65`): explanation and field notes, kept to a readable measure.
- **Label** (400, `0.66rem`, `0.08em`, uppercase): measurement labels and control metadata.

## Layout

The desktop surface is a single 1120px reading frame. The opening statement and window control share a baseline, followed by an asymmetric reading strip, a full-width trace, and a two-column observation closeout. On screens below 760px, the header and intro stack, the reading strip becomes a two-by-two field, and the observation facts move below the field note. The page never introduces horizontal scrolling.

## Elevation & Depth

The system is flat-by-default. Depth is created with whitespace, one-pixel rules, and a slightly differentiated plot surface. There are no decorative shadows or glass layers. The chart's line arrival is the single authored motion moment; reduced motion removes both the animation and button transition.

## Shapes

The page uses square editorial sections and hairline rules. The only rounded silhouette is the pill-shaped reading-window control and its active state. The circular SL mark is a small identity stamp, not a container pattern.

## Components

### Buttons

- **Window control:** pill shape, graphite outline at rest, ink-filled active state, minimum 38px height, `aria-pressed` state.
- **Text action:** flat text button with a rust underline; it changes copy state to Reading copied rather than opening a dialog.
- **Hover / Focus:** color shift on hover and a 3px rust focus ring with 4px offset.

### Cards / Containers

- **Reading strip:** a ruled definition-list field, not a collection of cards.
- **Plot sheet:** full-width paper surface with SVG grid, trace, points, and accessible title/description.
- **Observation facts:** a ruled two-column list that keeps peak, average, and next question inspectable.

## Do's and Don'ts

- Do keep the product's observation → question sequence intact.
- Do keep real sample-data limitations visible in copy.
- Do use rust sparingly for meaningful movement.
- Don't turn this surface into a generic KPI card grid.
- Don't add fake integrations, customer claims, gradients, shadows, or decorative charts.
- Don't use mono as the voice for ordinary prose.
