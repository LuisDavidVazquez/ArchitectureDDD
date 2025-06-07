import 'reflect-metadata';
import express from 'express';
import { SQLiteDataSource } from './src/Perfil/infrastructure/persistence/SQLiteConnection';
import perfilRoutes from './src/Perfil/infrastructure/http/routes/perfil.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/api', perfilRoutes);

// Inicializar base de datos y servidor
SQLiteDataSource.initialize()
    .then(() => {
        console.log('Base de datos inicializada correctamente');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al inicializar la base de datos:', error);
        process.exit(1);
    });
