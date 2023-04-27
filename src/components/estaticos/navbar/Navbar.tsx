import React from "react";
import './Navbar.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/Actions";
import { toast } from "react-toastify";


function Navbar() {

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const history = useNavigate();
  const dispatch = useDispatch();

  function goLogout() {
    dispatch(addToken(''));
    toast.info('Usuário deslogado', {
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

  var navbarComponent;

  if(token !== '' ) {
    navbarComponent = 
    <AppBar position="static" style={{ backgroundColor: "#1d3557" }}>
        <Toolbar variant="dense" >
          <Box display={'flex'} justifyContent={'space-between'} width={'100%'} >
              <Box className="cursor">
                <Typography variant="h5" color="inherit">
                  BlogPessoal
                </Typography>
              </Box>

            <Link to={'/home'} className="text-decorator-none">
              <Box display="flex" justifyContent="start">
                <Box mx={1} className="cursor">
                  <Typography variant="h6" color="inherit">
                    home
                  </Typography>
                  </Box>
                </Box>
            </Link>

            <Link to={'/posts'} className="text-decorator-none">
            <Box mx={1} className="cursor">
              <Typography variant="h6" color="inherit">
                postagens
              </Typography>
            </Box>
            </Link>

            <Link to={'/temas'} className="text-decorator-none">
            <Box mx={1} className="cursor">
              <Typography variant="h6" color="inherit">
                temas
              </Typography>
            </Box>
            </Link>

            <Link to={'/formularioTema'} className="text-decorator-none"> 
            <Box mx={1} className="cursor">
              <Typography variant="h6" color="inherit">
                cadastrar tema
              </Typography>
            </Box>
            </Link>

              <Box mx={1} className="cursor" onClick={goLogout}>
                <Typography variant="h6" color="inherit">
                  logout
                </Typography>
              </Box>

          </Box>

      </Toolbar>
    </AppBar >
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;