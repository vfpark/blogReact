import React, { useState, useEffect, ChangeEvent } from 'react';
import './Login.css';
import { Grid, TextField, Typography, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/Service';
import { Box } from '@mui/material';
import UsuarioLogin from '../../models/UsuarioLogin';
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/Actions';

function Login() {

    let history = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UsuarioLogin>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: '',

        }
    )

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        if(token !== ''){
        dispatch(addToken(token))
        history('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            await login (`/usuarios/logar`, userLogin, setToken)

            alert('Usuário logado com sucesso!')
        }catch(error){
            alert('Dados do usuário são inconsistentes. Erro ao logar.')
        }
    }

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid alignItems='center' xs={6}>
            <Box paddingX={20}>
                <form onSubmit={onSubmit}>
                    <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className="textos1">Entrar</Typography>
                    <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                    <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                    <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>
                    </Box>
                </form>
                <Box display='flex' justifyContent='center' marginTop={2}>
                    <Box marginRight={1}>
                        <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                    </Box>
                    <Link to='/cadastrousuario'>
                    <Typography variant='subtitle1' gutterBottom align='center' className="textos1">Cadastre-se</Typography>
                    </Link>
                        
                </Box>
            </Box>
        </Grid>
        <Grid xs={6} className='imagem'>

        </Grid>
    </Grid>
  )
}

export default Login