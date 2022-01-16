import * as React from 'react';
import Bar from "../components/Bar"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';

const FormButtons = ({nextText}) => {
    nextText = nextText ?? "Dalej"
  return (
    <>
    <Button variant="outlined"
                onClick={()=>null}
                sx={{ position: 'fixed', color: '#75B043', borderColor: '#75B043',
                bottom: 20, left:25, display: 'block' }}
              >
                Powrót
    </Button>
    <Button
    variant="contained"
                onClick={()=>null}
                sx={{ position: 'fixed',
                background: '#75B043',
                bottom: 20, right:25, display: 'block' }}
              >
                {nextText}
    </Button>
    </>
  );
};

export default FormButtons;