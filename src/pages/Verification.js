import * as React from 'react';
import Bar from "../components/Bar"
import FormButtons from "../components/FormButtons"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const Verification = ({ reject }) => {
  const navigate = useNavigate();
  const params = useParams();
  reject = reject ?? (params?.reject === "true" ?? false);

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
        <Typography sx={{ marginTop: 1, fontWeight: "bold" }} variant="h6" >
            Treść:<br/>
            Pogrupa: Tatry Zachodnie<br/>
            Wysokość: 1946<br/>
            Wysokość Maksymalna: -<br/>
            Długość: 19<br/>
            Szerokość: 46
            </Typography>
        
        {reject &&
        <TextField multiline
          rows={5} fullWidth margin="normal" id="outlined-basic" label="Wpisz uwagi ..." variant="outlined" />}
        </Stack>

        {reject ? 
        
        
        <FormButtons onBack={()=>navigate("/verify")} nextText="Odrzuć z uwagami"/>
        :(<>
          <Button variant="outlined"
                  onClick={()=>navigate("/reject")}
                  sx={{ position: 'fixed', color: 'red', borderColor: 'red',
                  bottom: 20, right:170, display: 'block' }}
                >
                  Odrzuć
          </Button>
          <Button
          variant="contained"
          onClick={()=>null}
                      sx={{ position: 'fixed',
                      background: '#75B043',
                      bottom: 20, right:25, display: 'block' }}
                    >
                      Zaakceptuj
          </Button></>)
}
    </Box>
  );
};

export default Verification;