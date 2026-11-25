import mongoose from 'mongoose';

const disciplinaSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: [true, 'O código da disciplina é obrigatório.'],
            unique: true,
            uppercase: true,
            trim: true
        },
        nome: {
            type: String,
            required: [true, 'O nome da disciplina é obrigatório.'],
            trim: true
        },
        cargaHoraria: {
            type: Number,
            required: [true, 'A carga horária é obrigatória.'],
            min: [1, 'A carga horária deve ser de pelo menos 1 hora.']
        },
        ativa: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Disciplina', disciplinaSchema);
