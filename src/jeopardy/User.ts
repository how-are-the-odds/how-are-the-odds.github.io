import { getUserInfo } from "./ApiCalls";

class User {
  username: string = "";
  hitRate: number | undefined;
  averagePointsEarned: number | undefined;
  beta: number = 20;

  constructor(username: string) {
    this.username = username;
  }

  getDataFromServer() {
    getUserInfo(this.username).then((response) => {
      this.hitRate = response["hit_rate"];
      this.averagePointsEarned = response["average_points_earned"];
      console.log(this.username);
      console.log(this.hitRate, this.averagePointsEarned)
    });
  }
}

export default User;
