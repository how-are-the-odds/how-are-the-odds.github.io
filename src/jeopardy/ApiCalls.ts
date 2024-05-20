import { Dispatch, SetStateAction } from "react";
import { API_URL } from "./ApiUrl";
import Clue from "./Clue";

export const checkUserExists = (username: string) => {
  let data = new FormData();
  data.append("username", username);
  return fetch(API_URL + "check_user", { method: "POST", body: data })
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
  fetch(API_URL + "create_user", { method: "POST", body: data })
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
  if (clueQueue.length >= maxClueQueueLength) {
    setClueQueue((clueQueue: Clue[]) => [...clueQueue.slice(1)]);
  }
  fetch(API_URL + "user_clue", { method: "POST", body: data })
    .then((response) => response.json())
    .then((response: Clue) => {
      setClueQueue((clueQueue) => [...clueQueue, response]);
    });
};

export const getUserInfo = (username: string) => {
  let data = new FormData();
  data.append("username", username);
  return fetch(API_URL + "user_info", { method: "POST", body: data })
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
}
