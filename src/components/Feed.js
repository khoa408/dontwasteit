import React, { useEffect, useRef, useState } from "react";
import "./Feed.css";
import ItemEntry from "./ItemEntry";
import testdata from "./testdata.json";
import sortByDate from "./../utils/FeedSort";
import {
  FormLabel,
  FormControlLabel,
  RadioGroup,
  FormControl,
  Radio,
} from "@mui/material";

const Feed = () => {
  const bottomRef = useRef();
  const [items, setItems] = useState(
    testdata.items.map((item) => ({
      itemName: item.itemName,
      expiDate: item.expiDate,
    }))
  );

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

  // const payload = testdata;
  // const listItems = payload.items.map((item) => (
  //   <p key={item.itemName}>{item.itemName + " : " + item.expiDate}</p>
  // ));

  const handleNewItemEntry = (newItem) => {
    let sorted = sortByDate([...items, newItem]);
    setItems(sorted);
  };

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    sortByDateHandler();
  }, []);

  return (
    <div className="feed">
      <button type="button" onClick={scrollToBottom}>
        Scroll To Bottom
      </button>
      <h3>Item : Expiration</h3>
      <FormControl component="fieldset">
        <FormLabel component="legend">Sort By</FormLabel>
        <RadioGroup row defaultValue="date" name="radio-buttons-group">
          <FormControlLabel
            onChange={sortByDateHandler}
            value="date"
            control={<Radio />}
            label="Date"
          />
          <FormControlLabel
            onChange={sortByNameHandler}
            value="item"
            control={<Radio />}
            label="Item"
          />
        </RadioGroup>
      </FormControl>
      <div>
        {items.map((item) => (
          <div className="food-date-list" ref={bottomRef}>
            <div className="item">{item.itemName}</div>
            <div className="expi-date">
              {new Date(item.expiDate).toDateString()}
            </div>
          </div>
        ))}
        {/* <p>{listItems}</p>
        <div ref={bottomRef} className="list-bottom"></div> */}
      </div>
      <ItemEntry onEnteringNewItem={handleNewItemEntry} />
    </div>
  );
};

export default Feed;
