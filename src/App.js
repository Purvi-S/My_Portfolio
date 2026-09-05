import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import Aurora from "./components/Aurora";
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

const Body = styled.div`
    /* soft morning light spilling from the top-left, warm cream base */
    background:
        radial-gradient(120% 90% at 8% 0%, #fefcf7 0%, transparent 45%),
        radial-gradient(90% 70% at 100% 20%, #f3e7d3 0%, transparent 50%),
        linear-gradient(180deg, #f6f1e8 0%, #efe6d6 100%);
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
                    <Aurora />
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
