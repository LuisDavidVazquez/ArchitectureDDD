import { DataSource } from 'typeorm';
import { PerfilEntity } from '../models/PerfilEntity';
import path from 'path';

export const SQLiteDataSource = new DataSource({
    type: 'sqlite',
    database: path.join(__dirname, '../../../../database.sqlite'),
    entities: [PerfilEntity],
    synchronize: true,
    logging: true,
    logger: 'advanced-console'
}); 