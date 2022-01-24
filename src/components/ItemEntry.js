import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="item-entry">
      <button className="button">Scan Item</button>

      <button onClick={handleOpen} className="button">
        Manual Entry
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Manual Entry
            </Typography>

            <TextField
              onChange={(event) => setItemName(event.target.value.trim())}
              id="standard-basic"
              label="Item Name"
              variant="standard"
            />

            <p>Expiration Date</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                clearable
                value={selectedDate}
                placeholder="01/01/2001"
                onChange={(date) => handleDateChange(date)}
                minDate={new Date()}
                format="MM/dd/yyyy"
              />
            </MuiPickersUtilsProvider>
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
