import * as React from 'react';
import Bar from "../components/Bar"
import FormButtons from "../components/FormButtons"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';

const Map = () => {
  return (
    <Box sx={{height:'100%', width:"100%", overflow:'hidden'}}>
    <Bar title="Kieruj się na południe"></Bar>
    <img style={{opacity:0.85, height:'100%', position:'absolute', top:0, zIndex:-100}} src="map.png"></img>
    </Box>
  );
};

export default Map;