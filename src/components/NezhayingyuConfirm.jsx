import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './NezhayingyuConfirm.css';
import zhongyiyingData from '../assets/neza-zhongyiying-prompt.json';
import mianfeiData from '../assets/neza-moni.json';

const NezhayingyuConfirm = () => {
  const formData = JSON.parse(localStorage.getItem('nezhayingyuData')) || null;
  const navigate = useNavigate();

  const [questions, setQuestions] = useState({
    zhongyiying: [],
    mianfei: []
  });
  const [showAnswers, setShowAnswers] = useState(false);

  const refreshQuestions = useCallback(() => {
    if (formData) {
      const filteredZhongyiying = zhongyiyingData
        .filter(item => {
          const pptNo = parseInt(item['ppt No.'] || '0', 10);
          return pptNo >= formData.startLesson && pptNo <= formData.endLesson;
        })
        .sort(() => 0.5 - Math.random())
        .slice(0, formData.translateQuestions);

      const filteredMianfei = mianfeiData
        .filter(item => {
          const pptNo = parseInt(item['ppt No.'] || '0', 10);
          return pptNo >= formData.startLesson && pptNo <= formData.endLesson;
        })
        .sort(() => 0.5 - Math.random())
        .slice(0, formData.fillInQuestions);

      setQuestions({
        zhongyiying: filteredZhongyiying,
        mianfei: filteredMianfei
      });
    }
  }, [formData.startLesson, formData.endLesson, formData.translateQuestions, formData.fillInQuestions]);

  useEffect(() => {
    if (formData) {
      refreshQuestions();
    }
  }, [formData.startLesson, formData.endLesson, formData.translateQuestions, formData.fillInQuestions]);

  if (!formData) {
    return (
      <div className="exam-container fade-in-animation">
        <div className="exam-header">
          <h1>哪吒英语练习</h1>
          <p>没有找到练习数据，请返回上一页重新设置。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-container fade-in-animation">
      <div className="exam-header">
        <h1>哪吒英语练习</h1>
      </div>

      <exam-info-line>
        <span>姓名：____________________</span>
        <span>SN：____________________</span>
        <span>练习日期：____________________</span>
      </exam-info-line>

      <div className="exam-content">
        <div className="confirm-info">
          <h2>练习设置:</h2>
          <ul>
            <li>范围：第 {formData.startLesson} 课 到 第 {formData.endLesson} 课</li>
            <li>中译英题数：{formData.translateQuestions} 题</li>
            <li>模拟面试题题数：{formData.fillInQuestions} 题</li>
          </ul>
        </div>

        <div className="exam-questions">
          <h2>中译英练习题目:</h2>
          {questions.zhongyiying.map((quest, index) => (
            <div key={`${quest['No.']}-${quest['ppt No.']}`} className="question-item">
              <h3>No.{index + 1} ({quest['ppt No.']}) - {quest['中文题目']}</h3>
              <div className="answer-container">
                <span className="answer-label">答案：</span>
                {showAnswers && <span className="answer-content">{quest['中译英英语答案']}</span>}
              </div>
            </div>
          ))}

          <h2>模拟面试练习题目:</h2>
          {questions.mianfei.map((quest, index) => (
            <div key={`${quest['No.']}-${quest['ppt No.']}`} className="question-item mianfei-question">
              <h3>No.{index + 1} ({quest['ppt No.']}) - {quest['模拟面试问题']}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="exam-footer">
        <button className="practice-btn" onClick={() => navigate('/nezhayingyu-input')}>
          返回
        </button>
        <button className="practice-btn" onClick={refreshQuestions}>
          刷新
        </button>
        <button className="practice-btn" onClick={() => window.print()}>
          打印
        </button>
        <div className="show-answers-checkbox">
          <input
            type="checkbox"
            id="showAnswers"
            checked={showAnswers}
            onChange={() => setShowAnswers(!showAnswers)}
          />
          <label htmlFor="showAnswers">显示答案</label>
        </div>
      </div>
    </div>
  );
};

export default NezhayingyuConfirm;