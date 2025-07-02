const express = require("express");
const path = require("path"); // <-- ESTA LINHA É A CORREÇÃO
const app = express();
const cors = require("cors");
const PORT = 3000;

// --- Middlewares Globais ---
app.use(cors());
app.use(express.json());

// biome-ignore lint/suspicious/noDebugger: <>
debugger; // O debugger serve para depurar o código

// --- Rotas da API (Back-end) ---
const funcionarios = [
	{ id: 1, nome: "Gabriel Felix", tipo: "CLT" },
	{ id: 2, nome: "João Silva", tipo: "PJ" },
	{ id: 3, nome: "Maria Santos", tipo: "CLT" },
	{ id: 4, nome: "Pedro Almeida", tipo: "PJ" },
];

app.get("/api/funcionarios", (_req, res) => {
	res.json(funcionarios);
});

app.post("/api/funcionarios", (req, res) => {
	const { nome, tipo } = req.body;
	if (!nome || !tipo) {
		return res.status(400).json({ error: "Nome e tipo são obrigatórios" });
	}
	const novoFuncionario = {
		id: Date.now(),
		nome,
		tipo,
	};
	funcionarios.push(novoFuncionario);
	res.status(201).json(novoFuncionario);
});

app.delete("/api/funcionarios/:funcionarioId", (req, res) => {
	const id = parseInt(req.params.funcionarioId);
	const index = funcionarios.findIndex((funcionario) => funcionario.id === id);
	if (index === -1) {
		return res.status(404).json({ error: "Funcionário não encontrado" });
	}
	funcionarios.splice(index, 1);
	res.status(200).json({ message: "Funcionário removido com sucesso" });
});

// --- Servir Arquivos Estáticos do Front-end ---
app.use(express.static(path.join(__dirname, "frontend-build", "dist")));

// --- Rota "Catch-all" para o Front-end (SPA) ---
app.get("*", (_req, res) => {
	res.sendFile(path.join(__dirname, "frontend-build", "dist", "index.html"));
});

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
	console.log(`Front-end acessível em http://localhost:${PORT}`);
	console.log(
		`Back-end APIs acessíveis em http://localhost:${PORT}/api/funcionarios`,
	);
});
