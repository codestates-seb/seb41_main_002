import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
`;

const ModalContainer = styled.div`
  width: 400px;
  height: 500px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark3);
  border-radius: 10px;

  .Close_Btn{
    position: absolute;
    top: 13px;
    right: 13px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  .Close_Btn > span{
    position: absolute;
    top: 50%;
    width: 100%;
    height: 3px;
    background-color: var(--gray);
  }

  .Close_Btn:hover > span{
    background-color: var(--white);
  }

  .Close_Btn > span:first-child{
    transform: rotate(135deg) translateX(0%);
  }
  
  .Close_Btn > span:last-child{
    transform: rotate(45deg) translateX(0%);
  }
`;

const Modal = () => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <div className="Close_Btn">
          <span></span>
          <span></span>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
