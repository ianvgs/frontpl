import React, { Component } from 'react'
import axios from "../api";
import history from '../history'
import teste from '../imagens/1a519878410464.png';
import {Link, Redirect} from 'react-router-dom';
import '../App.css'





class Login extends Component { 
        
    
    constructor() {
        super()
        this.state = {            
            email: '',
            senha: '',
            auth:'',
            message:'',
            token:'',
            userId:''
        } 
    } 
    
    componentDidMount() {
        const token = localStorage.getItem('token') === 'true';
        const userId = token ? localStorage.getItem('userId') : '';
        this.setState({ token, userId });
    }        

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }
    handlePasswordChange = event => {
        this.setState({
            senha: event.target.value
        })
    }

    handleSubmit = async () => { 
        const data = await axios.post('http://localhost:3333/login/',{
            email: this.state.email,
            senha:this.state.senha
        })    
        if(data.data.erro){
            return    this.setState({message:data.data.erro})
        }  
                
        this.setState({token:data.data.token})
        this.setState({userId:data.data.userId})
        //console.log(this.state.token)
        //console.log(this.state.userId)
        sessionStorage.setItem('token', JSON.stringify(this.state.token));
        sessionStorage.setItem('userId', JSON.stringify(this.state.userId));
        axios.defaults.headers.Authorization = `Bearer ${this.state.token}`;  
        this.setState({auth:'authenticated'});
        
    }


    handleSubmits = async () => {  
        history.push('/register');
    }    
    render() {
        return (
            <div style={{ textAlign: 'center', justifyContent: 'left', width: "100%", marginTop: 100, height: 350 }}>
                <div><h1>LOGIN</h1></div>
                
                <div><img src={teste} alt='logo'/></div>


                <div >

                    
                        <div>
                            <label>E-mail</label><br />
                            <input value={this.state.email} onChange={this.handleEmailChange}></input>
                        </div>
                        <div>
                            <label>Senha</label><br />
                            <input type='password'  value={this.state.senha} onChange={this.handlePasswordChange}>
                            </input>
                        </div>
                        <br/>
                        <button onClick={this.handleSubmit}>Login</button>

                        <Link to="/register" ><button>Registrar-se</button> </Link>                        
                        {this.state.message && <span className="warn-span"><h1>{this.state.message}</h1></span>}
                        {this.state.auth && <Redirect to='/admin'/>}
                                      

                                            
                </div>
            </div>
        )
    }
}

export default Login;