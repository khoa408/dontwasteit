import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import "date-fns";
import "./ItemEntry.css";
import TextField from "@mui/material/TextField";

const ItemEntry = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [itemName, setItemName] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setSelectedDate(null) };
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
    setSelectedDate(null);
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
        <form onSubmit={handleSubmit} className="box-style">
          <Typography variant="h6" component="h2">
            MANUAL ENTRY
          </Typography>

          <TextField
            onChange={(event) => setItemName(event.target.value.trim())}
            id="standard-basic"
            label="Item Name"
            variant="standard"
            sx={{ marginBottom: '20px' }}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns} className="date-picker">
            <DatePicker
              label="Expiration Date"
              minDate={new Date()}
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
      </Modal>
    </div>
  );
};

export default ItemEntry;
