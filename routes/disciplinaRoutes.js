import express from 'express';
import {
    listar,
    formularioAdicionar,
    adicionar,
    formularioEditar,
    atualizar,
    excluir
} from '../controllers/disciplinaController.js';

const router = express.Router();

router.get('/lst', listar);
router.get('/add', formularioAdicionar);
router.post('/add', adicionar);
router.get('/edt/:id', formularioEditar);
router.post('/edt/:id', atualizar);
router.post('/del/:id', excluir);

export default router;
