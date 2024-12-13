import React from "react";
import { Routes, Route } from "react-router-dom";
import { ExchangePage, HomePage, RoqquPage, WalletPage } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/exchange" element={<ExchangePage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/roqqu" element={<RoqquPage />} />
    </Routes>
  );
};

export default App;

