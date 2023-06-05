import React, { useState }  from 'react'
import SurveyItem from './SurveyItem';

function SuryeyForm(props) {
    // const {questions} = props;
    const [questions, setQuestions] = useState(props.questions);
    
    console.log(questions);

    // const deleteItem = (question) =>{
    //   const newQuestions = questions.filter(e => e.id !== question.id);
    //   setQuestions([...newQuestions]);
    // }
    const deleteItem = props.deleteItem;

  return (
    <div>
    {questions.map((question, index) => {
        return <SurveyItem key={question.num} question={question} deleteItem={deleteItem}/>;
    })}
    </div>
  )
}

export default SuryeyForm;