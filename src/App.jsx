import React from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Home from "./components/Home";
import Create from "./components/Create";
import Edit from "./components/Edit";

const App = () => {
  return (
    <div className="h-screen w-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default App;
