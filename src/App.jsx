import react from "react";
import { useLoader } from "./hooks";
import { Footer, Header } from "./components";
function App() {
  const loading = useLoader();

  console.log(loading);

  return !loading ? (
    <div>
      <h1>Loading...</h1>
      <Footer />
    </div>
  ) : null;
}

export default App;
