  //Estructura el contendio de las series y define los parámetros de navegación


//Representa una serie destacada o recomendadad para utilizar en banners

export interface Show {
  id: string;
  title: string;
  synopsis: string;
  year: number;
  category: string;
  poster_url: string;
}

//Representa una serie completa con estructura detallada, para navegar entre episoidos
export type Serie = {
  id: number;
  nombre: string;
  sinopsis: string;
  poster_url: string;
  temporadaActual: number;
  episodioActual: string;
  generos: string[];
  cover: string;
  fondo: string;
  capitulos: Capitulo[]
  temporadas: number



};
//Representa un capítulo individual dentro de una temporada marcando el numero y titulo.
export type Capitulo = {
  numero: number
  titulo: string
}

// Define los parámetros de navegación entre pantallas en React Navigation
export type RootStackParamList = {
  Home: undefined;
  Detail: { serie: Serie };
  Login: undefined
  Registro: undefined
};
