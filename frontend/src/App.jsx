import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Grounds from "./pages/Grounds";
import MyBookings from "./pages/MyBookings";
import AddGround from "./pages/AddGround";
import MyGrounds from "./pages/MyGrounds";
import BookGround from "./pages/BookGround";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Grounds />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/add-ground" element={<AddGround />} />
        <Route path="/my-grounds" element={<MyGrounds />} />
        <Route path="/book-ground/:id" element={<BookGround />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;