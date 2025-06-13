import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <div className="page">
      <h1>哪吒英语</h1>
      <p>欢迎来到哪吒英语学习平台！选择下方链接开始您的英语学习之旅。</p>
      <Link to="/nezhayingyu-input" className="menu-link">
        哪吒英语
      </Link>
    </div>
  );
};

export default Menu;