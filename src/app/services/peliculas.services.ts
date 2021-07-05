import { IFilm, IPelicula, PeliculaDTO } from '@app/interfaces/pelicula.interface';
import { DynamoDB,  } from 'aws-sdk';
import fetch from 'node-fetch';
import * as uuid from 'uuid';
import { DateTime } from 'luxon';

import config from 'src/config';

const dynamoDb = new DynamoDB.DocumentClient();

export class PeliculasService {

  protected async buscarPeliculasLocal():Promise<IPelicula[]> {
    const params = {
      TableName: config.tabla_peliculas,
    };

    return await dynamoDb.scan(params).promise().then((res) => {
      if (res.Items && res.Items.length > 0) {
        const peliculas:IPelicula[]|any = res.Items;
        return peliculas;
      } else {
        return [];
      }
    });
  };

  protected async buscarPeliculasApi():Promise<IFilm[]> {
    return await fetch(config.url_api + 'films')
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson && resJson.results) {
          const films: IFilm[] = resJson.results
          return films;
        } else {
          return [];
        }
      });
  };

  protected async crearPelicula(event:any):Promise<any> {
    try {      
      const timestamp = DateTime.fromJSDate(new Date()).toISO();
      const peliculaDTO: PeliculaDTO = JSON.parse(event.body)
      const nuevaPelicula: IPelicula = {
        ...peliculaDTO,
        fecha_estreno: DateTime.fromFormat(peliculaDTO.fecha_estreno, "yy-MM-dd").toString(),
        id: uuid.v1(),
        fecha_creacion: timestamp,
        fecha_editado: timestamp,
      }

      const params = {
        TableName: config.tabla_peliculas,
        Item: nuevaPelicula
      }

      return await dynamoDb.put(params).promise();
    } catch (err) {
      throw err;
    }
  };
}
