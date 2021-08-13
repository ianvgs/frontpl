import { Link } from "react-router-dom";
import React, { useState, Fragment } from "react";
import "./App.css";
import ReadOnlyRow from "./CompForm/ReadOnlyRow";
import EditableRow from "./CompForm/EditableRow";
import axios from 'axios'



const App =  () => { 
  //////////////DEFINICOES DE VALORES/SETVALORES
  const token = sessionStorage.getItem('token');
  const token1 = JSON.parse(token)
  axios.defaults.headers.Authorization = `Bearer ${token1}`; 
  const user = sessionStorage.getItem('userId');
  
  const [produtos, setProdutos] = useState('');  
  const [message, setMessage]=useState('');  
  const [editContactId, setEditContactId] = useState(null);  
  const [addFormData, setAddFormData] = useState({
    id:"",
    nome: "",
    descricao: "",
    quantidade: "",
    valor: ""
    
  });
  const [editFormData, setEditFormData] = useState({
    id:"",
    nome: "",
    descricao: "",
    quantidade: "",
    valor: ""    
  });
  //////////////////////////////////////////////////////////////////////
  /////////////DEFINICOES DE METODOS/////////// 
  //////////////////////////////////////////////////////////////////////
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };    
    newFormData[fieldName] = fieldValue;     
    setAddFormData(newFormData);    
  };

  const handleAddFormSubmit = async (event) => {
    event.preventDefault(); 
    const newProduto = {
      id: addFormData.id,
      nome: addFormData.nome,
      descricao: addFormData.descricao,
      quantidade: addFormData.quantidade,
      valor: addFormData.valor,
      userId:user
    }
    const data = await axios.post('http://localhost:3333/cadprod/',{
      newProduto       
    }).then(()=>{
        setMessage(data.data.message)   
        axios.get(`http://localhost:3333/todos/${user}`).then((update)=>{
        const resultados = (update.data.resultados)
        setProdutos(resultados) 
        }).catch((err)=> console.log(err)) 
    }).catch((data)=>{
      setMessage('Os campos nome e descrição devem conter somente letras, e o campo quantidade e valor apenas numeros inteiros.')   
    })    
  };
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();      
    const editedContact = {
      id: editFormData.id,
      nome: editFormData.nome,
      descricao: editFormData.descricao,
      quantidade: editFormData.quantidade,
      valor: editFormData.valor,
      userId:user
    };    
    const data = await axios.patch('http://localhost:3333/altprod/',{
      editedContact      
    }); 
    if(data.data.erro){
      return setMessage(data.data.erro)
    } else{
    console.log('ta consolano o sucesso.')
    setMessage(data.data.message)
    await axios.get(`http://localhost:3333/todos/${user}`).then((update)=>{
      const resultados = (update.data.resultados)
      setProdutos(resultados) 
    }).catch((err)=> console.log(err))   
    setEditContactId(null);
    }
    
  };
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  const handleEditClick = (event, produtos) => {
    event.preventDefault(); 
    setEditContactId(produtos.id);
    const formValues = {
      id: editFormData.id,
      nome: editFormData.nome,
      descricao: editFormData.descricao,
      quantidade: editFormData.quantidade,
      valor: editFormData.valor      
    };
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  const handleDeleteClick = async (contactid) => { 
    const idr = contactid;  
    
    const data = await axios.post('http://localhost:3333/delprod/',{
      id:idr,userId:user
    });     
    if(data.data.erro){
      return setMessage(data.data.erro)
    } else{
    console.log('ta consolano o sucesso.')
    setMessage(data.data.message)

    await axios.get(`http://localhost:3333/todos/${user}`).then((update)=>{
      const resultados = (update.data.resultados)
      setProdutos(resultados) 
    }).catch((err)=> console.log(err)) 
  }      

  
  };
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  const busca = async () => {    
    const token = sessionStorage.getItem('token');
    const token1 = await JSON.parse(token)
    axios.defaults.headers.Authorization = `Bearer ${token1}`;
    const id = sessionStorage.getItem('userId');
    await axios.get(`http://localhost:3333/todos/${id}`).then((data)=>{
      const resultados = (data.data.resultados) 
      if(!data.data.resultados){
        setMessage('Você não possui produtos cadastrados, user o formulario acima para cadastramento.')
      }  
      if(produtos){ 
        /* 
        produtos.forEach(function(elem, index) {
          //console.log("elem: ", elem)
          resultados.push(elem); 
          console.log(resultados)      
        })*/
      }
      setProdutos(resultados)
    }).catch((err)=>{
      setMessage('Houve erro na requisição')
    })   
     
  }

  //////////////////

  const sair = async () => { 

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');

  }
   
  

  return (
    <div className="app-container">

      <Link to='/'><button onClick={sair} >      Sair
      
      </button></Link>      

      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {produtos && produtos.map((contact, i) => (
                <Fragment key={i}>
                {editContactId === contact.id ? ( <EditableRow  editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}
                />
                ) : (
                  <ReadOnlyRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>
                )}                
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>


      

      <h2>ADICIONAR PRODUTO</h2>
      <form >
        <input
          type="text"
          name="nome"
          required="required"
          placeholder="Nome do produto"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="descricao"
          required="required"
          placeholder="Descrição do produto"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="quantidade"
          required="required"
          placeholder="Quantidade"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="valor"
          required="required"
          placeholder="Valor"
          onChange={handleAddFormChange}
        />
        <button onClick={handleAddFormSubmit}>Add</button>
        <button onClick={busca} >Listar todos produtos</button>
      </form>

      {message && <h1 style={{color:'red'}}>{message}</h1>}


      
    </div>
  );
};

export default App;
