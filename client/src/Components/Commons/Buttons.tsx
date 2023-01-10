import styled from "styled-components";

const StyledButton = styled.button<{ color: string; width: string }>`
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  padding: 15px;
`;

interface ButtonType {
  color: string;
  content: string;
  width: string;
}

export default function CustomButton({ color, content, width }: ButtonType) {
  return (
    <StyledButton color={color} width={width}>
      {content}
    </StyledButton>
  );
}
