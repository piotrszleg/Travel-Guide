import * as React from 'react';
import Bar from "../components/Bar"
import Confirmation from "../components/Confirmation"
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Closeable } from "../utils"
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const style = {
  position: 'absolute',
  left: '50vw',
  top: '50vh',
  transform: 'translate(-50%, -50%)',
  width: "78vw",
  bgcolor: '#75B043',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: "38px 30px 22px"
};

const DETAILS = index => ({
    firstComment: "Góry Stołowe stanowią centralną część niecki śródsudeckiej. Największy obszar w Górach Stołowych zajmują górnokredowe skały osadowe niecki śródsudeckiej, w północno-zachodniej części leżące prawie poziomo, w północno-wschodniej zapadające lekko ku południowi.",
    lastComment: "Są to nieliczne w Europie góry płytowe wypiętrzone ponad 30 milionów lat temu. To skalne labirynty, tajemnicze i fantazyjne formacje skalne, których nigdzie indziej w Polsce nie zobaczymy.",
    image: "gory-stolowe.jpg",
  })

class Details extends Closeable {

  render() {
    var details = null;
    if (this.state.open) {
      try {
        // await (await fetch("details/"+encodeURIComponent(this.props.name))).json();
      } catch (e) { }
      details = DETAILS(this.props.name);
    }
    // moved buttons to the right for the thumb access
    return (
      <Modal
        open={this.state.open}
        onClose={this.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4"
            style={{ paddingBottom: "1rem", color: 'white', }}
          >{this.props.name}</Typography>
          <img style={{ width: "100%", paddingBottom: "1rem" }} src={details?.image} alt={this.props.name}></img>
          <Typography id="modal-modal-title" variant="body" style={{ color: 'white' }}>
            {details?.firstComment}
          </Typography>
          <div style={{ height: "1rem" }}></div>
          <Typography id="modal-modal-title" variant="body" style={{ color: 'white', fontStyle: 'italic' }}>
            {details?.lastComment}
          </Typography>
          <div style={{ height: "2rem" }}></div>
          <Button
            onClick={() => null}
            sx={{
              color: 'white',
              float: "right"
            }}
          >
            Więcej
          </Button>
          <Button
            onClick={() => {
              if (this.props.onAction) this.props.onAction();
              this.close();
            }}
            sx={{
              color: 'white',
              float: "right"
            }}
          >
            {this.props.inRoute ?  "Usuń z trasy" : "Dodaj do trasy"}
          </Button>
        </Box>
      </Modal>
    );
  }
}

const LOCATIONS = [
  {
    x: 100,
    y: 100,
    inRoute: true,
    name: "Góry stołowe"
  },
  {
    x: 130,
    y: 475,
    inRoute: true,
    name: "Góry stołowe III"
  },
  {
    x: 220,
    y: 250,
    inRoute: true,
    name: "Góry stołowe II"
  },
  
  {
    x: 330,
    y: 100,
    inRoute: false,
    name: "Góry stołowe IV"
  },
  {
    x: 60,
    y: 700,
    inRoute: false,
    name: "Góry stołowe V"
  },
  {
    x: 300,
    y: 730,
    inRoute: false,
    name: "Góry stołowe VI"
  },
]

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.details = React.createRef();
    this.state = { selected: 0, locations:LOCATIONS };
  }
  selectedLocation(){
    return this.state.locations[this.state.selected];
  }
  switchInRoute() {
    this.setState(state=>({
      ...state,
      locations:state.locations.map(
        (l, i)=>i===state.selected 
          ? {...l, inRoute:!l.inRoute} 
          : l)
    }))
  }
  render() {
    return (
      <Box sx={{ height: '100%', width: "100%" }}>
        <img style={{ height: '100%', position: 'absolute', top: 0, zIndex: -100, filter:"saturate(85%) brightness(80%)" }} src="map3.png" alt=""></img>
        <Bar title="Kieruj się na południe"></Bar>
        <Details name={this.selectedLocation().name} 
          inRoute={this.selectedLocation().inRoute} 
          ref={this.details} onAction={() => {
            this.switchInRoute();
            this.modal.current?.open();
        }} ></Details>

        <Confirmation ref={this.modal}
          message=
          {this.selectedLocation().inRoute 
          ? `Rozszerzono obecną trasę o "${this.selectedLocation().name}".`
          :`Skrócono obecną trasę o "${this.selectedLocation().name}".`  
          }/>

        {this.state.locations.map((l, i) =>
          <IconButton
            key={i}
            size="large"
            aria-label="close"
            aria-haspopup="true"
            onClick={() => {
              this.setState({ selected: i });
              this.details.current?.open()
            }}
            sx={{
              color: "white",
              opacity : l.inRoute ? 1 : 0.5,
              position: "absolute",
              left: l.x,
              top: l.y
            }}
          >
            <LocationOnIcon fontSize="large" />
          </IconButton>
        )}
      </Box>);
  }
};

export default Map;