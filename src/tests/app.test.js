import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LocationForm from "../pages/LocationForm"
import Verification from "../pages/Verification"
import Confirmation from "../components/Confirmation"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const EXPECTED_ERROR = "Nazwa lokacji powinna mieć więcej niż 3 litery.";

test('displays error when no location name was provided', async () => {
    render(<BrowserRouter>
        <Routes>
            <Route path="/" element={<LocationForm />} />
        </Routes>
    </BrowserRouter>)

    fireEvent.click(screen.getByTestId("next-button"))

    screen.getByText(EXPECTED_ERROR);
})

const MESSAGE="Test message";
const CONFIRMATION_TEXT = "OK";

test('confirmation dialog texts', async () => {
    const ref = React.createRef();

    render(<Confirmation ref={ref} message={MESSAGE} />)
    ref.current.open();

    const messageText = screen.getByText(MESSAGE)
    const confirmationButton = screen.getByText(CONFIRMATION_TEXT)

    fireEvent.click(confirmationButton)
})

test('allows to reject content with notes', async () => {
    const spy=jest.spyOn(global, "fetch");

    render(<BrowserRouter>
        <Routes>
            <Route path="/" element={<Verification id={4} />} />
            <Route path="/reject/:id" element={<Verification reject={true} />} />
        </Routes>
    </BrowserRouter>)

    fireEvent.click(screen.getByTestId("reject-button"))

    const notes = screen.getByRole("textbox")

    fireEvent.change(notes, {target: {value: 'Indecent name.'}})

    fireEvent.click(screen.getByTestId("next-button"))

    expect(spy).toHaveBeenCalled();
})

/*
// sql injection (comment in the location name)
const result = await fetch(API_URL+"locations", {method:"post", body: JSON.stringify({
  name:"Test#--//", hight:10, hight_max:10, longitude:10, latitude:10, mount_subgr:0: 
})});
// check for internal server error as a result of sql error
assert(result.status!=500);

// json injection (JSON special characters in the location name)
const result = await fetch(API_URL+"locations", {method:"post", body: JSON.stringify({
  name:"Test\"',}{][", hight:10, hight_max:10, longitude:10, latitude:10, mount_subgr:0: 
})});
// check for internal server error as a result of sql error
assert(result.status!=500);
*/