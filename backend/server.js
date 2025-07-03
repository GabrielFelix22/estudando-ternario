const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const PORT = 3000;
const db = require("./db");

// --- Middlewares Globais ---
app.use(cors());
app.use(express.json());

// --- Rotas da API (Back-end) ---

// --- Rota para buscar todos os funcionários ---
app.get("/api/funcionarios", (_req, res) => {
	const funcionarios = "SELECT * FROM view_funcionario WHERE excluido is null";

	db.query(funcionarios, (err, results) => {
		if (err) {
			console.error("Erro ao buscar funcionários", err);
			res.status(500).json({ error: "Erro ao buscar funcionários" });
		}

		res.json(results);
	});
});

// --- Rota para adicionar um novo funcionário ---
app.post("/api/funcionarios", (req, res) => {
	const { nome, tipo } = req.body;

	if (!nome || !tipo) {
		return res.status(400).json({ error: "Nome e tipo são obrigatórios" });
	}

	const query = `INSERT INTO funcionario (nome, tipo, criado) VALUES (?, ?, NOW())`;

	db.query(query, [nome, tipo], (err, results) => {
		if (err) {
			console.error("Erro ao adicionar funcionário", err);
			return res.status(500).json({ error: "Erro ao adicionar funcionário" });
		}

		const novoFuncionario = {
			id_funcionario: results.insertId,
			nome,
			tipo,
			criado: new Date().toISOString(),
		};

		res.status(201).json(novoFuncionario);
	});
});

// --- Rota para atualizar um funcionário ---
app.put("/api/funcionarios/:funcionarioId", (req, res) => {
	const id = parseInt(req.params.funcionarioId);
	const { nome, tipo } = req.body;

	if (!nome || !tipo) {
		return res.status(400).json({ error: "Nome e tipo são obrigatórios" });
	}

	const query = `UPDATE funcionario SET nome = ?, tipo = ? WHERE id_funcionario = ?`;

	db.query(query, [nome, tipo, id], (err, results) => {
		if (err) {
			console.error("Erro ao atualizar funcionário", err);
			return res.status(500).json({ error: "Erro ao atualizar funcionário" });
		}

		if (results.affectedRows === 0) {
			return res.status(404).json({ error: "Funcionário nao encontrado" });
		}

		res.status(200).json({ message: "Funcionario atualizado com sucesso" });
	});
});

// --- Rota para remover um funcionário ---
app.delete("/api/funcionarios/:funcionarioId", (req, res) => {
	const id = parseInt(req.params.funcionarioId);
	const index = funcionarios.findIndex((funcionario) => funcionario.id === id);
	if (index === -1) {
		return res.status(404).json({ error: "Funcionário não encontrado" });
	}
	funcionarios.splice(index, 1);
	res.status(200).json({ message: "Funcionário removido com sucesso" });
});

// --- Rotas para o Front-end (SPA) build ---

// --- Servir Arquivos Estáticos do Front-end ---
app.use(express.static(path.join(__dirname, "frontend-build", "dist")));

// --- Rota "Catch-all" para o Front-end (SPA) ---
app.get("*", (_req, res) => {
	res.sendFile(path.join(__dirname, "frontend-build", "dist", "index.html"));
});

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
	console.log(`✅ Servidor rodando na porta ${PORT}`);
	console.log(`✅ Front-end acessível em http://localhost:${PORT}`);
	console.log(
		`✅ Back-end APIs acessíveis em http://localhost:${PORT}/api/funcionarios`,
	);
});
