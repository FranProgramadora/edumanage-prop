import mongoose from 'mongoose';

const cursoSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: [true, 'O código do curso é obrigatório.'],
            unique: true,
            uppercase: true,
            trim: true
        },
        nome: {
            type: String,
            required: [true, 'O nome do curso é obrigatório.'],
            trim: true
        },
        turno: {
            type: String,
            required: [true, 'O turno é obrigatório.'],
            enum: ['EaD (Distancia)', 'Noturno', 'Matutino', 'Vespertino', 'Integral']
        },
        ativo: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Curso', cursoSchema);
