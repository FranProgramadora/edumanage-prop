import Curso from '../models/Curso.js';
import { escapeRegex, isValidObjectId, formatErrorMessage } from '../utils/helpers.js';

export const listar = async (req, res, next) => {
    try {
        const pesquisa = req.query.pesquisa || '';
        const regex = new RegExp(escapeRegex(pesquisa), 'i');
        const cursos = await Curso.find({ nome: regex }).sort({ createdAt: -1 });

        res.render('curso/lst', { cursos, pesquisa });
    } catch (error) {
        next(error);
    }
};

export const formularioAdicionar = (req, res) => {
    res.render('curso/add', { erro: null });
};

export const adicionar = async (req, res) => {
    try {
        const { codigo, nome, turno, ativo } = req.body;
        await Curso.create({
            codigo,
            nome,
            turno,
            ativo: ativo === 'true'
        });
        res.redirect('/curso/lst');
    } catch (error) {
        res.render('curso/add', {
            erro: formatErrorMessage(error),
            dados: req.body
        });
    }
};

export const formularioEditar = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).render('erro', { mensagem: 'Identificador de curso inválido.' });
        }
        const curso = await Curso.findById(id);
        if (!curso) {
            return res.status(404).render('erro', { mensagem: 'Curso não encontrado.' });
        }
        res.render('curso/edt', { curso, erro: null });
    } catch (error) {
        next(error);
    }
};

export const atualizar = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!isValidObjectId(id)) {
            return res.status(400).render('erro', { mensagem: 'Identificador de curso inválido.' });
        }

        const { codigo, nome, turno, ativo } = req.body;
        await Curso.findByIdAndUpdate(
            id,
            {
                codigo,
                nome,
                turno,
                ativo: ativo === 'true'
            },
            { runValidators: true }
        );

        res.redirect('/curso/lst');
    } catch (error) {
        const curso = { _id: id, ...req.body, ativo: req.body.ativo === 'true' };
        res.render('curso/edt', {
            curso,
            erro: formatErrorMessage(error)
        });
    }
};

export const excluir = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).render('erro', { mensagem: 'Identificador de curso inválido.' });
        }
        await Curso.findByIdAndDelete(id);
        res.redirect('/curso/lst');
    } catch (error) {
        next(error);
    }
};
