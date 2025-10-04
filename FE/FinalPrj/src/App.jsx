import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout.jsx";
import TeacherPage from "./pages/TeacherPage.jsx";
import PositionPage from "./pages/PositionPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<TeacherPage />} />
        <Route path="positions" element={<PositionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
