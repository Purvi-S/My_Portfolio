import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import StarBackground from "./components/StarBackground";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";

const bg = `${process.env.PUBLIC_URL}/bg.jpg`;

const Body = styled.div`
    /* your photo, fixed, with a warm cream veil so text stays readable */
    background:
        linear-gradient(180deg, rgba(246, 241, 232, 0.82) 0%, rgba(238, 229, 213, 0.88) 100%),
        url("${bg}");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
`;

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Navbar />
                <Body>
                    <StarBackground />
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <Hero />
                        <Skills />
                        <Experience />
                        <Projects />
                        <Education />
                        <Contact />
                        <Footer />
                    </div>
                </Body>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
