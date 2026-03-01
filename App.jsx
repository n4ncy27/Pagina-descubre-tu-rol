import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const QUESTIONS = [
  { id: 1,  text: "Generalmente no me acerco a los problemas de forma creativa", category: "C" },
  { id: 2,  text: "Me gusta probar y luego revisar mis ideas antes de generar la solución o el producto final", category: "C" },
  { id: 3,  text: "Me gusta tomarme el tiempo para clarificar la naturaleza exacta del problema", category: "A" },
  { id: 4,  text: "Disfruto de tomar los pasos necesarios para poner mis ideas en acción", category: "D" },
  { id: 5,  text: "Me gusta separar un problema amplio en partes para examinarlo desde todos los ángulos", category: "C" },
  { id: 6,  text: "Tengo dificultad en tener ideas inusuales para resolver un problema", category: "B" },
  { id: 7,  text: "Me gusta identificar los hechos más relevantes relativos al problema", category: "A" },
  { id: 8,  text: "No tengo el temperamento para tratar de aislar las causas específicas de un problema", category: "A" },
  { id: 9,  text: "Disfruto al generar formas únicas de mirar un problema", category: "B" },
  { id: 10, text: "Me gusta generar todos los pro y contras de una solución potencial", category: "C" },
  { id: 11, text: "Antes de implementar una solución me gusta separarla en pasos", category: "C" },
  { id: 12, text: "Transformar ideas en acción no es lo que disfruto más", category: "D" },
  { id: 13, text: "Me gusta superar los criterios que pueden usarse para identificar la mejor opción o solución", category: "C" },
  { id: 14, text: "Disfruto de pasar tiempo profundizando el análisis inicial del problema", category: "B" },
  { id: 15, text: "Por naturaleza no paso mucho tiempo emocionándome en definir el problema exacto a resolver", category: "A" },
  { id: 16, text: "Me gusta entender una situación al mirar el panorama general", category: "B" },
  { id: 17, text: "Disfruto de trabajar en problemas mal definidos y novedosos", category: "B" },
  { id: 18, text: "Cuando trabajo en un problema me gusta encontrar la mejor forma de enunciarlo", category: "A" },
  { id: 19, text: "Disfruto de hacer que las cosas se concreten", category: "D" },
  { id: 20, text: "Me gusta enfocarme en enunciar un problema en forma precisa", category: "A" },
  { id: 21, text: "Disfruto de usar mi imaginación para producir muchas ideas", category: "B" },
  { id: 22, text: "Me gusta enfocarme en la información clave de una situación desafiante", category: "A" },
  { id: 23, text: "Disfruto de tomarme el tiempo para perfeccionar una idea", category: "C" },
  { id: 24, text: "Me resulta difícil implementar mis ideas", category: "D" },
  { id: 25, text: "Disfruto de transformar ideas en bruto en soluciones concretas", category: "D" },
  { id: 26, text: "No paso el tiempo en todas las cosas que necesito hacer para implementar una idea", category: "D" },
  { id: 27, text: "Realmente disfruto de implementar una idea", category: "D" },
  { id: 28, text: "Antes de avanzar me gusta tener una clara comprensión del problema", category: "A" },
  { id: 29, text: "Me gusta trabajar con ideas únicas", category: "B" },
  { id: 30, text: "Disfruto de poner mis ideas en acción", category: "D" },
  { id: 31, text: "Me gusta explorar las fortalezas o debilidades de una solución potencial", category: "C" },
  { id: 32, text: "Disfruto de reunir información para identificar el origen de un problema particular", category: "A" },
  { id: 33, text: "Disfruto del análisis y el esfuerzo que lleva a transformar un concepto preliminar en una idea factible", category: "C" },
  { id: 34, text: "Mi tendencia natural no es generar muchas ideas para los problemas", category: "B" },
  { id: 35, text: "Disfruto de usar metáforas y analogías para generar nuevas ideas para los problemas", category: "B" },
  { id: 36, text: "Encuentro que tengo poca paciencia para el esfuerzo que lleva pulir o refinar una idea", category: "C" },
  { id: 37, text: "Tiendo a buscar una solución rápida y luego implementarla", category: "D" },
];

const ROLES = {
  A: {
    name: "Clarificador",
    color: "#1B4F8A",
    light: "#E8F0FB",
    border: "#ADC8EF",
    description: "Tiene habilidad para definir y analizar el problema central. Identifica hechos clave, clarifica el contexto y asegura que todos comprendan el verdadero desafío antes de actuar.",
  },
  B: {
    name: "Ideador",
    color: "#B5621C",
    light: "#FEF3E8",
    border: "#F5C68A",
    description: "Genera ideas creativas y originales con fluidez. Piensa de forma divergente, explora posibilidades poco convencionales y es motor de la innovación en el equipo.",
  },
  C: {
    name: "Desarrollador",
    color: "#1A7A6E",
    light: "#E7F7F5",
    border: "#8ED5CD",
    description: "Transforma conceptos en planes sólidos y viables. Evalúa opciones, refina propuestas y construye puentes entre las ideas y su ejecución práctica.",
  },
  D: {
    name: "Implementador",
    color: "#7B2D8B",
    light: "#F5EBF8",
    border: "#D4A8E0",
    description: "Lleva las ideas a la realidad con determinación. Ejecuta planes, supera obstáculos y se asegura de que los proyectos lleguen a su conclusión exitosa.",
  },
};

function convertScore(raw) {
  if (raw <= 2) return 1;
  if (raw <= 4) return 2;
  if (raw <= 6) return 3;
  if (raw <= 8) return 4;
  return 5;
}

function calculateResults(answers) {
  const scores = { A: 0, B: 0, C: 0, D: 0 };
  QUESTIONS.forEach((q) => {
    // Excluir pregunta 1 (de ejemplo)
    if (q.id === 1) return;
    const raw = answers[q.id];
    if (raw != null) {
      scores[q.category] += convertScore(raw);
    }
  });
  return scores;
}

function getDominantRole(scores) {
  return Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  USERS: "swsurvey:users",
  RESPONSES: (uid) => `swsurvey:resp:${uid}`,
  HISTORY: (uid) => `swsurvey:hist:${uid}`,
};

const DEFAULT_ADMIN = {
  id: "admin",
  username: "admin",
  password: "admin123",
  role: "admin",
  name: "Administrador",
};

const memoryStore = {};

async function storageGet(key) {
  try {
    const res = await window.storage.get(key);
    return res ? res.value : null;
  } catch {
    // Try localStorage as fallback
    try {
      const val = localStorage.getItem(key);
      return val;
    } catch {
      return memoryStore[key] ?? null;
    }
  }
}

async function storageSet(key, value) {
  memoryStore[key] = value;
  try {
    await window.storage.set(key, value);
  } catch {
    // Try localStorage as fallback
    try {
      localStorage.setItem(key, value);
    } catch {
      // keep in memory only
    }
  }
}

async function loadUsers() {
  const raw = await storageGet(STORAGE_KEYS.USERS);
  return raw ? JSON.parse(raw) : [DEFAULT_ADMIN];
}

async function saveUsers(users) {
  await storageSet(STORAGE_KEYS.USERS, JSON.stringify(users));
}

async function loadResponse(uid) {
  const raw = await storageGet(STORAGE_KEYS.RESPONSES(uid));
  return raw ? JSON.parse(raw) : null;
}

async function saveResponse(uid, data) {
  await storageSet(STORAGE_KEYS.RESPONSES(uid), JSON.stringify(data));
}

async function loadHistory(uid) {
  const raw = await storageGet(STORAGE_KEYS.HISTORY(uid));
  return raw ? JSON.parse(raw) : [];
}

async function appendToHistory(uid, data) {
  const history = await loadHistory(uid);
  history.push(data);
  await storageSet(STORAGE_KEYS.HISTORY(uid), JSON.stringify(history));
}

// ─── SAMPLE DATA GENERATION ────────────────────────────────────────────────────

const SAMPLE_NAMES = [
  "Ana García", "Carlos Martínez", "Diana López", "Emilio Ruiz", "Fátima Núñez",
  "Gabriela Sanz", "Héctor Domínguez", "Iris Jiménez", "Javier Vega", "Kiara Robles",
  "Luis Castillo", "Marina Silva", "Nicolás Flores", "Olga Benítez", "Pablo Navarro",
  "Quintino De la Rosa", "Roxana Rioja", "Sergio Herrera", "Tatiana Molina", "Ulises Araya"
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomUsername() {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateRandomAnswers() {
  const answers = {};
  for (let i = 1; i <= 37; i++) {
    answers[i] = Math.floor(Math.random() * 10) + 1;
  }
  return answers;
}

async function generateSampleData(count = 499) {
  const existingUsers = await loadUsers();
  const adminUser = existingUsers.find((u) => u.role === "admin");
  const existingParticipants = existingUsers.filter((u) => u.role === "user");
  
  const genders = ["masculino", "femenino", "otro", "prefiero_no_decir"];
  const newUsers = [];
  for (let i = 0; i < count; i++) {
    newUsers.push({
      id: `user_${Date.now()}_${i}`,
      cedula: `${100000000 + i}`,
      nombre: `${getRandomElement(SAMPLE_NAMES)} - ${i + 1}`,
      genero: getRandomElement(genders),
      role: "user",
    });
  }

  // Preservar admin + participantes existentes + nuevos participantes
  const allUsers = [adminUser || DEFAULT_ADMIN, ...existingParticipants, ...newUsers];
  await saveUsers(allUsers);

  for (const user of newUsers) {
    const answers = generateRandomAnswers();
    const scores = calculateResults(answers);
    const dominant = getDominantRole(scores);
    const responseData = {
      completed: true,
      answers,
      scores,
      dominant,
      submittedAt: new Date().toISOString(),
    };
    await saveResponse(user.id, responseData);
    await appendToHistory(user.id, responseData);
  }

  return newUsers.length;
}

async function clearAllData() {
  const adminUser = DEFAULT_ADMIN;
  await saveUsers([adminUser]);
  const keys = Object.keys(memoryStore);
  keys.forEach((key) => {
    if (key.startsWith("swsurvey:resp:") || key.startsWith("swsurvey:hist:")) {
      delete memoryStore[key];
    }
  });
  // Also from localStorage
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("swsurvey:resp:") || key.startsWith("swsurvey:hist:")) {
        localStorage.removeItem(key);
      }
    });
  } catch {}
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #F4F2EE;
    --surface: #FFFFFF;
    --surface2: #F0EEE9;
    --border: #E2DED6;
    --text: #1C1917;
    --text-muted: #78716C;
    --text-light: #A8A29E;
    --primary: #1B4F8A;
    --primary-light: #E8F0FB;
    --accent: #B5621C;
    --radius: 12px;
    --radius-sm: 8px;
    --shadow: 0 2px 12px rgba(0,0,0,0.07);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.10);
    --font-head: 'Lora', Georgia, serif;
    --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
    --transition: 0.18s ease;
  }

  body {
    font-family: var(--font-body); color: var(--text); min-height: 100vh;
    -webkit-text-size-adjust: 100%;
    background-color: #F4F2EE;
    background-image:
      radial-gradient(ellipse at 0% 0%, rgba(27,79,138,0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 100% 100%, rgba(26,122,110,0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 10%, rgba(181,98,28,0.04) 0%, transparent 40%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B4F8A' fill-opacity='0.025'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
  }
  * { -webkit-tap-highlight-color: transparent; }
  input, button, select, textarea { font-size: 16px; } /* Prevents iOS zoom on focus */

  .app-wrapper { min-height: 100vh; }

  /* ── NAV ── */
  .nav {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 40px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 8px rgba(0,0,0,0.05);
  }
  .nav-brand {
    font-family: var(--font-head);
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--primary);
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .nav-brand-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: var(--primary); display: flex; align-items: center; justify-content: center;
  }
  .nav-brand-icon svg { color: #fff; }
  .nav-divider {
    width: 1px; height: 28px; background: var(--border); margin: 0 4px;
  }
  .nav-right { display: flex; align-items: center; gap: 12px; }
  .nav-user-block { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; }
  .nav-user-name { font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .nav-user-role { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-light); }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-body); font-weight: 600; font-size: 0.875rem;
    padding: 10px 22px; border-radius: var(--radius-sm);
    border: none; cursor: pointer; transition: all var(--transition);
    text-decoration: none; white-space: nowrap;
  }
  .btn-primary {
    background: var(--primary); color: #fff;
  }
  .btn-primary:hover { background: #153d6d; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(27,79,138,0.25); }
  .btn-secondary {
    background: var(--surface);
    color: var(--primary);
    border: 1.5px solid rgba(27,79,138,0.35);
    font-weight: 700;
    letter-spacing: 0.01em;
    box-shadow: 0 1px 4px rgba(27,79,138,0.06);
  }
  .btn-secondary:hover {
    background: var(--primary-light);
    border-color: var(--primary);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(27,79,138,0.15);
  }
  .btn-ghost { background: transparent; color: var(--primary); padding: 8px 16px; }
  .btn-ghost:hover { background: var(--primary-light); }
  .btn-danger { background: #DC2626; color: #fff; }
  .btn-danger:hover { background: #B91C1C; }
  .btn-sm { padding: 6px 14px; font-size: 0.8rem; }
  .btn-lg { padding: 14px 32px; font-size: 0.95rem; border-radius: var(--radius); }
  .btn:disabled { opacity: 0.45; cursor: not-allowed; pointer-events: none; }

  /* ── ACTION BUTTONS (GENERATE & CLEAR) ── */
  .btn-action-generate {
    background: linear-gradient(135deg, #1A7A6E 0%, #0D5A52 100%);
    color: #fff;
    border: 2px solid #0D5A52;
    font-weight: 700;
    letter-spacing: 0.02em;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(26, 122, 110, 0.3);
  }
  .btn-action-generate::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  .btn-action-generate:hover {
    background: linear-gradient(135deg, #0D5A52 0%, #084840 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(26, 122, 110, 0.5);
  }
  .btn-action-generate:hover::before { left: 100%; }
  .btn-action-generate:active { transform: translateY(0); }

  .btn-action-clear {
    background: linear-gradient(135deg, #B5621C 0%, #8B4513 100%);
    color: #fff;
    border: 2px solid #8B4513;
    font-weight: 700;
    letter-spacing: 0.02em;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(181, 98, 28, 0.3);
  }
  .btn-action-clear::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  .btn-action-clear:hover {
    background: linear-gradient(135deg, #8B4513 0%, #6B3410 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(181, 98, 28, 0.5);
  }
  .btn-action-clear:hover { left: 100%; }
  .btn-action-clear:active { transform: translateY(0); }

  /* ── SUBTLE ACTION BUTTONS ── */
  .btn-action-subtle {
    padding: 8px 16px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    border-radius: 8px;
    border: 1.5px solid;
    background: var(--surface);
    cursor: pointer;
    transition: all 0.22s ease;
    text-transform: uppercase;
  }
  .btn-action-subtle.generate {
    color: #0D5A52;
    border-color: rgba(13, 90, 82, 0.25);
    background: rgba(13, 90, 82, 0.03);
  }
  .btn-action-subtle.generate:hover {
    background: rgba(13, 90, 82, 0.08);
    border-color: rgba(13, 90, 82, 0.5);
    color: #084840;
  }
  .btn-action-subtle.clear {
    color: #8B4513;
    border-color: rgba(139, 69, 19, 0.25);
    background: rgba(139, 69, 19, 0.03);
  }
  .btn-action-subtle.clear:hover {
    background: rgba(139, 69, 19, 0.08);
    border-color: rgba(139, 69, 19, 0.5);
    color: #6B3410;
  }

  .action-buttons-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    align-items: center;
  }

  /* ── CARDS ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  /* ── FORM ── */
  .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
  .form-label { font-size: 0.82rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
  .form-input {
    font-family: var(--font-body); font-size: 0.95rem;
    padding: 11px 14px; border-radius: var(--radius-sm);
    border: 1.5px solid rgba(0,0,0,0.3); background: var(--surface);
    color: var(--text); transition: border-color var(--transition);
    outline: none;
  }
  .form-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(27,79,138,0.1); }
  .password-wrapper { position: relative; }
  .password-wrapper .form-input { padding-right: 44px; width: 100%; }
  .password-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-light); padding: 4px; display: flex; align-items: center; transition: color 0.15s ease; }
  .password-toggle:hover { color: var(--primary); }

  /* ── LOGIN ── */
  .login-screen {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 520px;
    background: var(--bg);
  }
  .login-hero {
    background: linear-gradient(155deg, #071E3D 0%, #0D3060 35%, #1B4F8A 65%, #0D2F5A 100%);
    display: flex; flex-direction: column; align-items: flex-start; justify-content: center;
    padding: 72px 56px;
    position: relative; overflow: hidden;
  }
  /* Dot grid pattern */
  .login-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
  }
  /* Color blobs */
  .login-hero-blobs {
    position: absolute; inset: 0; pointer-events: none;
  }
  .login-hero-blob1 {
    position: absolute; top: -80px; left: -80px; width: 360px; height: 360px; border-radius: 50%;
    background: radial-gradient(circle, rgba(181,98,28,0.25) 0%, transparent 70%);
  }
  .login-hero-blob2 {
    position: absolute; bottom: -60px; right: -60px; width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,122,110,0.2) 0%, transparent 70%);
  }
  .login-hero-blob3 {
    position: absolute; top: 40%; left: 50%; transform: translate(-50%,-50%); width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(74,144,217,0.1) 0%, transparent 70%);
  }
  /* Bottom accent line */
  .login-hero-accent {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, rgba(181,98,28,0.9) 0%, rgba(26,122,110,0.7) 50%, transparent 100%);
  }
  .login-hero-content { position: relative; z-index: 1; }
  .login-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
    color: rgba(255,255,255,0.55); margin-bottom: 22px;
  }
  .login-hero-eyebrow::before {
    content: ''; display: block; width: 28px; height: 2px;
    background: linear-gradient(90deg, rgba(181,98,28,1), rgba(181,98,28,0.4));
    border-radius: 2px;
  }
  .login-hero h1 {
    font-family: var(--font-head);
    font-size: 3.4rem;
    color: #fff;
    line-height: 1.08;
    margin-bottom: 22px;
    font-weight: 700;
    letter-spacing: -0.035em;
    max-width: 480px;
    text-shadow: 0 2px 24px rgba(0,0,0,0.25);
  }
  .login-hero h1 em { font-style: italic; color: rgba(255,255,255,0.52); font-weight: 400; }
  .login-hero p { color: rgba(255,255,255,0.72); font-size: 1.02rem; max-width: 400px; line-height: 1.72; margin-bottom: 0; }

  .login-hero-roles { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 28px; }
  .login-role-chip {
    padding: 7px 16px; border-radius: 100px;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18);
    color: rgba(255,255,255,0.82); font-size: 0.8rem; font-weight: 600;
    letter-spacing: 0.02em; transition: all 0.2s ease;
  }
  .login-role-chip:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.32); color: #fff; }

  /* Steps in right panel */
  .login-steps { display: flex; flex-direction: column; gap: 0; margin-bottom: 36px; }
  .login-step { display: flex; gap: 14px; align-items: flex-start; }
  .login-step-line-wrap { display: flex; flex-direction: column; align-items: center; }
  .login-step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--primary); color: #fff; font-size: 0.72rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .login-step-connector { width: 1px; height: 20px; background: var(--border); margin: 2px 0; }
  .login-step-body { padding-bottom: 16px; }
  .login-step-title { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 2px; }
  .login-step-desc { font-size: 0.75rem; color: var(--text-muted); line-height: 1.5; }
  .login-panel {
    background: var(--surface);
    display: flex; flex-direction: column; justify-content: center;
    padding: 64px 48px 64px 52px;
    border-left: 1px solid var(--border);
  }
  .login-panel-header { margin-bottom: 40px; padding-top: 8px; border-top: 3px solid var(--primary); padding-top: 24px; }
  .login-panel-header h2 { font-family: var(--font-head); font-size: 2.4rem; font-weight: 700; color: var(--text); letter-spacing: -0.03em; line-height: 1.1; }
  .login-panel-header p { color: var(--text-muted); margin-top: 10px; font-size: 0.95rem; line-height: 1.5; }
  .login-tabs { display: flex; gap: 4px; margin-bottom: 32px; background: var(--surface2); border-radius: var(--radius-sm); padding: 4px; border: 1px solid rgba(27,79,138,0.2); }
  .login-tab {
    flex: 1; padding: 8px; border: none; border-radius: 6px; background: transparent;
    font-family: var(--font-body); font-size: 0.85rem; font-weight: 600;
    cursor: pointer; color: var(--text-muted); transition: all var(--transition);
  }
  .login-tab.active { background: var(--surface); color: var(--primary); box-shadow: var(--shadow); }
  .error-msg {
    background: #FEF2F2; border: 1px solid #FECACA; border-radius: var(--radius-sm);
    padding: 10px 14px; color: #B91C1C; font-size: 0.85rem; margin-bottom: 16px;
  }
  .register-link { text-align: center; margin-top: 24px; font-size: 0.85rem; color: var(--text-muted); }
  .register-link button { background: none; border: none; color: var(--primary); font-weight: 600; cursor: pointer; font-size: 0.85rem; }

  /* ── REGISTER MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.35);
    backdrop-filter: blur(4px); z-index: 200;
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn 0.2s ease;
  }
  .modal { background: var(--surface); border-radius: var(--radius); padding: 40px; width: 440px; max-width: 90vw; box-shadow: var(--shadow-lg); position: relative; }
  .modal-close-btn { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 8px; border: none; background: var(--surface2); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-muted); transition: all 0.15s ease; }
  .modal-close-btn:hover { background: var(--border); color: var(--text); }
  .modal h3 { font-family: var(--font-head); font-size: 2rem; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.02em; line-height: 1.15; color: var(--text); }
  .modal p { color: var(--text-muted); font-size: 0.875rem; margin-bottom: 28px; }
  .modal-footer { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

  /* ── SURVEY ── */
  .survey-layout { max-width: 780px; margin: 0 auto; padding: 40px 24px 80px; }
  .survey-header {
    background: linear-gradient(135deg, #0D2F5A 0%, #1B4F8A 60%, #1A4A7A 100%);
    border-radius: 16px; padding: 40px 48px; margin-bottom: 28px;
    position: relative; overflow: hidden;
  }
  .survey-header::after {
    content: ''; position: absolute; top: -50px; right: -50px;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }
  .survey-header-inner { position: relative; z-index: 1; }
  .survey-header-tag {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
    border-radius: 100px; padding: 4px 13px; margin-bottom: 16px;
  }
  .survey-header-tag span { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.7); }
  .survey-header h2 { font-family: var(--font-head); font-size: 2.4rem; font-weight: 700; color: #fff; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 12px; }
  .survey-header h2 em { font-style: italic; color: rgba(255,255,255,0.55); font-weight: 400; }
  .survey-header p { color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.65; max-width: 520px; }

  .progress-bar-wrap {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px 24px; margin-bottom: 28px;
  }
  .progress-bar-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .progress-bar-label span { font-size: 0.82rem; font-weight: 600; color: var(--text-muted); }
  .progress-pct { font-size: 1.5rem; font-weight: 800; color: var(--primary); line-height: 1; }
  .progress-pct small { font-size: 0.75rem; font-weight: 500; color: var(--text-muted); margin-left: 4px; }
  .progress-track { height: 8px; background: var(--surface2); border-radius: 100px; overflow: hidden; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary), #4A90D9); border-radius: 100px; transition: width 0.4s ease; }

  .question-card {
    background: var(--surface); border: 1.5px solid rgba(27,79,138,0.18);
    border-radius: var(--radius); padding: 28px 32px; margin-bottom: 16px;
    animation: slideUp 0.3s ease; transition: border-color var(--transition);
    box-shadow: 0 2px 8px rgba(27,79,138,0.05);
  }
  .question-card.answered { border-color: rgba(27,79,138,0.45); box-shadow: 0 2px 12px rgba(27,79,138,0.1); }
  .question-number { font-size: 0.75rem; font-weight: 700; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
  .question-text { font-size: 1rem; line-height: 1.6; color: var(--text); font-weight: 500; margin-bottom: 24px; }

  .scale-wrapper { display: flex; flex-direction: column; gap: 8px; }
  .scale-labels { display: flex; justify-content: space-between; padding: 0 4px; }
  .scale-labels span { font-size: 0.72rem; color: var(--text-light); font-weight: 500; }
  .scale-buttons { display: flex; gap: 6px; align-items: center; }
  .scale-btn {
    flex: 1; aspect-ratio: 1; border-radius: var(--radius-sm);
    border: 1.5px solid rgba(0,0,0,0.18);
    background: var(--surface);
    cursor: pointer; transition: all var(--transition);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-body); font-size: 0.82rem; font-weight: 700;
    color: var(--text-muted); min-height: 44px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07);
  }
  .scale-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
    background: var(--primary-light);
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(27,79,138,0.15);
  }
  .scale-btn.selected {
    background: var(--primary); border-color: var(--primary);
    color: #fff; transform: scale(1.1) translateY(-1px);
    box-shadow: 0 6px 16px rgba(27,79,138,0.35);
  }

  .scale-divider { width: 2px; height: 20px; background: var(--border); flex-shrink: 0; border-radius: 2px; }

  .survey-nav { display: flex; align-items: center; justify-content: space-between; margin-top: 28px; }

  .page-indicator { font-size: 0.82rem; color: var(--text-muted); }

  /* ── RESULTS ── */
  .results-layout { max-width: 800px; margin: 0 auto; padding: 48px 24px 80px; animation: slideUp 0.4s ease; }

  /* Hero section */
  .results-hero { margin-bottom: 40px; }
  .results-hero-inner {
    background: linear-gradient(145deg, #071E3D 0%, #0E3568 40%, #1A5299 70%, #112F60 100%);
    border-radius: 20px; padding: 64px 72px; text-align: center;
    position: relative; overflow: hidden;
    box-shadow: 0 20px 60px rgba(7,30,61,0.6), inset 0 1px 0 rgba(255,255,255,0.08);
  }
  .results-hero-inner::before {
    content: ''; position: absolute; top: -60px; right: -60px;
    width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 70%);
  }
  .results-hero-inner::after {
    content: ''; position: absolute; bottom: -80px; left: 20%;
    width: 340px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(100,200,180,0.14) 0%, transparent 70%);
  }
  .results-hero-content { position: relative; z-index: 1; }
  .results-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 20px; border-radius: 100px;
    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 28px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35);
    color: #fff;
  }
  .results-hero-badge-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 0 3px rgba(255,255,255,0.15); }
  .results-hero h2 {
    font-family: var(--font-head); font-size: 4.4rem; font-weight: 700;
    color: #fff; margin-bottom: 20px; letter-spacing: -0.05em; line-height: 1.0;
  }
  .results-hero h2 .eres-word { font-style: italic; font-weight: 300; color: rgba(255,255,255,0.78); font-size: 3.4rem; letter-spacing: -0.03em; }
  .results-hero p { color: rgba(255,255,255,0.92); font-size: 1.08rem; line-height: 1.75; max-width: 520px; margin: 0 auto; font-weight: 400; }

  /* Result cards */
  .results-section-label { font-family: var(--font-head); font-size: 1.4rem; font-weight: 700; letter-spacing: -0.02em; color: var(--text); margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
  .results-section-label::before { content: ''; display: block; width: 4px; height: 26px; background: var(--primary); border-radius: 2px; flex-shrink: 0; }
  .results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
  .role-result-card {
    border: 1.5px solid var(--border); border-radius: var(--radius); padding: 26px;
    background: var(--surface); transition: all var(--transition); position: relative; overflow: hidden;
  }
  .role-result-card:hover { box-shadow: var(--shadow); }
  .role-result-card.dominant { box-shadow: var(--shadow-lg); border-width: 2px; }
  .role-result-card.dominant::after {
    content: 'Perfil dominante';
    position: absolute; top: 14px; right: 14px;
    background: var(--primary); color: #fff;
    font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
    padding: 3px 10px; border-radius: 100px;
  }
  .role-result-card-top { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .role-result-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .role-result-name { font-family: var(--font-head); font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em; }
  .role-result-score { font-size: 3rem; font-weight: 800; line-height: 1; margin-bottom: 2px; letter-spacing: -0.03em; }
  .role-result-pct { font-size: 0.75rem; font-weight: 600; margin-bottom: 12px; }
  .role-result-bar-track { height: 7px; background: var(--surface2); border-radius: 100px; overflow: hidden; margin-bottom: 16px; }
  .role-result-bar-fill { height: 100%; border-radius: 100px; transition: width 0.9s ease; }
  .role-result-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; border-top: 1px solid var(--border); padding-top: 14px; }

  /* ── ADMIN DASHBOARD ── */
  .admin-layout { max-width: 1100px; margin: 0 auto; padding: 40px 24px 80px; }
  .admin-header { margin-bottom: 40px; padding-bottom: 28px; border-bottom: 2px solid var(--border); }
  .admin-header h2 { font-family: var(--font-head); font-size: 2.6rem; font-weight: 700; color: var(--text); letter-spacing: -0.03em; line-height: 1.1; }
  .admin-header p { color: var(--text-muted); margin-top: 10px; font-size: 0.95rem; }

  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
  .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 22px 24px; }
  .stat-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-muted); margin-bottom: 8px; }
  .stat-value { font-size: 2rem; font-weight: 700; color: var(--text); line-height: 1; }
  .stat-sub { font-size: 0.8rem; color: var(--text-light); margin-top: 4px; }

  .section-title { font-family: var(--font-head); font-size: 1.4rem; color: var(--text); margin-bottom: 18px; font-weight: 700; letter-spacing: -0.01em; display: flex; align-items: center; gap: 10px; }
  .section-title::before { content: ''; display: block; width: 4px; height: 24px; background: var(--primary); border-radius: 2px; flex-shrink: 0; }

  .roles-overview { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 36px; }
  .roles-overview-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px; display: flex; flex-direction: column; gap: 8px;
  }
  .roles-overview-dot { width: 10px; height: 10px; border-radius: 50%; }
  .roles-overview-name { font-size: 0.85rem; font-weight: 700; }
  .roles-overview-count { font-size: 1.6rem; font-weight: 700; }
  .roles-overview-label { font-size: 0.75rem; color: var(--text-muted); }

  .users-table-wrap { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
  .users-table { width: 100%; border-collapse: collapse; }
  .users-table th {
    background: var(--surface2); padding: 12px 20px; text-align: left;
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
    color: var(--text-muted); border-bottom: 1px solid var(--border);
  }
  .users-table td { padding: 14px 20px; border-bottom: 1px solid var(--border); font-size: 0.875rem; vertical-align: middle; }
  .users-table tr:last-child td { border-bottom: none; }
  .users-table tr:hover td { background: var(--surface2); cursor: pointer; }

  .status-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 100px; font-size: 0.72rem; font-weight: 700;
  }
  .status-badge.completed { background: #ECFDF5; color: #065F46; }
  .status-badge.pending { background: #FEF9EC; color: #92400E; }
  .role-badge {
    display: inline-block; padding: 3px 10px; border-radius: 100px;
    font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
  }

  /* ── USER DETAIL ── */
  .detail-layout { max-width: 960px; margin: 0 auto; padding: 40px 24px 80px; }
  .back-btn { display: inline-flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 0.95rem; font-weight: 700; cursor: pointer; margin-bottom: 28px; background: none; border: none; }
  .back-btn:hover { color: var(--primary); }

  .detail-profile { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px 32px; margin-bottom: 28px; display: flex; align-items: center; gap: 24px; }
  .detail-avatar { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-size: 1.5rem; font-weight: 700; flex-shrink: 0; }
  .detail-info h3 { font-family: var(--font-head); font-size: 1.65rem; font-weight: 700; letter-spacing: -0.02em; }
  .detail-info p { color: var(--text-muted); font-size: 0.875rem; margin-top: 6px; }

  .detail-scores { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 32px; }
  .detail-score-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius); padding: 20px; }
  .detail-score-card.dominant { border-width: 2px; }

  /* ── ANSWERS BY GROUP ── */
  .answers-section { margin-top: 8px; }
  .answers-section-title {
    font-family: var(--font-head); font-size: 1.3rem; font-weight: 700;
    letter-spacing: -0.01em; margin-bottom: 18px; margin-top: 32px;
    display: flex; align-items: center; gap: 10px;
  }
  .answers-section-title::before { content: ''; display: block; width: 4px; height: 22px; border-radius: 2px; flex-shrink: 0; }
  .answers-group-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); overflow: hidden; margin-bottom: 20px;
  }
  .answers-group-header {
    padding: 14px 20px 14px 20px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .answers-group-header-left { display: flex; align-items: center; gap: 10px; }
  .answers-group-badge { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .answers-group-name { font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; }
  .answers-group-total { font-size: 0.78rem; color: var(--text-muted); }
  .answers-group-score-pill { padding: 4px 12px; border-radius: 100px; font-size: 0.78rem; font-weight: 700; }

  .answer-item { padding: 14px 20px; border-bottom: 1px solid var(--border); }
  .answer-item:last-child { border-bottom: none; }
  .answer-item:hover { background: var(--bg); }
  .answer-item-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 10px; }
  .answer-item-num { font-size: 0.7rem; font-weight: 700; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; margin-top: 2px; }
  .answer-item-text { font-size: 0.875rem; color: var(--text); line-height: 1.55; flex: 1; }
  .answer-item-value { font-size: 1.25rem; font-weight: 700; white-space: nowrap; }
  .answer-item-value span { font-size: 0.72rem; font-weight: 500; color: var(--text-light); }
  .answer-bar-row { display: flex; align-items: center; gap: 10px; }
  .answer-bar-track { flex: 1; height: 8px; background: var(--surface2); border-radius: 100px; overflow: hidden; }
  .answer-bar-fill { height: 100%; border-radius: 100px; }
  .answer-bar-label { font-size: 0.72rem; color: var(--text-muted); white-space: nowrap; min-width: 110px; text-align: right; }

  /* ── WELCOME ── */
  /* ── WELCOME ── */
  .welcome-outer { min-height: calc(100vh - 68px); display: flex; align-items: center; justify-content: center; padding: 48px 24px; background: var(--bg); }
  .welcome-layout { max-width: 780px; width: 100%; animation: slideUp 0.4s ease; }
  .welcome-hero { background: linear-gradient(135deg, #0D2F5A 0%, #1B4F8A 60%, #1A4A7A 100%); border-radius: 20px; padding: 56px 64px; margin-bottom: 28px; position: relative; overflow: hidden; }
  .welcome-hero::before { content: ''; position: absolute; top: -40px; right: -40px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,0.04); }
  .welcome-hero::after { content: ''; position: absolute; bottom: -60px; left: 30%; width: 280px; height: 280px; border-radius: 50%; background: rgba(181,98,28,0.08); }
  .welcome-hero-inner { position: relative; z-index: 1; }
  .welcome-tag { display: inline-flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 100px; padding: 5px 14px; margin-bottom: 24px; }
  .welcome-tag span { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.75); }
  .welcome-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ADE80; flex-shrink: 0; }
  .welcome-hero h2 { font-family: var(--font-head); font-size: 2.8rem; font-weight: 700; color: #fff; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 16px; }
  .welcome-hero h2 em { font-style: italic; color: rgba(255,255,255,0.55); font-weight: 400; }
  .welcome-hero p { color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.7; max-width: 480px; }
  .welcome-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
  .welcome-card { background: var(--surface); border: 1.5px solid rgba(27,79,138,0.22); border-radius: var(--radius); padding: 22px 24px; display: flex; gap: 16px; align-items: flex-start; transition: box-shadow 0.18s ease, border-color 0.18s ease; box-shadow: 0 2px 8px rgba(27,79,138,0.06); }
  .welcome-card:hover { box-shadow: var(--shadow); border-color: var(--primary); }
  .welcome-card-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--primary-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .welcome-card-icon svg { color: var(--primary); }
  .welcome-card-title { font-size: 0.875rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .welcome-card-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; }
  .welcome-actions { display: flex; gap: 12px; align-items: center; }
  .info-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--primary-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  /* ── ALREADY COMPLETED ── */
  .completed-banner { background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--radius); padding: 16px 20px; margin-bottom: 28px; display: flex; align-items: center; gap: 12px; color: #065F46; font-size: 0.875rem; font-weight: 500; }

  /* ── EMPTY ── */
  .empty-state { text-align: center; padding: 48px; color: var(--text-muted); }
  .empty-state svg { margin-bottom: 16px; opacity: 0.35; }
  .empty-state p { font-size: 0.9rem; }

  /* ── RESPONSIVE ── */

  /* Tablet landscape (≤1100px) */
  @media (max-width: 1100px) {
    .admin-layout { padding: 32px 20px 60px; }
    .detail-layout { padding: 32px 20px 60px; }
  }

  /* Tablet portrait (≤900px) */
  @media (max-width: 900px) {
    /* Login */
    .login-screen { grid-template-columns: 1fr; }
    .login-hero { display: none; }
    .login-panel { padding: 48px 40px; min-height: 100vh; justify-content: center; }

    /* Nav */
    .nav { padding: 0 20px; height: 60px; }
    .nav-brand { font-size: 1.1rem; }
    .nav-user-role { display: none; }

    /* Welcome */
    .welcome-outer { padding: 32px 16px; align-items: flex-start; }
    .welcome-hero { padding: 40px 32px; }
    .welcome-hero h2 { font-size: 2rem; }
    .welcome-cards { grid-template-columns: 1fr 1fr; gap: 12px; }

    /* Survey */
    .survey-layout { padding: 28px 16px 60px; }
    .survey-header { padding: 32px 32px; }
    .survey-header h2 { font-size: 1.8rem; }

    /* Results */
    .results-layout { padding: 32px 16px 60px; }
    .results-hero-inner { padding: 44px 40px; }
    .results-hero h2 { font-size: 3.4rem; }
    .results-hero h2 .eres-word { font-size: 2.8rem; }
    .results-grid { grid-template-columns: 1fr 1fr; }

    /* Admin */
    .admin-layout { padding: 28px 16px 60px; }
    .admin-header h2 { font-size: 2rem; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .roles-overview { grid-template-columns: repeat(2, 1fr); }
    .users-table th, .users-table td { padding: 12px 14px; }

    /* Detail */
    .detail-layout { padding: 24px 16px 60px; max-width: 100%; }
    .detail-scores { grid-template-columns: repeat(2, 1fr); }
    .detail-profile { padding: 20px 20px; flex-wrap: wrap; }

    /* Answers group */
    .answers-group-header { flex-direction: column; align-items: flex-start; gap: 10px; }
  }

  /* Mobile (≤600px) */
  @media (max-width: 600px) {
    /* Nav */
    .nav { padding: 0 16px; height: 56px; }
    .nav-brand { font-size: 1rem; }
    .nav-brand-icon { width: 26px; height: 26px; }
    .nav-right { gap: 8px; }
    .btn.btn-secondary.btn-sm { padding: 6px 10px; font-size: 0.78rem; }

    /* Login */
    .login-panel { padding: 36px 24px; }
    .login-panel-header h2 { font-size: 1.8rem; }

    /* Modal */
    .modal { width: 95vw; padding: 28px 20px; }
    .modal h3 { font-size: 1.5rem; }

    /* Welcome */
    .welcome-outer { padding: 20px 12px; }
    .welcome-hero { padding: 32px 24px; border-radius: 14px; }
    .welcome-hero h2 { font-size: 1.7rem; }
    .welcome-tag span { font-size: 0.65rem; }
    .welcome-cards { grid-template-columns: 1fr; gap: 10px; }
    .welcome-card { padding: 16px 18px; }
    .welcome-actions { flex-direction: column; }
    .welcome-actions .btn { width: 100%; justify-content: center; }

    /* Survey */
    .survey-layout { padding: 20px 12px 60px; }
    .survey-header { padding: 24px 20px; border-radius: 12px; }
    .survey-header h2 { font-size: 1.5rem; }
    .survey-header p { font-size: 0.82rem; }
    .question-card { padding: 20px 16px; }
    .scale-buttons { gap: 3px; }
    .scale-btn { font-size: 0.68rem; min-height: 36px; }
    .progress-bar-wrap { padding: 16px 18px; }
    .progress-pct { font-size: 1.2rem; }

    /* Results */
    .results-layout { padding: 20px 12px 60px; }
    .results-hero-inner { padding: 36px 24px; border-radius: 14px; }
    .results-hero h2 { font-size: 2.6rem; }
    .results-hero h2 .eres-word { font-size: 2rem; }
    .results-hero p { font-size: 0.92rem; }
    .results-grid { grid-template-columns: 1fr; gap: 12px; }
    .results-section-label { font-size: 1.15rem; }
    .role-result-score { font-size: 2.4rem; }

    /* Admin */
    .admin-layout { padding: 20px 12px 60px; }
    .admin-header { padding-bottom: 20px; }
    .admin-header h2 { font-size: 1.6rem; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .stat-value { font-size: 1.6rem; }
    .roles-overview { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .section-title { font-size: 1.1rem; }
    .users-table-wrap { overflow-x: auto; }
    .users-table { min-width: 560px; }

    /* Detail */
    .detail-layout { padding: 16px 12px 60px; }
    .detail-scores { grid-template-columns: 1fr 1fr; gap: 10px; }
    .detail-profile { gap: 14px; padding: 16px; }
    .detail-info h3 { font-size: 1.2rem; }
    .answers-group-header { padding: 12px 14px; }
    .answer-item { padding: 12px 14px; }
    .answer-item-value { font-size: 1.1rem; }
  }

  /* Small mobile (≤380px) */
  @media (max-width: 380px) {
    .nav-brand-icon { display: none; }
    .welcome-hero h2 { font-size: 1.4rem; }
    .survey-header h2 { font-size: 1.3rem; }
    .results-hero h2 { font-size: 2.1rem; }
    .results-hero h2 .eres-word { font-size: 1.7rem; }
    .detail-scores { grid-template-columns: 1fr 1fr; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .scale-btn { font-size: 0.62rem; min-height: 32px; }
    .modal { padding: 24px 16px; }
    .login-panel { padding: 28px 16px; }
    .admin-header h2 { font-size: 1.4rem; }
  }
`;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Navbar({ user, onLogout }) {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <div className="nav-brand-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
        </div>
        Perfil
      </div>
      {user && (
        <div className="nav-right">
          <div className="nav-divider" />
          <div className="nav-user-block">
            <span className="nav-user-name">{user.nombre || user.name}</span>
            <span className="nav-user-role">{user.role === "admin" ? "Administrador" : "Participante"}</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onLogout} style={{ marginLeft: 4 }}>
            Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [tab, setTab] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Participante: cédula, nombre, género
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");

  // Admin: username, password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmitParticipant = async () => {
    if (!cedula.trim() || !nombre.trim() || !genero) { 
      setError("Completa todos los campos."); 
      return; 
    }
    setError("");
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      const users = await loadUsers();
      // Buscar o crear participante por cédula
      let participant = users.find((u) => u.role === "user" && u.cedula === cedula.trim());
      
      if (!participant) {
        // Crear participante nuevo
        participant = {
          id: `user_${cedula.trim()}_${Date.now()}`,
          cedula: cedula.trim(),
          nombre: nombre.trim(),
          genero: genero,
          role: "user",
        };
        await saveUsers([...users, participant]);
      }
      
      onLogin(participant);
    } catch (err) {
      setError("Error al conectar. Intenta de nuevo.");
    }
    setLoading(false);
  };

  const handleSubmitAdmin = async () => {
    if (!username.trim() || !password) { setError("Completa todos los campos."); return; }
    setError("");
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      const users = await loadUsers();
      const found = users.find(
        (u) => u.username === username.trim() && u.password === password && u.role === "admin"
      );
      if (found) {
        onLogin(found);
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      setError("Error al conectar. Intenta de nuevo.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => { 
    if (e.key === "Enter") {
      if (tab === "user") handleSubmitParticipant();
      else handleSubmitAdmin();
    }
  };

  return (
    <div className="login-screen">
      <div className="login-hero">
        {/* Decorative blobs */}
        <div className="login-hero-blobs">
          <div className="login-hero-blob1" />
          <div className="login-hero-blob2" />
          <div className="login-hero-blob3" />
        </div>
        <div className="login-hero-accent" />

        <div className="login-hero-content">
          <div className="login-hero-eyebrow">Evaluación de perfil profesional</div>
          <h1>
            Descubre tu <em>rol natural</em> en proyectos de software
          </h1>
          <p>
            Una evaluación basada en evidencia para identificar cómo contribuyes mejor en equipos de desarrollo. Responde con honestidad.
          </p>

          <div className="login-hero-roles">
            {Object.values(ROLES).map((r) => (
              <span key={r.name} className="login-role-chip">{r.name}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="login-panel">
        {/* How it works — quick steps */}
        <div className="login-steps">
          {[
            { n: "1", title: "Inicia sesión con tu información", desc: "Ingresa tu cédula, nombre y género para comenzar." },
            { n: "2", title: "Responde las 37 afirmaciones", desc: "Selecciona del 1 al 10 qué tanto se parece cada afirmación a ti." },
            { n: "3", title: "Espera los resultados", desc: "El administrador verá tu perfil y podrá comunicarte los resultados." },
          ].map((s, i, arr) => (
            <div className="login-step" key={s.n}>
              <div className="login-step-line-wrap">
                <div className="login-step-num">{s.n}</div>
                {i < arr.length - 1 && <div className="login-step-connector" />}
              </div>
              <div className="login-step-body">
                <div className="login-step-title">{s.title}</div>
                <div className="login-step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="login-panel-header">
          <h2>Iniciar <span style={{ color: "var(--primary)" }}>sesión</span></h2>
          <p>Selecciona tu rol para continuar</p>
        </div>

        <div className="login-tabs">
          <button className={`login-tab ${tab === "user" ? "active" : ""}`} onClick={() => { setTab("user"); setError(""); }}>
            Participante
          </button>
          <button className={`login-tab ${tab === "admin" ? "active" : ""}`} onClick={() => { setTab("admin"); setError(""); }}>
            Administrador
          </button>
        </div>

        <div>
          {error && <div className="error-msg">{error}</div>}

          {tab === "user" ? (
            <>
              <div className="form-group">
                <label className="form-label">Cédula</label>
                <input
                  className="form-input"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tu número de cédula"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input
                  className="form-input"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Género</label>
                <select
                  className="form-input"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  style={{ cursor: "pointer" }}
                >
                  <option value="">Selecciona tu género</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                  <option value="prefiero_no_decir">Prefiero no decir</option>
                </select>
              </div>
              <button
                className="btn btn-primary btn-lg"
                style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
                onClick={handleSubmitParticipant}
                disabled={loading}
              >
                {loading ? "Accediendo..." : "Comenzar evaluación"}
              </button>
            </>
          ) : (
            <>
              {/* Credenciales Admin Info Card */}
              <div style={{
                background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                border: "2px solid #1976d2",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: 28,
                display: "flex",
                alignItems: "center",
                gap: 16
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 20.627 0 14 5.373 2 12 2z"/><path d="M12 6v6l4 2.464"/>
                </svg>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1565c0", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                    Credenciales de Administrador
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "#1976d2", lineHeight: "1.5" }}>
                    <strong>Usuario:</strong> <code style={{ background: "#ffffff", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace" }}>admin</code>
                    <br />
                    <strong>Contraseña:</strong> <code style={{ background: "#ffffff", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace" }}>admin123</code>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Usuario</label>
                <input
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tu nombre de usuario"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <div className="password-wrapper">
                  <input
                    className="form-input"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••"
                  />
                  <button className="password-toggle" onClick={() => setShowPass(!showPass)} tabIndex={-1} type="button">
                    {showPass
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>
              <button
                className="btn btn-primary btn-lg"
                style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
                onClick={handleSubmitAdmin}
                disabled={loading}
              >
                {loading ? "Verificando..." : "Ingresar"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RegisterModal({ onClose, onRegistered }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!name.trim() || !username.trim() || !password) { setError("Completa todos los campos."); return; }
    if (!gender) { setError("Selecciona tu género."); return; }
    if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return; }
    if (username.trim().includes(" ")) { setError("El usuario no puede contener espacios."); return; }
    setLoading(true);
    try {
      const users = await loadUsers();
      if (users.find((u) => u.username === username.trim())) {
        setError("El nombre de usuario ya existe.");
        setLoading(false);
        return;
      }
      const newUser = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        username: username.trim(),
        password,
        gender,
        role: "user",
      };
      await saveUsers([...users, newUser]);
      onRegistered(newUser);
    } catch (err) {
      setError("Error al registrar. Intenta de nuevo.");
    }
    setLoading(false);
  };

  const genderOptions = [
    { value: "masculino", label: "Masculino" },
    { value: "femenino",  label: "Femenino"  },
    { value: "otro",      label: "Otro"       },
    { value: "prefiero_no_decir", label: "Prefiero no decir" },
  ];

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ animation: "slideUp 0.25s ease" }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <h3>Crear <span style={{ color: "var(--primary)" }}>cuenta</span></h3>
        <p>Registra tus datos para acceder al cuestionario de perfil profesional</p>
        <div>
          {error && <div className="error-msg">{error}</div>}
          <div className="form-group">
            <label className="form-label">Nombre completo</label>
            <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Ana Torres" />
          </div>
          <div className="form-group">
            <label className="form-label">Usuario</label>
            <input className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Sin espacios" />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <div className="password-wrapper">
              <input className="form-input" type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
              <button className="password-toggle" onClick={() => setShowPass(!showPass)} tabIndex={-1} type="button">
                {showPass
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Género</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {genderOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setGender(opt.value)}
                  style={{
                    padding: "9px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: gender === opt.value ? "2px solid var(--primary)" : "1.5px solid rgba(0,0,0,0.28)",
                    background: gender === opt.value ? "var(--primary-light)" : "var(--surface)",
                    color: gender === opt.value ? "var(--primary)" : "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    fontWeight: gender === opt.value ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    textAlign: "center",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Creando..." : "Crear cuenta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WELCOME / START ─────────────────────────────────────────────────────────

function WelcomeScreen({ user, existingResponse, onStart, onViewResults }) {
  const isCompleted = existingResponse?.completed;

  const infoCards = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
      title: "Duración estimada",
      desc: "10 a 15 minutos para completar las 37 afirmaciones",
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
      title: "Escala de respuesta",
      desc: "Para cada afirmación selecciona del 1 al 10 qué tanto se parece a ti",
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      title: "Confidencialidad",
      desc: "No hay respuestas correctas o incorrectas. Responde con sinceridad",
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/></svg>,
      title: "Resultado inmediato",
      desc: "Al finalizar verás tu perfil dominante y la puntuación en cada rol",
    },
  ];

  return (
    <div className="welcome-outer">
      <div className="welcome-layout">

        {/* Hero banner */}
        <div className="welcome-hero">
          <div className="welcome-hero-inner">
            <div className="welcome-tag">
              <div className="welcome-tag-dot" />
              <span>Evaluación activa · 37 afirmaciones</span>
            </div>
            <h2>Cuestionario de <em>Perfil</em> Profesional</h2>
            <p>Responde con honestidad para descubrir qué rol se adapta mejor a tu forma natural de trabajar en proyectos de software.</p>
          </div>
        </div>

        {/* Completed banner */}
        {isCompleted && (
          <div className="completed-banner" style={{ marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Ya completaste el cuestionario el {new Date(existingResponse.submittedAt).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}.
          </div>
        )}

        {/* Info cards grid */}
        <div className="welcome-cards">
          {infoCards.map((card) => (
            <div className="welcome-card" key={card.title}>
              <div className="welcome-card-icon">{card.icon}</div>
              <div>
                <div className="welcome-card-title">{card.title}</div>
                <div className="welcome-card-desc">{card.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="welcome-actions">
          <button className="btn btn-primary btn-lg" onClick={onStart} style={{ flex: isCompleted ? "unset" : 1, justifyContent: "center" }}>
            {isCompleted ? "Responder de nuevo" : "Comenzar evaluación"}
          </button>
          {isCompleted && (
            <button className="btn btn-secondary btn-lg" onClick={onViewResults}>
              Ver mis resultados
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── SURVEY ──────────────────────────────────────────────────────────────────

const PAGE_SIZE = 5;

function SurveyScreen({ user, onComplete }) {
  // Pregunta 1 = ejemplo (no cuenta), preguntas reales = 2..37
  const EXAMPLE_QUESTION = QUESTIONS[0]; // id=1
  const REAL_QUESTIONS = QUESTIONS.slice(1); // id=2..37

  const totalPages = Math.ceil(REAL_QUESTIONS.length / PAGE_SIZE);
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [exampleAnswer, setExampleAnswer] = useState(null);
  const topRef = useRef(null);

  const startIdx = page * PAGE_SIZE;
  const pageQuestions = REAL_QUESTIONS.slice(startIdx, startIdx + PAGE_SIZE);
  const answered = Object.keys(answers).length;
  const progress = (answered / REAL_QUESTIONS.length) * 100;

  const pageAnswered = pageQuestions.every((q) => answers[q.id] != null);
  const allAnswered = REAL_QUESTIONS.every((q) => answers[q.id] != null);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleAnswer = (qId, val) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleNext = () => {
    if (page < totalPages - 1) { setPage((p) => p + 1); scrollTop(); }
  };
  const handleBack = () => {
    if (page > 0) { setPage((p) => p - 1); scrollTop(); }
  };

  const handleSubmit = async () => {
    const scores = calculateResults(answers);
    const dominant = getDominantRole(scores);
    const responseData = { answers, completed: true, submittedAt: new Date().toISOString(), scores, dominant };
    await saveResponse(user.id, responseData);
    await appendToHistory(user.id, responseData);
    onComplete(responseData);
  };

  return (
    <div className="survey-layout" ref={topRef}>
      <div className="survey-header">
        <div className="survey-header-inner">
          <div className="survey-header-tag">
            <span>Cuestionario de perfil profesional</span>
          </div>
          <h2>Descubre tu <em>rol natural</em> en software</h2>
          <p>Lee cada afirmación y selecciona del 1 al 10 qué tanto se parece a tu forma de ser. El 1 indica "Poco se parece a mí" y el 10 "Se parece mucho a mí".</p>
        </div>
      </div>

      {/* ── BLOQUE DE EJEMPLO: solo se muestra en la primera página ── */}
      {page === 0 && (
        <div style={{
          border: "2px dashed var(--accent)",
          borderRadius: "12px",
          background: "rgba(181,98,28,0.04)",
          padding: "4px",
          marginBottom: "28px",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--accent)",
            borderRadius: "8px 8px 0 0",
            padding: "10px 18px",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Pregunta de ejemplo — No cuenta para la evaluación
            </span>
          </div>
          <div style={{ padding: "4px 4px 0" }}>
            <QuestionCard
              question={EXAMPLE_QUESTION}
              index={-1}
              value={exampleAnswer}
              onChange={(val) => setExampleAnswer(val)}
              isExample={true}
            />
          </div>
          <div style={{
            padding: "12px 18px",
            background: "rgba(181,98,28,0.06)",
            borderRadius: "0 0 8px 8px",
            fontSize: "0.82rem",
            color: "var(--accent)",
            fontStyle: "italic",
            lineHeight: "1.5",
          }}>
            Esta afirmación es solo un ejemplo para que practiques cómo responder. Tu selección aquí <strong>no afecta tu resultado final</strong>. Cuando te sientas listo, responde las afirmaciones reales a continuación.
          </div>
        </div>
      )}

      <div className="progress-bar-wrap">
        <div className="progress-bar-label">
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-muted)", marginBottom: 4 }}>Progreso de respuesta</div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-light)" }}>{answered} de {REAL_QUESTIONS.length} afirmaciones completadas</div>
          </div>
          <div className="progress-pct">{Math.round(progress)}<small>%</small></div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {pageQuestions.map((q, i) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={startIdx + i}
          value={answers[q.id]}
          onChange={(val) => handleAnswer(q.id, val)}
        />
      ))}

      <div className="survey-nav">
        <button className="btn btn-secondary" onClick={handleBack} disabled={page === 0}>
          Anterior
        </button>
        <span className="page-indicator">Página {page + 1} de {totalPages}</span>
        {page < totalPages - 1 ? (
          <button className="btn btn-primary" onClick={handleNext} disabled={!pageAnswered}>
            Siguiente
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!allAnswered}>
            Enviar respuestas
          </button>
        )}
      </div>
    </div>
  );
}

function QuestionCard({ question, index, value, onChange, isExample }) {
  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={`question-card ${value != null ? "answered" : ""}`} style={isExample ? { borderColor: "var(--accent)", background: "#fffdf9" } : {}}>
      <div className="question-number" style={isExample ? { color: "var(--accent)" } : {}}>
        {isExample ? "Afirmación de ejemplo" : `Afirmación ${index + 1}`}
      </div>
      <div className="question-text">{question.text}</div>
      <div className="scale-wrapper">
        <div className="scale-labels">
          <span>Poco se parece a mí</span>
          <span>Neutral</span>
          <span>Se parece mucho a mí</span>
        </div>
        <div className="scale-buttons">
          {labels.map((n, i) => (
            <>
              {i === 5 && <div key="div" className="scale-divider" />}
              <button
                key={n}
                className={`scale-btn ${value === n ? "selected" : ""}`}
                style={isExample && value === n ? { background: "var(--accent)", borderColor: "var(--accent)" } : {}}
                onClick={() => onChange(n)}
              >
                {n}
              </button>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RESULTS ─────────────────────────────────────────────────────────────────

function ResultsScreen({ responseData, onRetake }) {
  return (
    <div className="results-layout">
      <div className="results-hero">
        <div className="results-hero-inner">
          <div className="results-hero-content" style={{ 
            textAlign: "center", 
            maxWidth: 580,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: 0
          }}>
            {/* Checkmark animado */}
            <div style={{
              width: "120px",
              height: "120px",
              background: "var(--primary)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 48,
              boxShadow: "0 8px 32px rgba(27,79,138,0.25)",
              animation: "scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            {/* Título principal */}
            <h2 style={{ 
              margin: 0,
              marginBottom: 16,
              fontSize: "2.8rem",
              fontWeight: 800,
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              color: "#ffffff"
            }}>
              ¡Evaluación completada!
            </h2>

            {/* Subtítulo */}
            <p style={{ 
              fontSize: "1rem", 
              lineHeight: "1.7", 
              color: "#e8f0f9", 
              marginBottom: 40,
              fontWeight: 500
            }}>
              Gracias por responder con honestidad. Tu evaluación ha sido registrada exitosamente.
            </p>

            {/* Caja de información mejorada */}
            <div style={{ 
              background: "rgba(255, 255, 255, 0.12)",
              border: "2px solid rgba(255, 255, 255, 0.25)",
              borderRadius: "16px", 
              padding: "32px 28px",
              marginBottom: 40,
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(8px)"
            }}>
              <div style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                marginBottom: 12
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v4m0 4h.01"></path>
                </svg>
                <p style={{ 
                  margin: 0, 
                  color: "#ffffff", 
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  lineHeight: "1.4"
                }}>
                  Los resultados están siendo analizados por el equipo administrativo.
                </p>
              </div>
              <p style={{ 
                margin: 0, 
                color: "#d4e5f7", 
                fontSize: "0.95rem",
                lineHeight: "1.5",
                paddingLeft: 32
              }}>
                Pronto te comunicarán tu perfil profesional y recomendaciones personalizadas.
              </p>
            </div>

            {/* Botón mejorado */}
            <button 
              className="btn btn-primary btn-lg"
              onClick={onRetake}
              style={{
                padding: "14px 48px",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                boxShadow: "0 4px 16px rgba(27,79,138,0.25)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 24px rgba(27,79,138,0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 16px rgba(27,79,138,0.25)";
              }}
            >
              Salir
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// ─── PROFILE CHART ────────────────────────────────────────────────────────────

function ProfileChart({ roleCount, total }) {
  const maxCount = Math.max(...Object.values(roleCount), 1);
  const BAR_HEIGHT = 220;

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "32px", boxShadow: "var(--shadow)" }}>
      <div style={{ fontFamily: "var(--font-head)", fontSize: "1.4rem", fontWeight: 700, marginBottom: 56, letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ display: "block", width: 4, height: 20, background: "var(--primary)", borderRadius: 2 }} />
        Distribución actual de perfiles
      </div>

      {/* Bars */}
      <div style={{ 
        display: "flex", 
        gap: 24, 
        alignItems: "flex-end", 
        justifyContent: "center", 
        height: BAR_HEIGHT + 120, 
        paddingTop: 60,
        marginBottom: 48,
        borderBottom: "1px solid var(--border)",
        paddingBottom: 32
      }}>
        {Object.entries(ROLES).map(([key, role]) => {
          const count = roleCount[key] || 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const barH = total > 0 ? Math.round((count / maxCount) * BAR_HEIGHT) : 0;
          return (
            <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, maxWidth: 140 }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: role.color }}>{pct}%</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: role.color, lineHeight: 1 }}>{count}</div>
              <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{
                  width: "72%", height: `${barH}px`, minHeight: 4,
                  background: `linear-gradient(to top, ${role.color}, ${role.color}cc)`,
                  borderRadius: "6px 6px 0 0",
                  transition: "height 0.6s ease",
                  position: "relative",
                  boxShadow: `0 -4px 16px ${role.color}33`,
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "40%",
                    background: "rgba(255,255,255,0.15)", borderRadius: "6px 6px 0 0",
                  }} />
                </div>
              </div>
              {/* X axis line */}
              <div style={{ width: "100%", height: 2, background: "var(--border)", borderRadius: 2 }} />
              <div style={{ padding: "8px 6px", background: role.light, borderRadius: 8, border: `1px solid ${role.border}`, textAlign: "center", width: "100%" }}>
                <div style={{ fontWeight: 700, fontSize: "0.78rem", color: role.color }}>{role.name}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Donut chart - Two column layout */}
      <div style={{ 
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 48,
        alignItems: "center",
        justifyItems: "center"
      }}>
        {/* Left: Donut */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <svg width="200" height="200" viewBox="0 0 160 160">
            {(() => {
              const cx = 80, cy = 80, r = 60, strokeW = 26;
              const circumference = 2 * Math.PI * r;
              let offset = 0;
              const segments = Object.entries(ROLES).map(([key, role]) => {
                const count = roleCount[key] || 0;
                const pct = total > 0 ? count / total : 0;
                const dash = pct * circumference;
                const el = (
                  <circle key={key} cx={cx} cy={cy} r={r}
                    fill="none" stroke={role.color} strokeWidth={strokeW}
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeDashoffset={-offset}
                    style={{ transform: "rotate(-90deg)", transformOrigin: "80px 80px", transition: "stroke-dasharray 0.6s ease" }}
                  />
                );
                offset += dash;
                return el;
              });
              return (
                <>
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={strokeW} />
                  {segments}
                  <text x={cx} y={cy - 8} textAnchor="middle" fontSize="24" fontWeight="800" fill="var(--text)">{total}</text>
                  <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontWeight="600" letterSpacing="1">TOTAL</text>
                </>
              );
            })()}
          </svg>
        </div>

        {/* Right: Legend */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 14,
          justifyContent: "center"
        }}>
          {Object.entries(ROLES).map(([key, role]) => {
            const count = roleCount[key] || 0;
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={key} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 10,
                padding: "10px 14px",
                background: "var(--surface-hover)",
                borderRadius: 8,
                border: `1px solid ${role.border}20`
              }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: role.color, flexShrink: 0 }} />
                <span style={{ fontSize: "0.9rem", color: "var(--text)", fontWeight: 600, flex: 1 }}>{role.name}</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text)", fontWeight: 700 }}>{count}</span>
                <span style={{ fontSize: "0.85rem", color: role.color, fontWeight: 700 }}>({pct}%)</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive fallback for small screens */}
      <style>{`
        @media (max-width: 900px) {
          [data-profile-grid] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── ALL TESTS TAB ────────────────────────────────────────────────────────────

function AllTestsTab({ users, historiesByUser, onExportCSV, onExportJSON, onImport }) {
  const allTests = [];
  users.forEach((u) => {
    const hist = historiesByUser[u.id] || [];
    hist.forEach((entry, idx) => {
      allTests.push({ user: u, entry, attemptNum: idx + 1 });
    });
  });
  // Sort newest first
  allTests.sort((a, b) => new Date(b.entry.submittedAt) - new Date(a.entry.submittedAt));

  return (
    <div>
      {/* Import / Export buttons */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Total de registros históricos: <strong style={{ color: "var(--text)" }}>{allTests.length}</strong>
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <label style={{
            padding: "8px 16px", borderRadius: 8, border: "1.5px solid rgba(27,79,138,0.3)",
            background: "var(--primary-light)", color: "var(--primary)", fontWeight: 600, fontSize: "0.8rem",
            cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.01em",
          }}>
            Importar JSON
            <input type="file" accept=".json" style={{ display: "none" }} onChange={onImport} />
          </label>
          <button className="btn-action-subtle generate" onClick={onExportCSV}>Exportar CSV</button>
          <button className="btn-action-subtle generate" onClick={onExportJSON}>Exportar JSON</button>
        </div>
      </div>

      {allTests.length === 0 ? (
        <div className="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 17H5a2 2 0 00-2 2v1h18v-1a2 2 0 00-2-2h-4m-4-14v10m0 0l3-3m-3 3l-3-3"/></svg>
          <p>No hay pruebas registradas aún</p>
        </div>
      ) : (
        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cédula</th>
                <th>Género</th>
                <th>Intento</th>
                <th>Perfil dominante</th>
                <th>A</th><th>B</th><th>C</th><th>D</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {allTests.map(({ user: u, entry, attemptNum }, idx) => {
                const role = ROLES[entry.dominant];
                return (
                  <tr key={idx}>
                    <td><strong style={{ color: "var(--text)" }}>{u.nombre}</strong></td>
                    <td style={{ color: "var(--text-muted)" }}>{u.cedula}</td>
                    <td style={{ textTransform: "capitalize", color: "var(--text-muted)" }}>{u.genero?.replace("_", " ") || "—"}</td>
                    <td style={{ textAlign: "center" }}>
                      <span style={{ background: "var(--primary-light)", color: "var(--primary)", fontWeight: 700, fontSize: "0.78rem", padding: "2px 8px", borderRadius: 100 }}>#{attemptNum}</span>
                    </td>
                    <td>
                      <span className="role-badge" style={{ background: role.light, color: role.color, border: `1px solid ${role.border}` }}>
                        {role.name}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: ROLES.A.color }}>{entry.scores?.A ?? "—"}</td>
                    <td style={{ fontWeight: 700, color: ROLES.B.color }}>{entry.scores?.B ?? "—"}</td>
                    <td style={{ fontWeight: 700, color: ROLES.C.color }}>{entry.scores?.C ?? "—"}</td>
                    <td style={{ fontWeight: 700, color: ROLES.D.color }}>{entry.scores?.D ?? "—"}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                      {new Date(entry.submittedAt).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── GENERATE DATA MODAL ──────────────────────────────────────────────────────

function GenerateDataModal({ isOpen, onClose, onConfirm }) {
  const [quantity, setQuantity] = useState("499");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    const num = parseInt(quantity.trim(), 10);
    if (!quantity.trim() || isNaN(num) || num <= 0) {
      setError("Ingresa un número válido mayor a 0");
      return;
    }
    if (num > 10000) {
      setError("La cantidad máxima es 10,000");
      return;
    }
    setError("");
    onConfirm(num);
    setQuantity("499");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleConfirm();
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}>
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "32px",
        maxWidth: "400px",
        width: "90%",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
      }}>
        <h3 style={{ margin: "0 0 8px", color: "var(--text)" }}>Generar datos de ejemplo</h3>
        <p style={{ margin: "0 0 24px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          ¿Cuántos participantes deseas generar?
        </p>

        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ingresa la cantidad"
          min="1"
          max="10000"
          style={{
            width: "100%",
            padding: "12px",
            border: error ? "2px solid var(--danger, #d32f2f)" : "1px solid var(--border)",
            borderRadius: "6px",
            fontSize: "1rem",
            marginBottom: error ? 8 : 24,
            boxSizing: "border-box",
            background: "var(--input-bg, #ffffff)",
            color: "var(--text)"
          }}
          autoFocus
        />

        {error && (
          <p style={{
            margin: "0 0 24px",
            color: "#d32f2f",
            fontSize: "0.85rem",
            fontWeight: 600
          }}>
            {error}
          </p>
        )}

        <div style={{
          display: "flex",
          gap: 10
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--surface)",
              color: "var(--text)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--border)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "var(--surface)";
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "none",
              borderRadius: "6px",
              background: "var(--primary)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 12px rgba(27, 79, 138, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Generar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────

function AdminDashboard({ onViewUser }) {
  const [users, setUsers] = useState([]);
  const [responses, setResponses] = useState({});
  const [histories, setHistories] = useState({});
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState("participantes");
  const [successMessage, setSuccessMessage] = useState("");

  const loadData = async () => {
    setLoading(true);
    const allUsers = await loadUsers();
    const participants = allUsers.filter((u) => u.role === "user");
    setUsers(participants);
    const resp = {}, hist = {};
    await Promise.all(participants.map(async (u) => {
      resp[u.id] = await loadResponse(u.id);
      hist[u.id] = await loadHistory(u.id);
    }));
    setResponses(resp);
    setHistories(hist);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [refreshKey]);

  const handleGenerateSampleData = () => {
    setShowGenerateModal(true);
  };

  const handleConfirmGenerate = async (quantity) => {
    setShowGenerateModal(false);
    await generateSampleData(quantity);
    setSuccessMessage(`✓ Se generaron exitosamente ${quantity} participante${quantity !== 1 ? 's de' : ' de'} ejemplo.`);
    setTimeout(() => setSuccessMessage(""), 4000);
    setRefreshKey((k) => k + 1);
  };

  const handleClearAllData = async () => {
    if (window.confirm("⚠️ ¿Limpiar TODOS los datos? Esta acción no se puede deshacer. Se mantendrá solo la cuenta de administrador.")) {
      await clearAllData();
      setRefreshKey((k) => k + 1);
    }
  };

  const handleExportCSV = () => {
    const rows = [["Nombre", "Cedula", "Genero", "Intento", "Perfil", "Puntaje A", "Puntaje B", "Puntaje C", "Puntaje D", "Fecha"]];
    users.forEach((u) => {
      const hist = histories[u.id] || [];
      hist.forEach((entry, i) => {
        rows.push([
          u.nombre || "",
          u.cedula || "",
          (u.genero || "").replace("_", " "),
          i + 1,
          entry.dominant || "",
          entry.scores?.A ?? "",
          entry.scores?.B ?? "",
          entry.scores?.C ?? "",
          entry.scores?.D ?? "",
          entry.submittedAt ? new Date(entry.submittedAt).toLocaleString("es-CO") : "",
        ]);
      });
    });
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pruebas_perfiles.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      users: users.map((u) => ({ ...u })),
      histories: Object.fromEntries(users.map((u) => [u.id, histories[u.id] || []])),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pruebas_perfiles.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      if (!payload.users || !payload.histories) {
        alert("Archivo JSON inválido: debe contener 'users' e 'histories'.");
        return;
      }
      // Merge users: load existing, add new ones (match by cedula to avoid duplicates)
      const existingUsers = await loadUsers();
      const existingCedulas = new Set(existingUsers.filter((u) => u.role === "user").map((u) => u.cedula));
      const toAdd = payload.users.filter((u) => u.role === "user" && !existingCedulas.has(u.cedula));
      const merged = [...existingUsers, ...toAdd];
      await saveUsers(merged);
      // Merge histories: append entries not already present (match by submittedAt)
      for (const u of payload.users) {
        if (u.role !== "user") continue;
        const incomingHist = payload.histories[u.id] || [];
        // Find the user id in the merged list (may differ if re-created)
        const localUser = merged.find((m) => m.cedula === u.cedula && m.role === "user");
        if (!localUser) continue;
        const localHist = await loadHistory(localUser.id);
        const existingDates = new Set(localHist.map((e) => e.submittedAt));
        const newEntries = incomingHist.filter((e) => !existingDates.has(e.submittedAt));
        const combinedHist = [...localHist, ...newEntries].sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
        storageSet(STORAGE_KEYS.HISTORY(localUser.id), combinedHist);
        // Also ensure latest response reflects last completed entry
        const lastCompleted = [...combinedHist].reverse().find((e) => e.completed);
        if (lastCompleted) storageSet(STORAGE_KEYS.RESPONSES(localUser.id), JSON.stringify(lastCompleted));
      }
      alert(`Importación completada. Se agregaron ${toAdd.length} participante(s) nuevo(s).`);
      e.target.value = "";
      setRefreshKey((k) => k + 1);
    } catch (err) {
      alert("Error al leer el archivo: " + err.message);
    }
  };

  if (loading) return <div style={{ padding: 48, textAlign: "center", color: "var(--text-muted)" }}>Cargando datos...</div>;

  const completed = users.filter((u) => responses[u.id]?.completed);
  const pending = users.length - completed.length;

  // Role distribution (from latest responses)
  const roleCount = { A: 0, B: 0, C: 0, D: 0 };
  completed.forEach((u) => {
    const r = responses[u.id]?.dominant;
    if (r) roleCount[r]++;
  });

  return (
    <>
      <GenerateDataModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        onConfirm={handleConfirmGenerate}
      />

      {/* Success Toast */}
      {successMessage && (
        <div style={{
          position: "fixed",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
          padding: "16px 24px",
          borderRadius: "8px",
          boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
          fontSize: "0.95rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 10000,
          animation: "slideDown 0.3s ease-out"
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {successMessage}
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>

      <div className="admin-layout">
      <div className="admin-header">
        <h2>Panel de <span style={{ color: "var(--primary)" }}>Administración</span></h2>
        <p>Resumen de participantes y resultados del cuestionario de perfil profesional</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total participantes</div>
          <div className="stat-value">{users.length}</div>
          <div className="stat-sub">Cuentas registradas</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completados</div>
          <div className="stat-value" style={{ color: "#065F46" }}>{completed.length}</div>
          <div className="stat-sub">Cuestionarios finalizados</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pendientes</div>
          <div className="stat-value" style={{ color: "#92400E" }}>{pending}</div>
          <div className="stat-sub">Sin completar</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tasa de finalización</div>
          <div className="stat-value">{users.length > 0 ? Math.round((completed.length / users.length) * 100) : 0}%</div>
          <div className="stat-sub">Del total registrado</div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="login-tabs" style={{ marginBottom: 28 }}>
        <button className={`login-tab${activeTab === "participantes" ? " active" : ""}`} onClick={() => setActiveTab("participantes")}>
          Participantes
        </button>
        <button className={`login-tab${activeTab === "todas" ? " active" : ""}`} onClick={() => setActiveTab("todas")}>
          Todas las pruebas
        </button>
        <button className={`login-tab${activeTab === "grafica" ? " active" : ""}`} onClick={() => setActiveTab("grafica")}>
          Gráfica de perfiles
        </button>
      </div>

      {/* TAB: Participantes */}
      {activeTab === "participantes" && (
        <>
          {completed.length > 0 && (
            <>
              <p className="section-title">Distribución por perfil dominante</p>
              <div className="roles-overview">
                {Object.entries(ROLES).map(([key, role]) => (
                  <div className="roles-overview-card" key={key} style={{ borderLeft: `4px solid ${role.color}` }}>
                    <div className="roles-overview-dot" style={{ background: role.color }} />
                    <div className="roles-overview-name" style={{ color: role.color }}>{role.name}</div>
                    <div className="roles-overview-count">{roleCount[key]}</div>
                    <div className="roles-overview-label">
                      {completed.length > 0 ? Math.round((roleCount[key] / completed.length) * 100) : 0}% del total
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <p className="section-title">Lista de participantes</p>
          <div className="action-buttons-group">
            <button className="btn-action-subtle generate" onClick={handleGenerateSampleData}>
              Generar datos
            </button>
            <button className="btn-action-subtle clear" onClick={handleClearAllData}>
              Limpiar datos
            </button>
          </div>
          {users.length === 0 ? (
            <div className="empty-state">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              <p>Aún no hay participantes registrados</p>
            </div>
          ) : (
            <div className="users-table-wrap">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cédula</th>
                    <th>Género</th>
                    <th>Estado</th>
                    <th>Perfil dominante</th>
                    <th>Puntaje</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const resp = responses[u.id];
                    const done = resp?.completed;
                    const dom = resp?.dominant;
                    const role = dom ? ROLES[dom] : null;
                    return (
                      <tr key={u.id} onClick={() => onViewUser(u, resp)} title="Ver detalle">
                        <td><strong style={{ color: "var(--text)" }}>{u.nombre}</strong></td>
                        <td style={{ color: "var(--text-muted)" }}>{u.cedula}</td>
                        <td style={{ textTransform: "capitalize", color: "var(--text-muted)" }}>{u.genero?.replace("_", " ") || "—"}</td>
                        <td>
                          <span className={`status-badge ${done ? "completed" : "pending"}`}>
                            {done ? "Completado" : "Pendiente"}
                          </span>
                        </td>
                        <td>
                          {role ? (
                            <span className="role-badge" style={{ background: role.light, color: role.color, border: `1px solid ${role.border}` }}>
                              {role.name}
                            </span>
                          ) : (
                            <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>Sin datos</span>
                          )}
                        </td>
                        <td>
                          {done && dom ? (
                            <span style={{ fontWeight: 700, color: role.color }}>{resp.scores[dom]} pts</span>
                          ) : "—"}
                        </td>
                        <td style={{ color: "var(--text-muted)" }}>
                          {done ? new Date(resp.submittedAt).toLocaleDateString("es-CO") : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* TAB: Todas las pruebas */}
      {activeTab === "todas" && (
        <AllTestsTab
          users={users}
          historiesByUser={histories}
          onExportCSV={handleExportCSV}
          onExportJSON={handleExportJSON}
          onImport={handleImport}
        />
      )}

      {/* TAB: Gráfica */}
      {activeTab === "grafica" && (
        <ProfileChart roleCount={roleCount} total={completed.length} />
      )}
      </div>
    </>
  );
}

// ─── USER DETAIL (ADMIN) ──────────────────────────────────────────────────────

// Semaphore: 1-3 = Poco se parece a mí (red), 4-6 = Neutral (yellow), 7-10 = Se parece mucho a mí (green)
function getScoreLevel(raw) {
  if (raw == null) return null;
  if (raw <= 3) return { label: "Poco se parece a mí",     color: "#C0392B", bg: "#FEF2F2", border: "#FECACA", dot: "#EF4444" };
  if (raw <= 6) return { label: "Neutral",                  color: "#92400E", bg: "#FFFBEB", border: "#FDE68A", dot: "#F59E0B" };
  return         { label: "Se parece mucho a mí",           color: "#065F46", bg: "#F0FDF4", border: "#BBF7D0", dot: "#22C55E" };
}

function UserDetailScreen({ user, response, onBack }) {
  const { scores, dominant, answers } = response;
  const maxPossible = { A: 44, B: 44, C: 49, D: 44 };
  const domRole = ROLES[dominant];

  const initials = user.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  // Group questions by category, excluyendo pregunta 1
  const grouped = { A: [], B: [], C: [], D: [] };
  QUESTIONS.forEach((q, i) => {
    if (q.id === 1) return; // Excluir pregunta 1
    grouped[q.category].push({ ...q, globalIndex: i + 1 });
  });

  return (
    <div className="detail-layout">
      <button className="back-btn" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Volver al panel
      </button>

      {/* Profile header */}
      <div className="detail-profile">
        <div className="detail-avatar" style={{ background: domRole.light, color: domRole.color }}>
          {initials}
        </div>
        <div className="detail-info">
          <h3>{user.nombre}</h3>
          <p>
            Cédula: {user.cedula}&nbsp;&nbsp;·&nbsp;&nbsp;
            Género: <strong style={{ textTransform: "capitalize" }}>{user.genero?.replace("_", " ")}</strong>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            Perfil: <strong style={{ color: domRole.color }}>{domRole.name}</strong>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            {new Date(response.submittedAt).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Score summary cards */}
      <div className="detail-scores">
        {Object.entries(ROLES).map(([key, role]) => {
          const score = scores[key];
          const max = maxPossible[key];
          const pct = Math.round((score / max) * 100);
          const isDom = key === dominant;
          return (
            <div key={key} className={`detail-score-card ${isDom ? "dominant" : ""}`} style={{ borderColor: isDom ? role.color : undefined }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: role.color, marginBottom: 8 }}>
                {role.name}
              </div>
              <div style={{ fontSize: "1.9rem", fontWeight: 700, color: role.color, lineHeight: 1 }}>{score}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-light)", margin: "4px 0 12px" }}>
                de {max} puntos posibles ({pct}%)
              </div>
              <div style={{ height: 7, background: "var(--surface2)", borderRadius: 100, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: role.color, borderRadius: 100, transition: "width 0.8s ease" }} />
              </div>
              {isDom && (
                <div style={{ marginTop: 10, fontSize: "0.72rem", fontWeight: 700, color: role.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Perfil dominante
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Answers grouped by role */}
      <div className="answers-section">
        <div style={{ fontFamily: "var(--font-head)", fontSize: "1.9rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "block", width: 4, height: 24, background: "var(--primary)", borderRadius: 2, flexShrink: 0 }} />
          Detalle de respuestas por perfil
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: 28, lineHeight: "1.65" }}>
          Cada afirmación muestra la respuesta seleccionada (1–10) con una etiqueta de color: rojo indica "Poco se parece a mí", amarillo "Neutral" y verde "Se parece mucho a mí". Las afirmaciones están agrupadas por perfil.
        </p>

        {Object.entries(ROLES).map(([key, role]) => {
          const qs = grouped[key];
          const groupScore = scores[key];
          const groupMax = maxPossible[key];
          const groupPct = Math.round((groupScore / groupMax) * 100);

          return (
            <div className="answers-group-card" key={key}>
              {/* Group header */}
              <div className="answers-group-header" style={{ background: role.light, borderBottomColor: role.border }}>
                <div className="answers-group-header-left">
                  <div className="answers-group-badge" style={{ background: role.color }} />
                  <span className="answers-group-name" style={{ color: role.color }}>{role.name}</span>
                  <span className="answers-group-total" style={{ color: role.color, opacity: 0.7 }}>
                    {qs.length} afirmaciones
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.7rem", color: role.color, fontWeight: 600, opacity: 0.8, marginBottom: 2 }}>Puntaje acumulado</div>
                    <div style={{ fontSize: "0.72rem", color: role.color, opacity: 0.65 }}>{groupScore} de {groupMax} pts</div>
                  </div>
                  <span className="answers-group-score-pill" style={{ background: role.color, color: "#fff" }}>
                    {groupPct}%
                  </span>
                </div>
              </div>

              {/* Individual answers */}
              {qs.map((q) => {
                const raw = answers[q.id] ?? null;
                const level = getScoreLevel(raw);
                return (
                  <div className="answer-item" key={q.id}>
                    <div className="answer-item-top">
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                        <span className="answer-item-num">Afirmación {q.globalIndex}</span>
                        <span className="answer-item-text">{q.text}</span>
                      </div>
                      {/* Score badge right side */}
                      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                        <div style={{
                          fontSize: "1.5rem", fontWeight: 800, lineHeight: 1,
                          color: level ? level.color : "var(--text-light)",
                        }}>
                          {raw ?? "—"}
                          <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-light)", marginLeft: 2 }}>/10</span>
                        </div>
                        {level && (
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            padding: "3px 10px", borderRadius: 100,
                            background: level.bg, border: `1px solid ${level.border}`,
                            color: level.color, fontSize: "0.72rem", fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: level.dot, display: "inline-block", flexShrink: 0 }} />
                            {level.label}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Scale dots — 10 circles, selected one highlighted */}
                    {raw != null && (
                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          {[1,2,3,4,5,6,7,8,9,10].map((n) => {
                            const isSelected = n === raw;
                            const isFilled = n <= raw;
                            const dotColor = level ? level.dot : "var(--surface2)";
                            return (
                              <div key={n} style={{
                                width: isSelected ? 22 : 14,
                                height: isSelected ? 22 : 14,
                                borderRadius: "50%",
                                background: isFilled ? dotColor : "var(--surface2)",
                                border: isSelected ? `2px solid ${level ? level.color : "#999"}` : "2px solid transparent",
                                transition: "all 0.2s ease",
                                flexShrink: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                {isSelected && (
                                  <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{n}</span>
                                )}
                              </div>
                            );
                          })}
                          <span style={{ marginLeft: 6, fontSize: "0.72rem", color: "var(--text-muted)" }}>/ 10</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
  }, []);
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("login"); // login | welcome | survey | results | admin | adminDetail
  const [responseData, setResponseData] = useState(null);
  const [existingResponse, setExistingResponse] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);

  const handleLogin = async (loggedUser) => {
    setUser(loggedUser);
    if (loggedUser.role === "admin") {
      setScreen("admin");
    } else {
      const existing = await loadResponse(loggedUser.id);
      setExistingResponse(existing);
      setScreen("welcome");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setScreen("login");
    setResponseData(null);
    setExistingResponse(null);
    setSelectedUser(null);
    setSelectedResponse(null);
  };

  const handleStartSurvey = () => setScreen("survey");

  const handleViewResults = () => {
    setResponseData(existingResponse);
    setScreen("results");
  };

  const handleSurveyComplete = (data) => {
    setResponseData(data);
    setExistingResponse(data);
    setScreen("results");
  };

  const handleRetake = () => {
    setResponseData(null);
    setScreen("welcome");
  };

  const handleViewUser = (u, resp) => {
    if (!resp?.completed) return;
    setSelectedUser(u);
    setSelectedResponse(resp);
    setScreen("adminDetail");
  };

  return (
    <>
      <style>{STYLE}</style>
      <div className="app-wrapper">
        {screen !== "login" && <Navbar user={user} onLogout={handleLogout} />}
        {screen === "login" && <LoginScreen onLogin={handleLogin} />}
        {screen === "welcome" && (
          <WelcomeScreen
            user={user}
            existingResponse={existingResponse}
            onStart={handleStartSurvey}
            onViewResults={handleViewResults}
          />
        )}
        {screen === "survey" && <SurveyScreen user={user} onComplete={handleSurveyComplete} />}
        {screen === "results" && <ResultsScreen responseData={responseData} onRetake={handleRetake} />}
        {screen === "admin" && <AdminDashboard onViewUser={handleViewUser} />}
        {screen === "adminDetail" && selectedUser && selectedResponse && (
          <UserDetailScreen
            user={selectedUser}
            response={selectedResponse}
            onBack={() => setScreen("admin")}
          />
        )}
      </div>
    </>
  );
}
