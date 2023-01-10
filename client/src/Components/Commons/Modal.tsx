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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark3);
  border-radius: 10px;

  .Close_btn{
    color: var(--gray);
  }
`;

const Modal = () => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <div className="Close_btn">

        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
