export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super('Um erro interno não esperado aconteceu.', {
      cause,
    });
    this.name = 'InternalServerError';
    this.action = 'Entre em contato com o suporte';
    this.statusCode = statusCode || 500;
  }

  //método usado para retornar a mensagem do erro
  //por padrão as propriedades de erro não são listadas
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || 'Serviço indisponível no momento.', {
      cause,
    });
    this.name = 'Serviceerror';
    this.action = 'Verifique se o serviço está disponível.';
    this.statusCode = 503; //serviço indisponivel
  }

  //método usado para retornar a mensagem do erro
  //por padrão as propriedades de erro não são listadas
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super('Método não permitido para este endpoint.');
    this.name = 'MethodNotAllowedError';
    this.action = 'Verifique se o método HTTP é válido para este endpoint.';
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
