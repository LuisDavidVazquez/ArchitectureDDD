import { Entity, Column, PrimaryColumn } from 'typeorm';
import { TipoPerfilEnum } from '../../domain/value-objects/TipoPerfil';

@Entity('perfiles')
export class PerfilEntity {
    @PrimaryColumn()
    id: string;

    @Column({ name: 'nombre_perfil' })
    nombrePerfil: string;

    @Column({ 
        name: 'tipo_perfil',
        type: 'text',
        enum: TipoPerfilEnum 
    })
    tipoPerfil: string;

    @Column({ name: 'suscriptor_id' })
    suscriptorId: string;

    @Column({ name: 'fecha_creacion', type: 'datetime' })
    fechaCreacion: Date;

    @Column({ default: true })
    activo: boolean;

    @Column({ nullable: true })
    pin?: string;
} 