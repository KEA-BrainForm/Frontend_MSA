import React, { useState } from "react";
import logo from "../images/Logo2.png";
import kakaoShare from "../images/kakao_share.png";
import urlShare from "../images/url_share.png";
import CopyToClipboard from "react-copy-to-clipboard";

import "./css/surveycomplete.css";
import brainwaves from "../images/brainwaves.png";
import { Link } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import Button from "./ui/Button";

function SurveyGenerateComplete() {
  const location = useLocation();
  const uniqueUrl = location.state.uniqueUrl;
  console.log(uniqueUrl);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="background">
      <img src={logo} alt="Logo" className="img" />
      <div className="home-card">
        <div className="complete-card">
          <div class="container2">
            <div class="item2 itemmerge">
              <h2>
                <strong>설문 생성이 완료되었습니다.</strong>
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
              <div><br/>Copied to clipboard</div>
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
