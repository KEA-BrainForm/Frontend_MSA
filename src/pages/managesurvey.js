import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/managesurvey.css';
import search from '../images/search.png';
import filter from '../images/filter.png';

import Card from './card';
import CardResponse from './CardResponse';
import './css/pages.css';
import Pagination from 'react-bootstrap/Pagination';



const PAGE_SIZE = 1; // You can adjust this to change how many surveys are shown per page


const ManagementPage = () => {




    const [surveyData, setSurveyData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [surveyDataAnswered, setSurveyDataAnswered] = useState([]);
    const token = localStorage.getItem('ACCESS_TOKEN');

    useEffect(() => {
        async function fetchData() {
            /**
             * 생성한 설문 가져오는 요청
             * 수정 완료
             * */  
            try {
                console.log("ACCESS-Token: ", token);
                // 페이지가 마운트된 후에 서버로 GET 요청 보내기
                const response = await axios.get('/api/read/survey/created', { //   생성한 설문 가져오는 요청
                    headers: {
                        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
                    }
                });
                console.log("response.data", response.data);
                if (response.data.length === 0) {
                    setSurveyData([]);
                } else {
                    setSurveyData(response.data); // 데이터를 상태로 설정합니다.
                    console.log("response.data: ", response.data);
                }

            } catch (error) {
                console.error(error);
            }

            /**
             * 응답한 설문 가져오는 요청
             * 수정 완료
             * */   
            try {
                // 페이지가 마운트된 후에 서버로 GET 요청 보내기
                const response2 = await axios.get('/api/read/survey/answered', { //   응답한 설문 가져오는 요청
                    headers: {
                        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
                    }
                });
                console.log("response2.data", response2.data);
                if (response2.data.length === 0) {
                    setSurveyDataAnswered([]);
                } else {
                    setSurveyDataAnswered(response2.data); // 데이터를 상태로 설정합니다.
                    console.log("응답한 설문 response.data: ", response2.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <Managesurvey surveyData={surveyData} surveyDataAnswered={surveyDataAnswered} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    )
};

const Managesurvey = ({ surveyData, surveyDataAnswered, currentPage, setCurrentPage }) => {
    const [selectedSurvey, setSelectedSurvey] = useState('');


    if (!surveyData) {
        return <div>Loading...</div>;
    }

    const handleStatisticsClick = (surveyData) => {
        setSelectedSurvey(surveyData);
    };

    return (


        <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container py-5 grid-margin wow fadeInUp">
                <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: 600 }}>
                    <Pagination className='pagination'>
                        <Pagination.Item active={currentPage === 1} onClick={() => setCurrentPage(1)}>
                            내가 생성한 설문
                        </Pagination.Item>
                        <Pagination.Item active={currentPage === 2} onClick={() => setCurrentPage(2)}>
                            내가 응답한 설문
                        </Pagination.Item>
                    </Pagination>

                    {currentPage === 1 && (
                        <>
                            <h5 className="fw-bold text-primary  text-uppercase wow">Manage Survey</h5>
                            <h1 className="mb-0">Created by me</h1>
                        </>
                    )}

                    {currentPage === 2 && (
                        <>
                            <h5 className="fw-bold text-primary text-uppercase">Manage Survey</h5>
                            <h1 className="mb-0">Responsed by me</h1>
                        </>
                    )}
                </div>

                {currentPage === 1 && (
                    <div className="row g-3">
                        {surveyData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map((survey) => (
                            <div className="col-lg-3" key={survey.id}>
                                <Card itemId={survey.member.nickname} id={survey.id} title={survey.title} date={survey.updatedAt.slice(0, 10)} />
                            </div>
                        ))}
                    </div>
                )}

                {currentPage === 2 && (
                    <div className="row g-3">
                        {surveyDataAnswered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map((survey) => (
                            <div className="col-lg-3" key={survey.id}>
                                <CardResponse itemId={survey.member.nickname} id={survey.id} title={survey.title} date={survey.updatedAt.slice(0, 10)} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagementPage;
