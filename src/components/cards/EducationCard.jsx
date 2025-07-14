import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  padding: 20px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const Image = styled.img`
  height: 70px;
  width: 100px;  
  border-radius: 10px;
  margin-top: 4px;
  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const School = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Degree = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Grade = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  margin-top: 4px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const StyledDate = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const EducationCard = ({ education }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ boxShadow: "none", padding: "0px", background: "none" }}
      date={<StyledDate>{education.date}</StyledDate>}
      iconStyle={{
        background: "transparent",
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      icon={
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: "#f1f6f1ff",
            animation: "pulse 1.5s infinite"
          }}
        />
      }
    >
      <Card>
        <Top>
          <Image src={education.img} />
          <Body>
            <School>{education.school}</School>
            <Degree>{education.degree}</Degree>
            <Grade>{education.grade}</Grade>
          </Body>
        </Top>
      </Card>
    </VerticalTimelineElement>
  );
};

export default EducationCard;
