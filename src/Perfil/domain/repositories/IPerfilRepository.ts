import { Perfil } from '../entities/Perfil';

export interface IPerfilRepository {
    save(perfil: Perfil): Promise<void>;
    findById(id: string): Promise<Perfil | null>;
    findBySuscriptorId(suscriptorId: string): Promise<Perfil[]>;
    update(perfil: Perfil): Promise<void>;
    delete(id: string): Promise<void>;
    findByNombreAndSuscriptorId(nombre: string, suscriptorId: string): Promise<Perfil | null>;
} 