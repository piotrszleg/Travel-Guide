import React, { useState, useRef } from 'react';
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
import {useNavigate, useLocation} from "react-router-dom";
import SEGMENT, {segmentToPost} from "../data/Segment";
import {SUBGROUPS_ENDPOINT, SEGMENTS_ENDPOINT} from "../constants"
import Confirmation from "../components/Confirmation"

const COLORS = [{"name":"Czerwony"},{"name":"Zielony"},{"name":"Niebieski"},{"name":"Żółty"},{"name":"Czarny"}];

const SegmentInfoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const modal = useRef();

  const [state, setState] = useState({
    error:"",
    subgroups:[]
  });

  React.useEffect(() => {
    // runs on location, i.e. route, change
    setState(state=>({...state, ...SEGMENT.info, error:""}));
  }, [location])

  React.useEffect(() => {
    updateSubgroups(state.mount_subgr_name ?? "");
  }, [location, state.mount_subgr_name])

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

  function getFirstError() {
    if (!state.mount_subgr) {
      return "Wybierz podgrupę górską z listy";
    }
    if (!state.color_trail) {
      return "Wybierz kolor szlaku z listy";
    }
  }

  function value(key) {
    return state[key] ?? "";
  }

  function onChange(key, checkbox=false) {
    return function(event) {
      const newState = {
        ...state,
        [key]:checkbox ? event.target.checked : event.target.value
      };
      setState(newState)
      SEGMENT.info = newState;
    }
  }

  function post() {
    const error = getFirstError();
    if (error) {
      setState({ ...state, error: error });
    } else {
      modal.current?.open(()=>navigate("/"));

      const data = segmentToPost();
      console.log(data);

      fetch(SEGMENTS_ENDPOINT, {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), mode: "cors",
      })

      setState({ ...state, error: "" });
    }
  }

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
      <FormControlLabel sx={{fontWeight:"bold"}} control={<Checkbox defaultChecked value={value("isOfficial")} onChange={onChange("isOfficial", true)}  />} label="Czy odcinek jest oficjalny" labelPlacement="end"   />
      <TextField  fullWidth  margin="normal" id="outlined-basic" label="Czas trwania" variant="outlined" value={value("duration")} onChange={onChange("duration")} />
      <TextField  fullWidth  margin="normal" id="outlined-basic" label="Długość" variant="outlined" value={value("length")} onChange={onChange("length")}  />
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Kolor szlaku</InputLabel>
    <Select
        value={value("color_trail")} onChange={onChange("color_trail")} 
        label="Kolor szlaku"
      >
        {COLORS.map((e, i)=><MenuItem key={i} value={i}>{e.name}</MenuItem>)}
      </Select>
</FormControl>

      <FormLabel error={true} sx={{paddingTop:2, fontWeight:"bold"}}>{state.error}</FormLabel>
    </Stack>

    <FormButtons onBack={()=>navigate("/segment_end_form")} onNext={post}/>
    <Confirmation ref={modal}
    message="Odcinek został dodany pomyślnie." />
    </Box>
  );
};

export default SegmentInfoForm;