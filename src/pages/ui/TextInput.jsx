import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  ${(props) => props.height && `height: ${props.height}px;`}
  padding: 16px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 10px; 
  border: 1px solid #e0e0e0; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  resize: none;
`;

function TextInput(props) {
  const { height, value, onChange } = props;

  return (
    <StyledTextarea height={height} value={value} onChange={onChange} />
  );
}

export default TextInput;
