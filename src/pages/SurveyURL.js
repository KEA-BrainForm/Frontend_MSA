import React, { useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import logo from "../images/Logo2.png";
import urlShare from "../images/url_share.png";
import CopyToClipboard from "react-copy-to-clipboard";

import "./css/surveycomplete.css";
import { Link } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import Button from "./ui/Button";

function SurveyGenerateComplete() {
  const { surveyId } = useParams();
  const baseUrl = "http://localhost:3000/check-password/";
  const uniqueUrl = `${baseUrl}${surveyId}`;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="background">
      <img src={logo} alt="Logo" className="img" width={300}/>
      <div className="home-card">
        <div className="complete-card">
          <div class="container2">
            <div class="item2 itemmerge">
              <h2>
                <strong>설문 참여 링크 확인</strong>
              </h2>
            </div>
            <div class="item2 itemmerge2">
              <h2>설문 내용을 공유해보세요.</h2>
            </div>
            <div class="item2 itemmerge2">
              <TextField
                id="outlined-basic"
                label="URL"
                variant="outlined"
                value={uniqueUrl}
                style={{ background: "white", width: "50%" }}
                InputProps={{
                  style: { color: "black", textAlign: "center" },
                }}
              />
              <CopyToClipboard text={uniqueUrl} onCopy={handleCopy} >
                <img
                  src={urlShare}
                  width="70px"
                  height="auto"
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                />
              </CopyToClipboard>
              {copied ? (             
              <div><br></br>설문 참여 주소가 클립보드에 복사되었습니다!</div>
            ) : null}
              </div>
            </div>          
          <div>
          <Link to="/">
            <Button className="completebutton" title="닫기">닫기</Button>
          </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SurveyGenerateComplete;
