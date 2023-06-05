import React, { useState } from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    width: calc(30% - 32px);
    ${(props) => props.height &&  `height: ${props.height}px;`  } padding: 16px;
    font-size: 16px;
    line-height: 20px;
`;

function PasswordTextInput(props) {
    const { height, value, onChange, name } = props;
    const [password, setPassword] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return <StyledTextarea name={name} height={height} value={value} onChange={onChange} />;
}

export default PasswordTextInput