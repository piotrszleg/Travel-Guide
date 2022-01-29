import React, { useState } from 'react';
import Bar from "../components/Bar"
import FormButtons from "../components/FormButtons"
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import {useNavigate} from "react-router-dom";
import SEGMENT from "../data/Segment";
import {SUBGROUPS_ENDPOINT} from "../constants"

const COLORS = [{"name":"Czerwony"},{"name":"Zielony"},{"name":"Niebieski"},{"name":"Żółty"},{"name":"Czarny"}];

const SegmentInfoForm = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    error:"",
    subgroups:[]
  });

  React.useEffect(() => {
    // runs on location, i.e. route, change
    setState(state=>({...state, ...SEGMENT.info}));
    updateSubgroups(state.mount_subgr_name);
  }, [state.mount_subgr_name])

  async function updateSubgroups(mount_subgr_name) {
    const response = await fetch(SUBGROUPS_ENDPOINT+"?text="+encodeURI(mount_subgr_name), {
      method:"get", 
      headers: {
        'Content-Type': 'application/json',
      },
      mode:"cors",
    })
    const json = await response.json();
    
    setState(state=>({...state, subgroups:json, mount_subgr:null}));
  }

  function value(key) {
    return state[key] ?? "";
  }

  function onChange(key) {
    return function(event) {
      const newState = {
        ...state,
        [key]:event.target.value
      };
      setState(newState)
      SEGMENT.info = newState;
    }
  }
  // Punktacja odcinka nie może być większa od zera jeżeli nie można przejść w jego stronę.
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
      <TextField fullWidth  margin="normal" id="nazwa-pogrupy" label="Nazwa pogrupy górskiej" variant="outlined" value={value("mount_subgr_name")} onChange={onChange("mount_subgr_name")}  />
      <FormControl fullWidth>
        <InputLabel id="demo-controlled-open-select-label">Podgrupa górska</InputLabel>
      <Select
        value={value("mount_subgr")} onChange={onChange("mount_subgr")}
        label="Podgrupa górska"
        labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
      >
        {state.subgroups.map(e=><MenuItem key={e.number} value={e.number}>{e.name}</MenuItem>)}
      </Select>

      </FormControl>
      <FormControlLabel sx={{fontWeight:"bold"}} control={<Checkbox defaultChecked value={value("isOfficial")} onChange={onChange("isOfficial")}  />} label="Czy odcinek jest oficjalny" labelPlacement="end"   />
      <TextField  fullWidth  margin="normal" id="outlined-basic" label="Czas trwania" variant="outlined" value={value("duration")} onChange={onChange("duration")} />
      <TextField  fullWidth  margin="normal" id="outlined-basic" label="Długość" variant="outlined" value={value("length")} onChange={onChange("length")}  />
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Kolor szlaku</InputLabel>
    <Select
        value={value("color_trail")} onChange={onChange("color_trail")} 
        label="Kolor szlaku"
      >
        {COLORS.map((e, i)=><MenuItem value={i}>{e.name}</MenuItem>)}
      </Select>
</FormControl>

      <FormLabel error={true} sx={{paddingTop:2, fontWeight:"bold"}}>{state.error}</FormLabel>
    </Stack>

    <FormButtons onBack={()=>navigate("/segment_end_form")}/>
    </Box>
  );
};

export default SegmentInfoForm;