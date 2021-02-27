import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

const fetchRandomData = (pageNumber) => {
  return axios
    .get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getFullUserName = (userInfo) => {
  const {
    name: { first, last },
  } = userInfo;
  return `${first} ${last}`;
};

export default function TestApi() {
  const [userInfos, setUserInfos] = useState([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const fetchNextUser = useRef(() => {});

  fetchNextUser.current = () => {
    fetchRandomData(nextPageNumber).then((randomData) => {
      const newUserInfos = [...userInfos, ...randomData.results];
      setUserInfos(newUserInfos);
      setNextPageNumber(randomData.info.page + 1);
    });
  };

  useEffect(() => {
    fetchNextUser.current();
  }, []);

  return (
    <div>
      <button onClick={() => fetchNextUser.current()}>Fetch next user</button>
      {userInfos.map((userInfo, idx) => (
        <div key={idx}>
          <p>{getFullUserName(userInfo)}</p>
          <img src={userInfo.picture.thumbnail} alt="personal" />
        </div>
      ))}
    </div>
  );
}
