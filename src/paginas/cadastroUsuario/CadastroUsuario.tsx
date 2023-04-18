import React , { useState, useEffect, ChangeEvent } from 'react';
import './CadastroUsuario.css';
import { Grid, TextField, Typography, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Usuario from '../../models/Usuario';
import { cadastroUsuario } from '../../services/Service';

function CadastroUsuario() {
    
    const history = useNavigate()

    const [usuario, setUsuario] = useState<Usuario>({
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: ''
    })
    
    const [usuarioResult, setUsuarioResult] = useState<Usuario>({
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: ''
    })
  
    const [confirmarSenha,setConfirmarSenha] = useState<String>("")
    
    function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>){
      setConfirmarSenha(event.target.value)
  }
  
    function updateModel(event: ChangeEvent<HTMLInputElement>) {
      setUsuario({
        ...usuario,
        [event.target.name]: event.target.value
      })
    }
  
    async function onSubmit(event: ChangeEvent<HTMLFormElement>){
      event.preventDefault()
      if(confirmarSenha === usuario.senha) {
        try {
          await cadastroUsuario('/usuarios/cadastrar', usuario, setUsuarioResult)
          alert('Usuário cadastrado com sucesso!')
        } catch (error) {
          alert('Dados inconsistentes. Verifique os campos.')
        }
      } else {
        alert('As senhas não coincidem.')
        setConfirmarSenha('')
        setUsuario({
          ...usuario,
          senha: ''
        })
      }
    }
  
    useEffect(() => {
      if(usuarioResult.id !== 0) {
        history('/login')
      }
    }, [usuarioResult])
  
    function back() {
      history('/login')
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className="textos2">Cadastre-se</Typography>
                        <TextField value={usuario.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='nome' label='Nome completo' variant='outlined' name='nome' margin='normal' fullWidth />
                        <TextField value={usuario.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' label='Usuário (endereço de e-mail)' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={usuario.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='Confirmar Senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <TextField value={usuario.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='foto' label='Foto (URL)' variant='outlined' name='foto' margin='normal' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login'>
                                <Button variant='contained' color='secondary' className='btnCancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'>
                                    Cadastrar
                                </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CadastroUsuario;