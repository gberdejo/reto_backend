import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export interface IPelicula {
  id: string;
  titulo: string;
  id_episodio: number;
  introduccion: string;
  director: string;
  productor: string;
  fecha_estreno: string;
  especies: string[];
  naves: string[];
  vehiculos: string[];
  personajes: string[];
  planetas: string[];
  url: string;
  fecha_creacion: string;
  fecha_editado: string;
};

export interface IFilm {
  title:string; // -- The title of this film
  episode_id: number; // -- The episode number of this film.
  opening_crawl: string; // -- The opening paragraphs at the beginning of this film.
  director: string; // -- The name of the director of this film.
  producer: string; // -- The name(s) of the producer(s) of this film. Comma separated.
  release_date: string; // -- The ISO 8601 date format of film release at original creator country.
  species: string[]; // -- An array of species resource URLs that are in this film.
  starships: string[]; // -- An array of starship resource URLs that are in this film.
  vehicles: string[]; // -- An array of vehicle resource URLs that are in this film.
  characters: string[]; // -- An array of people resource URLs that are in this film.
  planets: string[]; // -- An array of planet resource URLs that are in this film.
  url: string; // -- the hypermedia URL of this resource.
  created: string; // -- the ISO 8601 date format of the time that this resource was created.
  edited: string; // -- the ISO 8601 date format of the time that this resource was edited.
};

export class PeliculaDTO {
  @IsNotEmpty()
  @IsString()
  readonly titulo: string;

  @IsString()
  readonly id_episodio: number;

  @IsString()
  readonly introduccion: string;

  @IsString()
  readonly director: string;

  @IsString()
  readonly productor: string;

  @IsString()
  readonly fecha_estreno: string;

  @IsArray()
  readonly especies: string[];

  @IsArray()
  readonly naves: string[];

  @IsArray()
  readonly vehiculos: string[];

  @IsArray()
  readonly personajes: string[];

  @IsArray()
  readonly planetas: string[];

  @IsString()
  readonly url: string;
}