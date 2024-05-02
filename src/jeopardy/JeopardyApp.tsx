import { useEffect, useState } from "react";

const apiUrl = "https://danielpacker.pythonanywhere.com/api/date";

const JeopardyApp = () => {
  const [todaysDate, setTodaysDate] = useState("");
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setTodaysDate(data.date));
  }, []);
  return <div>Jeopardy! {todaysDate}</div>;
};

export default JeopardyApp;
