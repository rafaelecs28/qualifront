import React, {  useEffect, useState } from 'react';
import './App.css';
import './Sidebar.css';
import './Main.css';
import { useHistory } from "react-router-dom";
import { cpfMask, telefoneMask, cepMask } from './maskcpf';
import api from '../../services/api';
import { getToken, getRole, logout,  getNome } from "../../services/auth";

function App(){
  const Token = getToken();
  const Role = getRole();
  const NOME = getNome();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefonex, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [controle, setControle] = useState('');
  const [cpfx, mudandoCPF] = useState('');
  const [uf, setUf] = useState('AC');
  const [sexo, setSexo] = useState('Masculino');
  const [cepx, setCep] = useState('');
  const [role, setPerfil] = useState('usuario');
  const [desativar,setDesativar] = useState(false);
  const ufs =  ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF',
                'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
                'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS',
                'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  const sex = ['Masculino', 'Feminino'];
  const perfis = ['usuario', 'gerente', 'admin'];
  var perfils;
   if(Role === 'usuario') { perfils = [perfis[0]]}
   if(Role === 'gerente') { perfils = [perfis[0], perfis[1]]}
   if(Role === 'admin') { perfils = perfis}


  useEffect(() =>{
    async function carregandoUsuarios(){
      const response = await api.get('/');
      
      setUsers(response.data)
    }
    carregandoUsuarios();
  }, [])
  
  const handleAtualizaUser = (e) =>{ 
    e.preventDefault();
    setControle(1);
    let usuario = users.filter(user => user.cpf === parseInt(e.target.value))
    setNome(usuario[0].nome)
    mudandoCPF(cpfMask(String(usuario[0].cpf)))
    setUf(usuario[0].uf);
    setSexo(usuario[0].sexo);
    setEmail(usuario[0].email);
    setPassword(usuario[0].password);
    setTelefone(telefoneMask(String(usuario[0].telefone)));
    setEndereco(usuario[0].endereco);
    setCep(cepMask(String(usuario[0].cep)));
    setDesativar(true)
  }
  function handleLimpar(e){
    setControle(0)
    setNome('')
    mudandoCPF(cpfMask(''))
    setUf('');
    setSexo('');
    setEmail('');
    setPassword('');
    setTelefone('');
    setEndereco('');
    setCep('');
    setDesativar(false)
  }
 
  async function handleLogout(e){
    logout(Token)
    history.push('/')
  }
  async function handleAddUser(e){
    //e.preventDefault();
    var cpf = cpfx.split('.').join('')
    cpf = parseInt(cpf.split('-').join(''))
    var telefone = telefonex  !== '' ? String(telefonex) : ''
    if(telefone !== ''){
      telefone = telefone.split(' ').join('').split('-').join('').split(')').join('').split('(').join('')
    }
    var cep = cepx !== '' ? String(cepx).split('-').join('') : ''
    cep = parseInt(cep)
    parseInt(password)
    if (controle === 1){
      setUf(e.target.value);
      setSexo(e.target.value);
      setPerfil(e.target.value);
      await api.put('/users/update', {
        cpf, nome, telefone, 
        endereco, cep, uf,
        sexo, role
      })
    }
    else{
      setControle(0)
      //e.preventDefault()
      setUf(e.target.value);
      setSexo(e.target.value);
      setPerfil(e.target.value);
      if(users.filter(user => user.cpfx === parseInt(cpfx)) === true){
        alert(`Já existe usuário para o cpf: ${cpfx}`)
      }
      else if(users.filter(user => user.email === email) === true){
        alert(`Já existe usuário para o e-mail: ${email}`)
      } else{
        await api.post('/users', {
          nome, email, password,
          cpf, telefone, endereco,
          cep, uf, sexo, 
          role
        })
    }
    }
  }
  /*
  Função para exclusão do usuário. 
  */
 
  async function handleDeleteUser(e){
    e.preventDefault()
    const cpf = parseInt(e.target.value)
    console.log(cpf)
    await api.delete('/users/delete/'+cpf).then(function(data){
      //if(users.filter(user => user.nome === NOME).nome === NOME )
      if(data.status === 200){
        window.location.reload();
      }
    })
      
  }
  function handleUfTypeChange(e) {
    setUf(e.target.value);
  }
  function handleSexoTypeChange(e) {
  setSexo(e.target.value);
  }
  function handlePerfilTypeChange(e) {
  setPerfil(e.target.value);
  }
  return (
    <div className="App">
      <aside>
  <h4>Seja bem-vindo, {NOME}.</h4>
        <strong>Cadastrar Usuário</strong>
        <form onSubmit={handleAddUser}>
          
          <div className="input-block">
            <label htmlFor="nome">Nome</label>
            <input 
            type="text"
            name="nome" 
            id="nome" 
            pattern="[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]*"
            required 
            value={nome || ''}
            onChange={e => setNome(e.target.value)}
            />
            <input 
            type="hidden"
            value={controle || ''}
            onChange={e => setControle(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="email">E-mail</label>
            <input 
            name="email" 
            id="email" 
            type="email"
            required
            disabled={desativar}
            value={email || ''}
            //pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
            onChange={e => setEmail(e.target.value)}
             />
          </div>
          <div className="input-block">
            <label htmlFor="password">Senha</label>
            <input 
            name="password" 
            id="password" 
            type="password"
            required
            disabled={desativar}
            value={password || ''}
            onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="">CPF</label>
            <input name="cpf" id="cpf" required 
              maxLength='14'
              minLength='14'
              type = "tel"
              value={cpfx || ''}
              disabled={desativar}
              onChange={e => mudandoCPF(cpfMask(e.target.value))} />
          </div>
          
          <div className="input-block">
            <label htmlFor="telefone">Telefone</label>
            <input name="telefone" 
            id="telefone"
            type="tel"
            maxLength='13'
            minLength='1'
            required
            value={telefonex || ''}
            onChange={e => setTelefone(telefoneMask(e.target.value))}
            />
          </div>
          <div className="input-block">
            <label htmlFor="endereco">Endereço</label>
            <input name="endereco" 
            id="endereco"
            required
            value={endereco || ''}
            onChange={e => setEndereco(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="cep">CEP</label>
            <input name="cep" 
            id="cep"
            type="tel"
            maxLength='9'
            minLength='9'
            required
            value={cepx || ''}
            onChange={e => setCep(cepMask(e.target.value))}
            />
          </div>
          <div className="input-group">
         
          <div className="input-block">
            <label htmlFor="uf">UF</label>
            <select 
              value={uf}
              onChange={handleUfTypeChange}
              className="browser-default custom-select">
              {ufs.map((x,y) => <option key={x}>{x}</option>)}
               
            </select>
          </div>
          <div className="input-block">
            <label htmlFor="sexo">Sexo</label>
            <select
              value={sexo}
              onChange={handleSexoTypeChange}
              className="browser-default custom-select">
              {sex.map((x,y) => <option key={x}>{x}</option>)}
                
            </select>
          </div>
          <div className="input-block">
            <label htmlFor="perfil">Perfil</label>
            <select
              defaultValue={role}
              onChange={handlePerfilTypeChange}
              className="browser-default custom-select">
              {perfils.map((x,y) => <option key={x}>{x}</option>)}
            </select>
          </div>
            
        </div>
          <button type="submit">Salvar</button>
        </form>
        <button className="deletar"  onClick={handleLimpar}> Limpar </button>
        <button className="edicao"  onClick={handleLogout}> Sair </button>
      </aside>
      <main>
        <ul>
        
        {users.map(user => (
          <li key={user.cpf} className='users-info'>
          <div className='user-info'>
            <header><strong>Nome: {user.nome}</strong></header>
          </div>
          <span>CPF: {cpfMask(String(user.cpf))}</span><br/>
          <span>E-mail: {user.email}</span><br/>
          <span>Telefone: {telefoneMask(String(user.telefone))}</span><br/>
          <span>Endereço: {user.endereco}</span><br/>
          <span>CEP: {cepMask(String(user.cep))}</span><br/>
          <span>UF: {user.uf} </span><br/>
          <span>Sexo: {user.sexo} </span><br/>
          <span>Perfil: {user.role} </span><br/>
          {Role !== 'usuario' ? <button className="edicao" value={user.cpf} onClick={handleAtualizaUser}> Atualizar </button> : ''}
          {Role === 'admin'? <form onSubmit={handleDeleteUser}>
          <button className="deletar" value={user.cpf} onClick={handleDeleteUser}> Deletar </button></form> : ''}
          
        </li>
          ))}
          

        </ul>
      </main>
    </div>
  );

}
export default App;
