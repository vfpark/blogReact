import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import Tema from '../../../models/Tema';
import './CadastroTema.css';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function CadastroTema() {

        const history = useNavigate();
        const token = useSelector<TokenState, TokenState["tokens"]>(
          (state) => state.tokens
        );
      
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
            toast.error('Você precisa estar logado.', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              theme: "colored",
              progress: undefined,
            });
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
              toast.success('Tema atualizado com sucesso.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              });
              history('/temas')
            } catch (error) {
              toast.error('Dados inconsistentes. Verifique os campos.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              });
            }
          } else {
            try {
              await post('/temas', tema, setTema, {
                headers: {
                  Authorization: token,
                },
              });
              toast.success('Tema cadastrado com sucesso.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              });
              history('/temas')
            } catch (error) {
              toast.error('Verifique os campos.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              });
            }
          }
        }
      
    return (
        <Container maxWidth="sm" className="topo">
             {/* if ternário */}
             {tema.id !== 0 ? 'Editar tema' : 'Cadastrar tema'}
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updatedTema(event)}
                  />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}


export default CadastroTema;