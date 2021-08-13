import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  /*
   const handleDeleteClick = async (contactid) => {  
    const idr = contactid;
    console.log(idr)
    console.log(user)

    const data = await axios.delete('http://localhost:3333/delprod/',{
      idr,user   
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
  };*/


  return (
    <tr>
      <td>{contact.id}</td>
      <td>{contact.nome}</td>
      <td>{contact.descricao}</td>
      <td>{contact.quantidade}</td>
      <td>{contact.valor}</td>      
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Editar
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Deletar
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
