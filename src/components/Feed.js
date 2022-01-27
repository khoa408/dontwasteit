import React, { useState, useEffect } from "react";
import "./Feed.css";
import ItemEntry from "./ItemEntry";
// import testdata from "./testdata.json";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';

import { db } from "./../Firebase";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion
} from "firebase/firestore";

import {
  FormLabel,
  FormControlLabel,
  RadioGroup,
  FormControl,
  Radio,
  Divider,
  IconButton,
} from "@mui/material";

const Feed = () => {
  const [items, setItems] = useState(null);

  const itemsCollectionRef = collection(db, "items");
  const itemsDocRef = doc(db, "items/kdtYNoQ2rEJVtAC8gTgL");

  // const addDocument = async () => {
  //   const docRef = await updateDoc(itemsDocRef,{
  //     regions: arrayUnion("greater_virginia")
  // });
  // console.log("Document written with ID: ", docRef.id);
  // };

  // const addDocument = async () => {
  //   const docRef = await addDoc(itemsCollectionRef.doc("items"), {
  //     "items": [
  //       { "itemName": "apple", "expiDate": "01/01/2022" },
  //       { "itemName": "orange", "expiDate": "01/05/2022" },
  //       { "itemName": "banana", "expiDate": "01/03/2022" },
  //       { "itemName": "watermelon soda", "expiDate": "03/11/2022" },
  //       { "itemName": "zuccini oragnic from farmers market", "expiDate": "01/05/2022" },
  //       { "itemName": "kimchi", "expiDate": "01/03/2022" },
  //       { "itemName": "pickles in a jar", "expiDate": "11/01/2022" },
  //       { "itemName": "Idahoan Mashed Potatoes Original", "expiDate": "02/14/2022" },
  //       { "itemName": "Golden Sweet Yam", "expiDate": "01/31/2022" },
  //       { "itemName": "Lettuce Butter Bibb / Boston", "expiDate": "10/13/2022" },
  //       { "itemName": "O Organics Onion Sweet", "expiDate": "08/15/2022" },
  //       { "itemName": "avocado", "expiDate": "01/02/2022" },
  //       { "itemName": "Greek yogurt", "expiDate": "04/20/2022" }
  //     ]
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // };

  const addDocument = async () => {
    const docRef = await setDoc(doc(itemsCollectionRef,"items"), {
      "items": [
        { "itemName": "apple", "expiDate": "01/01/2022" },
        { "itemName": "orange", "expiDate": "01/05/2022" },
        { "itemName": "banana", "expiDate": "01/03/2022" },
        { "itemName": "watermelon soda", "expiDate": "03/11/2022" },
        { "itemName": "zuccini oragnic from farmers market", "expiDate": "01/05/2022" },
        { "itemName": "kimchi", "expiDate": "01/03/2022" },
        { "itemName": "pickles in a jar", "expiDate": "11/01/2022" },
        { "itemName": "Idahoan Mashed Potatoes Original", "expiDate": "02/14/2022" },
        { "itemName": "Golden Sweet Yam", "expiDate": "01/31/2022" },
        { "itemName": "Lettuce Butter Bibb / Boston", "expiDate": "10/13/2022" },
        { "itemName": "O Organics Onion Sweet", "expiDate": "08/15/2022" },
        { "itemName": "avocado", "expiDate": "01/02/2022" },
        { "itemName": "Greek yogurt", "expiDate": "04/20/2022" }
      ]
    });
    // console.log("Document written with ID: ", docRef.id);
  };

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
    newItem.itemId = items.length;
    let sorted = sortByDate([...items, newItem]);
    setItems(sorted);

    const docRef = await setDoc(doc(itemsCollectionRef,"items"), {
      "items": [...items, newItem]
    });
    // console.log("Document written with ID: ", docRef.id);
  };

  const handleItemDeletion = (id) => {
    const newItemList = items.filter((item) => item.itemId !== id);
    setItems(newItemList);
  };

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsCollectionRef);
      console.log(data.docs[0].data());
      setItems(data.docs[0].data().items);

      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getItems();
  }, []);

  // useEffect(() => {
  //   addDoc();

  //   const itemsDocumentRef = doc(db, "items", "items");
  //   const docSnap = getDoc(itemsDocumentRef);
  //   console.log("Document data:", docSnap.data());
  //   if (docSnap.exists()) {

  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
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
        className="item-date-list"
      >
        {items && items.map((item, index) => (
          <>
            <ListItem key={`item-${index}`} secondaryAction={
              <IconButton onClick={() => handleItemDeletion(item.itemId)} edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={`${item.itemName}`} />
              <ListItemText className="expi-date" primary={`${new Date(item.expiDate).toDateString()}`} />

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
