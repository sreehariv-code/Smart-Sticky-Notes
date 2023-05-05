import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

import NoteContainer from "./pages/NoteContainer/NoteContainer";
import SingleGroup from "./pages/SingleGroupPage/SingleGroup";
import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const NavbarLayout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };
  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route element={<NavbarLayout />}>
            <Route element={<NoteContainer />} path="/" />
          </Route>
          <Route element={<SingleGroup />} path="/:id" />
        </Routes>
      )}
    </div>
  );
}

export default App;
