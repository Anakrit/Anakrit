# CuraLink MVP

This repository contains a static prototype of **CuraLink**, an AI-guided platform that
connects patients and researchers with relevant clinical trials, publications, experts,
and communities. The MVP focuses on presenting the product vision through a polished
front-end experience that can be explored in any modern browser.

## Getting started

1. Open `public/index.html` in your browser to launch the landing page.
2. Choose the patient or researcher path to experience dedicated onboarding flows,
   personalized dashboards, and favorites workspaces.

All personalization data is stored locally in the browser using `localStorage`, so
refreshing the page will retain saved profiles and favorite items.

## Structure

```
public/
  index.html                # Landing page with entry points for each persona
  patient-onboarding.html   # Natural language intake for patients
  patient-dashboard.html    # Patient recommendations and filters
  patient-favorites.html    # Saved trials, publications, experts
  researcher-onboarding.html# Researcher profile setup
  researcher-dashboard.html # Researcher workspace with collaborators & trials
  researcher-favorites.html # Saved collaborators, trials, and references
  assets/css/styles.css     # Shared design system and layout styles
  assets/js/*.js            # Persona-specific interactions
  data/sample-data.js       # Mock data powering the prototype
```

## Feature highlights

- **Natural language onboarding** for both patients and researchers.
- **Personalized dashboards** populated with mock trials, experts, publications,
  collaborators, and forums filtered by each profile.
- **Favorites workspaces** for saving high-value items per persona.
- **Forum previews** that highlight patient questions awaiting researcher responses.
- **Responsive layout** inspired by modern product design patterns.

This prototype is intended for hackathon demonstrations and can be deployed easily on any
static hosting service.
