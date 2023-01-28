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
          bgColor="black"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "건성":
      return (
        <TypeBadge
          bgColor="gray"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "복합성":
      return (
        <TypeBadge
          bgColor="Pink"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "미백":
      return (
        <TypeBadge
          bgColor="red"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "주름":
      return (
        <TypeBadge
          bgColor="blue"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "여드름성 피부":
      return (
        <TypeBadge
          bgColor="gold"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "일반피부":
      return (
        <TypeBadge
          bgColor="yellow"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "보습":
      return (
        <TypeBadge
          bgColor="yellow"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "모공":
      return (
        <TypeBadge
          bgColor="yellow"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "수분":
      return (
        <TypeBadge
          bgColor="yellow"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
    case "탄력":
      return (
        <TypeBadge
          bgColor="yellow"
          padding="5px"
          fontSize="15px"
          content={`${tags}`}
        />
      );
  }
};
