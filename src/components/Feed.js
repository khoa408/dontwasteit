import React, { useRef } from "react";
import "./Feed.css";
import ItemEntry from "./ItemEntry";
import testdata from "./testdata.json";

function Feed() {
  const bottomRef = useRef();

  const payload = testdata;
  const listItems = payload.items.map((item) => (
    <p key={item.itemName}>{item.itemName + " : " + item.expiDate}</p>
  ));

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="feed">
      <button type="button" onClick={scrollToBottom}>
        Scroll To Bottom
      </button>
      <h1>Item : Expiration</h1>
      <div>
        <p>{listItems}</p>
        <div ref={bottomRef} className="list-bottom"></div>
      </div>
      <ItemEntry />
    </div>
  );
}

export default Feed;
