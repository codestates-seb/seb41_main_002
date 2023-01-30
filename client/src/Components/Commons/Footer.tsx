import "../Style/footer.css";

const Footer = () => {
  return (
    <div className="FooterContainer">
      <div className="Contents_Wrap">
        <div className="Footer_Inside">
        <div className="Project_Outline">
            <h3 className="Footer_Title">🧴 L’acier</h3>
            <p>♂️ 남성 화장품 맞춤 서비스 쇼핑몰</p>
            <br/>
            <h3>💧 서비스 소개</h3>
            <p>"하.. 화장품 종류도 너무많고.. 대체 내 피부에 맞는 화장품은 뭘사야되는거지?"</p>
            <p>고민하는 당신을 위한 최고의 솔루션, Lacier</p>
            <br/>
            <p>
              남성들은 화장품을 살 때 대체 어떤걸 사야하는지 고민합니다.<br/> 
              우리는 그러한 고민을 해결해주고, 손쉽게 나의 피부타입에 알맞은 제품을 찾을수 있도록 도와드립니다.<br/> 
              본인 피부에 어울리는 제품을 쉽게 찾기를 원하는 남성들을 위해 Lacier 쇼핑몰 프로젝트가 시작되었습니다.
            </p>
            <br/>
            <h2>기술 스택</h2>
            <h3>✔️Frond-end</h3>
            <div className="Footer_Img">
              <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black"/>
              <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
              <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=purple"/>
              <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=black"/>
            </div>
              <div className="Footer_Img">
              <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=black"/>
              <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=black"/>
              <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=black"/>
            </div>
            <div className="Footer_Img">
              <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=black"/>
              <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"/>
            </div>
            <br/>
            <h3>✔️Back-end</h3>
            <div className="Footer_Img">
              <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=green"/> 
              <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=yellow"/> 
              <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=black"/>
            </div>
            <div className="Footer_Img">
              <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=black"/> 
              <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=black"/> 
              <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=black"/>
            </div>
            <div className="Footer_Img">
              <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=black"/> 
              <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=black"/> 
              <img src="https://img.shields.io/badge/OpenJDK-FFFFFF?style=for-the-badge&logo=Spring Boot&logoColor=black"/> 
            </div>
          </div>
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
          
        </div>
      </div>
    </div>
  );
};

export default Footer;
