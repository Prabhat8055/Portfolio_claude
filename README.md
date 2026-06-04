<<<<<<< HEAD
# Alex Mercer — Portfolio
=======
# Prabhat Bhasme — Portfolio
>>>>>>> 246f81b28fc65612a687a56bb04e37713a300c07

A futuristic, cinematic personal portfolio built with React + Vite + Tailwind CSS v4 + Framer Motion.

## ✨ Features

- **Custom animated cursor** with ring follower and hover states
- **Loading screen** with progress bar and scanning animation
- **Sticky glassmorphism navbar** with active section highlighting & mobile drawer
- **Hero** with particle field canvas, orbital avatar rings, and typing effect
- **About** with animated stat cards and code snippet block
- **Projects** with expand/collapse details, tech tags, hover glow effects
- **Skills** with animated progress bars, shimmer effects, and tech icon grid
- **Experience timeline** with expandable cards and smooth reveal
- **Contact form** with validation, send state, and success animation
- **Dark/light mode** with localStorage persistence
- **Scroll progress indicator**
- Fully **responsive** (mobile, tablet, desktop)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         # Sticky nav with mobile drawer
│   │   └── Footer.jsx         # Footer with socials
│   ├── sections/
│   │   ├── Hero.jsx            # Landing with particles + typing
│   │   ├── About.jsx           # Bio, stats, trait cards
│   │   ├── Projects.jsx        # Expandable project cards
│   │   ├── Skills.jsx          # Progress bars + tech grid
│   │   ├── Experience.jsx      # Timeline
│   │   └── Contact.jsx         # Form with validation
│   └── ui/
│       ├── Cursor.jsx          # Custom cursor
│       ├── LoadingScreen.jsx   # Boot animation
│       └── ScrollProgress.jsx  # Top progress bar
├── data/
│   └── portfolio.js            # All your content lives here
├── hooks/
│   └── index.js                # useTheme, useTyping, useReveal, etc.
├── App.jsx
├── main.jsx
└── index.css                   # CSS variables, utilities, animations
```

## ✏️ Customization

All personal content is in `src/data/portfolio.js` — update:
- `personalInfo` — name, email, location, social links
- `roles` — the typing effect role list
- `about` — bio paragraphs and stats
- `skills` — skills with levels and categories
- `techStack` — icon grid
- `projects` — project cards
- `experience` — work + education timeline

Colors and theme tokens are in `src/index.css` under `:root` and `.light`.

## 🛠 Tech Stack

- React 19 + Vite 6
- Tailwind CSS v4
- Framer Motion v12
- GSAP 3
- Lucide React
- React Icons (Font Awesome)
