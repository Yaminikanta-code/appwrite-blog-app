import react from "react";
import { useLoader } from "./hooks";

function App() {
  const loading = useLoader();

  console.log(loading);

  return !loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : null;
}

export default App;
