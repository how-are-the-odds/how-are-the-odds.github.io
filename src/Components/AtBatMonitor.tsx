interface AtBatMonitorProps {
  batter: string;
  pitcher: string;
  balls: number;
  strikes: number;
}

const AtBatMonitor = ({
  batter,
  pitcher,
  balls,
  strikes,
}: AtBatMonitorProps) => {
  return (
    <table className={"table"}>
      <tbody>
        <tr>
          <td>Batting: {batter}</td>
          <td>Balls: {balls}</td>
        </tr>
        <tr>
          <td>Pitching: {pitcher}</td>
          <td>Strikes: {strikes}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AtBatMonitor;
