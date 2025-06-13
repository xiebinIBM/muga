import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// 页面组件
import Menu from './components/Menu';
import NezhayingyuInput from './components/NezhayingyuInput';
import NezhayingyuConfirm from './components/NezhayingyuConfirm';

function App() {
  return (
    <Router basename="/muga">
      <div className="app">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/nezhayingyu-input" element={<NezhayingyuInput />} />
          <Route path="/nezhayingyu-confirm" element={<NezhayingyuConfirm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;