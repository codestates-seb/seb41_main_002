import styled from "styled-components";

const CustomBadge = styled.span`
  padding: 10px;
  border-radius: 5px;
  font-size: 17px;
`;

interface BadgeType {
  content: string;
}

export default function TypeBadge({ content }: BadgeType) {
  return <CustomBadge>{content}</CustomBadge>;
}
