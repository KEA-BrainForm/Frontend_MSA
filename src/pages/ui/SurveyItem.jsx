import React, { useState } from 'react';
import Button from "./Button";
import TextInput from './TextInput';
import Styles from '../css/SurveyItem.module.css';




function SurveyItem(props) {

    const { question, onDelete ,Index} = props;
 
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(question.title );
    const [editedOptions, setEditedOptions] = useState(
        (question.type === "multipleChoice") ? question.options : []
    );
    
    
    
    
    function handleOptionChange(index) {
        return function(e) {
            const newOptions = [...editedOptions];
            newOptions[index].text = e.target.value;
            setEditedOptions(newOptions);
        }
    }

    function handleOptionDelete(index) {
        return function() {
            const newOptions = editedOptions.filter((_, i) => i !== index);
            setEditedOptions(newOptions);
        }
    }

    function handleDeleteClick() {
       
        onDelete(question.hasOwnProperty("num") ? question.num : [] , question.id);
    }

  //   function handleDeleteModifyClick() {
  //     onDelete(question.id);
  // }

    function handleEditClick() {
        if (editMode) {
            // Apply changes here if needed
            question.title = editedTitle;
        }
        setEditMode(!editMode);
    }

    function handleTitleChange(e) {
        setEditedTitle(e.target.value);
    }



    
  function renderOptions() {
  // editedOptions가 5개 이상의 옵션을 가지고 있지 않은 경우, 필요한 수만큼 빈 옵션을 추가
  while (editedOptions.length < 5) {
    editedOptions.push({ text: "" });
  }

  return editedOptions.map((option, index) => {
    return (
      <div key={index}>
        {editMode && (
          <div>
            <label>
              <input type="radio" name="myCheckbox" value="true" required />
              &nbsp;Option {index + 1}:{' '}
              <input
                type="text"
                value={option.text}
                onChange={handleOptionChange(index)}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e0e0e0", // 연한 색상의 보더
                  padding: "10px",
                  marginBottom: "10px",
                  marginRight:"10px",   
                }}
              />
              {editedOptions.length > 1 && <Button onClick={handleOptionDelete(index)} title="Delete option" />}
            </label>
          </div>
        )}
        {!editMode && option.text && (
          <div>
            <input type="radio" name="myCheckbox" value="true" required 
            style={{
                  marginBottom: "10px", 
                }}/>
            &nbsp;{option.text}
          </div>
        )}
      </div>
    );
  });
}


    switch (question.type) {
        case "shortAnswer":
          return (
            <div className={Styles.surveyItem}>
                    <h2 className={Styles.questionNumber}>Q.{Index}</h2>
                    <p className={Styles.questionTitle}>질문:
                        {editMode ? 
                            <TextInput value={editedTitle} onChange={handleTitleChange} /> 
                            : 
                            question.title}

              </p>
              <TextInput type="text" name="shortAnswerInput" required />
              <Button
                className={Styles.editButton}
                onClick={handleEditClick}
                title={editMode ? "Apply" : "Edit"}
              ></Button>
              &nbsp;&nbsp;
              <Button
                className={Styles.deleteButton}
                onClick={handleDeleteClick}
                title="Delete"
              ></Button>
            </div>
          );

          case "multipleChoice":
            return (
                <div className={Styles.surveyItem}>
                    <h2 className={Styles.questionNumber}>Q.{Index}</h2>
                    <p className={Styles.questionTitle}>질문:&nbsp;
                        {editMode ? 
                            <TextInput value={editedTitle} onChange={handleTitleChange} /> 
                            : 
                            question.title
                        }
                    </p>
                    {renderOptions()}

                    <Button
                className={Styles.editButton}
                onClick={handleEditClick}
                title={editMode ? "Apply" : "Edit"}
              ></Button>
              &nbsp;&nbsp;
              <Button
                className={Styles.deleteButton}
                onClick={handleDeleteClick}
                title="Delete"
              ></Button>
            </div>

               
            );
      
        case "yesOrNo":
            return (
                <div className={Styles.surveyItem}>
                    <h2 className={Styles.questionNumber}>Q.{Index}</h2>
                    <p className={Styles.questionTitle}>질문: 
                        {editMode ? 
                            <TextInput value={editedTitle} onChange={handleTitleChange} /> 
                            : 
                            question.title
                        }
                    </p>
                    <form>
                        <input type="radio" name="myCheckbox" value="true" required style={{
                         marginBottom: "10px", 
                          }}/> 참
                         <br/>
                        <input type="radio" name="myCheckbox" value="false" required style={{
                        marginBottom: "10px", 
                         }}/> 거짓
                        <br/>
                    </form>

                    <Button className={Styles.editButton} onClick={handleEditClick} title={editMode ? "Apply" : "Edit"}></Button>
                    &nbsp;&nbsp;
                    <Button className={Styles.deleteButton} onClick={handleDeleteClick} title="Delete"></Button>

                </div>
            );
    }


}

export default SurveyItem;