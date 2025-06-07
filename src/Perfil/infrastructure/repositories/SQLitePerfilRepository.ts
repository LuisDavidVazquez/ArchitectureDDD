import { Repository } from 'typeorm';
import { IPerfilRepository } from '../../domain/repositories/IPerfilRepository';
import { Perfil } from '../../domain/entities/Perfil';
import { PerfilEntity } from '../models/PerfilEntity';
import { SQLiteDataSource } from '../persistence/SQLiteConnection';
import { NombrePerfil } from '../../domain/value-objects/NombrePerfil';
import { TipoPerfil, TipoPerfilEnum } from '../../domain/value-objects/TipoPerfil';
import { PIN } from '../../domain/value-objects/PIN';

export class SQLitePerfilRepository implements IPerfilRepository {
    private repository: Repository<PerfilEntity>;

    constructor() {
        if (!SQLiteDataSource.isInitialized) {
            throw new Error('DataSource no está inicializado');
        }
        this.repository = SQLiteDataSource.getRepository(PerfilEntity);
    }

    private toDomain(entity: PerfilEntity): Perfil {
        return Perfil.reconstitute(
            entity.id,
            new NombrePerfil(entity.nombrePerfil),
            new TipoPerfil(entity.tipoPerfil as TipoPerfilEnum),
            entity.suscriptorId,
            entity.fechaCreacion,
            entity.activo,
            entity.pin ? new PIN(entity.pin) : undefined
        );
    }

    private toEntity(perfil: Perfil): PerfilEntity {
        const entity = new PerfilEntity();
        entity.id = perfil.id;
        entity.nombrePerfil = perfil.nombrePerfil.valor;
        entity.tipoPerfil = perfil.tipoPerfil.tipo;
        entity.suscriptorId = perfil.suscriptorId;
        entity.fechaCreacion = perfil.fechaCreacion;
        entity.activo = perfil.activo;
        entity.pin = perfil.pin?.valor;
        return entity;
    }

    async save(perfil: Perfil): Promise<void> {
        try {
            console.log('Guardando perfil:', {
                id: perfil.id,
                nombrePerfil: perfil.nombrePerfil.valor,
                tipoPerfil: perfil.tipoPerfil.tipo,
                suscriptorId: perfil.suscriptorId
            });
            
            const entity = this.toEntity(perfil);
            const savedEntity = await this.repository.save(entity);
            
            console.log('Perfil guardado exitosamente:', savedEntity);
        } catch (error) {
            console.error('Error al guardar perfil:', error);
            throw error;
        }
    }

    async findBySuscriptorId(suscriptorId: string): Promise<Perfil[]> {
        try {
            console.log('Buscando perfiles para suscriptorId:', suscriptorId);
            
            // Primero verificamos si la tabla existe y tiene datos
            const tableExists = await this.repository.query(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='perfiles'"
            );
            console.log('Tabla existe:', tableExists);

            if (tableExists.length > 0) {
                // Consultar todos los perfiles para debug
                const allProfiles = await this.repository.find();
                console.log('Todos los perfiles en la base de datos:', allProfiles);
            }

            const entities = await this.repository.find({ 
                where: { suscriptorId },
                select: ['id', 'nombrePerfil', 'tipoPerfil', 'suscriptorId', 'pin', 'fechaCreacion', 'activo']
            });
            
            console.log('Entidades encontradas:', entities);
            const perfiles = entities.map(entity => this.toDomain(entity));
            console.log('Perfiles mapeados:', perfiles);
            
            return perfiles;
        } catch (error) {
            console.error('Error al buscar perfiles:', error);
            throw error;
        }
    }

    async findById(id: string): Promise<Perfil | null> {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? this.toDomain(entity) : null;
    }

    async update(perfil: Perfil): Promise<void> {
        const entity = this.toEntity(perfil);
        await this.repository.save(entity);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByNombreAndSuscriptorId(nombre: string, suscriptorId: string): Promise<Perfil | null> {
        const entity = await this.repository.findOne({
            where: {
                nombrePerfil: nombre,
                suscriptorId: suscriptorId
            }
        });
        return entity ? this.toDomain(entity) : null;
    }
} 