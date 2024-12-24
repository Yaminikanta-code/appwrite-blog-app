import react from "react";
import { useLoader } from "./hooks";

function App() {
  const loading = useLoader();

  console.log(loading);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default App;
