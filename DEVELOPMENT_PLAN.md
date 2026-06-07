# Plan de Desarrollo — Nodus

## Resumen del Proyecto

**Nodus** es una mascota/asistente virtual física basada en ESP32 que expresa emociones, responde al usuario y se conecta a servicios de IA para generar respuestas con personalidad.

---

## Arquitectura General

```
┌─────────────────────────────────────────────────────────┐
│                      USUARIO                             │
│              (voz / texto / botón)                       │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 ESP32 (Nodus)                            │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐    │
│  │NodusState│  │NodusFace │  │ NodusComm (MQTT)   │    │
│  └──────────┘  └──────────┘  └─────────┬──────────┘    │
│       │              │                  │               │
│  ┌────▼──────────────▼──┐              │               │
│  │  Pantalla OLED/TFT   │              │               │
│  └──────────────────────┘              │               │
└────────────────────────────────────────┼───────────────┘
                                         │ MQTT
┌────────────────────────────────────────▼───────────────┐
│              Backend / Bridge                            │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │MQTT Broker│  │ API Gateway  │  │ OpenAI/LLM   │     │
│  └──────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────┘
```

---

## Fase 1 — Arquitectura Base ✅ (Completada)

**Objetivo:** Firmware base con máquina de estados emocionales y simulación vía Serial Monitor.

**Componentes implementados:**
- `NodusState` — Máquina de estados (HAPPY, SLEEPY, THINKING, SAD, ALERT)
- `NodusFace` — Renderizado ASCII de caras emocionales
- `config.h` — Constantes de configuración
- Simulación en Wokwi (ESP32 DevKit C V4)

**Resultado:** Nodus cicla entre estados emocionales cada 3 segundos e imprime la cara correspondiente por Serial.

---

## Fase 2 — Pantalla Física + Caras Gráficas

**Objetivo:** Nodus muestra sus emociones en una pantalla OLED con gráficos bitmap.

**Tecnologías/Componentes:**
- Pantalla OLED SSD1306 128x64 (I2C)
- Librería: `Adafruit_SSD1306` + `Adafruit_GFX`

**Tareas:**

1. **Integración de pantalla OLED** — Clase `NodusDisplay` como wrapper. Mostrar mood actual en pantalla. Actualizar `diagram.json` para Wokwi.

2. **Caras gráficas bitmap** — Bitmaps 64x64 por emoción en `faces_bmp.h`. Refactorear `NodusFace` para renderizar en pantalla.

3. **Animación idle y parpadeo** — Clase `NodusAnimator` con parpadeo aleatorio cada 3-7s. Micro-animaciones que dan vida a Nodus.

---

## Fase 3 — Conectividad WiFi + MQTT

**Objetivo:** Nodus se conecta a WiFi y puede enviar/recibir mensajes MQTT.

**Tecnologías/Componentes:**
- WiFi (integrado en ESP32)
- Librería: `PubSubClient`
- Broker MQTT: Mosquitto (local) o HiveMQ Cloud (producción)

**Tareas:**

4. **Conexión WiFi** — Clase `NodusWiFi` con reconexión automática. Ícono de estado en pantalla.

5. **Cliente MQTT** — Clase `NodusComm`. Topics: `nodus/mood`, `nodus/command`, `nodus/chat/in`, `nodus/chat/out`. Formato JSON.

6. **Input del usuario vía MQTT** — Simular texto como input. Nodus reacciona visualmente al recibir mensajes.

---

## Fase 4 — Backend/Bridge con Integración IA

**Objetivo:** Servicio backend que conecta MQTT con OpenAI API para generar respuestas con emoción.

**Tecnologías/Componentes:**
- Node.js + TypeScript
- Librería: `mqtt` (npm), `openai` (npm)
- OpenAI API (GPT-4o-mini)
- Docker + docker-compose

**Tareas:**

7. **Scaffold del backend** — Proyecto `nodus/backend/` con conexión MQTT. docker-compose con Mosquitto + backend.

8. **Integración OpenAI** — Servicio `AIService`. System prompt con personalidad de Nodus. Respuestas con texto + mood.

9. **Nodus procesa respuestas** — Parsear JSON con ArduinoJson. Actualizar estado + mostrar texto en pantalla.

---

## Fase 5 — Personalidad Persistente + Contexto

**Objetivo:** Nodus mantiene contexto de conversación y personalidad consistente.

**Tecnologías/Componentes:**
- Backend: historial de conversación (SQLite)
- ESP32: NVS para persistir mood
- System prompt elaborado

**Tareas:**

10. **Historial de conversación** — Buffer circular de 10 mensajes. Contexto enviado a OpenAI.

11. **Estado anímico acumulativo** — Score emocional que evoluciona con interacciones.

12. **Persistencia en NVS** — Guardar/restaurar mood entre reinicios con `Preferences.h`.

---

## Fase 6 — Input de Audio (Micrófono)

**Objetivo:** El usuario le habla a Nodus y su voz se transcribe.

**Tecnologías/Componentes:**
- Micrófono I2S: INMP441
- Speech-to-Text: Whisper API (OpenAI)
- Botón físico: push-to-talk

**Tareas:**

13. **Captura de audio** — Clase `NodusAudio` con I2S RX. Buffer de ~3 segundos. Push-to-talk.

14. **Transcripción** — Envío de audio al backend vía MQTT. Whisper API para STT.

15. **Feedback visual** — VAD simple. LED RGB como indicador de estado de grabación.

---

## Fase 7 — Output de Audio (Respuesta Hablada)

**Objetivo:** Nodus habla sus respuestas.

**Tecnologías/Componentes:**
- Amplificador I2S: MAX98357A + speaker 3W
- Text-to-Speech: OpenAI TTS API

**Tareas:**

16. **Reproducción de audio** — Clase `NodusSpeak` con I2S TX. Tono de bienvenida.

17. **TTS integrado** — Backend genera audio con OpenAI TTS. Streaming al ESP32.

---

## Fase 8 — Refinamiento y Hardware Final

**Objetivo:** Pulir la experiencia y migrar a hardware definitivo.

**Tecnologías/Componentes:**
- Pantalla TFT ST7789 240x240 (color)
- LED RGB WS2812 (NeoPixel)
- Sensor táctil capacitivo
- Carcasa impresa en 3D

**Tareas:**

18. **Pantalla TFT a color** — Sprites a color, animaciones fluidas con TFT_eSPI.

19. **Interacciones físicas** — Touch como "caricia". LED RGB por emoción.

20. **Empaquetado final** — Esquemático, BOM, guía de ensamblaje, carcasa 3D.

---

## Resumen de Componentes por Fase

| Fase | Hardware nuevo | Software nuevo | Librería/Servicio |
|------|---------------|----------------|-------------------|
| 1 ✅ | — | NodusState, NodusFace | — |
| 2 | OLED SSD1306 | NodusDisplay, NodusAnimator | Adafruit_SSD1306, Adafruit_GFX |
| 3 | — | NodusWiFi, NodusComm | PubSubClient, WiFi.h |
| 4 | — | Backend Node.js, AIService | mqtt, openai, Docker |
| 5 | — | Historial, Personalidad | Preferences.h, ArduinoJson |
| 6 | INMP441, Botón | NodusAudio | I2S driver, Whisper API |
| 7 | MAX98357A, Speaker | NodusSpeak | I2S output, OpenAI TTS |
| 8 | TFT ST7789, LED RGB, Touch | Upgrade visual | TFT_eSPI, Adafruit_NeoPixel |

---

## Estimación de Tiempos

| Fase | Duración estimada | Complejidad |
|------|-------------------|-------------|
| 2 — Pantalla | 1-2 semanas | ⭐⭐ |
| 3 — MQTT | 1-2 semanas | ⭐⭐ |
| 4 — Backend + IA | 2-3 semanas | ⭐⭐⭐ |
| 5 — Personalidad | 1-2 semanas | ⭐⭐ |
| 6 — Audio Input | 2-3 semanas | ⭐⭐⭐⭐ |
| 7 — Audio Output | 1-2 semanas | ⭐⭐⭐ |
| 8 — Hardware Final | 3-4 semanas | ⭐⭐⭐⭐ |

**Total estimado:** ~12-18 semanas (3-4 meses)

---

## Stack Tecnológico Completo

```
Firmware (ESP32):      C++ / Arduino Framework
Simulación:            Wokwi
Backend:               Node.js + TypeScript
Broker MQTT:           Mosquitto (Docker)
IA - Chat:             OpenAI GPT-4o-mini
IA - STT:              OpenAI Whisper
IA - TTS:              OpenAI TTS
Infra:                 Docker Compose (dev), VPS o Railway (prod)
Hardware final:        ESP32 + OLED/TFT + INMP441 + MAX98357A + NeoPixel
```

---

## Notas

1. **Cada fase es funcional por sí sola** — al terminar la Fase 3, Nodus ya es un dispositivo conectado que responde a comandos MQTT.
2. **El backend es obligatorio** — el ESP32 no puede llamar directamente a OpenAI API de forma confiable (memory, SSL). El bridge MQTT↔OpenAI es la pieza clave.
3. **Audio es la parte más compleja** — I2S requiere configuración cuidadosa. Empezar con texto y agregar audio después.
4. **Costos de API** — GPT-4o-mini ~$0.15/1M tokens input. Para uso personal: ~$1-5/mes.
5. **Alternativa self-hosted** — Ollama + Llama 3 para chat, Faster-Whisper para STT. Elimina costos recurrentes.
