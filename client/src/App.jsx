import React from "react";
import Car from "./components/Car";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [cars, setcars] = useState([]);
  useEffect(() => {
    fetch("/cars")
      .then((res) => res.json())
      .then((data) => setcars(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(cars);
  return (
    <div>
      <h1>welcome to the car store </h1>
      <ul>
        {cars.map((car) => (
          <Car key={car.id} {...car} />
        ))}
      </ul>
    </div>
  );
};

export default App;
