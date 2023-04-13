import React from "react";
import { Typography, Grid, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import './Home.css';

function Home() {
    return (
        <>
          <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: "grey"}}
      >
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20}  >
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="p"
              align="center"
              style={{ color: 'white', fontWeight: 'bold' }}
            >
              Seja bem vindo(a)!
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              component="h5"
              align="center"
              style={{ color: 'white', fontWeight: 'bold' }}
            >
              expresse aqui os seus pensamentos e opiniões!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}></Box>
            <Button
              variant="outlined"
              style={{
                borderColor: 'white',
                backgroundColor: "#1d3557",
                color: 'white',
              }}
            >
              Ver Postagens
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://ik.imagekit.io/vfpark/Studying-bro.png?updatedAt=1681406998908"
            alt=""
            className='fotoHome'
          />
        </Grid>
        <Grid xs={12} style={{ backgroundColor: 'white' }}></Grid>
      </Grid>
    </> 
    );
}

export default Home;