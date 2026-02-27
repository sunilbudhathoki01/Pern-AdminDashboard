import React, { useEffect, useState } from "react";
import Car from "./components/Car";

const App = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    fetch("/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(cars);
  return (
    <div>
      <ul>
        {cars.map((car) => (
          <Car key={car.id} {...car} />
        ))}
      </ul>
    </div>
  );
};

export default App;
