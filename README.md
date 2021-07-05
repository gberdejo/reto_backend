### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### EndPoints

- BuscarPeliculas
    metodo: GET,
    parametros: 
        - /peliculas?tipo=1 : Consulta la información guardada en la base de datos.
        - /peliculas?tipo=2 : Consulta la información de la api "http https://swapi.py4e.com/api/films".
- CrearPelicula
    metodo: POST,
    parametros: 
        - titulo: string;
        - id_episodio: number;
        - introduccion: string;
        - director: string;
        - productor: string;
        - fecha_estreno: string;
        - especies: string[];
        - naves: string[];
        - vehiculos: string[];
        - personajes: string[];
        - planetas: string[];
        - url: string;
        - fecha_creacion: string;
        - fecha_editado: string;

Nota: configurar el nombre de la tabla en /config/index.ts - "tabla_peliculas"