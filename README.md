Reto técnico: Catálogo de contenido (estilo Netflix)
Autor: Carlos David Gómez Serna

Tecnologías utilizadas:
 -Visual Studio Code – Entorno de desarrollo
 -Supabase – Backend como servicio (BaaS) para autenticación y base de datos
 -Expo + React Native – Framework para desarrollo móvil multiplataforma
 -TypeScript – Tipado estático para mayor robustez
 -IA (Copilot) – Asistencia técnica para optimización de código y diseño de interfaz

Cómo ejecutar el proyecto.
Este proyecto se ejecuta con Expo, lo que permite probarlo fácilmente en múltiples plataformas.
    
  <img width="265" height="42" alt="imagen" src="https://github.com/user-attachments/assets/d4af1d2e-c392-4cb9-879e-84f08f19948d" />

Desde la terminal, se abrirá una interfaz con código QR y opciones para correr la app en Web, Android o iOS.


Funciones de SQL implementadas 
Aunque no se escribió SQL directamente, Supabase ejecuta internamente las siguientes operaciones:


<img width="688" height="406" alt="imagen" src="https://github.com/user-attachments/assets/f97f729f-c432-4e3f-9eb7-7bf9078f2b1b" />



Decisiones tecnicas: 
Se eligió TypeScript por su capacidad para mantener un código limpio, seguro y escalable. La arquitectura se diseñó en torno a componentes reutilizables, lo que permite mantener la lógica separada y facilitar futuras extensiones. Se creó un archivo de tipos (types) para garantizar consistencia en los datos y facilitar la integración con Supabase.

Además, se implementó un hook personalizado para gestionar las opciones del usuario, mejorando la experiencia y manteniendo la lógica encapsulada. La IA (Copilot) fue utilizada estratégicamente para resolver dudas específicas, generar fragmentos de código y acelerar el diseño visual. Esta combinación permitió construir una interfaz funcional, modular y preparada para escalar hacia una experiencia tipo Netflix.
Prompts de IA

Se utilizaron los siguientes prompts para optimizar el codigo.

- Muestra como crear un interfaz de inicio. Donde se vea el logo, y a lado varias opciones como Prime video. Muestrame pequeñas parte del codigo para que me pueda a orientar a hacerlo.

Resultado: Pequeño fragmento de la interfaz con estilos.

- Convertir cada opción en un botón táctil  para cambiar el contenido o el tema visual. También para que se destaque al seleccionarse. 

Resultado: Dio ejemplos de como utilizar TouchableOpacity y aplicar los estilos.

-Creame una lista para supabase en un archivo .json para descargar con los siguientes datos de 20 series catalalogadas por genero, nombre de series, poster, sinopsis, lista de capitulos y numero de temporadas

Resultado: Genero un json con 20 series aleatorias con sinopsis, el número de temporadas y una lista con 3 capitulos.

-Muestrame como importar los datos de supabase, para que en mi interfaz se muestre el carrete horizontal de series, así como que se muestren por genero

Resultado: Mostro como hacer consultas en react native y mandarlo a llamar en las pantallas.

-Muestrame como hacer que al seleccionar cada pelicula me muestre la sinopsis, temporadas y que al seleccionar las temporadas muestre los capitulos. Muestrame parte del codigo para poder orientarme.

Resultado: Creo las funciones e importo metodos para crear la opción de seleccionar una pelicula. 

Si se dispusiera de más tiempo, se implementarían las siguientes mejoras:

    Diseño visual refinado con herramientas como Figma o Framer

    Configuración de usuario: cambio de tema, cuenta, preferencias

    Algoritmo de recomendaciones basado en comportamiento y búsquedas

    Mini reproductor para trailers o avances al seleccionar una serie

    Sistema de ranking para mostrar las series más vistas y populares



