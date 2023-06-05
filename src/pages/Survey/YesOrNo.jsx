import React, { useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import { Grid, TextField } from "@mui/material";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function YesOrNo(props) {
  const [title, setTitle] = useState("");
  const type = "yesOrNo";
  const id = props.questionsLen + 1;

  const handleAddClick = () => {
    const newItem = { id, title, type };
    props.onAddQuestions(newItem);
    setTitle("");
  }

  return (
    <div>
      <Grid container style={{ marginTop: 20 }}>
        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
          <h5>질문</h5>
          <TextField
            placeholder="질문을 입력하세요"
            fullWidth
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            InputProps={{
              style: {
                width: "110%",
                borderRadius: "10px",
              },
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Wrapper>
        <span></span>
        <Button title="질문 추가" onClick={handleAddClick} />
      </Wrapper>
    </div>
  );
}

export default YesOrNo;