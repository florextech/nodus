# Nodus — Firmware ESP32

## ¿Qué es Nodus?

Nodus es una mascota/asistente virtual físico basado en ESP32. Combina una pantalla, conectividad MQTT y una futura capa de inteligencia artificial para crear un compañero interactivo que expresa emociones y reacciona a su entorno.

## Estado actual: Fase 2

Pantalla OLED SSD1306 con caras gráficas bitmap y animación de parpadeo.

- 5 emociones con representación bitmap (48x48px).
- Parpadeo aleatorio cada 3-7 segundos.
- Redraw eficiente (solo cuando cambia el estado visual).
- Simulable en Wokwi con componente OLED.

## Cómo ejecutar en Wokwi

1. Abre [Wokwi](https://wokwi.com/).
2. Crea un nuevo proyecto ESP32.
3. Copia los archivos del directorio `firmware/esp32/` en el proyecto.
4. Ejecuta la simulación.
5. La pantalla OLED muestra las caras de Nodus rotando cada 3s con parpadeo.

## Arquitectura

```
sketch.ino              → Punto de entrada (setup/loop)
src/config.h            → Configuración global
src/NodusState.h/cpp    → Máquina de estados (Mood)
src/NodusFace.h/cpp     → Representación ASCII (Serial)
src/NodusDisplay.h/cpp  → Wrapper pantalla OLED SSD1306
src/NodusAnimator.h/cpp → Parpadeo y micro-animaciones
src/faces_bmp.h         → Bitmaps por emoción (48x48)
```

## Hardware (simulado)

| Componente | Conexión |
|-----------|----------|
| ESP32 DevKit C V4 | — |
| OLED SSD1306 128x64 | SDA=GPIO21, SCL=GPIO22, 0x3C |

## Próximas fases

- **Fase 3**: Conectividad WiFi + MQTT.
- **Fase 4**: Backend/Bridge + integración IA (OpenAI).
- **Fase 5**: Personalidad persistente + contexto.
- **Fase 6**: Input de audio (micrófono).
- **Fase 7**: Output de audio (TTS).
- **Fase 8**: Hardware final (TFT, LED RGB, touch).
