import React from "react";

const EditableRow = ({
  editFormData,  
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>        
        <input
          type="number"
          required="required"
          placeholder="ID"
          name="id"
          value={editFormData.id}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        
        <input
          type="text"
          required="required"
          placeholder="Nome do produto..."
          name="nome"
          value={editFormData.nome}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Descrição..."
          name="descricao"
          value={editFormData.descricao}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Quantidade..."
          name="quantidade"
          value={editFormData.quantidade}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="string"
          required="required"
          placeholder="Valor..."
          name="valor"
          value={editFormData.valor}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Salvar</button>
        <button type="button" onClick={handleCancelClick}>
          Cancelar
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
