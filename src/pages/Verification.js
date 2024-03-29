import React, { useState, useRef } from 'react';
import Bar from "../components/Bar"
import FormButtons from "../components/FormButtons"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Confirmation from "../components/Confirmation"
import {CONTENT_ENDPOINT} from "../constants"

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Verification = props => {
  const navigate = useNavigate();
  const reject = props.reject;
  const id = useParams().id ?? props.id;
  const modal = useRef();
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState("");

  React.useEffect(() => {
    (async ()=> {
      const response = await fetch(CONTENT_ENDPOINT, {
        method:"get", 
        headers: {
          'Content-Type': 'application/json',
        },
        mode:"cors",
      })
      const json = await response.json();
      const content = JSON.parse(json[id].content);
      let contentAsText = "";
      for (let key in content) {
        let value = content[key];
        if (value===null) {
          value="<nie podano>";
        }
        key=key.replace("_", " ");
        contentAsText+=capitalizeFirstLetter(key)+": "+value+"\n";
      }

      setContent(contentAsText)
    })();
  }, [id])

  function onAccept() {
    fetch(CONTENT_ENDPOINT+"/accept/"+id, {
      method:"PATCH", 
      mode:"cors",
    })
    
    modal.current?.open(()=>navigate("/"));
  }

  function onReject(){
    fetch(CONTENT_ENDPOINT+"/discard/"+id, {
      method:"PATCH", 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({notes:notes}),
      mode:"cors",
    })
    modal.current?.open(()=>navigate("/"));
  }

  let modalMessage = "";
  if (reject) {
    if(notes!=="") {
      modalMessage = "Zawartość została odrzucona oraz uwagi zostały przesłane.";
    } else {
      modalMessage = "Zawartość została odrzucona bez uwag.";
    }
  } else {
    modalMessage = "Zawartość została zaakceptowana.";
  }

  return (
    <Box sx={{ height: '100%', width: "100%" }}>
      <Bar title={"Weryfikacja"+(reject?" - Uwagi":"")}></Bar>

      <Stack
        component="form"
        sx={{
          margin: 3
        }}
        spacing={3}
      >
        <Typography sx={{ marginTop: 1, fontWeight: "bold" }} variant="h6" component="pre" >
            {content}
            </Typography>
        
        {reject &&
        <TextField multiline
          data-testid="rejection-notes"
          onChange={e=>setNotes(e.target.value)} value={notes}
          rows={5} fullWidth margin="normal" id="outlined-basic" label="Wpisz uwagi ..." variant="outlined" />}
        </Stack>

        {reject ? 
        
        
        <FormButtons onBack={()=>navigate("/verify")} onNext={onReject} nextText="Odrzuć z uwagami"/>
        :(<>
          <Button variant="outlined"
                  onClick={()=>navigate("/reject/"+id)}
                  sx={{ position: 'fixed', color: 'red', borderColor: 'red',
                  bottom: 20, right:170, display: 'block' }}
                  data-testid="reject-button"
                >
                  Odrzuć
          </Button>
          <Button
          variant="contained"
          onClick={onAccept}
                      sx={{ position: 'fixed',
                      background: '#75B043',
                      bottom: 20, right:25, display: 'block' }}
                    >
                      Zaakceptuj
          </Button></>)
}
    <Confirmation ref={modal} 
        message={modalMessage}/>
    </Box>
  );
};

export default Verification;