# 🧠 NeuroPilot

NeuroPilot is a cross-platform productivity dashboard built with **Electron**, **HTML5**, **CSS3**, and **Vanilla JS**. It empowers users to visually organize and sort applications into contextual categories like `Relax` and `Work` via drag-and-drop interaction. Inspired by behavioral psychology and flow theory, it prioritizes digital wellness and zone-based task management.


---

## 🚀 Features

- 💾 **Local-first Electron App**: Cross-platform app with full offline support.
- 🧠 **Contextual Zoning**: Sort apps by cognitive zones (e.g., `Relax`, `Work`) to avoid task-switching penalties.
- 🖱️ **Drag-and-Drop UX**: Seamless drag-and-drop for rearranging app cards.
- 📦 **Persistent App State**: Save/load state using local storage (extendable to SQLite or Electron Store).
- 🎨 **SVG-Driven UI**: Clean design using inline SVG icons instead of Unicode emojis for scalability and accessibility.
- 🔒 **No tracking**: 100% privacy-friendly — no analytics, no telemetry.

---

## 🛠️ Tech Stack

| Layer | Tech |
|------|------|
| Frontend UI | HTML5 + CSS3 + JavaScript (Vanilla) |
| Framework | [Electron.js](https://www.electronjs.org/) |
| State Management | JavaScript Module Pattern |
| UI/UX | Poppins Font, Inline SVG, CSS Animations |
| Styling | Custom CSS with blur effects, neon theme |
| Modal + Interaction | JS DOM API + Event Delegation |

---

## 📁 Directory Structure

```
NeuroPilot/
│
├── views/                 # HTML views (landing, relax-home, etc.)
├── scripts/               # Vanilla JS (drag logic, modal control, etc.)
├── styles/                # Modular CSS files
├── assets/                # App-specific SVG icons, screenshots
├── main.js                # Electron entry point
├── preload.js             # IPC preload script
├── index.html             # Electron base HTML
└── package.json
```

---

## 🧪 How to Run

```bash
# Install dependencies
npm install

# Start the Electron app
npm start
```

> Requires Node.js v18+ and Electron 25+

---

## 💻 Developer Contributions

👨‍💻 **Built By**: Maharshi Niraj Patel  
🎓 **Role**: Full-stack Developer, UI/UX Engineer  
💡 **Contributions**:
- Designed & implemented modular panel system
- Integrated local state-saving logic
- Replaced emoji UI with dynamic inline SVG loaders
- Built modal-based CRUD system for custom apps
- Architected entire drag-and-drop lifecycle

---

## 📌 To-Do / Roadmap

- [ ] Add user-authentication layer (Electron+Firebase)
- [ ] Multi-zone sync via IndexedDB / Electron Store
- [ ] Export/import profiles via `.json`
- [ ] Cross-device sync (opt-in)

---

## 🔒 License

MIT License

---

## 🌐 Learn More

🔗 Portfolio: [maharshi-patel.com](https://maharshi-patel.com)  
📬 Contact: [LinkedIn](https://www.linkedin.com/in/maharshi-patel1/)
