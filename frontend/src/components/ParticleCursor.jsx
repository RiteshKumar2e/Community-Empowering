import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const ParticleCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [stats, setStats] = useState({ x: 0, y: 0, speed: 0 });

    // Core Motion Values
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring physics for the "Floating HUD"
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        let lastX = 0;
        let lastY = 0;
        let lastTime = Date.now();

        const moveMouse = (e) => {
            const now = Date.now();
            const dt = now - lastTime;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const speed = Math.round((distance / Math.max(dt, 1)) * 100);

            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Only update state for text every 2 frames for performance
            if (now % 2 === 0) {
                setStats({ x: e.clientX, y: e.clientY, speed });
            }

            lastX = e.clientX;
            lastY = e.clientY;
            lastTime = now;
        };

        const checkTheme = () => {
            setIsDarkMode(!document.body.classList.contains('light-theme'));
        };

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mousedown', () => setIsClicked(true));
        window.addEventListener('mouseup', () => setIsClicked(false));

        const handleOver = (e) => {
            if (e.target.closest('a, button, .clickable, input, select')) setIsHovered(true);
            else setIsHovered(false);
        };
        window.addEventListener('mouseover', handleOver);

        checkTheme();

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleOver);
            observer.disconnect();
        };
    }, []);

    // Theme-based Styles
    const theme = {
        primary: isDarkMode ? '#0ff' : '#6366f1',
        secondary: isDarkMode ? '#f0f' : '#ec4899',
        text: isDarkMode ? '#fff' : '#0f172a',
        bg: isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.8)',
        border: isDarkMode ? 'rgba(0, 255, 255, 0.3)' : 'rgba(99, 102, 241, 0.3)'
    };

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }}>

            {/* 1. The HUD Glass Label (Trailing Info Tag) */}
            <motion.div
                style={{
                    position: 'absolute',
                    x: springX,
                    y: springY,
                    translateX: 25,
                    translateY: -55,
                    padding: '6px 10px',
                    background: theme.bg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '4px',
                    color: theme.text,
                    fontSize: '9px',
                    fontFamily: '"Montserrat", monospace',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    boxShadow: isDarkMode ? `0 0 20px rgba(0, 255, 255, 0.1)` : '0 4px 15px rgba(0,0,0,0.1)'
                }}
                animate={{
                    opacity: isHovered ? 0 : 1,
                    scale: isClicked ? 0.9 : 1,
                    skewX: stats.speed / 10, // Dynamic distortion based on speed
                }}
            >
                <div>NEURAL_INT: {stats.speed}%</div>
                <div style={{ opacity: 0.6, fontSize: '7px' }}>X_{stats.x} Y_{stats.y}</div>
            </motion.div>

            {/* 2. The Dynamic Connector Line */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: 1,
                    height: 40,
                    x: springX,
                    y: springY,
                    translateX: 25,
                    translateY: -30,
                    background: `linear-gradient(to bottom, ${theme.primary}, transparent)`,
                    opacity: isHovered ? 0 : 0.5,
                }}
            />

            {/* 3. The Precision Crosshair Core */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: mouseX,
                    top: mouseY,
                    x: '-50%',
                    y: '-50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Horizontal Bar */}
                <motion.div style={{ width: 22, height: 1, backgroundColor: theme.primary }}
                    animate={{ width: isHovered ? 40 : 22, opacity: isHovered ? 0.2 : 1 }}
                />
                {/* Vertical Bar */}
                <motion.div style={{ width: 1, height: 22, backgroundColor: theme.primary, position: 'absolute' }}
                    animate={{ height: isHovered ? 40 : 22, opacity: isHovered ? 0.2 : 1 }}
                />
                {/* Center Pulse */}
                <motion.div
                    style={{
                        width: 4, height: 4,
                        backgroundColor: theme.secondary,
                        borderRadius: '1px',
                        position: 'absolute',
                        boxShadow: `0 0 10px ${theme.secondary}`
                    }}
                    animate={{ rotate: 45, scale: isClicked ? 3 : 1 }}
                />
            </motion.div>

            {/* 4. The Intelligence Pulse (Aura) */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    left: mouseX,
                    top: mouseY,
                    x: '-50%',
                    y: '-50%',
                    border: `1px solid ${theme.primary}`,
                    borderRadius: '50%',
                    opacity: 0.1,
                }}
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                }}
            />

        </div>
    );
};

export default ParticleCursor;
