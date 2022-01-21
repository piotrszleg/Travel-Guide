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

const SegmentInfoForm = () => {
  return (
    <Box sx={{height:'100%', width:"100%"}}>
    <Bar title="Nowy odcinek - informacje"></Bar>

    <Stack
      component="form"
      sx={{
        margin:3
      }}
      spacing={3}
    >
      <FormLabel sx={{marginTop:1, fontWeight:"bold"}}>Wpisz fragment nazwy podgrupy górskiej i wybierz jedną z podpowiedzi</FormLabel>
      <TextField fullWidth  margin="normal" id="nazwa-pogrupy" label="Nazwa pogrupy górskiej" variant="outlined" />
      <FormControlLabel sx={{fontWeight:"bold"}} control={<Checkbox defaultChecked />} label="Czy odcinek jest oficjalny" labelPlacement="end" />
      <TextField  fullWidth  margin="normal" id="outlined-basic" label="Czas trwania" variant="outlined" />
      <TextField  fullWidth  margin="normal" id="outlined-basic" label="Długość" variant="outlined" />
      <TextField  fullWidth  margin="normal" id="outlined-basic" label="Kolor szlaku" variant="outlined" />



      <FormLabel error={true} sx={{paddingTop:2, fontWeight:"bold"}}>Punktacja odcinka nie może być większa od zera jeżeli nie można przejść w jego stronę.</FormLabel>
    </Stack>

    <FormButtons/>
    </Box>
  );
};

export default SegmentInfoForm;