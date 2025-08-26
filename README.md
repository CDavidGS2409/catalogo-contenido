Reto técnico: Catálogo de contenido (estilo Netflix)
Autor: Carlos David Gómez Serna

Tecnologías utilizadas:
  - Visual Studio Code – Entorno de desarrollo
  - Supabase – Backend como servicio (BaaS) para autenticación y base de datos
  - Expo + React Native – Framework para desarrollo móvil multiplataforma
  - TypeScript – Tipado estático para mayor robustez
  - IA (Copilot) – Asistencia técnica para optimización de código y diseño de interfaz

Cómo ejecutar el proyecto.
Este proyecto se ejecuta con Expo, lo que permite probarlo fácilmente en múltiples plataformas.
    
  <img width="265" height="42" alt="imagen" src="https://github.com/user-attachments/assets/d4af1d2e-c392-4cb9-879e-84f08f19948d" />

Desde la terminal, se abrirá una interfaz con código QR y opciones para correr la app en Web, Android o iOS.

<img width="1173" height="874" alt="imagen" src="https://github.com/user-attachments/assets/7a58f172-e22e-4e51-b0be-37e70e6d18f6" />



Funciones de SQL implementadas 
Aunque no se escribió SQL directamente, Supabase ejecuta internamente las siguientes operaciones:


<img width="688" height="406" alt="imagen" src="https://github.com/user-attachments/assets/f97f729f-c432-4e3f-9eb7-7bf9078f2b1b" />



Decisiones tecnicas: 
Se eligió TypeScript por su capacidad para mantener un código limpio, seguro y escalable. La arquitectura se diseñó en torno a componentes reutilizables, lo que permite mantener la lógica separada y facilitar futuras extensiones. Se creó un archivo de tipos (types) para garantizar consistencia en los datos y facilitar la integración con Supabase.

Además, se implementó un hook personalizado para gestionar las opciones del usuario, mejorando la experiencia y manteniendo la lógica encapsulada. La IA (Copilot) fue utilizada estratégicamente para resolver dudas específicas, generar fragmentos de código y acelerar el diseño visual. Esta combinación permitió construir una interfaz funcional, modular y preparada para escalar hacia una experiencia tipo Netflix.

Prompts utilizados con IA

Durante el desarrollo se utilizaron los siguientes prompts para optimizar el código y la experiencia visual:

   - Diseño de interfaz de inicio con logo y opciones tipo Prime Video

   - Botones táctiles con cambio de contenido y estilo visual

   - Generación de catálogo en JSON con 20 series clasificadas por género

   - Consulta y visualización de datos desde Supabase en carouseles horizontales

   - Navegación entre sinopsis, temporadas y capítulos al seleccionar una serie



Si dispusiera de más tiempo, implementaría las siguientes mejoras:

  - Diseño visual refinado con herramientas como Figma o Framer

  -Configuración de usuario: cambio de tema, cuenta, preferencias

  -Algoritmo de recomendaciones basado en comportamiento y búsquedas

  -Mini reproductor para trailers o avances al seleccionar una serie

  -Sistema de ranking para mostrar las series más vistas y populares



