import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import Tema from '../../../models/Tema';
import './CadastroTema.css';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { buscaId, post, put } from '../../../services/Service';


function CadastroTema() {

    function CadastroTema() {
        const history = useNavigate();
        const [token, setToken] = useLocalStorage('token');
      
        const {id} = useParams<{id: string}>()
      
        const [tema, setTema] = useState<Tema>({
          id: 0,
          descricao: '',
        });
      
        async function getTemaById(id: string) {
          await buscaId(`/temas/${id}`, setTema, {
            headers: {
              Authorization: token
            }
          })
        }

        function updatedTema(event: ChangeEvent<HTMLInputElement>) {
            setTema({
              ...tema,
              [event.target.name]: event.target.value,
            });
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
      
        async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
          event.preventDefault();
      
          if(id !== undefined){
            try {
              await put('/temas', tema, setTema, {
                headers: {
                  Authorization: token,
                },
              });
              alert('Tema atualizado com sucesso.');
              history('/temas')
            } catch (error) {
              alert('Deu ruim');
            }
          } else {
            try {
              await post('/temas', tema, setTema, {
                headers: {
                  Authorization: token,
                },
              });
              alert('Tema cadastrado com sucesso.');
              history('/temas')
            } catch (error) {
              alert('Erro, verifique os campos.');
            }
          }
        }
      
  
    return (
        <Container maxWidth="sm" className="topo">
             {/* if ternário */}
             {tema.id !== 0 ? 'Editar tema' : 'Cadastrar tema'}
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}
}

export default CadastroTema;