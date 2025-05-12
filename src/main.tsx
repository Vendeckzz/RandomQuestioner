import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import emailjs from '@emailjs/browser';

// Initialize with your public key
emailjs.init("MQxX3zq9BjiElVc_4");

createRoot(document.getElementById("root")!).render(<App />);
