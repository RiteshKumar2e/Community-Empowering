import React, { useEffect, useRef, useState } from 'react';

const ParticleCursor = () => {
    const canvasRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const mouse = useRef({ x: -100, y: -100, lastX: -100, lastY: -100 });
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
            const count = isClick ? 40 : Math.min(Math.hypot(x - mouse.current.lastX, y - mouse.current.lastY) / 5, 5);

            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 2 + 0.5;
                const size = Math.random() * 5 + 1;

                // Color palette based on the image: Electric Cyan, Soft White, and Deep Sky Blue
                const colors = isDarkMode
                    ? ['#00f2ff', '#ffffff', '#70e1ff', '#00b4d8']
                    : ['#6366f1', '#4f46e5', '#818cf8', '#312e81'];
                const color = colors[Math.floor(Math.random() * colors.length)];

                particles.current.push({
                    x: x + (Math.random() - 0.5) * 10,
                    y: y + (Math.random() - 0.5) * 10,
                    vx: Math.cos(angle) * speed + (mouse.current.x - mouse.current.lastX) * 0.1,
                    vy: Math.sin(angle) * speed + (mouse.current.y - mouse.current.lastY) * 0.1,
                    size: size,
                    originalSize: size,
                    color: color,
                    life: 1,
                    decay: Math.random() * 0.015 + 0.005,
                    drift: (Math.random() - 0.5) * 0.05,
                    shimmer: Math.random() * 0.1
                });
            }
        };

        const update = () => {
            // Smooth core lag for a fluid feel
            corePos.current.x += (mouse.current.x - corePos.current.x) * 0.15;
            corePos.current.y += (mouse.current.y - corePos.current.y) * 0.15;

            // Generate particles while moving
            const velocity = Math.hypot(mouse.current.x - mouse.current.lastX, mouse.current.y - mouse.current.lastY);
            if (velocity > 1) {
                createParticle(mouse.current.x, mouse.current.y);
            }

            for (let i = 0; i < particles.current.length; i++) {
                const p = particles.current[i];

                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.98; // Air resistance
                p.vy *= 0.98;
                p.vy -= 0.02; // Slight upward drift like magic dust

                p.life -= p.decay;
                p.size = p.originalSize * p.life;

                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                    i--;
                }
            }

            mouse.current.lastX = mouse.current.x;
            mouse.current.lastY = mouse.current.y;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Additive blending for that magical energy look
            ctx.globalCompositeOperation = 'lighter';

            // 1. Draw Connection Neural Lines (The 'Different' unique element)
            // It connects particles to the core and to each other if close
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode ? 'rgba(0, 242, 255, 0.1)' : 'rgba(99, 102, 241, 0.05)';
            ctx.lineWidth = 0.5;
            particles.current.forEach((p, idx) => {
                if (idx % 4 === 0) { // Only connect some to avoid clutter
                    const d = Math.hypot(p.x - corePos.current.x, p.y - corePos.current.y);
                    if (d < 80) {
                        ctx.moveTo(corePos.current.x, corePos.current.y);
                        ctx.lineTo(p.x, p.y);
                    }
                }
            });
            ctx.stroke();

            // 2. Draw the Sparkling Magical Particles
            particles.current.forEach(p => {
                ctx.beginPath();
                // Shimmer effect
                const alpha = p.life * (0.8 + Math.sin(Date.now() * 0.01 + p.shimmer) * 0.2);
                ctx.globalAlpha = alpha;

                ctx.shadowBlur = p.size * 2;
                ctx.shadowColor = p.color;

                ctx.fillStyle = p.color;

                // Draw star-like shapes (small diamonds/shards)
                if (p.size > 3) {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(Math.PI / 4);
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                } else {
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // 3. Main Glowing "Singularity" Core
            const coreGradient = ctx.createRadialGradient(
                corePos.current.x, corePos.current.y, 0,
                corePos.current.x, corePos.current.y, 40
            );

            const color = isDarkMode ? '#00f2ff' : '#6366f1';
            coreGradient.addColorStop(0, '#ffffff');
            coreGradient.addColorStop(0.2, color);
            coreGradient.addColorStop(0.5, `${color}44`);
            coreGradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 30;
            ctx.shadowColor = color;
            ctx.fillStyle = coreGradient;
            ctx.arc(corePos.current.x, corePos.current.y, 50, 0, Math.PI * 2);
            ctx.fill();

            // Reset
            ctx.shadowBlur = 0;
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
