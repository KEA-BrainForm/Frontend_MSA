import React, { useState } from 'react';
import ResTextInput from './ResTextInput';
import styles from '../css/SurveyItem.module.css';


function ResSurveyItem(props) {
  const { question, onDelete, questionType, onSelectedAnswer } = props;
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedshortAnswer, setonShortAnswer] = useState('');

  function handleRadioOptionChange(e) {
    setSelectedAnswer(e.target.value);
    onSelectedAnswer(question.id, e.target.value);
  }

  function handleShortAnswerChange(e) {
    setonShortAnswer(e.target.value);
    onSelectedAnswer(question.id, e.target.value);
  }

  function renderOptions() {
    const options = [];
    for (let i = 1; i <= 5; i++) {
      if (question[`choice${i}`]) {
        options.push(
          <div key={i}>
            <input
              type="radio"
              name={`question-${question.num}`}
              value={question[`choice${i}`]}
              onChange={handleRadioOptionChange}
              required
              style={{
                marginBottom: "10px", 
              }}
            />
            {question[`choice${i}`]}
          </div>
        );
      }
    }
    return options;
  }

  function renderYesNo() {
    return (
      <form>
        <input
          type="radio"
          name={`question-${question.num}`}
          value="true"
          onChange={handleRadioOptionChange}
          required
          style={{
            marginBottom: "10px", 
          }}
        />
        참
        <br/>
        <input
          type="radio"
          name={`question-${question.num}`}
          value="false"
          onChange={handleRadioOptionChange}
          required
          style={{
            marginBottom: "10px", 
          }}
        />
        거짓
      </form>
    );
  }

  function renderShortAnswer() {
    return (
      <div>
         <ResTextInput onChange={(e) => handleShortAnswerChange(e)} />
        
      </div>
    );
  }

  switch (questionType) {
    case 'subjectiveQuestions':
      return (
        <div className={styles.surveyItem}>
          <h2 className={styles.questionNumber}>Q.{question.num}</h2>
          <p className={styles.questionTitle}>질문: {question.question}</p>
          {renderShortAnswer()}
        </div>
      );
    case 'multipleChoiceQuestions':
      return (
        <div className={styles.surveyItem}>
          <h2 className={styles.questionNumber}>Q.{question.num}</h2>
          <p className={styles.questionTitle}>질문: {question.question}</p>
          {renderOptions()}
        </div>
      );
    case 'yesOrNoQuestions':
      return (
        <div className={styles.surveyItem}>
          <h2 className={styles.questionNumber}>Q.{question.num}</h2>
          <p className={styles.questionTitle}>질문: {question.question}</p>
          {renderYesNo()}
        </div>
      );
    default:
      return null;
  }
}

export default ResSurveyItem;
