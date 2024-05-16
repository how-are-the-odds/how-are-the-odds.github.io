import { getUserInfo } from "./ApiCalls";

class User {
  username: string = "";
  hitRate: number | undefined;
  averagePointsEarned: number | undefined;
  betaRecord: number[] = [];
  dateRecord: string[] = [];
  winRecord: number[] = [];
  clueValueRecord: number[] = [];

  constructor(username: string) {
    this.username = username;
  }

  getDataFromServer() {
    getUserInfo(this.username).then((response) => {
      this.hitRate = response["hit_rate"];
      this.averagePointsEarned = response["average_points_earned"];
      this.betaRecord = response["beta_record"];
      this.dateRecord = response["date_record"];
      this.winRecord = response["win_record"];
      this.clueValueRecord = response["clue_value_record"];
      // console.log(this.winRecord);
      // console.log(this.dateRecord);
    });
  }
}

export default User;
