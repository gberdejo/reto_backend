import { Handler } from 'aws-lambda';

import { PeliculasController } from './controllers/peliculas.controller';

const peliculasController = new PeliculasController();

export const buscarPeliculas:Handler = (event:any) => peliculasController.buscarPeliculas(event);

export const crearPelicula:Handler = (event:any) => peliculasController.crearNuevaPelicula(event);