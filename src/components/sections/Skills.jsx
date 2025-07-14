import React from "react";
import styled from "styled-components";
import { skills } from "../../data/constants";
import { Tilt } from "react-tilt";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-contnet: center;
    position: rlative;
    z-index: 1;
    align-items: center;
    padding-top: 75px;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;
const Title = styled.div`
    font-size: 52px;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`;
const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const SkillsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    gap: 50px;
    justify-content: center;
`;

const Skill = styled.div`
    width: 100%;
    max-width: 500px;
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

const SkillTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 12px;
`;

const SkillList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;

const SkillItem = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: ${({ theme }) => theme.text_secondary + "75"}; // Lighter shade
    padding: 10px 16px;
    border-radius: 8px;
    margin: 6px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        background-color: ${({ theme }) => theme.primary};
        color: #fff;
    }

    img {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }
`;

const SkillImage = styled.img`
    width: 24px;
    height: 24px;
`;

const Skills = () => {
    return (
        <Container id="Skills">
            <Wrapper>
                <Title>Skills</Title>
                <Desc
                    style={{
                        marginBottom: "40px",
                    }}
                >
                    Here are some of my skills on which I have been working on for the past 2 years.
                </Desc>

                <SkillsContainer>
                    {skills.map((skill, index) => (
                            <Skill key={`skill-${index}`}>
                                <SkillTitle>{skill.title}</SkillTitle>
                                <SkillList>
                                    {skill.skills.map((item, index_x) => (
                                        <SkillItem key={`skill-x-${index_x}`}>
                                            <SkillImage src={item.image} />
                                            {item.name}
                                        </SkillItem>
                                    ))}
                                </SkillList>
                            </Skill>
                    ))}
                </SkillsContainer>
            </Wrapper>
        </Container>
    );
};

export default Skills;
