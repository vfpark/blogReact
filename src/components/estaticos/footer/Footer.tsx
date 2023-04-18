import React from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import './Footer.css';

function Footer (){
    return (
         <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box display={'flex'} alignItems="center" className="box2" width={'100%'} justifyContent={'space-around'}>
          <Box >
            <Box
              paddingTop={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                className="box1"
              >
                Siga-nos nas redes sociais{' '}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <a
                href="https://www.facebook.com/generationbrasil"
                target="_blank"
              >
                <FacebookIcon className="redes" />
              </a>
              <a
                href="https://www.instagram.com/generationbrasil/"
                target="_blank"
              >
                <InstagramIcon className="redes" />
              </a>
              <a
                href="https://www.linkedin.com/school/generationbrasil/"
                target="_blank"
              >
                <LinkedInIcon className="redes" />
              </a>
            </Box>
          </Box>
          <Box >
            <Box paddingTop={1}>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                className="textos"
                component={'span'}
              >
                © 2023 Copyright: {' '}
              </Typography>
            
              <a target="_blank" href="https://brasil.generation.org">
                <Typography
                  variant="h5"
                  gutterBottom
                  className="textos"
                  align="center"
                  component={'span'}
                >
                  brasil.generation.org
                </Typography>
              </a>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
    );
}

export default Footer;