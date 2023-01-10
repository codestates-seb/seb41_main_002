import styled from "styled-components";
import "../Style/footer.css";

const FooterContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid var(--lightgray);
  background-color: var(--dark);

  .Contents_Wrap {
    background-color: var(--dark);
  }

  
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="Contents_Wrap">
        <div className="Footer_Inside">
          <div className="Footer_Members">
            <div className="Member_Name">
              <ul>
                <li className="Footer_Title"><h3>팀원</h3></li>
                <li className="Footer_Position">FrontEnd</li>
                <li>임경인</li>
                <li>심민섭</li>
                <li>김재우</li>
                <li className="Footer_Position">BackEnd</li>
                <li>주성천</li>
                <li>이준범</li>
                <li>김정우</li>
              </ul>
            </div>
            <div className="Member_GitHub">
              <ul>
                <li className="Footer_Title"><h3>GitHub</h3></li>
                <li className="Footer_Position">FrontEnd</li>
                <li><a href="https://github.com/limdumb">https://github.com/limdumb</a></li>
                <li><a href="https://github.com/shim5505">https://github.com/shim5505</a></li>
                <li><a href="https://github.com/rlawodn46465">https://github.com/rlawodn46465</a></li>
                <li className="Footer_Position">BackEnd</li>
                <li><a href="https://github.com/jution113">https://github.com/jution113</a></li>
                <li><a href="https://github.com/bum19">https://github.com/bum19</a></li>
                <li><a href="https://github.com/woojcoding">https://github.com/woojcoding</a></li>
              </ul>
            </div>
          </div>
          <div className="Project_Outline">
            <h3 className="Footer_Title">L’acier</h3>
            <p>프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명,프로젝트 설명</p>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
