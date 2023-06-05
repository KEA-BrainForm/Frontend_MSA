import React from "react";
import styled, { keyframes } from "styled-components";

const hoverAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledButton = styled.button`
  margin-top: 0rem;
  background-color: #2BB1E0;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 10px; /* Make the button round */
  animation: ${hoverAnimation} 1s infinite;
  animation-fill-mode: both;
  animation-play-state: paused;
  &:hover {
    animation-play-state: running;
  }
`;

function Button(props) {
  const { title, onClick } = props;
  
  return <StyledButton onClick={onClick}>{title || "Submit"}</StyledButton>;
}

export default Button;