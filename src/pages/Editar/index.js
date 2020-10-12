import React, {  useEffect, useState } from 'react';
import '../App/App.css';
import '../App/Sidebar.css';
import '../App/Main.css';
import { useHistory } from "react-router-dom";
import api from '../../services/api';
import { useParams } from "react-router-dom";




function Editar(){
  const { cpf } = useParams();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [uf, setUf] = useState('AC');
  const [sexo, setSexo] = useState('Masculino');
  const [cep, setCep] = useState('');
  const [role, setPerfil] = useState('usuario');

  useEffect(() =>{
    async function carregandoUsuarios(){
      const response = await api.get('/');
      
      setUsers(response.data)
    }
    carregandoUsuarios();
  }, [])

  
  async function handleAtualizaUser(e){
    e.preventDefault();
    setUf(e.target.value);
    setSexo(e.target.value);
    setPerfil(e.target.value);

    
      await api.put('/users/update', {
      cpf,
      nome,
      telefone,
      endereco,
      cep, uf,
      sexo, 
      role
      })
      
      let path = `/app`; 
      history.push(path);
   
    

  }
 

  let usuario = users.filter(user => user.cpf === parseInt(cpf))
 

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
        <strong>Cadastrar Usuário</strong>
       
            <form onSubmit={handleAtualizaUser}>
          
            <div className="input-block">
              <label htmlFor="nome">Nome</label>
              <input 
              type="text"
              name="nome" 
              id="nome" 
              pattern="[a-zA-Z\s]*"
              required 
              placeholder={usuario.map(user=>user.nome)}
              value={nome}
              onChange={e => setNome(e.target.value)}
              />
            </div>
            
            
            
            <div className="input-block">
              <label htmlFor="telefone">Telefone</label>
              <input name="telefone" 
              id="telefone"
              type="number"
              value={telefone}
              placeholder={usuario.map(user=>user.telefone)}
              onChange={e => setTelefone(e.target.value)}
              />
            </div>
            
            
            <div className="input-block">
              <label htmlFor="endereco">Endereço</label>
              <input name="endereco" 
              id="endereco"
              value={endereco}
              placeholder={usuario.map(user=>user.endereco)}
              onChange={e => setEndereco(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="cep">CEP</label>
              <input name="cep" 
              id="cep"
              type="tel"
              maxLength='8'
              minLength='8'
              pattern="\d*"
              value={cep}
              placeholder={usuario.map(user=>user.cep)}
              onChange={e => setCep(e.target.value)}
              />
            </div>
            <div className="input-group">
           
            <div className="input-block">
              <label htmlFor="uf">UF</label>
              <select
                                  defaultValue={uf}
                                  onChange={handleUfTypeChange}
                                  className="browser-default custom-select">
                                 <option defaultValue value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AM">AM</option>
                  <option value="AP">AP</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MG">MG</option>
                  <option value="MS">MS</option>
                  <option value="MT">MT</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="PR">PR</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="RS">RS</option>
                  <option value="SC">SC</option>
                  <option value="SE">SE</option>
                  <option value="SP">SP</option>
                  <option value="TO">TO</option>
                              </select>
            </div>
            <div className="input-block">
              <label htmlFor="sexo">Sexo</label>
              <select
                                  defaultValue={sexo}
                                  onChange={handleSexoTypeChange}
                                  className="browser-default custom-select">
                                 <option defaultValue value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  
                              </select>
            </div>
            <div className="input-block">
              <label htmlFor="perfil">Perfil</label>
              <select
                                  defaultValue={role}
                                  onChange={handlePerfilTypeChange}
                                  className="browser-default custom-select">
                                 <option defaultValue value="usuario">Usuário</option>
                  <option value="gerente">gerente</option>
                  <option value="admin">admin</option>
                              </select>
            </div>
              
          </div>
            <button type="submit">Salvar</button>
          </form>
            
        
      </aside>

    </div>
  );

}
export default Editar;
