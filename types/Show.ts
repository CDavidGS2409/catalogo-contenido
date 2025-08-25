export interface Show {
  id: string;
  title: string;
  synopsis: string;
  year: number;
  category: string;
  poster_url: string;
}

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

export type Capitulo = {
  numero: number
  titulo: string
}

export type RootStackParamList = {
  Home: undefined;
  Detail: { serie: Serie };
  Login: undefined
};