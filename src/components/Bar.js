import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Cancel from '@mui/icons-material/Cancel';
import Container from '@mui/material/Container';


const Bar = ({title}) => {
  title = title ?? "Title";
  return (
    <AppBar position="static" style={{ background: '#75B043', padding:3, margin:2, borderRadius:10}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

            <IconButton
              size="large"
              aria-label="close"
              aria-haspopup="true"
              onClick={()=>null}
              color="inherit"
            >
              <Cancel />
            </IconButton>
          <Typography variant="h5" component="div" sx={{ paddingTop:1, flexGrow: 0.99, fontWeight:"bold", display: "flex" }}>
          {title}
          </Typography>       
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Bar;