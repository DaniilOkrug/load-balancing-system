import { useEffect, useState } from "react";
import "./App.css";
import Accordions from "./components/Accordions";

function App() {
  const [data, setData] = useState<any[]>([
    {
      address: "127.0.0.0",
      data: [
        {
          cpu: 12,
          ram: 32,
          timestamp: 1670716564209,
        },
        {
          cpu: 52,
          ram: 42,
          timestamp: 1670716564229,
        },
      ],
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:8001/api/getMetrics").then((response) =>
      console.log(response.json())
    );
  }, []);

  return (
    <div className="App">
      <Accordions data={data} />
    </div>
  );
}

export default App;
