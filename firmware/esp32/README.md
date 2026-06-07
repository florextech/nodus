# Nodus — Firmware ESP32

## ¿Qué es Nodus?

Nodus es una mascota/asistente virtual físico basado en ESP32. Combina una pantalla, conectividad MQTT y una futura capa de inteligencia artificial para crear un compañero interactivo que expresa emociones y reacciona a su entorno.

## Objetivo de esta fase

Fase 1: Establecer la arquitectura base del firmware con una simulación funcional de estados emocionales, sin hardware real ni dependencias externas.

- Máquina de estados con 5 emociones.
- Representación visual ASCII por Serial Monitor.
- Arquitectura modular y desacoplada.
- Simulación ejecutable en Wokwi.

## Cómo ejecutar en Wokwi

1. Abre [Wokwi](https://wokwi.com/).
2. Crea un nuevo proyecto ESP32.
3. Copia los archivos del directorio `firmware/esp32/` en el proyecto.
4. Ejecuta la simulación.
5. Abre el Serial Monitor para ver los cambios de estado.

## Arquitectura actual

```
sketch.ino          → Punto de entrada (setup/loop)
src/config.h        → Configuración global
src/NodusState.h/cpp → Máquina de estados (Mood)
src/NodusFace.h/cpp  → Representación visual por estado
```

Principios:
- Responsabilidad única por clase.
- Bajo acoplamiento entre módulos.
- Fácil extensibilidad para futuras integraciones.

## Próximas fases

- **Fase 2**: Pantalla OLED/TFT con caras gráficas.
- **Fase 3**: Conectividad MQTT para recibir comandos remotos.
- **Fase 4**: Sensores y botones físicos.
- **Fase 5**: Integración con capa de IA (OpenClaw).
- **Fase 6**: LED RGB y feedback visual avanzado.
