export const getGameMatchup = async (gameId: string) => {
  if (gameId != "") {
    const apiUrl =
      "https://statsapi.mlb.com/api/v1.1/game/" + gameId + "/feed/live";
    const response = await fetch(apiUrl).then((res) => res.json());

    const matchup = response.liveData.plays.currentPlay.matchup;
    const count = response.liveData.plays.currentPlay.count;

    return {
      response: response,
      batter: matchup.batter.fullName.toLowerCase(),
      pitcher: matchup.pitcher.fullName.toLowerCase(),
      balls: count.balls,
      strikes: count.strikes,
    };
  }
};

export const getTodaysGames = async () => {
  const apiUrl = "https://statsapi.mlb.com/api/v1/schedule?sportId=1";
  const response = await fetch(apiUrl).then((res) => res.json());
  return response.dates[0];
};
