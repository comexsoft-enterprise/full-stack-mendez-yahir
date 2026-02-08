# Pokedex Méndez 🔴⚪

**Live Demo:** [pokedex-mendez.netlify.app](https://pokedex-mendez.netlify.app)

A modern, responsive, and interactive Pokedex application built with **React**, **TypeScript**, and **CSS Modules**. This project demonstrates a clean architecture and focuses on user experience and performance.

## ✨ Features

### 🔍 Smart Search & Incremental Filtering
- **Local Index:** Fetches a lightweight index of all Pokemon names for instant filtering.
- **Incremental Search:** Filters results locally as you type.
- **API Integration:** Fetches full details only for the top filtered results, reducing API load.
- **Debounced Input:** Optimized search performance with a 300ms debounce.

### 📜 Infinite Scroll
- Seamlessly loads more Pokemon as you scroll down the list.
- Loading indicators for smooth UX.

### 🖱️ Interactive Controls
- **Standard Mode:** Click a Pokemon to select it, then toggle the "Catch" panel to view details or capture it.
- **Free Mode (Drag & Drop):** Enable specific mode to drag Pokemon directly into the Pokeball to catch them!

### 📊 Detailed Info Panel
- **Stats Radar:** Visual radar chart for Pokemon stats.
- **Skills (Abilities):** Clickable skills section to view ability descriptions.
- **Locations:** See where to find each Pokemon in the wild.
- **Dynamic Images:** High-quality sprites with animated pixel-art fallbacks.

### 🎨 Responsive & Polished UI
- **CSS Modules:** Scoped, maintainable styling.
- **Mobile Friendly:** Fully responsive design that adapts to phone screens.
- **Animations:** Smooth transitions for the panel, pokeball, and list items.


## 🎨 Design Process & UX

The user interface was carefully crafted to ensure a premium and engaging experience.

1.  **Moodboard:** Started with collecting inspiration in **Figma** to define the color palette (Vibrant Red, Dark Gray) and visual style.
2.  **Wireframing:** Created low-fidelity wireframes for both **Mobile** and **Desktop** layouts to plan the responsive behavior and component hierarchy.
3.  **High-Fidelity UI:** Implemented the final design using CSS Modules, focusing on micro-interactions and smooth transitions.

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** CSS Modules (Vanilla CSS)
- **Data Visualization:** Chart.js (React-Chartjs-2)
- **State Management:** React Hooks (useState, useEffect, useReducer)
- **Architecture:** Layered (Domain, Application, Infrastructure, UI)

## 🏗️ Architecture

The project follows a **Hexagonal/Layered Architecture** to separate concerns:

- **Domain:** Core entities (`Pokemon`, `Stat`, `Skill`) independent of external frameworks.
- **Application:** Use Cases (`GetPokemonByName`, `ListPokemon`) that orchestrate business logic.
- **Infrastructure:** API Services (`PokemonApiService`) and DTOs that handle external data fetching.
- **UI:** React components and hooks focused solely on presentation.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/full-stack-mendez-yahir.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run development server:**
    ```bash
    npm run dev
    ```

