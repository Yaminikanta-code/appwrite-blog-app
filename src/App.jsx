import react from "react";
import { useLoader } from "./hooks";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
function App() {
  const loading = useLoader();

  //console.log(loading);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
