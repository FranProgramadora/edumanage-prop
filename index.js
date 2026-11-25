import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/database.js';
import indexRoutes from './routes/indexRoutes.js';
import professorRoutes from './routes/professorRoutes.js';
import disciplinaRoutes from './routes/disciplinaRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao Banco de Dados
connectDB();

// Configuração do motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para disponibilizar a rota atual nos templates EJS
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

// Rotas da Aplicação
app.use('/', indexRoutes);
app.use('/professor', professorRoutes);
app.use('/disciplina', disciplinaRoutes);
app.use('/curso', cursoRoutes);

// Middleware para tratamento de 404 (Página não encontrada)
app.use((req, res) => {
    res.status(404).render('erro', { mensagem: 'Página não encontrada no sistema EduManage Pro.' });
});

// Middleware global de tratamento de erros (500)
app.use((err, req, res, next) => {
    console.error('>>> Erro Interno do Servidor:', err);
    res.status(500).render('erro', { mensagem: 'Ocorreu um erro interno no servidor.' });
});

app.listen(PORT, () => {
    console.log(`>>> Servidor EduManage Pro rodando em http://localhost:${PORT}`);
});
