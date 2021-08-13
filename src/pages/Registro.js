import React, { Component } from 'react'
import axios from "../api";
import history from '../history'
import teste from '../imagens/1a519878410464.png';
import '../App.css'
import {Link} from 'react-router-dom';
import dotenv from 'dotenv'
dotenv.config();




class Registro extends Component {    
    
    constructor() {
        super()
        this.state = { 
            nome:'',           
            email: '',
            senha: '',
            confirmaSenha:'',
            message:'',
            cadastrado:'',
            url: process.env.BACKURL       
        } 
    } 
    
    handleNomeChange = event => {
        this.setState({
            nome: event.target.value
        })
    }
    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }
    handleSenhaChange = event => {
        this.setState({
            senha: event.target.value
        })
    }
    handleConfirmaSenhaChange = event => {
        this.setState({
            confirmaSenha: event.target.value
        })
    }

        
    handleSubmit = async () => {         
        const data = await axios.post('https://backpl.herokuapp.com/register/',{
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            confirmaSenha: this.state.confirmaSenha            
        });
        
        if(data.data.erro){
           return this.setState({message:data.data.erro})
        }   
        if(data.data.userinfo.id){
            this.setState({cadastrado:data.data.userinfo.id,message:data.data.message})
            history.push('/login');
        } 
    }

    
    render() {
        return (
            
            <>          
                <div style={{ textAlign: 'center', justifyContent: 'left', width: "100%", marginTop: 20, height: 350 }}>
                        
                        
                        <div><img src={teste} alt='logo'/></div>
                        <div><h1>Cadastro</h1></div>


                        <div>
                            <label>Nome</label><br />
                            <input type='text'  value={this.state.nome} onChange={this.handleNomeChange}>
                            </input>
                        </div>                    
                        <div>
                            <label>E-mail</label><br />
                            <input value={this.state.email} onChange={this.handleEmailChange}></input>
                        </div>                       
                        <div>
                            <label>Senha</label><br />
                            <input type='password'  value={this.state.senha} onChange={this.handleSenhaChange}>
                            </input>
                        </div>
                        <div>
                            <label>Confirme sua senha</label><br />
                            <input type='password'  value={this.state.confirmaSenha} onChange={this.handleConfirmaSenhaChange}>
                            </input>
                        </div>


                        <br/>
                        <button onClick={this.handleSubmit}>Cadastrar</button>

                        {this.state.message && <span className="warn-span"><h1>{this.state.message}</h1></span>}
                        {this.state.cadastrado? <Link to="/" ><button>Login</button> </Link>:''}
                                      

                                            
                </div>
            </>
        )
    }
}

export default Registro;