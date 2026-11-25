# EduManage Pro — Sistema de Gestão Acadêmica (Versão Otimizada e Reorganizada)


[https://edumanage-prop.onrender.com](https://edumanage-prop.onrender.com)
Projeto Final aperfeiçoado para a disciplina de **Desenvolvimento Back-End** do curso Superior de Tecnologia em Sistemas para Internet a Distância (TSIaD) — IFSul.

---

## 🚀 Requisitos e Tecnologias

- **Node.js** (v18+)
- **Express.js** (Arquitetura em Camadas com Router e Controllers)
- **EJS** (Templates HTML dinâmicos com suporte a Modais de Visualização)
- **Mongoose / MongoDB Atlas** (Persistência com Schemas estritos, Validações e Timestamps)
- **Bootstrap 5 & Bootstrap Icons** (Interface Responsiva com Sticky Footer)

---

## 📁 Estrutura do Projeto

```text
edumanage-pro/
├── config/
│   └── database.js         # Conexão centralizada com MongoDB
├── controllers/
│   ├── indexController.js      # Dashboard com contagem em paralelo
│   ├── professorController.js  # CRUD + Busca + Validações de Professor
│   ├── disciplinaController.js # CRUD + Busca + Validações de Disciplina
│   └── cursoController.js      # CRUD + Busca + Validações de Curso
├── models/
│   ├── Professor.js        # Schema: nome, email, especialidade, ativo
│   ├── Disciplina.js       # Schema: codigo, nome, cargaHoraria, ativa
│   └── Curso.js            # Schema: codigo, nome, turno, ativo
├── routes/
│   ├── indexRoutes.js
│   ├── professorRoutes.js
│   ├── disciplinaRoutes.js
│   └── cursoRoutes.js
├── utils/
│   └── helpers.js          # Sanitização ReDoS (escapeRegex), ObjectId e mensagens de erro
├── views/
│   ├── cabecalho.ejs       # Navbar com marcação dinâmica de rota ativa
│   ├── rodape.ejs          # Rodapé fixo (Sticky Footer)
│   ├── erro.ejs            # Tratamento visual de erros 404 e 500
│   ├── index.ejs           # Dashboard principal
│   ├── professor/          # add.ejs, edt.ejs, lst.ejs (com Modal Visualizar)
│   ├── disciplina/         # add.ejs, edt.ejs, lst.ejs (com Modal Visualizar)
│   └── curso/              # add.ejs, edt.ejs, lst.ejs (com Modal Visualizar)
├── .env.example
├── .gitignore
├── index.js                # Ponto de entrada (ESM, Middlewares, Rotas, 404/500)
├── package.json            # Dependências + "engines": {"node": ">=18.0.0"}
└── README.md
```

---

## 🛠️ Como Executar Localmente

1. **Instalar Dependências:**
   ```bash
   npm install
   ```

2. **Configurar Variáveis de Ambiente:**
   Crie um arquivo `.env` baseado no `.env.example`:
   ```env
   PORT=3000
   MONGODB_URI=sua_string_de_conexao_mongodb_atlas
   ```

3. **Iniciar a Aplicação:**
   ```bash
   npm start
   ```

4. **Acessar no Navegador:**
   Abra `http://localhost:3000`

---

## 🌐 Deploy no Render.com

1. Envie as alterações para o **GitHub**:
   ```bash
   git add .
   git commit -m "refactor: reorganização arquitetural MVC, rotas seguras e modais de visualização"
   git push origin main
   ```
2. No painel do **Render.com**:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Adicione `MONGODB_URI` com a URL do seu MongoDB Atlas.
[https://edumanage-prop.onrender.com](https://edumanage-prop.onrender.com)