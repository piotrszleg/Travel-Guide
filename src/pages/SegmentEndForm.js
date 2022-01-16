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

const SegmentEndForm = () => {
  return (
    <Box sx={{height:'100%', width:"100%"}}>
    <Bar title="Nowy odcinek - początek"></Bar>

    <Stack
      component="form"
      sx={{
        margin:3
      }}
      spacing={3}
    >
      <FormLabel sx={{marginTop:1, fontWeight:"bold"}}>Wpisz fragment nazwy lokacji i wybierz jedną z podpowiedzi</FormLabel>
      <TextField fullWidth  margin="normal" id="nazwa-lokacji" label="Nazwa lokacji" variant="outlined" />
      <FormControlLabel sx={{fontWeight:"bold"}} control={<Checkbox defaultChecked />} label="Czy mozna przejść odcinkiem w stronę lokacji" labelPlacement="start" />
      <TextField  fullWidth  margin="normal" id="outlined-basic" label="Punktacja za przejście w stronę lokacji" variant="outlined" />
      <FormLabel error={true} sx={{paddingTop:2, fontWeight:"bold"}}>Punktacja odcinka nie może być większa od zera jeżeli nie można przejść w jego stronę.</FormLabel>
    </Stack>

    <FormButtons/>
    </Box>
  );
};

export default SegmentEndForm;