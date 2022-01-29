import React, { useState } from 'react';
import Bar from "../components/Bar"
import FormButtons from "../components/FormButtons"
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useLocation} from "react-router-dom";
import SEGMENT from "../data/Segment";

const SegmentEndForm = ({ start }) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  start = start ?? (params?.start === "true" ?? false);

  React.useEffect(() => {
    setState(state=>({error:state.error, ...(start ? SEGMENT.start : SEGMENT.end)}));
  }, [location, start])

  const [state, setState] = useState({
    error:""
  });

  function getFirstError() {
    const points = parseInt(state.points);
    if (!state.walkable && !isNaN(points) && points>0) {
      return "Punktacja odcinka nie może być większa od zera jeżeli nie można przejść w jego stronę."
    }
  }

  function next(route){
    const error = getFirstError();
    if (error){
      setState({...state, error: error});
    } else {
      navigate(route);
    }
  }

  function value(key) {
    return state[key] ?? "";
  }

  function onChange(key) {
    return function(event) {
      const newState = {
        ...state,
        [key]:event.target.value
      }
      setState(newState)
      if (start) {
        SEGMENT.start = newState;
      } else {
        SEGMENT.end = newState;
      }
    }
  }
// Punktacja odcinka nie może być większa od zera jeżeli nie można przejść w jego stronę.
  return (
    <Box sx={{ height: '100%', width: "100%" }}>
      <Bar title={"Nowy odcinek - " + (start ? "Początek" : "Koniec")}></Bar>

      <Stack
        component="form"
        sx={{
          margin: 3
        }}
        spacing={3}
      >
        <FormLabel sx={{ marginTop: 1, fontWeight: "bold" }}>Wpisz fragment nazwy lokacji i wybierz jedną z podpowiedzi</FormLabel>
        <TextField fullWidth margin="normal" id="nazwa-lokacji" label="Nazwa lokacji" variant="outlined" value={value("location")} onChange={onChange("location")}  />
        <FormControlLabel sx={{ fontWeight: "bold" }} control={<Checkbox defaultChecked value={value("walkable")} onChange={onChange("walkable")}  />} label="Czy mozna przejść odcinkiem w stronę lokacji" labelPlacement="start" />
        <TextField fullWidth margin="normal" id="outlined-basic" label="Punktacja za przejście w stronę lokacji" variant="outlined" defaultChecked value={value("points")} onChange={onChange("points")} />
        <FormLabel error={true} sx={{ paddingTop: 2, fontWeight: "bold" }}>{state.error}</FormLabel>
      </Stack>
      {start ?
        <FormButtons onBack={() => navigate("/")} onNext={() => next("/segment_end_form")} />
        : <FormButtons onBack={() => navigate("/segment_start_form")} onNext={() => next("/segment_info_form")} />}
    </Box>
  );
};

export default SegmentEndForm;