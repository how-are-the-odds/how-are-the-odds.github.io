interface LiveScoreBoardProps {
  gameId: string;
  gameInfo: any;
}

const LiveScoreBoard = ({ gameInfo }: LiveScoreBoardProps) => {
  if (gameInfo === undefined) {
    return <></>;
  } else {
    const boxscore = gameInfo.liveData.boxscore;
    const linescoreInnings = gameInfo.liveData.linescore.innings;
    console.log(gameInfo.liveData);
    console.log(boxscore);
    const homeTeam = boxscore.teams.home.team.name;
    const awayTeam = boxscore.teams.away.team.name;
    return (
      <>
        <table className="table table-responsive" style={{ width: 500 }}>
          <thead>
            <tr>
              <th>Team</th>
              {[...Array(9).keys()].map((num) => (
                <th key={num + 1}>{num + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{awayTeam}</td>
              {linescoreInnings.map(
                (inning: {
                  num: number;
                  away: {
                    runs: number;
                  };
                }) => (
                  <td key={inning.num}>{inning.away.runs}</td>
                )
              )}
            </tr>
            <tr>
              <td>{homeTeam}</td>
              {linescoreInnings.map(
                (inning: {
                  num: number;
                  home: {
                    runs: number;
                  };
                }) => (
                  <td key={inning.num}>{inning.home.runs}</td>
                )
              )}
            </tr>
          </tbody>
        </table>
      </>
    );
  }
};

export default LiveScoreBoard;
