import Disciplina from '../models/Disciplina.js';
import { escapeRegex, isValidObjectId, formatErrorMessage } from '../utils/helpers.js';

export const listar = async (req, res, next) => {
    try {
        const pesquisa = req.query.pesquisa || '';
        const regex = new RegExp(escapeRegex(pesquisa), 'i');
        const disciplinas = await Disciplina.find({ nome: regex }).sort({ createdAt: -1 });

        res.render('disciplina/lst', { disciplinas, pesquisa });
    } catch (error) {
        next(error);
    }
};

export const formularioAdicionar = (req, res) => {
    res.render('disciplina/add', { erro: null });
};

export const adicionar = async (req, res) => {
    try {
        const { codigo, nome, cargaHoraria, ativa } = req.body;
        await Disciplina.create({
            codigo,
            nome,
            cargaHoraria: Number(cargaHoraria),
            ativa: ativa === 'true'
        });
        res.redirect('/disciplina/lst');
    } catch (error) {
        res.render('disciplina/add', {
            erro: formatErrorMessage(error),
            dados: req.body
        });
    }
};

export const formularioEditar = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).render('erro', { mensagem: 'Identificador de disciplina inválido.' });
        }
        const disciplina = await Disciplina.findById(id);
        if (!disciplina) {
            return res.status(404).render('erro', { mensagem: 'Disciplina não encontrada.' });
        }
        res.render('disciplina/edt', { disciplina, erro: null });
    } catch (error) {
        next(error);
    }
};

export const atualizar = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!isValidObjectId(id)) {
            return res.status(400).render('erro', { mensagem: 'Identificador de disciplina inválido.' });
        }

        const { codigo, nome, cargaHoraria, ativa } = req.body;
        await Disciplina.findByIdAndUpdate(
            id,
            {
                codigo,
                nome,
                cargaHoraria: Number(cargaHoraria),
                ativa: ativa === 'true'
            },
            { runValidators: true }
        );

        res.redirect('/disciplina/lst');
    } catch (error) {
        const disciplina = { _id: id, ...req.body, ativa: req.body.ativa === 'true' };
        res.render('disciplina/edt', {
            disciplina,
            erro: formatErrorMessage(error)
        });
    }
};

export const excluir = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).render('erro', { mensagem: 'Identificador de disciplina inválido.' });
        }
        await Disciplina.findByIdAndDelete(id);
        res.redirect('/disciplina/lst');
    } catch (error) {
        next(error);
    }
};
