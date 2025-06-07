import { IPerfilRepository } from "../../domain/repositories/IPerfilRepository";
import { Perfil } from "../../domain/entities/Perfil";
import { NombrePerfil } from "../../domain/value-objects/NombrePerfil";
import { TipoPerfil, TipoPerfilEnum } from "../../domain/value-objects/TipoPerfil";
import { PIN } from "../../domain/value-objects/PIN";

interface PerfilDO {
    id: string;
    nombrePerfil: string;
    tipoPerfil: TipoPerfilEnum;
    suscriptorId: string;
    pin?: string;
    fechaCreacion: Date;
    activo: boolean;
}

export class PerfilRepositoryImpl implements IPerfilRepository {
    private readonly perfiles: PerfilDO[] = [];

    async save(perfil: Perfil): Promise<void> {
        const perfilDO: PerfilDO = {
            id: perfil.id,
            nombrePerfil: perfil.nombrePerfil.valor,
            tipoPerfil: perfil.tipoPerfil.tipo,
            suscriptorId: perfil.suscriptorId,
            pin: perfil.pin?.valor,
            fechaCreacion: perfil.fechaCreacion,
            activo: perfil.activo
        };
        
        const index = this.perfiles.findIndex(p => p.id === perfil.id);
        if (index >= 0) {
            this.perfiles[index] = perfilDO;
        } else {
            this.perfiles.push(perfilDO);
        }
    }

    async findById(id: string): Promise<Perfil | null> {
        const perfilDO = this.perfiles.find(p => p.id === id);
        if (!perfilDO) return null;
        return this.toDomain(perfilDO);
    }

    async findBySuscriptorId(suscriptorId: string): Promise<Perfil[]> {
        return this.perfiles
            .filter(p => p.suscriptorId === suscriptorId)
            .map(p => this.toDomain(p));
    }

    async update(perfil: Perfil): Promise<void> {
        await this.save(perfil);
    }

    async delete(id: string): Promise<void> {
        const index = this.perfiles.findIndex(p => p.id === id);
        if (index >= 0) {
            this.perfiles.splice(index, 1);
        }
    }

    async findByNombreAndSuscriptorId(nombre: string, suscriptorId: string): Promise<Perfil | null> {
        const perfilDO = this.perfiles.find(
            p => p.nombrePerfil === nombre && p.suscriptorId === suscriptorId
        );
        if (!perfilDO) return null;
        return this.toDomain(perfilDO);
    }

    private toDomain(perfilDO: PerfilDO): Perfil {
        return Perfil.reconstitute(
            perfilDO.id,
            new NombrePerfil(perfilDO.nombrePerfil),
            new TipoPerfil(perfilDO.tipoPerfil),
            perfilDO.suscriptorId,
            perfilDO.fechaCreacion,
            perfilDO.activo,
            perfilDO.pin ? new PIN(perfilDO.pin) : undefined
        );
    }
}
