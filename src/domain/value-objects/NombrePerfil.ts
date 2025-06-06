export class NombrePerfil {
    private readonly valor: string;
  
    constructor(valor: string) {
      if (!valor || valor.length < 3) {
        throw new Error("El nombre del perfil debe tener al menos 3 caracteres.");
      }
      this.valor = valor;
    }
  
    public obtenerValor(): string {
      return this.valor;
    }
  }
  