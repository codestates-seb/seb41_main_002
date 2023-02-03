import styled from "styled-components";

const CustomBadge = styled.span<{
  bgColor: string;
  padding: string;
  fontSize: string;
}>`
  color: #343434;
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

const TypeBadge = ({ content, bgColor, padding, fontSize }: BadgeType) => {
  return (
    <CustomBadge bgColor={bgColor} padding={padding} fontSize={fontSize}>
      {content}
    </CustomBadge>
  );
};

export const SkinTag = (tags: string) => {
  switch (tags) {
    case "지성":
      return (
        <TypeBadge
          bgColor="#E5E0FF"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "건성":
      return (
        <TypeBadge
          bgColor="#7286D3"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "복합성":
      return (
        <TypeBadge
          bgColor="#C780FA"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "미백":
      return (
        <TypeBadge
          bgColor="#BFEAF5"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "주름":
      return (
        <TypeBadge
          bgColor="#FFF6BD"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "여드름성 피부":
      return (
        <TypeBadge
          bgColor="#EB455F"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "일반피부":
      return (
        <TypeBadge
          bgColor="#FFE5F1"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "보습":
      return (
        <TypeBadge
          bgColor="#009EFF"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "모공":
      return (
        <TypeBadge
          bgColor="#CFF5E7"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "수분":
      return (
        <TypeBadge
          bgColor="#D6E4E5"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "탄력":
      return (
        <TypeBadge
          bgColor="#FF9F9F"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
  }
};
