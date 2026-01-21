import React, { useEffect, useRef, useState } from 'react';

const ParticleCursor = () => {
    const canvasRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const mouse = useRef({ x: -100, y: -100 });
    const particles = useRef([]);
    const corePos = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticle = (x, y, isClick = false) => {
            const count = isClick ? 25 : 1;
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 1.5 + 0.2;
                particles.current.push({
                    x,
                    y,
                    // Orbital velocity components
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    // Angular velocity for the 'vortex' feel
                    angle: Math.random() * Math.PI * 2,
                    angularVel: (Math.random() - 0.5) * 0.05,
                    radius: Math.random() * 20 + 5,

                    size: Math.random() * 8 + 3,
                    color: Math.random() > 0.6
                        ? (isDarkMode ? '#00eeff' : '#6366f1')
                        : (Math.random() > 0.4 ? '#ffffff' : (isDarkMode ? '#ff00ff' : '#db2777')),
                    life: 1,
                    decay: Math.random() * 0.01 + 0.005,
                });
            }
        };

        const update = () => {
            // Spring for core
            corePos.current.x += (mouse.current.x - corePos.current.x) * 0.15;
            corePos.current.y += (mouse.current.y - corePos.current.y) * 0.15;

            // Constantly emit a few particles
            if (Math.random() > 0.2) {
                createParticle(corePos.current.x, corePos.current.y);
            }

            for (let i = 0; i < particles.current.length; i++) {
                const p = particles.current[i];

                // Vortex physics
                p.angle += p.angularVel;
                const orbitX = Math.cos(p.angle) * p.radius * (1 - p.life);
                const orbitY = Math.sin(p.angle) * p.radius * (1 - p.life);

                p.x += p.vx + orbitX * 0.1;
                p.y += p.vy + orbitY * 0.1;

                p.life -= p.decay;

                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                    i--;
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Connection lines (The 'Unique' Neural aspect)
            // Only connect the most recent/alive particles to keep performance high
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode ? 'rgba(0, 238, 255, 0.15)' : 'rgba(99, 102, 241, 0.1)';
            ctx.lineWidth = 0.5;
            const recentParticles = particles.current.slice(-15);
            recentParticles.forEach(p => {
                const dist = Math.hypot(p.x - corePos.current.x, p.y - corePos.current.y);
                if (dist < 100) {
                    ctx.moveTo(corePos.current.x, corePos.current.y);
                    ctx.lineTo(p.x, p.y);
                }
            });
            ctx.stroke();

            // 2. Main Glow (Core)
            ctx.globalCompositeOperation = 'lighter';
            const coreGradient = ctx.createRadialGradient(
                corePos.current.x, corePos.current.y, 0,
                corePos.current.x, corePos.current.y, 30
            );
            const primaryColor = isDarkMode ? '#00eeff' : '#6366f1';
            coreGradient.addColorStop(0, '#ffffff');
            coreGradient.addColorStop(0.3, primaryColor);
            coreGradient.addColorStop(1, 'transparent');

            ctx.fillStyle = coreGradient;
            ctx.beginPath();
            ctx.arc(corePos.current.x, corePos.current.y, 40, 0, Math.PI * 2);
            ctx.fill();

            // 3. Particles
            particles.current.forEach(p => {
                ctx.beginPath();
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalCompositeOperation = 'source-over';
        };

        const loop = () => {
            update();
            draw();
            animationFrameId = requestAnimationFrame(loop);
        };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        const handleMouseDown = () => createParticle(mouse.current.x, mouse.current.y, true);

        const checkTheme = () => {
            setIsDarkMode(!document.body.classList.contains('light-theme'));
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        resize();
        loop();
        checkTheme();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDarkMode]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 99999,
                width: '100vw',
                height: '100vh'
            }}
        />
    );
};

export default ParticleCursor;
