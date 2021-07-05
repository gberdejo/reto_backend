import { IResponseGet } from "@app/interfaces/response.interface";

enum StatusCode {
  success = 200,
}

class Resultado {
  private statusCode: number;
  private code: number;
  private mensaje: string;
  private data?: any;

  constructor(statusCode: number, code: number, mensaje: string, data?: any) {
    this.statusCode = statusCode;
    this.code = code;
    this.mensaje = mensaje;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString () {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.mensaje,
        data: this.data,
      }),
    };
  }
}

export class HandleResponse {
  static success(data: object): IResponseGet {
    const result = new Resultado(StatusCode.success, 0, 'success', data);

    return result.bodyToString();
  }

  static error(code: number = 1000, message: string) {
    const result = new Resultado(StatusCode.success, code, message);

    console.log(result.bodyToString());
    return result.bodyToString();
  }
};