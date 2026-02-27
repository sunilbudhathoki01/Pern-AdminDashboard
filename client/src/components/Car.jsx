import React from "react";

const Car = ({ make, name, model, year, price }) => {
  return (
    <div>
      <li>
        <p>make:{make}</p>
        <p>name:{name}</p>
        <p>model:{model}</p>
        <p>year:{year}</p>
        <p>price:{price}</p>
      </li>
    </div>
  );
};

export default Car;
