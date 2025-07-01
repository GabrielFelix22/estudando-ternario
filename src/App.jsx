import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [seguindo, setSeguindo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const funcionarios = [
    { nome: 'Gabriel Felix', tipo: 'CLT' },
    { nome: 'João Silva', tipo: 'PJ' },
    { nome: 'Maria Santos', tipo: 'CLT' },
    { nome: 'Pedro Almeida', tipo: 'PJ' },
    { nome: 'Ana Oliveira', tipo: 'CLT' },
    { nome: 'Lucas Costa', tipo: 'PJ' },
    { nome: 'Rafaela Martins', tipo: 'CLT' },
    { nome: 'Fernanda Souza', tipo: 'PJ' },
  ];

  const usuario = {
    nome: 'Gabriel Felix',
    ativo: true,
    online: true,
  };

  const admin = {
    nome: 'Administrador',
    permissao: 'user',
  };

  const hora = new Date().getHours();
  const emoji = hora < 12 ? '🌞' : hora < 18 ? '😐' : '🌙';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-900 text-white container-app p-4">
      <div className="flex flex-col gap-4 border border-gray-700 py-2 px-50 rounded-2xl shadow-md shadow-blue-500/80">
        <h1 className="text-3xl font-bold mt-2">
          Estudando <span className="text-blue-500">Ternários.</span>
        </h1>
        <p>
          {`${hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'}, ${usuario.nome}!`}{' '}
          • {emoji}
        </p>
        <p
          className={`font-medium text-lg ${usuario.online ? 'text-green-500' : 'text-red-500'}`}
        >
          {usuario.nome}: {usuario.ativo ? '✅' : '❌'}
        </p>
        {isLoading ? (
          <p className="text-lg text-white">Carregando funcionarios...</p>
        ) : (
          <ul className="flex flex-col gap-2 mt-4 text-lg">
            {funcionarios.map((funcionario) => (
              <li
                key={funcionario.nome}
                className="flex justify-between w-full gap-1 border-b border-gray-700 py-2 px-4"
              >
                {`${funcionario.nome}:`}
                <span
                  className={
                    funcionario.tipo === 'CLT'
                      ? 'text-green-500'
                      : 'text-purple-500'
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
              {seguindo ? 'Deixar de seguir' : 'Seguir'}
            </button>

            <button
              type="button"
              className={`
              mx-auto block w-50 mt-2 border border-blue-500 text-white font-bold py-2 px-4 rounded-full
              ${
                admin.permissao === 'admin'
                  ? 'hover:bg-blue-400/30 cursor-pointer'
                  : 'cursor-not-allowed'
              }
            `}
            >
              {admin.permissao === 'admin'
                ? 'Acessar Painel'
                : 'Acesso Restrito'}
            </button>
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
