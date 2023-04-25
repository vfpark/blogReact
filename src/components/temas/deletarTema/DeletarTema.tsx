import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import './DeletarTema.css';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import { buscaId, deleteId } from '../../../services/Service';


function DeletarTema() {
  
    const history = useNavigate();
    const [token, setToken] = useLocalStorage('token');
  
    const {id} = useParams<{id: string}>()
  
    const [tema, setTema] = useState<Tema>();
  
    async function getTemaById(id: string) {
      await buscaId(`/temas/${id}`, setTema, {
        headers: {
          Authorization: token
        }
      })
    }

    useEffect(() => {
      if (id !== undefined){
        getTemaById(id)
      }
    })
  
    useEffect(() => {
      if (token === '') {
        alert('Você precisa estar logado.');
        history('/login');
      } 
    }, [token]);

    function sim() {
      deleteId(`/temas/${id}`, {
        headers: {
          Authorization: token
        }
      })
      alert('Tema deletado com sucesso.')
      history('/temas')
    }
  
    function nao(){
      history('/temas')
    }
          
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography color="textSecondary">
                {tema?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
  }
export default DeletarTema;