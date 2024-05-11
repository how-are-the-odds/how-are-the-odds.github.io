import { Dispatch, SetStateAction } from "react";
import { apiUrl } from "./Apiurl";
import Clue from "./Clue";

export const checkUserExists = (username: string) => {
  let data = new FormData();
  data.append("username", username);
  return fetch(apiUrl + "check_user", { method: "POST", body: data })
    .then((response) => response.json())
    .then((response) => {
      if (!response["user_exists"]) {
        createUser(username);
      }
    });
};

const createUser = (username: string) => {
  let data = new FormData();
  data.append("username", username);
  fetch(apiUrl + "create_user", { method: "POST", body: data })
    .then((response) => response.json())
    .then((response) => console.log(response["log"]));
};

export const getClue = (
  username: string,
  clueQueue: Clue[],
  setClueQueue: Dispatch<SetStateAction<Clue[]>>,
  maxClueQueueLength: number,
  beta: number
) => {
  let data = new FormData();
  data.append("username", username);
  data.append("beta", String(beta))
  console.log(beta)
  if (clueQueue.length >= maxClueQueueLength) {
    setClueQueue((clueQueue: Clue[]) => [...clueQueue.slice(1)]);
  }
  fetch(apiUrl + "user_clue", { method: "POST", body: data })
    .then((response) => response.json())
    .then((response: Clue) => {
      setClueQueue((clueQueue) => [...clueQueue, response]);
    });
};
