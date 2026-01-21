import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const ParticleCursor = () => {
    const [hoverType, setHoverType] = useState('default');
    const [isClicked, setIsClicked] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Mouse coordinates
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring physics for "Liquid" feel
    const config = { damping: 25, stiffness: 250, mass: 0.5 };
    const springX = useSpring(mouseX, config);
    const springY = useSpring(mouseY, config);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleOver = (e) => {
            const target = e.target.closest('a, button, .clickable, input, select');
            setHoverType(target ? 'hover' : 'default');
        };

        const checkTheme = () => {
            setIsDarkMode(!document.body.classList.contains('light-theme'));
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleOver);
        window.addEventListener('mousedown', () => setIsClicked(true));
        window.addEventListener('mouseup', () => setIsClicked(false));

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        checkTheme();

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleOver);
            observer.disconnect();
        };
    }, [mouseX, mouseY]);

    const isHovered = hoverType !== 'default';
    const primary = isDarkMode ? '#00eeff' : '#6366f1';

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }}>

            {/* 1. THE KINETIC HUB (Rotating Hexagon) */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: springX,
                    top: springY,
                    x: '-50%',
                    y: '-50%',
                    width: 40,
                    height: 40,
                    border: `1px solid ${primary}33`,
                    // Creating an Octagon/Hexagon look
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                    background: isDarkMode ? 'rgba(0, 238, 255, 0.05)' : 'rgba(99, 102, 241, 0.05)',
                }}
                animate={{
                    rotate: isHovered ? 180 : 0,
                    scale: isClicked ? 0.8 : isHovered ? 1.5 : 1,
                    opacity: isHovered ? 1 : 0.4,
                }}
                transition={{ type: 'spring', damping: 15 }}
            />

            {/* 2. THE PRECISION CORE */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: mouseX,
                    top: mouseY,
                    x: '-50%',
                    y: '-50%',
                    width: 4,
                    height: 4,
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    boxShadow: `0 0 10px ${primary}`,
                }}
                animate={{
                    scale: isClicked ? 2 : 1,
                }}
            />

            {/* 3. THE GHOST TRACE (Trailing segments) */}
            {[0, 1].map((i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: springX,
                        top: springY,
                        x: '-50%',
                        y: '-50%',
                        width: 20 - i * 5,
                        height: 20 - i * 5,
                        border: `0.5px solid ${primary}22`,
                        borderRadius: '2px', // Square trailing
                    }}
                    animate={{
                        rotate: 45,
                        x: i === 0 ? '-80%' : '-120%',
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration: 1.5 + i,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}

            {/* 4. THE INTERACTIVE BRACKETS */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        style={{
                            position: 'absolute',
                            left: springX,
                            top: springY,
                            x: '-50%',
                            y: '-50%',
                            width: 60,
                            height: 60,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0 5px'
                        }}
                    >
                        <div style={{ width: 10, height: 10, borderLeft: `2px solid ${primary}`, borderTop: `2px solid ${primary}` }} />
                        <div style={{ width: 10, height: 10, borderRight: `2px solid ${primary}`, borderBottom: `2px solid ${primary}` }} />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default ParticleCursor;
