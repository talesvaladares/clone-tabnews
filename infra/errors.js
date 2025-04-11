export class InternalServerError extends Error {
  constructor({ cause }) {
    super('Um erro interno não esperado aconteceu.', {
      cause,
    });
    this.name = 'InternalServerError';
    this.action = 'Entre em contato com o suporte';
    this.statusCode = 500;
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
