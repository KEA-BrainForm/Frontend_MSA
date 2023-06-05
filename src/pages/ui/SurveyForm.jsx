import React, { useState } from 'react';
import SurveyItem from './SurveyItem';
import SurveyModify from '../SurveyModify';


// function SurveyForm(props) {
export let NumDeleteList = [];




export const SurveyForm = (props) => {
// export const SurveyForm = (props) => {
    const {questions, setQuestions} = props;

    const [numDeleteList, setNumDeleteList] = useState([]);
  
    NumDeleteList = numDeleteList;
   
  

function handleDeleteQuestion(num, id) {
 


  const newQuestions = questions.filter((question) => {
    if (question.hasOwnProperty("num") && question.num === num) {
      setNumDeleteList(prevList => [...prevList, question]);
      return false;
    }
    if (!question.hasOwnProperty("num") && question.id === id) {
      
      return false;
    }
    return true;
  });



  // Assign new IDs to each question
  const updatedQuestions = newQuestions.map((question, index) => {
    
    if (question.hasOwnProperty("num")) {
     
      return { ...question, num : index  +1};
    } else if (!question.hasOwnProperty("num")) {
      return { ...question, id: index + 1 };
    }
    return question;
  });

  setQuestions(updatedQuestions);
}




  return (
    <div>
{
  questions.map((question, index) => {
    if (question !== null) {
      let modifiedQuestion = {
        ...question,
        index: index + 1
      };

      if (question.hasOwnProperty('yesOrNoAnswer')) {
        question.type = 'yesOrNo';
        modifiedQuestion.type = 'yesOrNo';
      } else if (question.hasOwnProperty('subjectiveAnswers')) {
        question.type = 'shortAnswer';
        modifiedQuestion.type = 'shortAnswer';
      } else if (question.hasOwnProperty('multipleChoiceAnswers')) {
        question.type = 'multipleChoice';
        modifiedQuestion.type = 'multipleChoice';
      }

    

      return (
        <>
          <SurveyItem
            question={modifiedQuestion}
            onDelete={handleDeleteQuestion}
            Index={modifiedQuestion.index}
          />
        </>
      );
    }
  })
}
   

   
    </div>
  )
}

export default SurveyForm;