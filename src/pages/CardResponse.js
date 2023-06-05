import './css/managesurvey.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { Dropdown as ReactBootstrapDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import brain from '../images/survey.png';
import 'animate.css';

const Card = ({ key, itemId, id, title,date }) => (
  <div className="col-lg-3A wow slideInUp" data-wow-delay="0.2s" >
  
      
  <img className="img-fluid" src={brain} alt="" style={{ width: '100%'}} />
  <div className="p-5" style={{ height: '185px', backgroundColor: '#F8F9FA', boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.2)' }}>
  
      <h5 className="fw-bold  card-title">{title}</h5>
     
      <ReactBootstrapDropdown>
          <ReactBootstrapDropdown.Toggle variant="secondary" id="dropdown-basic" className="dropdown-toggle">
          <span className="fas fa-ellipsis-v ellipsis-icon"></span>
          </ReactBootstrapDropdown.Toggle>
          <ReactBootstrapDropdown.Menu>

              <ReactBootstrapDropdown.Item  className="custom-dropdown-item" as={Link} to={`/survey-response-lookup/${encodeURIComponent(id)}`}>
                조회
              </ReactBootstrapDropdown.Item>
              {/* <ReactBootstrapDropdown.Item  className="custom-dropdown-item"  as={Link} to={{
    pathname: `/modifysurvey/${encodeURIComponent(id)}`,
    state: { surveyId: id }
}}>
    수정
</ReactBootstrapDropdown.Item>
              <ReactBootstrapDropdown.Item  className="custom-dropdown-item">삭제</ReactBootstrapDropdown.Item> */}
            </ReactBootstrapDropdown.Menu>
          </ReactBootstrapDropdown>
          <br/>
          <br/>
        <div className="card-content mb-5">
          
          <small className="me-3">
        
            <i className="far fa-user text-primary me-2" />
            {itemId}
          <br/>    
            <i className=" far fa-calendar-alt text-primary me-2" />
            {date}
          </small>
         
        </div>
        
      </div>
    </div>

);

export default Card;