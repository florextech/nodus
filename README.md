# Nodus

Mascota/asistente virtual con emociones, impulsado por IA.

## Cómo ejecutar

```bash
cd web
npm install
npm run dev
```

Abre http://localhost:3000

## Stack

- Next.js 16 + React + TypeScript
- Tailwind CSS

## Estructura

```
nodus/
├─ web/                  ← Frontend (Next.js)
│  └─ app/
│      ├─ components/
│      │   ├─ NodusFace.tsx
│      │   └─ NodusSimulator.tsx
│      ├─ lib/moods.ts
│      └─ page.tsx
├─ DEVELOPMENT_PLAN.md
└─ README.md
```

## Roadmap

1. ✅ Simulador web con estados emocionales
2. Chat con IA (texto)
3. Memoria y personalidad
4. Voz (entrada y salida)
5. Cara animada (Canvas/SVG)
6. MQTT + hardware
7. Acciones / OpenClaw
