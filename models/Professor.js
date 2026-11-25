import mongoose from 'mongoose';

const professorSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, 'O nome do professor é obrigatório.'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'O e-mail é obrigatório.'],
            unique: true,
            lowercase: true,
            trim: true
        },
        especialidade: {
            type: String,
            required: [true, 'A especialidade é obrigatória.'],
            trim: true
        },
        ativo: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Professor', professorSchema);
