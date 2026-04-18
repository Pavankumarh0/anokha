"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ArrowRight } from "lucide-react"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const subtitleRefs = useRef<(HTMLDivElement | null)[]>([])
  const menuRef = useRef<HTMLDivElement>(null)

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 })
  
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const totalSections = 2 // 0, 1, 2 makes 3 sections total
  
  const threeRefs = useRef<any>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    locations: [],
    targetCameraX: 0,
    targetCameraY: 30,
    targetCameraZ: 300,
  })

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return;
    
    let isDisposed = false;
    
    const initThree = () => {
      const { current: refs } = threeRefs
      
      // Scene setup - Yellow theme fog
      refs.scene = new THREE.Scene()
      refs.scene.fog = new THREE.FogExp2(0x1a0a00, 0.00025)

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      )
      refs.camera.position.z = 100
      refs.camera.position.y = 20

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true
      })
      refs.renderer.setSize(window.innerWidth, window.innerHeight)
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping
      refs.renderer.toneMappingExposure = 0.5

      // Post-processing
      refs.composer = new EffectComposer(refs.renderer)
      const renderPass = new RenderPass(refs.scene, refs.camera)
      refs.composer.addPass(renderPass)

      // Add elegant bloom (slightly golden hue)
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.4,
        0.85
      )
      refs.composer.addPass(bloomPass)

      createStarField()
      createNebula()
      createMountains()
      createAtmosphere()
      getLocation()

      animate()
      setIsReady(true)
    }

    const createStarField = () => {
      const { current: refs } = threeRefs
      const starCount = 5000
      
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(starCount * 3)
        const colors = new Float32Array(starCount * 3)
        const sizes = new Float32Array(starCount)

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(Math.random() * 2 - 1)

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta)
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
          positions[j * 3 + 2] = radius * Math.cos(phi)

          // Yellow/Golden theme colors
          const color = new THREE.Color()
          const colorChoice = Math.random()
          if (colorChoice < 0.7) {
            color.setHSL(0.1, 0.8, 0.6) // Yellowish
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.9, 0.7) // Golden
          } else {
            color.setHSL(0.05, 0.8, 0.8) // Slight orange
          }
          
          colors[j * 3] = color.r
          colors[j * 3 + 1] = color.g
          colors[j * 3 + 2] = color.b

          sizes[j] = Math.random() * 2 + 0.5
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })

        const stars = new THREE.Points(geometry, material)
        refs.scene.add(stars)
        refs.stars.push(stars)
      }
    }

    const createNebula = () => {
      const { current: refs } = threeRefs
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          // Yellow / Orange / Reddish nebula colors
          color1: { value: new THREE.Color(0xff8c00) }, 
          color2: { value: new THREE.Color(0xffd700) },
          opacity: { value: 0.3 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      })

      const nebula = new THREE.Mesh(geometry, material)
      nebula.position.z = -1050
      nebula.rotation.x = 0
      refs.scene.add(nebula)
      refs.nebula = nebula
    }

    const createMountains = () => {
      const { current: refs } = threeRefs
      
      // Mountains for yellow/orange theme
      const layers = [
        { distance: -50, height: 60, color: 0x3a1a00, opacity: 1 },
        { distance: -100, height: 80, color: 0x5c2b00, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x8f4600, opacity: 0.6 },
        { distance: -200, height: 120, color: 0xba6000, opacity: 0.4 }
      ]

      layers.forEach((layer, index) => {
        const points = []
        const segments = 50
        
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000
          const y = Math.sin(i * 0.1) * layer.height + 
                   Math.sin(i * 0.05) * layer.height * 0.5 +
                   Math.random() * layer.height * 0.2 - 100
          points.push(new THREE.Vector2(x, y))
        }
        
        points.push(new THREE.Vector2(5000, -300))
        points.push(new THREE.Vector2(-5000, -300))

        const shape = new THREE.Shape(points)
        const geometry = new THREE.ShapeGeometry(shape)
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        })

        const mountain = new THREE.Mesh(geometry, material)
        mountain.position.z = layer.distance
        mountain.position.y = layer.distance
        mountain.userData = { baseZ: layer.distance, index }
        refs.scene.add(mountain)
        refs.mountains.push(mountain)
      })
    }

    const createAtmosphere = () => {
      const { current: refs } = threeRefs
      const geometry = new THREE.SphereGeometry(600, 32, 32)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            // Yellowish atmosphere
            vec3 atmosphere = vec3(1.0, 0.7, 0.2) * intensity;
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      })

      const atmosphere = new THREE.Mesh(geometry, material)
      refs.scene.add(atmosphere)
    }

    const animate = () => {
      if (isDisposed) return;
      const { current: refs } = threeRefs
      
      refs.animationId = requestAnimationFrame(animate)
      const time = Date.now() * 0.001

      // Update stars
      refs.stars.forEach((starField: any) => {
        if (starField.material.uniforms) {
          starField.material.uniforms.time.value = time
        }
      })

      // Update nebula
      if (refs.nebula && refs.nebula.material.uniforms) {
        refs.nebula.material.uniforms.time.value = time * 0.5
      }

      // Smooth camera movement with easing
      if (refs.camera && refs.targetCameraX !== undefined) {
        const smoothingFactor = 0.05
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor
        
        const floatX = Math.sin(time * 0.1) * 2
        const floatY = Math.cos(time * 0.15) * 1
        
        refs.camera.position.x = smoothCameraPos.current.x + floatX
        refs.camera.position.y = smoothCameraPos.current.y + floatY
        refs.camera.position.z = smoothCameraPos.current.z
        refs.camera.lookAt(0, 10, -600)
      }

      // Parallax mountains
      refs.mountains.forEach((mountain: any, i: number) => {
        const parallaxFactor = 1 + i * 0.5
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor
        mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor)
      })

      if (refs.composer) refs.composer.render()
    }

    initThree()

    const handleResize = () => {
      const { current: refs } = threeRefs
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight
        refs.camera.updateProjectionMatrix()
        refs.renderer.setSize(window.innerWidth, window.innerHeight)
        refs.composer.setSize(window.innerWidth, window.innerHeight)
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      isDisposed = true
      const { current: refs } = threeRefs
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      window.removeEventListener('resize', handleResize)

      refs.stars.forEach((starField: any) => {
        starField.geometry.dispose()
        starField.material.dispose()
      })
      refs.mountains.forEach((mountain: any) => {
        mountain.geometry.dispose()
        mountain.material.dispose()
      })
      if (refs.nebula) {
        refs.nebula.geometry.dispose()
        refs.nebula.material.dispose()
      }
      if (refs.renderer) refs.renderer.dispose()
    }
  }, [])

  const getLocation = () => {
    const { current: refs } = threeRefs
    const locations: number[] = []
    refs.mountains.forEach((mountain: any, i: number) => {
      locations[i] = mountain.position.z
    })
    refs.locations = locations
  }

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      // Calculate local progress relative to the container height (300vh)
      const rect = containerRef.current.getBoundingClientRect()
      const startTrigger = rect.top
      const height = rect.height - window.innerHeight
      let progress = -startTrigger / height
      progress = Math.max(0, Math.min(progress, 1))
      
      setScrollProgress(progress)
      const newSection = Math.floor(progress * totalSections)
      // clamp to max 2
      setCurrentSection(progress === 1 ? 2 : newSection)

      const { current: refs } = threeRefs
      
      const totalProgress = progress * totalSections
      const sectionProgress = totalProgress % 1
      
      // Define camera positions for each section
      const cameraPositions = [
        { x: 0, y: 30, z: 300 },   // Section 0
        { x: 0, y: 40, z: -50 },    // Section 1
        { x: 0, y: 50, z: -700 }      // Section 2
      ]
      
      const currentPos = cameraPositions[Math.floor(totalProgress)] || cameraPositions[totalSections]
      const nextPosIndex = Math.min(Math.floor(totalProgress) + 1, totalSections)
      const nextPos = cameraPositions[nextPosIndex]
      
      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress

      refs.mountains.forEach((mountain: any, i: number) => {
        const speed = 1 + i * 0.9
        // Use scrollY equivalent from progress for relative animation
        const virtualScrollY = progress * 3000
        const targetZ = mountain.userData.baseZ + virtualScrollY * speed * 0.5
        
        if (refs.nebula) {
            refs.nebula.position.z = (targetZ + virtualScrollY * speed * 0.01) - 100
        }
        
        mountain.userData.targetZ = targetZ
        if (progress > 0.7) {
          mountain.position.z = 600000
        }
        if (progress <= 0.7 && refs.locations.length > 0) {
          mountain.position.z = refs.locations[i]
        }
      })
      
      if (refs.nebula && refs.mountains.length > 3) {
          refs.nebula.position.z = refs.mountains[3].position.z
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [totalSections])

  const titles = ['ANOKHA', 'THIS MAY', '8TH & 9TH']
  const subtitles = [
    { line1: 'A NEW RHYTHM OF CELEBRATION', line2: '' },
    { line1: 'A NEW RHYTHM OF CELEBRATION', line2: '' },
    { line1: 'A NEW RHYTHM OF CELEBRATION', line2: '' }
  ]

  const getSectionStyle = (index: number) => {
    // each section takes up 1/3 of the scroll
    const sectionStart = index / 3;
    const sectionEnd = (index + 1) / 3;
    
    let opacity = 0;
    let y = 50;
    
    if (scrollProgress >= sectionStart && scrollProgress <= sectionEnd) {
      const sectionLocalProgress = (scrollProgress - sectionStart) * 3; // 0 to 1
      
      if (index === 0) {
        // First slide starts visible immediately
        if (sectionLocalProgress > 0.7) {
          opacity = 1 - (sectionLocalProgress - 0.7) / 0.3;
          y = -50 * (1 - opacity);
        } else {
          opacity = 1;
          y = 0;
        }
      } else {
        // Other slides fade in normally
        if (sectionLocalProgress < 0.3) {
          opacity = sectionLocalProgress / 0.3;
          y = 50 * (1 - opacity);
        } else if (sectionLocalProgress > 0.7 && index !== 2) {
          opacity = 1 - (sectionLocalProgress - 0.7) / 0.3;
          y = -50 * (1 - opacity);
        } else {
          opacity = 1;
          y = 0;
        }
      }
    } else if (index === 2 && scrollProgress > 0.66) {
        // Third slide stays visible until we scroll completely out
        opacity = 1;
        y = 0;
    }

    return {
      opacity,
      transform: `translateY(${y}px)`,
      visibility: opacity > 0 ? ('visible' as const) : ('hidden' as const),
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out'
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        
        {/* Side menu style element */}
        <div ref={menuRef} className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 z-20 mix-blend-difference hidden md:flex">
          <div className="flex flex-col gap-1.5 cursor-pointer">
            <span className="w-8 h-px bg-white"></span>
            <span className="w-6 h-px bg-white"></span>
            <span className="w-8 h-px bg-white"></span>
          </div>
          <div className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <span className="text-white tracking-[0.3em] text-sm font-semibold uppercase">FEST</span>
          </div>
        </div>

        {/* Text Overlays - mapping over 3 sections */}
        {titles.map((title, i) => (
          <div 
            key={i} 
            className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 pointer-events-none"
            style={getSectionStyle(i)}
          >
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-bold text-red-600 tracking-widest text-center uppercase font-[family-name:var(--font-space-grotesk)] drop-shadow-[0_0_25px_rgba(220,38,38,0.8)]">
               {title}
            </h1>
            
            <div className="mt-8 text-center text-xl md:text-3xl text-red-500 font-bold uppercase tracking-widest font-[family-name:var(--font-space-grotesk)] drop-shadow-md">
              <p>{subtitles[i].line1}</p>
              {subtitles[i].line2 && <p>{subtitles[i].line2}</p>}
            </div>
            
            {/* CTA specific to the last slide */}
            {i === 2 && (
              <div className="mt-12 pointer-events-auto">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold rounded-full hover:scale-105 transition-transform"
                >
                  Explore Events
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        ))}

        {/* Scroll progress indicator */}
        <div className="absolute right-8 bottom-12 flex flex-col items-center gap-4 z-20">
          <div className="text-white text-xs tracking-[0.2em] uppercase origin-left rotate-90 translate-y-[-2rem] opacity-50">
            Scroll
          </div>
          <div className="w-px h-32 bg-white/20 relative">
            <div 
              className="absolute top-0 w-full bg-yellow-500 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(234,179,8,0.8)]"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="text-white text-sm font-mono opacity-80">
            {String(currentSection + 1).padStart(2, '0')} / 03
          </div>
        </div>
      </div>
    </div>
  )
}
