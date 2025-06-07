export interface PerfilDO {
    id: string;
    usuarioId: string;
    nombre: string;
    tipo: 'Niño' | 'Adulto';
    restriccionesActivas: boolean;
    pin?: string;
  }
  