import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const ParticleCursor = () => {
    const [hoverType, setHoverType] = useState('default');
    const [isClicked, setIsClicked] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Mouse coordinates
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Advanced Spring Physics for "Aerodynamic" movement
    const config = { damping: 25, stiffness: 250, mass: 0.5 };
    const springX = useSpring(mouseX, config);
    const springY = useSpring(mouseY, config);

    // Calculate Velocity/Direction for the "Stretch" effect
    const [direction, setDirection] = useState(0);
    const [stretch, setStretch] = useState(1);

    useEffect(() => {
        let lastX = 0;
        let lastY = 0;

        const moveMouse = (e) => {
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // Calculate rotation angle in degrees
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            setDirection(angle);
            setStretch(1 + Math.min(speed / 50, 1.5)); // Stretch max 1.5x

            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            lastX = e.clientX;
            lastY = e.clientY;
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
    const primary = isDarkMode ? '#0ff' : '#6366f1';

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', z_index: 99999 }}>

            {/* 1. THE LIQUID LENS (The attractive "Glass" effect) */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: springX,
                    top: springY,
                    x: '-50%',
                    y: '-50%',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    // Unique "Frosted Glass" interaction
                    backdropFilter: 'blur(4px) saturate(180%) brightness(1.2)',
                    border: `1.5px solid ${primary}44`,
                    backgroundColor: isDarkMode ? 'rgba(0, 255, 255, 0.05)' : 'rgba(99, 102, 241, 0.05)',
                    rotate: direction,
                }}
                animate={{
                    scaleX: isClicked ? 0.8 : isHovered ? 2.5 : stretch,
                    scaleY: isClicked ? 0.8 : isHovered ? 2.5 : 1 / (stretch * 0.5 + 0.5), // Conservation of mass feel
                    borderRadius: isHovered ? '30%' : '50%',
                    borderColor: isHovered ? `${primary}aa` : `${primary}44`,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            />

            {/* 2. THE CHRONO AURA (Subtle trailing glow) */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: springX,
                    top: springY,
                    x: '-50%',
                    y: '-50%',
                    width: 80,
                    height: 80,
                    background: `radial-gradient(circle, ${primary}11 0%, transparent 70%)`,
                    borderRadius: '50%',
                    opacity: 0.4,
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                }}
            />

            {/* 3. THE PRECISION CORE (The tiny sharp point) */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: mouseX,
                    top: mouseY,
                    x: '-50%',
                    y: '-50%',
                    width: 4,
                    height: 4,
                    backgroundColor: primary,
                    borderRadius: '50%',
                    boxShadow: `0 0 10px ${primary}`,
                }}
                animate={{
                    scale: isClicked ? 2 : isHovered ? 0 : 1,
                    opacity: isHovered ? 0 : 1,
                }}
            />

            {/* 4. SPEED TAIL (Unique kinetic detail) */}
            <AnimatePresence>
                {!isHovered && stretch > 1.2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            left: springX,
                            top: springY,
                            x: '-50%',
                            y: '-50%',
                            width: 2,
                            height: 40,
                            backgroundColor: primary,
                            rotate: direction - 90, // Points in direction of move
                            transformOrigin: 'bottom center',
                        }}
                    />
                )}
            </AnimatePresence>

            {/* 5. INTERACTION RING (Only on click/hover) */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: springX,
                    top: springY,
                    x: '-50%',
                    y: '-50%',
                    width: 50,
                    height: 50,
                    border: `1px dashed ${primary}66`,
                    borderRadius: '50%',
                    opacity: isHovered ? 1 : 0,
                }}
                animate={{
                    rotate: 360,
                    scale: isHovered ? 1.4 : 0.8,
                }}
                transition={{
                    rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
                    default: { type: 'spring' }
                }}
            />

        </div>
    );
};

export default ParticleCursor;
