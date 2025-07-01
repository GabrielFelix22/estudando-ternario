import './App.css';
import {
  Plus,
  ToggleLeft,
  ToggleRight,
  Trash2,
  TvMinimal,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

function App() {
  const [seguindo, setSeguindo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [novoNome, setNovoNome] = useState('');
  const [funcionarios, setFuncionarios] = useState([
    { nome: 'Gabriel Felix', tipo: 'CLT' },
    { nome: 'João Silva', tipo: 'PJ' },
    { nome: 'Maria Santos', tipo: 'CLT' },
    { nome: 'Pedro Almeida', tipo: 'PJ' },
  ]);

  const handleAdicionar = () => {
    if (novoNome.trim()) {
      setFuncionarios([...funcionarios, { nome: novoNome, tipo: 'CLT' }]);
    }

    setNovoNome('');
  };

  const handleRemover = (usuario) => {
    const novosFuncionarios = funcionarios.filter(
      (funcionario) => funcionario.nome !== usuario,
    );

    setFuncionarios(novosFuncionarios);
  };

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
  const emoji = hora < 12 ? '🌞' : hora < 18 ? '😁' : '🌙';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-900 text-white container-app p-4">
      <div className="flex flex-col gap-4 border border-gray-700 py-2 px-50 rounded-2xl shadow-md shadow-blue-500/80">
        <h1 className="text-3xl font-bold mt-2">
          <div className="flex items-center gap-2 space-x-2">
            <TvMinimal className="w-10 h-10" />
            Funcionários <span className="text-blue-500">Ternários.</span>
          </div>
        </h1>
        <p>
          {`${hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'}, ${usuario.nome}!`}{' '}
          • {emoji}
        </p>
        <div
          className={`font-medium text-lg ${usuario.online ? 'text-green-500' : 'text-red-500'}`}
        >
          <div className="flex items-center gap-2">
            <span> {usuario.nome}</span>
            {usuario.ativo ? (
              <ToggleRight className="w-6 h-6 text-green-500" />
            ) : (
              <ToggleLeft className="w-6 h-6 text-red-500" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-lg">
          <span
            className={`flex items-center gap-2 ${funcionarios.length > 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            <User className="w-6 h-6" />
            {funcionarios.length}
          </span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            placeholder="Digite o nome do funcionário"
            className="border border-gray-700 py-2 px-8 rounded-full w-80"
          />
          <Plus
            onClick={handleAdicionar}
            className="w-10 h-10 cursor-pointer border border-gray-700 p-2 rounded-full"
          />
        </div>
        <h1 className="text-2xl text-center">
          <span className="text-white-500">
            {funcionarios <= 0 ? 'Não há funcionários cadastrados' : ''}
          </span>
        </h1>
        {isLoading ? (
          <p className="text-lg text-white">Carregando funcionarios...</p>
        ) : (
          <ul className="flex flex-col gap-2 mt-4 text-lg">
            {funcionarios.map((funcionario) => (
              <li
                key={funcionario.nome}
                className="flex justify-between w-full border-b border-gray-700 py-2"
              >
                <div className="flex gap-2">
                  <User />
                  {`${funcionario.nome}`}
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={
                      funcionario.tipo === 'CLT'
                        ? 'text-blue-500'
                        : 'text-yellow-500'
                    }
                  >
                    {funcionario.tipo}
                  </span>
                  <Trash2
                    className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleRemover(funcionario.nome)}
                  />
                </div>
              </li>
            ))}
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setSeguindo(!seguindo)}
                className="mx-auto block w-50 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
              >
                {seguindo ? 'Deixar de seguir' : 'Seguir'}
              </button>

              <button
                type="button"
                className={`
              mx-auto block w-50 m-4 border border-blue-500 text-white font-bold py-2 px-4 rounded-full
              ${
                admin.permissao === 'admin'
                  ? 'hover:bg-blue-400/30 cursor-pointer'
                  : 'cursor-not-allowed opacity-50'
              }
            `}
              >
                {admin.permissao === 'admin'
                  ? 'Acessar Painel'
                  : 'Acesso Restrito'}
              </button>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
