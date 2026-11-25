import Professor from '../models/Professor.js';
import Disciplina from '../models/Disciplina.js';
import Curso from '../models/Curso.js';

export const dashboard = async (req, res, next) => {
    try {
        const [totalProfessores, totalDisciplinas, totalCursos] = await Promise.all([
            Professor.countDocuments(),
            Disciplina.countDocuments(),
            Curso.countDocuments()
        ]);

        res.render('index', {
            totalProfessores,
            totalDisciplinas,
            totalCursos
        });
    } catch (error) {
        next(error);
    }
};
