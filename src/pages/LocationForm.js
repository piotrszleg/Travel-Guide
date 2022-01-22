import React, { Component, useState, useRef } from 'react';
import Bar from "../components/Bar"
import FormButtons from "../components/FormButtons"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import {useNavigate} from "react-router-dom";
import Confirmation from "../components/Confirmation"

const SUBGROUPS = [
  "Tatry Wysokie",
  "Tatry Niskie",
  "Karkonosze"
]

const LocationForm = (props) => {
  const navigate = useNavigate();
  const modal = useRef();

  const [state, setState] = useState({
    error:""
  });

  function value(key) {
    return state[key] ?? "";
  }

  function onChange(key) {
    return function(event) {
      setState({
        ...state,
        [key]:event.target.value
      })
    }
  }

  function getFirstError() {
    if (!state.name || state.name.length<3) {
      return "Nazwa lokacji powinna mieć więcej niż 3 litery.";
    }
    if (!state.mount_subgr || SUBGROUPS.indexOf(state.mount_subgr)===-1) {
      return "Wybierz grupę górską z listy."
    }
    const hight = parseInt(state.hight);
    if(isNaN(hight)) {
      return "Wysokość nad poziomem moża musi być liczbą."
    }
    if(hight<=0) {
      return "Wysokość musi być większa od zera."
    }

    const hight_max = parseInt(state.hight_max);
    if(isNaN(hight_max)) {
      return "Wysokość nad poziomem moża musi być liczbą."
    }
    if(hight_max<=0) {
      return "Wysokość musi być większa od zera."
    }
    if (hight_max<hight) {
      return "Wysokość maksymalna lokacji musi być większa od jej wysokości npm."
    }

    const longitude=parseInt(state.longitude);
    if(isNaN(longitude)) {
      return "Współrzędna X musi być liczbą."
    }
    const latitude=parseInt(state.latitude);
    if(isNaN(latitude)) {
      return "Współrzędna Y musi być liczbą."
    }
  }

  function post(){
    const error = getFirstError();
    if (error){
      setState({...state, error: error});
    } else {
      modal.current?.open();
      console.log("Posting ", JSON.stringify(state));
      setState({...state, error: ""});
      navigate("/");
    }
  }


    return <Box sx={{height:'100%', width:"100%"}}>
    <Bar title="Dodaj lokację"></Bar>

    <Stack
      component="form"
      sx={{
        margin:3
      }}
      spacing={3}
    >
      <TextField fullWidth  margin="normal" id="nazwa-pogrupy" label="Nazwa lokacji" variant="outlined" value={value("name")} onChange={onChange("name")} />
      <FormLabel sx={{marginTop:1, fontWeight:"bold"}}>Wpisz fragment nazwy podgrupy górskiej i wybierz jedną z podpowiedzi</FormLabel>
      <TextField fullWidth  margin="normal" id="nazwa-pogrupy" label="Nazwa pogrupy górskiej" variant="outlined" value={value("mount_subgr")} onChange={onChange("mount_subgr")} />

      <TextField  fullWidth  margin="normal" id="outlined-basic" label="Wysokość npm" variant="outlined" 
      value={value("hight")} onChange={onChange("hight")}   />
      <TextField  fullWidth  margin="normal" id="outlined-basic" label="Wysokość maksymalna lokacji" variant="outlined" 
      value={value("hight_max")} onChange={onChange("hight_max")}  />

      <Box>
      <TextField  margin="normal" sx={{width:"45%", m:"2.5%"}} id="outlined-basic" label="Współrzędna X" variant="outlined" 
      value={value("longitude")} onChange={onChange("longitude")} />
      <TextField  margin="normal" sx={{width:"45%", m:"2.5%"}} id="outlined-basic" label="Współrzędna Y" variant="outlined" 
      value={value("latitude")} onChange={onChange("latitude")}  />
      </Box>


      <FormLabel error={true} sx={{paddingTop:2, fontWeight:"bold"}}>{state.error}</FormLabel>
    </Stack>

    <FormButtons nextText="Dodaj lokację" onBack={()=>navigate("/segment_end_form/false")} onNext={post}/>
        <Confirmation ref={modal} 
        message="Lokacja została dodana pomyślnie."/>
    </Box>;
}

export default LocationForm;