Reto técnico: Catálogo de contenido (estilo Netflix)
Autor: Carlos David Gómez Serna

Tecnologías utilizadas:
  - Visual Studio Code
  - Supabase (Backend y autenticación)
  - Expo (React Native)
  - IA (Copilot)


Cómo ejecutar el proyecto.
Este proyecto fue desarrollado con Expo para facilitar la ejecución multiplataforma.
En la terminal del sistema, entrar a la carpeta del proyecto y ejecutar el siguiente comando. 
    
  -  npx expo start  <img width="265" height="42" alt="imagen" src="https://github.com/user-attachments/assets/d4af1d2e-c392-4cb9-879e-84f08f19948d" />


A continuación se muestra un codigo QR y diversas opciones para ejecutarlo en web, android o IOS





Funciones de SQL implementadas: Se utilizo supabase como backend por lo que se hicieron las siguientes consultas. 


Select: Recupera todos los registros de la tabla series
    supabase.from('series').select('*')
Order by: Ordena los resultados por el campo genero en orden ascendente 
    .order('genero',{ascending: true})
Select con columnas especificas: Recupera solo las columnas necesarias, optimizando la consulta
    .select('nombre,sinopsis, temporada, capitulos')
Autenticación: Internamente, Supabase gestiona esas operaciones con SQL sobre la tabla de usuarios utilizando, Insert, Select y Update.
    supabase.auth.signUp()
    supabase.auth.signInWithPassword()
    supabase.auth.getUser()


Decisiones tecnicas: 
Se decidio utilizar TypeScript por facilidad de uso, se recurrio a la IA para optimizar el programa y resolver dudas especificas. Decidi crear diferentes componentes para mandar a llamar en las pantallas y tener limpio el código. También se creo un archivo type para mandar a llamar en cada componente, así mismo se utilizo un hook personalizado para las opciones de usuario 


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

Qué haria a continuación si tuviera más tiempo:
- Diseñaria la interfaz utilizando herramientas de diseño manteniendo su funcionalidad
- Agregaría opciones de usuario donde pueda cambiar el estilo de la interfaz, cambiar cuenta y otras configuraciones
- Crearía un algoritmo que dependiendo de las busquedas del úsuario le mostrara un carrusel con posibles recomendaciones
- Implementaría un mini reproductor al seleccionar la imagen de la serie para que el usuario se animara a ver el programa
- Implementaria un sistema de ranking de las series mas vistas

