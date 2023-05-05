import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

import NoteContainer from "./pages/NoteContainer/NoteContainer";
import SingleGroup from "./pages/SingleGroupPage/SingleGroup";

function App() {
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
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route element={<NoteContainer />} path="/" />
        </Route>
        <Route element={<SingleGroup />} path="/:id" />
      </Routes>
    </div>
  );
}

export default App;
