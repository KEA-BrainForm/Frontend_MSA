import React, { useState } from 'react';
import MultipleChoice from '../Survey/MultipleChoice';
import ShortAnswer from '../Survey/ShortAnswer';
import YesOrNo from '../Survey/YesOrNo';
import Button from '../ui/Button';
import SurveyForm from './SurveyForm';
import styled from "styled-components";
import SurveyModify from '../SurveyModify';
// import questions from '../questions';

export let questionList;

const Card = styled.div`
  background-color: white;
  margin-bottom: 10px;
  padding: 16px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const CustomSelect = styled.select`
  appearance: none;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: #2BB1E0;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: white;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1A87A6;
  }

  &:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;


function Dropdown(props) {

  const [selectedComponent, setSelectedComponent] = useState('MultipleChoice');
  const {pushlist} = props;

 

  const [questions, setQuestions] = useState(pushlist||[]);
  questionList = questions;
  const handleAddQuestions = (newQuestion) => {
    // const newQuestions = [...questions];
    // newQuestions.push({id:questions.length+1, type: questions.type,options})
      setQuestions([...questions, newQuestion]);
      // test = questions;
     
  };

  console.log("질문",questions);
  
 

  const handleChange = (event) => {
    setSelectedComponent(event.target.value);
    // test = questions;
  };

  const renderComponent = () => {
   
    console.log("퀘스천 리스트",questionList)
    switch (selectedComponent) {
      case 'MultipleChoice':
        return <MultipleChoice onAddQuestions={handleAddQuestions} questionsLen={questions.length}/>;
      case 'ShortAnswer':
        return <ShortAnswer onAddQuestions={handleAddQuestions} questionsLen={questions.length}/>;
      case 'YesOrNo':
        return <YesOrNo onAddQuestions={handleAddQuestions} questionsLen={questions.length}/>;
      default:
        return null;
    }
  };

  

  return (
    
    <div>

      <Card>
      <h3 htmlFor="title-input">질문 생성</h3>
      <CustomSelect class="custom-select" value={selectedComponent} onChange={handleChange}>
        <option value="MultipleChoice">객관식</option>
        <option value="ShortAnswer">주관식</option>
        <option value="YesOrNo">찬부식</option>
      </CustomSelect>
      {renderComponent()}
      </Card>    
        <SurveyForm questions={questions} setQuestions={setQuestions} />
    
    </div>
  );
}


export default Dropdown;
// export const initialQuestions=questions;