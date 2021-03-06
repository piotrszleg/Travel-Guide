import React from 'react';
import Bar from "../components/Bar"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const Index = (props) => {
    const navigate = useNavigate();
    return <Box sx={{ height: '100%', width: "100%" }}>
        <Bar title="Przewodnik górski"></Bar>

        <Stack
            sx={{
                margin: 3
            }}
            spacing={3}
        >
        <img style={{ width: '100%', filter:"saturate(85%) brightness(90%)" }} src="tatry.jpg" alt=""></img>
            <Typography variant="h5" sx={{fontWeight:"bold"}} >Zaimplementowane strony:</Typography>
                {[
                    ["Formularz lokacji", "location_form"],
                    ["Formularz odcinka", "segment_start_form"],
                    ["Weryfikacja zawartości", "verify/4"],
                    ["Edycja trasy na mapie ", "map"],
                ].map(([ name, route ]) =>
                <Stack key={name} direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="h5">{name}</Typography>
                        <Button variant="contained"
                            onClick={() => navigate(route)}
                            sx={{
                                bottom: 5, float:"right",
                                background: '#75B043', borderColor: '#75B043', display: 'block'
                            }}
                        >
                            Pokaż
                        </Button>
            </Stack>)
                }
        </Stack>


    </Box>;
}

export default Index;