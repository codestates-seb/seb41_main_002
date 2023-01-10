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
  position: relative;
`;

const Modal = () => {
  return (
    <ModalOverlay>
      <ModalContainer>Modal</ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
