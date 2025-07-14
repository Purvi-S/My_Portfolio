import React, { useEffect } from "react";
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
  align-items: center;
`;

const Image = styled.img`
  height: 70px;
  width: 100px;
  border-radius: 6px;
  object-fit: cover;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  display: block;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Role = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;

const Company = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`;

const Date = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 4px;
  white-space: pre-line;
`;

const Span = styled.span`
  display: block;
  margin-bottom: 8px;
`;

const Skills = styled.div`
  margin-top: 8px;
`;

const ItemWrapper = styled.div`
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Skill = styled.span`
  background-color: ${({ theme }) => theme.primary + "15"};
  color: ${({ theme }) => theme.primary};
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`;

const ExperienceCard = ({ experience }) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(251, 253, 251, 0.6); }
        70% { box-shadow: 0 0 0 10px rgba(0, 255, 0, 0); }
        100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <VerticalTimelineElement
      contentStyle={{ boxShadow: "none", padding: "0px", background: "none" }}
      date={<Date>{experience?.date}</Date>}
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
            animation: "pulse 1.0s infinite"
          }}
        />
      }
    >
      <Card>
        <Top>
          <Image src={experience?.img} />
          <Body>
            <Role>{experience?.role}</Role>
            <Company>{experience?.company}</Company>
          </Body>
        </Top>
        <Description>
          {experience?.desc && <Span>{experience.desc}</Span>}
          {experience?.skills && (
            <>
              <Skills>
                <b>Skills</b>
                <ItemWrapper>
                  {experience.skills.map((skill, index) => (
                    <Skill key={`skill-${index}`}>• {skill}</Skill>
                  ))}
                </ItemWrapper>
              </Skills>
            </>
          )}
        </Description>
      </Card>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
