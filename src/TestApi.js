import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const fetchRandomData = () => {
  return axios
    .get("https://randomuser.me/api")
    .then(({ data }) => {
      return JSON.stringify(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
fetchRandomData();
export default function TestApi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRandomData().then((randomData) => {
      setData(randomData);
      console.log(data);
    });
  }, []);

  return <div>{data}</div>;
}
