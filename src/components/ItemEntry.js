import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@mui/pickers";

import "date-fns";
// import DateFnsUtils from "@date-io/date-fns";

import "./ItemEntry.css";
import TextField from "@mui/material/TextField";

const ItemEntry = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [itemName, setItemName] = useState("");
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleSubmit = (event) => {
    props.onEnteringNewItem({
      itemName: itemName,
      expiDate: selectedDate.toDateString(),
    });
    handleClose();
    setItemName("");
    event.preventDefault();
  };

  return (
    <div className="item-entry">
      <Button variant="contained" disabled>Scan Item</Button>
      <Button variant="contained" onClick={handleOpen}>Manual Entry</Button>

      <Modal
        open={open}
        onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <Box className="box-style">
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" component="h2">
              Manual Entry
            </Typography>

            <TextField
              onChange={(event) => setItemName(event.target.value.trim())}
              id="standard-basic"
              label="Item Name"
              variant="standard"
            />

            <p>Expiration Date</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                minDate={new Date()}
                format="MM/dd/yyyy"
                views={['year', 'month', 'day']}
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
                renderInput={(params) => (
                  <TextField {...params} helperText={params?.inputProps?.placeholder} />
                )}
              />
            </LocalizationProvider>
            <div className="submit">
              <Button
                variant="contained"
                type="submit"
                disabled={itemName === "" ? true : false}
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ItemEntry;
