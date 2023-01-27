import styled from "styled-components";

const StyledButton = styled.button<{
  bgColor: string;
  fontColor: string;
  width: string;
  padding: string;
  fontsize?: string
  height?: string
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height ? props.height : "100%"};
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => props.padding};
  border-radius: 5px;
  font-size: ${(props)=> props.fontsize ? props.fontsize : "17px"};
`;

interface ButtonType {
  fontColor: string;
  bgColor: string;
  content: string;
  width: string;
  padding: string;
  fontsize?: string;
  height?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CustomButton({
  fontsize,
  fontColor,
  bgColor,
  content,
  width,
  padding,
  onClick,
  height
}: ButtonType) {
  return (
    <StyledButton
      fontsize={fontsize}
      bgColor={bgColor}
      fontColor={fontColor}
      width={width}
      padding={padding}
      onClick={onClick}
      height={height}
    >
      {content}
    </StyledButton>
  );
}
