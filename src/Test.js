import React from "react";
import { useState } from "react";

export default function Test() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Click me!</button>
    </div>
  );
}
