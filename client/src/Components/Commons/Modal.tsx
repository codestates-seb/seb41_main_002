import { Dispatch, SetStateAction, useRef } from "react";
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
  z-index: 1000000;
`;

const ModalContainer = styled.div`
  min-width: 100px;
  display: inline-block;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark3);
  border-radius: 10px;
  padding: 45px 13px;

  .Close_Btn {
    position: absolute;
    top: 13px;
    right: 13px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  .Close_Btn > span {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 3px;
    background-color: var(--gray);
  }

  .Close_Btn:hover > span {
    background-color: var(--white);
  }

  .Close_Btn > span:first-child {
    transform: rotate(135deg) translateX(0%);
  }

  .Close_Btn > span:last-child {
    transform: rotate(45deg) translateX(0%);
  }
`;

interface ModalProps {
  modalState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
  element: JSX.Element;
}

//부모 필수 설정
//const [modalState, setModalState] = useState(false);
//모달 컴포넌트 사용
//{modalState ? <Modal modalState={modalState} setModalState={setModalState} element={<모달 안에 들어갈 컴포넌트/>}/> : null}
//클릭시 modalState를 true로 변경하는건 각자 만들어야합니다.

const Modal = (props: ModalProps) => {
  const modalClose = () => {
    props.setModalState(!props.modalState);
  };
  const outSide = useRef<HTMLDivElement>(null);

  return (
    <ModalOverlay
      ref={outSide}
      onClick={(e) => {
        if (e.target === outSide.current) props.setModalState(false);
      }}
    >
      <ModalContainer>
        <div className="Close_Btn" onClick={modalClose}>
          <span></span>
          <span></span>
        </div>
        {props.element}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
