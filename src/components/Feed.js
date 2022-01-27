import React, { useState, useEffect } from "react";
import "./Feed.css";
import ItemEntry from "./ItemEntry";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';

import { db } from "./../Firebase";
import {
  collection,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";

import {
  FormControlLabel,
  RadioGroup,
  FormControl,
  Radio,
  Divider,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";

const Feed = () => {
  const [items, setItems] = useState(null);
  const [location, setLocation] = useState("fridge");

  const docRef = doc(db, `${location}/${location}`);
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const sortByName = (objs) => {
    return [...objs].sort((a, b) => a.itemName.localeCompare(b.itemName));
  };

  const sortByDate = (objs) => {
    const custom_sort = (a, b) => {
      return new Date(a.expiDate).getTime() - new Date(b.expiDate).getTime();
    };
    return [...objs].sort(custom_sort);
  };

  const sortByNameHandler = () => {
    let sorted = sortByName(items);
    setItems(sorted);
  };

  const sortByDateHandler = () => {
    let sorted = sortByDate(items);
    setItems(sorted);
  };

  const handleNewItemEntry = async (newItem) => {
    let newItemsArray = [...items, newItem];
    let sortedItemsByDate = sortByDate(newItemsArray);
    setItems(sortedItemsByDate);
    updateFirebaseDoc([...items, newItem]);
  };

  const updateFirebaseDoc = async (payload) => {
    const collectionRef = collection(db, location);
    try {
      await setDoc(doc(collectionRef, location), {
        "items": payload
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleItemDeletion = (id) => {
    let newItemList = [...items];
    newItemList.splice(id, 1);
    setItems(newItemList);
    updateFirebaseDoc(newItemList);
  };

  const locationFilterHandler = (location) => {
    setLocation(location);
    getItems(location);
  }

  const getItems = async (location) => {
    const docRef = doc(db, `${location}/${location}`);
    const data = await getDoc(docRef);
    let sorted = sortByDate(data.data().items);
    setItems(sorted);
  };

  useEffect(() => {
    const getItems = async () => {
      const data = await getDoc(docRef);
      let sorted = sortByDate(data.data().items);
      setItems(sorted);
    };
    getItems();
  }, []);

  return (
    <div className="feed">
      <h2>Don't Waste It!</h2>
      <div className="filters">
        <div className="sorting-filter">
          <FormControl component="fieldset">
            <p>Sort By</p>
            <RadioGroup row defaultValue="date" name="radio-buttons-group">
              <FormControlLabel
                onChange={sortByNameHandler}
                value="item"
                control={<Radio />}
                label="Item"
              />
              <FormControlLabel
                onChange={sortByDateHandler}
                value="date"
                control={<Radio />}
                label="Date"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="location-filter">
          <p>Location</p>
          <Select sx={{ width: 160 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={location}
            defaultValue={"fridge"}
            onChange={(event) => locationFilterHandler(event.target.value)}
          >
            <MenuItem value={"fridge"}>fridge</MenuItem>
            <MenuItem value={"freezer"}>freezer</MenuItem>
            <MenuItem value={"top cabinet"}>top cabinet</MenuItem>
            <MenuItem value={"bottom cabinet"}>bottom cabinet</MenuItem>
          </Select>
        </div>
      </div>
      <List
        className="item-date-list"
      >
        {items && items.map((item, index) => (
          <>
            <ListItem key={`item-${index}`} secondaryAction={
              <IconButton onClick={() => handleItemDeletion(index)} edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={`${item.itemName}`} />
              <ListItemText className="expi-date" primary={`${weekday[new Date(item.expiDate).getDay()]} ${item.expiDate}`} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      <ItemEntry onEnteringNewItem={handleNewItemEntry} />
    </div>
  );
};

export default Feed;
