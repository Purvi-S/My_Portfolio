# Portfolio Website

A personal portfolio website built with **React** and a **3D, space-themed** design. It showcases my education, experience, projects, and skills in an interactive, animated format — complete with a rendered planet, an animated starfield, and smooth section transitions. The site is fully responsive and works well across desktop and mobile devices.

## 🔗 Live Demo

- **GitHub Pages:** https://purvi-s.github.io/My_Portfolio/
- **Vercel:** _(add your stable production URL here — the one without the random deployment hash)_

## 🔧 Technologies Used

- **React.js (18)** – Front-end library for building the UI
- **Three.js · @react-three/fiber · @react-three/drei · maath** – 3D planet model and scene rendering
- **Framer Motion** – Animations and page/section transitions
- **typewriter-effect** – Animated role/title cycling in the hero
- **react-tilt** – Interactive 3D tilt on project cards
- **styled-components · Material UI (MUI)** – Styling and layout
- **react-scroll** – Smooth-scrolling navigation
- **react-vertical-timeline-component · react-chrono** – Experience & education timelines
- **EmailJS (@emailjs/browser)** – Working contact form (no backend required)
- **react-icons** – Icon set
- **JavaScript (ES6+) & JSX** – Core language and component syntax

## 📁 Folder Overview

```
public/
├─ planet/            3D planet model (scene.gltf, textures)
├─ images/            Project screenshots
└─ index.html         HTML shell

src/
├─ components/
│  ├─ StarBackground.jsx   Animated canvas starfield
│  ├─ Aurora.jsx           Aurora background effect
│  ├─ Navbar.jsx           Top navigation
│  ├─ sections/            Hero, Skills, Experience, Projects, Education, Contact, Footer
│  └─ cards/               ProjectCard, ExperienceCard, EducationCard
├─ data/
│  └─ constants.js         Single source of truth: bio, roles, links, skills, projects
├─ utils/
│  ├─ Themes.js            Theme/color definitions
│  └─ motion.js            Framer Motion animation settings
├─ App.js                  Root component
├─ index.js                Entry point
└─ index.css               Global styles
```

## 💡 Features

- Interactive 3D planet and animated starfield background
- Typewriter role cycling in the hero section
- Smooth-scrolling navigation between sections
- Animated sections and transitions using Framer Motion
- 3D tilt effect on project cards
- Timeline-based experience and education sections
- Working contact form powered by EmailJS
- Data-driven rendering — update `data/constants.js` to change all content
- Fully responsive across desktop and mobile

## 🚀 Getting Started

Run the project locally:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

The app runs at `http://localhost:3000`.

To create an optimized production build:

```bash
npm run build
```

## 🌐 Deployment

**GitHub Pages** — publishes the compiled site to the `gh-pages` branch:

```bash
npm run deploy
```

**Vercel** — automatically deploys on every push to the `master` branch. Set the environment variable `CI=false` in your Vercel project settings so pre-existing ESLint warnings don't fail the build.

## ✏️ Customization

All content lives in `src/data/constants.js` — update your bio, roles, social links, skills, experience, education, and projects there, and the entire site updates automatically.

## 📫 Contact

- **GitHub:** https://github.com/Purvi-S
- **LinkedIn:** https://www.linkedin.com/in/purvi-shantha-184828158/
