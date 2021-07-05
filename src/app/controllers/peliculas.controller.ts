import { PeliculasService } from "@app/services/peliculas.services";
import { HandleResponse } from '@app/util/handleResponse';


export class PeliculasController extends PeliculasService {
  /**
   * Buscar lista de peliculas
   */
  async buscarPeliculas(event: any) {
    try {
      const tipo: number = Number(event.queryStringParameters.tipo);

      if (tipo && tipo === 1) {
        const result = await this.buscarPeliculasLocal();

        return HandleResponse.success(result);
      } else if (tipo && tipo === 2) {
        const result = await this.buscarPeliculasApi();

        return HandleResponse.success(result);
      } else {
        return HandleResponse.error(401, "Tipo de consulta incorrecto.")
      }

    } catch (err) {
      console.error(err);

      return HandleResponse.error(err.code, err.message);
    }
  };

  /**
   * Crear Pelicula
   */
  async crearNuevaPelicula(event: any) {
    return this.crearPelicula(event)
      .then((res) => HandleResponse.success(res))
      .catch((err) => HandleResponse.error(401, err.message));
  }
}