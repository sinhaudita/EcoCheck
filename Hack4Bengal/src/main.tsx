import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Render the app with strict mode disabled to avoid double-mounting components
createRoot(document.getElementById("root")!).render(<App />);
