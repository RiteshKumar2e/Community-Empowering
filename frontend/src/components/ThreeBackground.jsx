import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import '../styles/ThreeBackground.css'

const ThreeBackground = () => {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        )
        camera.position.z = 10

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        containerRef.current.appendChild(renderer.domElement)

        // Depth perception
        scene.fog = new THREE.FogExp2(0x050510, 0.001)

        // 1. Starfield (Static distant stars)
        const starsGeometry = new THREE.BufferGeometry()
        const starsCount = 10000
        const starsPos = new Float32Array(starsCount * 3)
        for (let i = 0; i < starsCount * 3; i++) {
            starsPos[i] = (Math.random() - 0.5) * 1000
        }
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPos, 3))
        const starsMaterial = new THREE.PointsMaterial({
            size: 0.7,
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
            sizeAttenuation: true
        })
        const starField = new THREE.Points(starsGeometry, starsMaterial)
        scene.add(starField)

        // 2. Cosmic Dust / Nebula Particles
        const nebulaGeometry = new THREE.BufferGeometry()
        const nebulaCount = 4000
        const nebulaPos = new Float32Array(nebulaCount * 3)
        const nebulaColors = new Float32Array(nebulaCount * 3)

        const colorPalette = [
            new THREE.Color(0x6366f1), // Indigo
            new THREE.Color(0x8b5cf6), // Purple
            new THREE.Color(0xd946ef), // Fuchsia
            new THREE.Color(0x0ea5e9)  // Sky
        ]

        for (let i = 0; i < nebulaCount * 3; i += 3) {
            // Spiral-like distribution
            const angle = Math.random() * Math.PI * 2
            const radius = 20 + Math.random() * 40
            const spin = radius * 0.2

            nebulaPos[i] = Math.cos(angle + spin) * radius + (Math.random() - 0.5) * 10
            nebulaPos[i + 1] = (Math.random() - 0.5) * 30
            nebulaPos[i + 2] = Math.sin(angle + spin) * radius + (Math.random() - 0.5) * 10

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
            nebulaColors[i] = color.r
            nebulaColors[i + 1] = color.g
            nebulaColors[i + 2] = color.b
        }

        nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3))
        nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3))

        const nebulaMaterial = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        })
        const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial)
        scene.add(nebula)

        // 3. Floating Geometric Structures (The "Professional" Unique touch)
        const structures = []
        const structureMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.1,
            shininess: 100
        })

        for (let i = 0; i < 5; i++) {
            const geometry = i % 2 === 0 ?
                new THREE.IcosahedronGeometry(Math.random() * 2 + 1, 0) :
                new THREE.TorusGeometry(Math.random() * 3 + 2, 0.02, 16, 100)

            const mesh = new THREE.Mesh(geometry, structureMaterial)
            mesh.position.set(
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 30 - 20
            )
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)

            structures.push({
                mesh: mesh,
                rotSpeed: (Math.random() - 0.5) * 0.005
            })
            scene.add(mesh)
        }

        // Lighting for structures
        const ambientLight = new THREE.AmbientLight(0x404040)
        scene.add(ambientLight)
        const pointLight = new THREE.PointLight(0x6366f1, 2, 100)
        pointLight.position.set(10, 10, 10)
        scene.add(pointLight)

        // Mouse interaction
        let mouseX = 0
        let mouseY = 0
        let targetX = 0
        let targetY = 0

        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)

        // Animation loop
        let time = 0
        let animationId
        const animate = () => {
            animationId = requestAnimationFrame(animate)
            time += 0.001

            // Slow drift
            starField.rotation.y += 0.0001
            nebula.rotation.y += 0.0003
            nebula.rotation.z += 0.0001

            // Structures movement
            structures.forEach(s => {
                s.mesh.rotation.x += s.rotSpeed
                s.mesh.rotation.y += s.rotSpeed
                s.mesh.position.y += Math.sin(time * 5 + s.mesh.position.x) * 0.005
            })

            // Parallax effect
            targetX += (mouseX - targetX) * 0.05
            targetY += (mouseY - targetY) * 0.05

            camera.position.x += (targetX * 2 - camera.position.x) * 0.05
            camera.position.y += (-targetY * 2 - camera.position.y) * 0.05
            camera.lookAt(scene.position)

            renderer.render(scene, camera)
        }

        animate()

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationId)
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement)
            }
            scene.clear()
            renderer.dispose()
        }
    }, [])

    return <div ref={containerRef} className="three-background" />
}

export default ThreeBackground
