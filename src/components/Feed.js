import React, { useState } from "react";
import "./Feed.css";
import ItemEntry from "./ItemEntry";
import testdata from "./testdata.json";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {
  FormLabel,
  FormControlLabel,
  RadioGroup,
  FormControl,
  Radio,
  Divider,
} from "@mui/material";

const Feed = () => {
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

  const handleNewItemEntry = (newItem) => {
    let sorted = sortByDate([...items, newItem]);
    setItems(sorted);
  };

  // useEffect(() => {
  //   sortByDateHandler();
  // }, []);

  return (
    <div className="feed">
      <h3>Item : Expiration</h3>
      <FormControl component="fieldset">
        <FormLabel component="legend">Sort By</FormLabel>
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
      <List
        sx={{
          width: '100%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 420,
          '& ul': { padding: 0 }
        }}  
      >
        {items.map((item) => (
          <li key={`section-${item}`}>
            <ul>
              <ListItem key={`item-${item}`}>
                <ListItemText className="item" primary={`${item.itemName}`} />
                <ListItemText className="expi-date" primary={`${new Date(item.expiDate).toDateString()}`} />
                
              </ListItem>
              <Divider />
            </ul>
          </li>

        ))}
      </List>
      <ItemEntry onEnteringNewItem={handleNewItemEntry} />
    </div>
  );
};

export default Feed;
