import React, { useState } from "react";
import "./ItemEntry.css";

function ItemEntry() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div className="item-entry">
      <button className="button">Scan Item</button>
      <button className="button">Manual Entry</button>
    </div>
  );
}

export default ItemEntry;
