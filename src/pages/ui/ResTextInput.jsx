import React from 'react';
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 10px; 
  border: 1px solid #e0e0e0; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  resize: none;
  overflow: auto;
  `;

function ResTextInput(props) {
  const { onChange, value } = props;

  return (
    <StyledTextarea
      type="text"
      onChange={onChange} // Use the onChange prop here
      value={value} // Use the value prop here
    />
  );
}

export default ResTextInput;
