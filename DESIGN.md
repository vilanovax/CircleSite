---
name: Circle
description: Ads travel through a real circle of people.
colors:
  canvas: "#E4EBE6"
  paper: "#F3F6F2"
  ink: "#15241E"
  ink-soft: "#3A4E45"
  cedar: "#2C5748"
  cedar-deep: "#1E3D33"
  brass: "#A88454"
  line: "#C3D0C6"
  anon: "#6A7A72"
typography:
  display:
    fontFamily: "Readex Pro, Vazirmatn, sans-serif"
    fontSize: "clamp(1.85rem, 6vw, 3.35rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  heading:
    fontFamily: "Readex Pro, Vazirmatn, sans-serif"
    fontSize: "clamp(1.6rem, 3.6vw, 2.35rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Readex Pro, Vazirmatn, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Vazirmatn, Tahoma, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "normal"
  caption:
    fontFamily: "Vazirmatn, Tahoma, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  micro:
    fontFamily: "Vazirmatn, Tahoma, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "72px"
components:
  button-primary:
    backgroundColor: "{colors.cedar}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.cedar-deep}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
---

# DESIGN.md

## Overview

Circle’s marketing surface is a private gathering, not a bazaar and not a social feed. The page is cool garden stone, forest ink, and brass threads. The memorable object is a ring of people with a need traveling between them. Type is geometric and human (Readex Pro for display, Vazirmatn for reading). Light comes from a quiet indoor evening on a phone, so the surface stays pale and cool — not cream-paper, not dark neon.

## Colors

- `canvas` is the gathering ground. Large fields stay this color.
- `cedar` is the circle itself: primary actions, marks, live nodes.
- `brass` is only for connection paths and quiet emphasis, never for buttons.
- `paper` is a slip of content resting on the ground (app window, listing).
- `anon` is withheld identity: dashed stroke, no fill heroics.
- Do not introduce sky-blue trust, orange marketplace CTAs, or terracotta cream.

## Typography

Persian first, RTL always. Readex Pro carries headlines because its terminals are circular — the letterforms are the mark. Vazirmatn carries body, nav, and UI chrome. The ramp is six steps: display, heading, title, body, caption, micro. No uppercase English tracking. Measure stays short; headlines break by phrase, not by leftover words.

## Layout

Mobile first. Header is a thin bar; the first viewport is the ring. Desktop places the thesis inside the ring. Later sections alternate a dense demonstration with a quiet field. More space above a heading than below it. Max reading width ~40rem for prose. The app demonstration is a paper window, not a glossy device shrine.

## Elevation & Depth

Almost flat. When something lifts (the app window, a listing slip), the shadow is offset down and soft, ink-tinted, never a colored glow. Hairline arcs sit on the canvas, not in a card.

## Shapes

Circles and arcs are the native geometry. Pills for actions. Paper slips use `16px` radii. Dashed circles mean anonymous. Do not build the page from equal icon-cards.

## Components

- Primary button: cedar fill, paper type, full pill, same label everywhere: ورود به سیرکل.
- Secondary button: hairline ink/cedar, transparent fill.
- Nav links are body weight, no underline until hover/focus.
- Focus: 2px cedar ring, 3px offset, visible on all controls.
- Icons: 1.75px cedar stroke, rounded caps, never mixed icon sets.

## Do's and Don'ts

- Do show a path between named people.
- Do let one listing travel; that is the product.
- Don’t dump feature tiles, member counts, or fake testimonials.
- Don’t look like a public classifieds grid or a social-network hero.
- Don’t use stock icon packs next to custom marks.
