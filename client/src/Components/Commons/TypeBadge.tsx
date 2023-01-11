import styled from "styled-components";

const CustomBadge = styled.span<{
  bgColor: string;
  padding: string;
  fontSize: string;
}>`
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  border-radius: 50%;
  margin: 0 2.5px;
`;

interface BadgeType {
  content: string;
  bgColor: string;
  padding: string;
  fontSize: string;
}

export default function TypeBadge({
  content,
  bgColor,
  padding,
  fontSize,
}: BadgeType) {
  return (
    <CustomBadge bgColor={bgColor} padding={padding} fontSize={fontSize}>
      {content}
    </CustomBadge>
  );
}
