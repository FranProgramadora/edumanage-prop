import mongoose from 'mongoose';

export const escapeRegex = (text = '') => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

export const formatErrorMessage = (error) => {
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue || {})[0] || 'campo';
        return `Já existe um registro cadastrado com este(a) ${field}.`;
    }
    if (error.name === 'ValidationError') {
        return Object.values(error.errors).map(err => err.message).join(' ');
    }
    return error.message || 'Erro inesperado ao processar a solicitação.';
};
