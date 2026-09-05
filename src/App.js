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
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: #efe7d9; /* warm cream fallback */
`;

/* Blurred, zoomed copy that fills the whole screen (the "cover" fill) */
const BgBlur = styled.div`
    position: fixed;
    inset: 0;
    z-index: 0;
    background: url("${bg}") center / cover no-repeat;
    filter: blur(26px) saturate(1.05);
    transform: scale(1.12);
`;

/* The COMPLETE photo, sharp and uncropped, centered on top of the blur */
const BgPhoto = styled.div`
    position: fixed;
    inset: 0;
    z-index: 0;
    background: url("${bg}") center / contain no-repeat;
`;

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Navbar />
                <Body>
                    <BgBlur />
                    <BgPhoto />
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
