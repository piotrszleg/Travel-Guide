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
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  left: '50vw',
  top: '50vh',
  transform: 'translate(-50%, -50%)',
  width: "78vw",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Map = () => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box sx={{ height: '100%', width: "100%" }}>
        <img style={{ opacity: 0.85, height: '100%', position: 'absolute', top: 0, zIndex: -100 }} src="map.png"></img>
        <Bar title="Kieruj się na południe"></Bar>

        <Button onClick={handleOpen}>Open modal</Button>


        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">Góry Stołowe</Typography>
            <Typography id="modal-modal-title" variant="body">              Obecna trasa nie może być rozszerzona o Góry Stołowe. Spróbuj dodać do trasy bliższą lokację lub odcinek lub stworzyć nową trasę.
</Typography>
            <Button
              onClick={() => null}
              sx={{
                color: '#75B043',
                float: "right"
              }}
            >
              Więcej
            </Button>
            <Button
              onClick={() => null}
              sx={{
                color: '#75B043',
                float: "right"
              }}
            >
              Dodaj do trasy
            </Button>
          </Box>
        </Modal>





        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={false}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Obecna trasa nie może być rozszerzona o Góry Stołowe. Spróbuj dodać do trasy bliższą lokację lub odcinek lub stworzyć nową trasę.
            </Typography>
            <Button
              onClick={() => null}
              sx={{
                color: '#75B043',
                float: "right"
              }}
            >
              OK
            </Button>
          </Box>
        </Modal>
      </Box>
    </>);
};

export default Map;