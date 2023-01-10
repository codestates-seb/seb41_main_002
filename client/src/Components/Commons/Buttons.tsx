import styled from "styled-components";

const StyledButton = styled.button<{
  bgColor: string;
  fontColor: string;
  width: string;
}>`
  width: ${(props) => props.width};
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};
  padding: 10px;
  border-radius: 5px;
  font-size: 17px;
`;

interface ButtonType {
  fontColor: string;
  bgColor: string;
  content: string;
  width: string;
}

export default function CustomButton({
  fontColor,
  bgColor,
  content,
  width,
}: ButtonType) {
  return (
    <StyledButton bgColor={bgColor} fontColor={fontColor} width={width}>
      {content}
    </StyledButton>
  );
}
