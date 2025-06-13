import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NezhayingyuInput.css';  // 导入组件专用的 CSS 文件

const NezhayingyuInput = () => {
  const [formData, setFormData] = useState({
    startLesson: '',
    endLesson: '',
    translateQuestions: '',
    fillInQuestions: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('nezhayingyuData', JSON.stringify(formData));
    navigate('/nezhayingyu-confirm');
  };

  return (
    <div className="page">
      <h1>哪吒英语练习设置</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startLesson">范围：第几课到第几课</label>
          <div className="row">
            <input
              type="number"
              id="startLesson"
              name="startLesson"
              value={formData.startLesson}
              onChange={handleChange}
              placeholder="开始课数"
              min="1"
              required
              className="narrow-input"
            />
            <span>到</span>
            <input
              type="number"
              id="endLesson"
              name="endLesson"
              value={formData.endLesson}
              onChange={handleChange}
              placeholder="结束课数"
              min="1"
              required
              className="narrow-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="translateQuestions">出题类型（中译英）</label>
          <input
            type="number"
            id="translateQuestions"
            name="translateQuestions"
            value={formData.translateQuestions}
            onChange={handleChange}
            placeholder="题数"
            min="0"
            required
            className="narrow-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fillInQuestions">出题类型（模拟面试题）</label>
          <input
            type="number"
            id="fillInQuestions"
            name="fillInQuestions"
            value={formData.fillInQuestions}
            onChange={handleChange}
            placeholder="题数"
            min="0"
            required
            className="narrow-input"
          />
        </div>

        <button type="submit" className="next-btn">
          下一页
        </button>
      </form>
    </div>
  );
};

export default NezhayingyuInput;