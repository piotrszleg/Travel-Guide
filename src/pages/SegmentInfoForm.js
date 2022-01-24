import React, { Component, useState, useRef } from 'react';
import Bar from "../components/Bar"
import FormButtons from "../components/FormButtons"
import Button from '@mui/material/Button'
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
import {useNavigate, useLocation} from "react-router-dom";
import SEGMENT from "../data/Segment";

const COLORS = [{"name":"Czerwony"},{"name":"Zielony"},{"name":"Niebieski"},{"name":"Żółty"},{"name":"Czarny"}];

/*
// sql injection (comment in the location name)
const result = await fetch(API_URL+"locations", {method:"post", body: JSON.stringify({
  name:"Test#--//", hight:10, hight_max:10, longitude:10, latitude:10, mount_subgr:0: 
})});
// check for internal server error as a result of sql error
assert(result.status!=500);

// json injection (JSON special characters in the location name)
const result = await fetch(API_URL+"locations", {method:"post", body: JSON.stringify({
  name:"Test\"',}{][", hight:10, hight_max:10, longitude:10, latitude:10, mount_subgr:0: 
})});
// check for internal server error as a result of sql error
assert(result.status!=500);
*/


const SegmentInfoForm = () => {
  const navigate = useNavigate();

  const location = useLocation()

  React.useEffect(() => {
    // runs on location, i.e. route, change
    setState({...state, ...SEGMENT.info});
  }, [location])

  const [state, setState] = useState({
    error:""
  });

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
      <TextField fullWidth  margin="normal" id="nazwa-pogrupy" label="Nazwa pogrupy górskiej" variant="outlined" value={value("mount_subgr")} onChange={onChange("mount_subgr")}  />
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