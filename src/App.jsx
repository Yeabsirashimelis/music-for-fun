import React from "react";
import Dashboard from "./pages/Dashboard";
import AddMusic from "./pages/AddMusic";
import NotFoundPage from "./components/NotFoundPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./pages/Details";
import EditMusic from "./pages/EditMusic";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="add-music" element={<AddMusic />} />
          <Route path="music/:id" element={<Details />} />
          <Route path="music/edit/:id" element={<EditMusic />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 },
          style: {
            fontSize: "20px",
            padding: "8px 24px",
            backgroundColor: "whitesmoke",
            color: "black",
            fontStyle: "bold",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
