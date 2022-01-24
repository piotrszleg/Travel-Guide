import * as React from 'react';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Closeable, bind} from "../utils"

const style = {
    position: 'absolute',
    left: '50vw',
    top: '50vh',
    transform: 'translate(-50%, -50%)',
    width: "78vw",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding:"38px 30px 22px"
  };
  

export default class Confirmation extends Closeable {

    render() {
  return (
        <Modal
          open={this.state.open}
          onClose={this.close}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {this.props.message}
            </Typography>
          <div style={{height:"1rem"}}></div>
            <Button
              onClick={this.close}
              sx={{
                color: '#75B043',
                float: "right"
              }}
            >
              OK
            </Button>
          </Box>
        </Modal>);
    }
}