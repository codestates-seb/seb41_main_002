import styled from "styled-components";

const StyledButton = styled.button<{
  bgColor: string;
  fontColor: string;
  width: string;
  padding: string;
  fontsize?: string;
  border?: string;
}>`
  width: ${(props) => props.width};
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: 5px;
  font-size: ${(props) => (props.fontsize ? props.fontsize : "17px")};
`;

interface ButtonType {
  fontColor: string;
  bgColor: string;
  content: string;
  width: string;
  padding: string;
  type?: "button" | "submit" | "reset";
  fontsize?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  border?: string;
  buttonId?: string;
  idx?: string;
}

export default function CustomButton({
  fontsize,
  fontColor,
  bgColor,
  content,
  width,
  padding,
  onClick,
  type,
  border,
  buttonId,
  idx,
}: ButtonType) {
  return (
    <StyledButton
      fontsize={fontsize}
      bgColor={bgColor}
      fontColor={fontColor}
      width={width}
      padding={padding}
      onClick={onClick}
      type={type}
      border={border}
      id={buttonId}
      name={idx}
    >
      {content}
    </StyledButton>
  );
}
