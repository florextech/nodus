# Nodus — Plan de Desarrollo

## Visión

Nodus es un asistente personal con emociones. Vive en la web, habla, escucha, recuerda, y en el futuro existirá como dispositivo físico. Es open source y extensible.

---

## Arquitectura General

```
┌────────────────────────────────────────────────────────────┐
│                        USUARIO                              │
│                  (texto / voz / touch)                       │
└──────────────────────────┬─────────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────────┐
│                    FRONTEND WEB                              │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌───────────┐  │
│  │  Face   │  │   Chat   │  │  Voice In │  │ Voice Out │  │
│  │(ASCII/  │  │  (text)  │  │  (STT)    │  │  (TTS)    │  │
│  │ Canvas) │  │          │  │           │  │           │  │
│  └─────────┘  └──────────┘  └───────────┘  └───────────┘  │
└──────────────────────────┬─────────────────────────────────┘
                           │ WebSocket
┌──────────────────────────▼─────────────────────────────────┐
│                      BACKEND (Node.js)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │  MQTT    │  │   AI     │  │  Memory  │  │  Actions  │  │
│  │  Bridge  │  │  Engine  │  │  Store   │  │  (tools)  │  │
│  └──────────┘  └──────────┘  └──────────┘  └───────────┘  │
└──────────────────────────┬─────────────────────────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  OpenAI  │ │  Ollama  │ │ OpenClaw │
        │  (GPT)   │ │ (local)  │ │          │
        └──────────┘ └──────────┘ └──────────┘
```

---

## Fase 1 — Simulador Web Estático ✅ (Completada)

**Ya tenemos:** `simulator/index.html` con caras ASCII, cambio de estados y parpadeo.

---

## Fase 2 — Chat con IA (texto)

**Objetivo:** El usuario escribe, Nodus responde con texto y cambia su emoción según el contexto.

**Entregable:** Escribir un mensaje → Nodus responde con personalidad y su cara cambia.

### Tareas:

1. **Backend básico (Node.js + TypeScript)**
   - Servidor Express/Fastify con endpoint WebSocket
   - Recibe mensaje de texto, lo envía a OpenAI, devuelve respuesta + mood
   - System prompt con personalidad adaptativa de Nodus

2. **Integración OpenAI**
   - Chat Completions con GPT-4o-mini
   - La respuesta incluye `{ text, mood }` (structured output)
   - Moods: HAPPY, SLEEPY, THINKING, SAD, ALERT (+ nuevos si hacen falta)

3. **Frontend: chat + conexión WebSocket**
   - Input de texto en el simulador
   - Mostrar respuestas de Nodus como burbujas de chat
   - La cara cambia al mood que devuelve la IA
   - Estado THINKING mientras espera respuesta

4. **Dockerización**
   - `docker-compose.yml` con el backend
   - `.env` para API keys
   - Ready para deploy en VPS

---

## Fase 3 — Memoria y Personalidad

**Objetivo:** Nodus recuerda conversaciones anteriores y su personalidad evoluciona.

**Entregable:** Cerrar la página, volver al día siguiente, Nodus recuerda de qué hablaron.

### Tareas:

5. **Almacenamiento de conversaciones**
   - SQLite (o PostgreSQL) para historial
   - Últimos N mensajes como contexto en cada request a la IA
   - Resúmenes automáticos de conversaciones largas

6. **Personalidad adaptativa**
   - Score emocional acumulativo (no solo el último mensaje)
   - El system prompt incluye el estado anímico actual
   - "Humor del día" basado en las interacciones recientes

7. **Sesiones de usuario**
   - Auth básica (token simple o usuario/contraseña)
   - Cada usuario tiene su propio Nodus con su memoria

---

## Fase 4 — Voz (entrada y salida)

**Objetivo:** Hablarle a Nodus y que responda con voz.

**Entregable:** Mantener una conversación por voz con Nodus en el navegador.

### Tareas:

8. **Speech-to-Text (entrada de voz)**
   - Web Speech API del navegador (gratis, sin backend)
   - Fallback: Whisper API vía backend
   - Botón push-to-talk + detección de silencio

9. **Text-to-Speech (respuesta hablada)**
   - OpenAI TTS API (voces naturales)
   - Audio streaming al frontend
   - Animación de "hablando" en la cara de Nodus

10. **UX de voz**
    - Indicador visual: escuchando → pensando → hablando
    - Cancelar/interrumpir respuesta
    - Modo manos libres (activación por voz opcional)

---

## Fase 5 — Cara Animada (versión gráfica)

**Objetivo:** Nodus tiene dos modos visuales: ASCII (retro) y gráfico (animado).

**Entregable:** Toggle entre cara ASCII y cara Canvas/SVG animada con expresiones suaves.

### Tareas:

11. **Cara Canvas/SVG animada**
    - Ojos, boca, cejas con transiciones suaves
    - Micro-animaciones: parpadeo, respiración, mirar al cursor
    - Colores/glow según emoción

12. **Sistema de expresiones**
    - Más granularidad emocional (curioso, sorprendido, concentrado, etc.)
    - Transiciones animadas entre expresiones
    - Reacciones inmediatas (mientras la IA piensa)

13. **Toggle ASCII ↔ Gráfico**
    - Preferencia guardada por usuario
    - Ambos modos siempre funcionales

---

## Fase 6 — MQTT + Preparación para Hardware

**Objetivo:** Backend conectado a MQTT para que un dispositivo físico pueda comunicarse con Nodus.

**Entregable:** Enviar un mensaje desde MQTT Explorer → Nodus responde vía MQTT.

### Tareas:

14. **Broker MQTT (Mosquitto)**
    - Agregado al docker-compose
    - Topics definidos: `nodus/chat/in`, `nodus/chat/out`, `nodus/mood`, `nodus/command`

15. **Bridge MQTT ↔ Backend**
    - El backend publica/suscribe en MQTT
    - Mismo flujo de IA, pero entrada/salida por MQTT en vez de WebSocket
    - El frontend web sigue funcionando en paralelo

16. **Protocolo documentado**
    - Formato de mensajes JSON
    - Guía para conectar un ESP32 (preparación para fase 8)

---

## Fase 7 — Acciones y Herramientas (Asistente)

**Objetivo:** Nodus puede hacer cosas más allá de conversar.

**Entregable:** "Nodus, ponme un recordatorio para mañana" → funciona.

### Tareas:

17. **Sistema de tools/acciones**
    - Function calling de OpenAI (o equivalente en Ollama)
    - Acciones base: recordatorios, notas, timer, clima
    - Arquitectura extensible para agregar más tools

18. **Integración OpenClaw**
    - Nodus como frontend de OpenClaw
    - Delegar tareas complejas a agentes de OpenClaw
    - Reportar progreso con cambios de emoción

19. **Notificaciones**
    - Nodus puede iniciar conversación (recordatorios, alertas)
    - Push notifications en web
    - Vía MQTT para el hardware

---

## Fase 8 — Hardware Físico (ESP32)

**Objetivo:** Nodus existe como dispositivo físico de escritorio.

**Entregable:** Un dispositivo con pantalla que muestra la cara, se conecta al backend y conversa.

### Tareas:

20. **Firmware ESP32**
    - Conecta a WiFi + MQTT broker
    - Recibe mood + texto → muestra en pantalla
    - Envía input de usuario (botón/micrófono) al backend

21. **Pantalla OLED/TFT**
    - Caras bitmap o vectoriales
    - Animaciones de transición

22. **Audio físico (opcional)**
    - Micrófono I2S (INMP441)
    - Speaker (MAX98357A)
    - Push-to-talk con botón

23. **Carcasa**
    - Diseño 3D imprimible
    - BOM y guía de ensamblaje

---

## Fase 9 — Motor IA Local (Ollama)

**Objetivo:** Nodus funciona sin internet usando un modelo local.

**Entregable:** Toggle en config entre OpenAI y Ollama. Funciona offline.

### Tareas:

24. **Abstracción del motor IA**
    - Interface `AIProvider` con implementaciones: OpenAI, Ollama
    - Selección por config (`.env`)
    - Mismo formato de respuesta (text + mood)

25. **Setup Ollama**
    - Docker container con modelo (Llama 3 / Mistral)
    - Optimización de system prompt para modelos pequeños
    - Fallback: si Ollama falla → OpenAI

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML/CSS/JS vanilla (fase 1-2), luego SvelteKit o similar |
| Backend | Node.js + TypeScript + Fastify |
| Base de datos | SQLite (dev) → PostgreSQL (prod) |
| IA | OpenAI GPT-4o-mini + Ollama (local) |
| STT | Web Speech API + Whisper API (fallback) |
| TTS | OpenAI TTS |
| Mensajería | WebSocket (web) + MQTT (hardware) |
| Broker | Mosquitto |
| Infra | Docker Compose → VPS propio |
| Hardware | ESP32 + SSD1306/TFT + INMP441 + MAX98357A |

---

## Estimación

| Fase | Tiempo | Prioridad |
|------|--------|-----------|
| 2 — Chat con IA | 1-2 semanas | 🔴 Alta |
| 3 — Memoria | 1 semana | 🔴 Alta |
| 4 — Voz | 1-2 semanas | 🟡 Media |
| 5 — Cara animada | 1-2 semanas | 🟡 Media |
| 6 — MQTT | 1 semana | 🟡 Media |
| 7 — Acciones/OpenClaw | 2-3 semanas | 🟡 Media |
| 8 — Hardware | 3-4 semanas | 🟢 Baja (futuro) |
| 9 — IA local | 1 semana | 🟢 Baja |

**Total: ~12-16 semanas** para tener Nodus web completo con voz, memoria y acciones.

---

## Principios

- **Incremental**: cada fase entrega algo funcional.
- **Desacoplado**: frontend, backend, IA, y hardware son independientes.
- **Open source**: diseñado para que otros lo repliquen y extiendan.
- **Offline-first posible**: Ollama como alternativa local.
- **Hardware-ready**: MQTT como puente universal entre web y dispositivos.
