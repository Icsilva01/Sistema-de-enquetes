export class requiredFieldError extends Error {
  constructor() {
    super("Campo obrigatório");
    this.name = "requiredFieldError";
  }
}