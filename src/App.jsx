import "./App.css";
import { useState } from "react";

function App() {
	const [seguindo, setSeguindo] = useState(true);
	const funcionarios = [
		{ nome: "Gabriel Felix", tipo: "CLT" },
		{ nome: "João Silva", tipo: "PJ" },
		{ nome: "Maria Santos", tipo: "CLT" },
		{ nome: "Pedro Almeida", tipo: "PJ" },
		{ nome: "Ana Oliveira", tipo: "CLT" },
		{ nome: "Lucas Costa", tipo: "PJ" },
		{ nome: "Rafaela Martins", tipo: "CLT" },
		{ nome: "Fernanda Souza", tipo: "PJ" },
	];

	const usuario = {
		nome: "Gabriel Felix",
		ativo: true,
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-900 text-white container-app">
			<div className="flex flex-col gap-4 border border-gray-700 py-10 px-20 rounded-2xl shadow-md shadow-blue-500/80">
				<h1 className="text-3xl font-bold">Estudando Ternários</h1>
				<p className="text-2xl">
					{usuario.nome}: {usuario.ativo ? "✅" : "❌"}
				</p>

				<ul className="flex flex-col gap-2 mt-4 text-lg">
					{funcionarios.map((funcionario) => (
						<li
							key={funcionario.nome}
							className="flex justify-between w-full gap-1"
						>
							{`${funcionario.nome}:`}
							<span
								className={
									funcionario.tipo === "CLT"
										? "text-green-500"
										: "text-purple-500"
								}
							>
								{funcionario.tipo}
							</span>
						</li>
					))}
					<button
						type="button"
						onClick={() => setSeguindo(!seguindo)}
						className="mx-auto block w-50 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
					>
						{seguindo ? "Deixar de seguir" : "Seguir"}
					</button>
				</ul>
			</div>
		</div>
	);
}

export default App;
