import './App.css';
import axios from 'axios';
import {
  CloudMoon,
  CloudSun,
  Plus,
  ToggleLeft,
  ToggleRight,
  Trash2,
  TvMinimal,
  User,
  UserPen,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [seguindo, setSeguindo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [erroNome, setErroNome] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [novoTipo, setNovoTipo] = useState('CLT');
  const [funcionarios, setFuncionarios] = useState([]);

  // Função para buscar os funcionários
  const fetchFuncionarios = async () => {
    // const funcionariosSalvos = localStorage.getItem('funcionarios');
    // if (!funcionariosSalvos) {
    //   setFuncionarios(JSON.parse(funcionariosSalvos));
    //   localStorage.setItem('funcionarios', JSON.stringify(funcionariosSalvos));
    // } else {

    // }
    try {
      const response = await axios.get('http://localhost:3000/funcionarios');
      setFuncionarios(response.data);
      // localStorage.setItem('funcionarios', JSON.stringify(response.data));
    } catch (error) {
      console.error('Erro ao buscar funcionários', error);
      toast.error('Erro ao buscar funcionários', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
  // }, [funcionarios]);

  // Função para adicionar um novo funcionário
  const handleAdicionar = async () => {
    if (!novoNome.trim()) {
      setErroNome('O nome é obrigatório');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/funcionarios', {
        nome: novoNome,
        tipo: novoTipo,
      });
      setFuncionarios((prev) => [...prev, response.data]);
      setNovoNome('');
      setNovoTipo('CLT');
    } catch (error) {
      console.error('Erro ao adicionar funcionário', error);
      toast.error('Erro ao adicionar funcionário', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  // Função para remover um funcionário
  const handleRemover = async (usuario) => {
    try {
      const confirmacao = window.confirm(
        'Deseja realmente remover este funcionário?',
      );

      if (!confirmacao) return;

      await axios.delete(`http://localhost:3000/funcionarios/${usuario.id}`);

      setFuncionarios(funcionarios.filter((func) => func.id !== usuario.id));
      toast.success('Funcionário removido com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } catch (error) {
      console.error('Erro ao remover funcionário', error);
      toast.error('Erro ao remover funcionário', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
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
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold mt-2">
          <div className="flex items-center gap-2 space-x-2">
            <TvMinimal className="w-10 h-10" />
            Funcionários <span className="text-blue-500">Ternários.</span>
          </div>
        </h1>
        <div className="flex items-center gap-2">
          <CloudSun className="w-8 h-8" />
          <p className="text-lg mt-1">
            {`${hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'}, ${usuario.nome}!`}{' '}
            • {emoji}
          </p>
        </div>
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
        {/* Input e select para adicionar um novo funcionário */}
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={novoNome}
            onChange={(e) => {
              setNovoNome(e.target.value);
              setErroNome('');
            }}
            placeholder="Nome do funcionário"
            className="border border-gray-700 py-2 px-8 rounded-lg"
          />

          <select
            value={novoTipo}
            onChange={(e) => setNovoTipo(e.target.value)}
            className="border border-gray-700 py-2 px-8 rounded-lg"
          >
            <option value="CLT" className="bg-gray-900 text-white">
              CLT
            </option>
            <option value="PJ" className="bg-gray-900 text-white">
              PJ
            </option>
            <option value="Terceirizado" className="bg-gray-900 text-white">
              Terceirizado
            </option>
          </select>
          <Plus
            onClick={handleAdicionar}
            className="w-10 h-10 cursor-pointer border border-gray-700 p-2 rounded-full"
          />
        </div>
        {/* Mensagem de erro abaixo do input */}
        {erroNome && (
          <p className="text-red-500 text-sm ml-2 mt-[-26px]">{erroNome}</p>
        )}
        <h1 className="text-2xl text-center">
          <span className="text-white-500">
            {funcionarios <= 0 ? 'Não há funcionários cadastrados' : ''}
          </span>
        </h1>
        {isLoading ? (
          <p className="text-lg text-white">Carregando funcionarios...</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 divide-y divide-x divide-gray-700 mt-4 text-lg custom-list-scroll pr-2">
            {funcionarios.map((funcionario) => (
              <li
                key={funcionario.nome}
                className="flex items-center justify-between w-full py-2 px-2 border-b border-gray-700 rounded-lg"
              >
                {/* LADO ESQUERDO: Ícone, Nome e Tipo */}
                <div className="flex flex-col">
                  {' '}
                  {/* Use flex-col para empilhar verticalmente */}
                  <div className="flex items-center gap-2">
                    {' '}
                    {/* Ícone e Nome na mesma linha */}
                    <User className="w-8 h-8" />
                    <span className="font-semibold">{`${funcionario.nome}`}</span>{' '}
                    {/* Nome em negrito para destaque */}
                  </div>
                  <span
                    className={`
              ml-10 /* Alinha o tipo abaixo do nome, ajustando a margem */
              text-sm /* Fonte menor para o tipo */
              ${
                funcionario.tipo === 'CLT'
                  ? 'text-green-500'
                  : funcionario.tipo === 'PJ'
                    ? 'text-sky-300'
                    : 'text-purple-500'
              }
            `}
                  >
                    {funcionario.tipo}
                  </span>
                </div>

                {/* LADO DIREITO: Ícones de Ação */}
                <div className="flex items-center gap-2 ml-auto pl-10">
                  {' '}
                  {/* Ícones de ação */}
                  <UserPen className="w-6 h-6 text-blue-200 hover:text-blue-300 cursor-pointer" />
                  <Trash2
                    className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleRemover(funcionario)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center justify-center mt-10 gap-4">
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
            {admin.permissao === 'admin' ? 'Acessar Painel' : 'Acesso Restrito'}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
