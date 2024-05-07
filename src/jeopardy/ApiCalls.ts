import { apiUrl } from "./Apiurl";

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
