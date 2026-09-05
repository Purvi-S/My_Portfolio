import { useEffect, useRef } from "react";
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
    background-color: #efe7d9;
    background-image:
        linear-gradient(180deg, rgba(246, 241, 232, 0.06), rgba(238, 229, 213, 0.10)),
        url("${bg}");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position-x: center;
    background-position-y: 0%; /* driven by scroll -> pans top to bottom */
`;

function App() {
    const bodyRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            const frac = max > 0 ? window.scrollY / max : 0;
            if (bodyRef.current) {
                bodyRef.current.style.backgroundPositionY = `${(frac * 100).toFixed(2)}%`;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        onScroll();
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Navbar />
                <Body ref={bodyRef}>
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
