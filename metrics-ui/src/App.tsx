import { useEffect, useState } from "react";
import "./App.css";
import Accordions from "./components/Accordions";

function App() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:8001/api/getMetrics").then((response) =>
      response.json().then((newData) => {
        console.log(newData);
        setData(
          newData.map((server: any) => {
            return {
              address: server.address,
              data: server.data.map((serverData: any) => {
                return {
                  ...serverData,
                  timestamp: new Date(Number(serverData.timestamp)).toLocaleTimeString(),
                };
              }),
            };
          })
        );
      })
    );

    const timer = setInterval(() => {
      fetch("http://localhost:8001/api/getMetrics").then((response) =>
        response.json().then((newData) => {
          console.log(newData);
          setData(
            newData.map((server: any) => {
              return {
                address: server.address,
                data: server.data.map((serverData: any) => {
                  return {
                    ...serverData,
                    timestamp: new Date(Number(serverData.timestamp)).toLocaleTimeString(),
                  };
                }),
              };
            })
          );
        })
      );
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="App">
      <Accordions data={data} />
    </div>
  );
}

export default App;
