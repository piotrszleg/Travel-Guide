import * as React from 'react';
import Button from '@mui/material/Button'

const FormButtons = ({nextText, onNext, onBack, hideBackButton}) => {
    nextText = nextText ?? "Dalej"
    onNext=onNext ?? (()=>null);
    onBack=onBack ?? (()=>null);
  return (
    <>
    {!hideBackButton &&
    <Button variant="outlined"
                onClick={onBack}
                sx={{ position: 'fixed', color: '#75B043', borderColor: '#75B043',
                bottom: 20, left:25, display: 'block' }}
              >
                Powrót
    </Button>}
    <Button
    variant="contained"
                onClick={onNext}
                sx={{ position: 'fixed',
                background: '#75B043',
                bottom: 20, right:25, display: 'block' }}
                data-testid="next-button"
              >
                {nextText}
    </Button>
    </>
  );
};

export default FormButtons;