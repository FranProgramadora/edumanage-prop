import Professor from '../models/Professor.js';
import { escapeRegex, isValidObjectId, formatErrorMessage } from '../utils/helpers.js';

export const listar = async (req, res, next) => {
    try {
        const pesquisa = req.query.pesquisa || '';
        const regex = new RegExp(escapeRegex(pesquisa), 'i');
        const professores = await Professor.find({ nome: regex }).sort({ createdAt: -1 });

        res.render('professor/lst', { professores, pesquisa });
    } catch (error) {
        next(error);
    }
};

export const formularioAdicionar = (req, res) => {
    res.render('professor/add', { erro: null });
};

export const adicionar = async (req, res) => {
    try {
        const { nome, email, especialidade, ativo } = req.body;
        await Professor.create({
            nome,
            email,
            especialidade,
            ativo: ativo === 'true'
        });
        res.redirect('/professor/lst');
    } catch (error) {
        const mensagemErro = formatErrorMessage(error);
        res.render('professor/add', {
            erro: mensagemErro,
            dados: req.body
        });
    }
};

export const formularioEditar = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).render('erro', { mensagem: 'Identificador de professor inválido.' });
        }
        const professor = await Professor.findById(id);
        if (!professor) {
            return res.status(404).render('erro', { mensagem: 'Professor não encontrado.' });
        }
        res.render('professor/edt', { professor, erro: null });
    } catch (error) {
        next(error);
    }
};

export const atualizar = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!isValidObjectId(id)) {
            return res.status(400).render('erro', { mensagem: 'Identificador de professor inválido.' });
        }

        const { nome, email, especialidade, ativo } = req.body;
        await Professor.findByIdAndUpdate(
            id,
            {
                nome,
                email,
                especialidade,
                ativo: ativo === 'true'
            },
            { runValidators: true }
        );

        res.redirect('/professor/lst');
    } catch (error) {
        const professor = { _id: id, ...req.body, ativo: req.body.ativo === 'true' };
        res.render('professor/edt', {
            professor,
            erro: formatErrorMessage(error)
        });
    }
};

export const excluir = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).render('erro', { mensagem: 'Identificador de professor inválido.' });
        }
        await Professor.findByIdAndDelete(id);
        res.redirect('/professor/lst');
    } catch (error) {
        next(error);
    }
};
