"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js"
import { MotionValue } from "framer-motion"

interface TerrainBackgroundProps {
  scrollProgress: MotionValue<number>
}

export function TerrainBackground({ scrollProgress }: TerrainBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!mountRef.current) return

    const worldWidth = 256
    const worldDepth = 256
    let animationId: number

    const container = mountRef.current

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 10000)
    // Initial camera position from user's code
    camera.position.set(100, 800, -800)
    camera.lookAt(-100, 810, -800)

    const scene = new THREE.Scene()
    // Using user's fog color efd1b5, and setting background
    scene.background = new THREE.Color(0xefd1b5)
    scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025)

    const data = generateHeight(worldWidth, worldDepth)

    const geometry = new THREE.PlaneGeometry(7500, 7500, worldWidth - 1, worldDepth - 1)
    geometry.rotateX(-Math.PI / 2)

    const vertices = geometry.attributes.position.array
    for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
      vertices[j + 1] = data[i] * 10
    }

    const texture = new THREE.CanvasTexture(generateTexture(data, worldWidth, worldDepth))
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshBasicMaterial({ map: texture })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // Base camera settings for scroll translation
    const startX = 100
    const endX = -100 // Zooming "in" towards where it is looking (-100, 810, -800)
    const startZ = -800
    const endZ = -800
    
    // As we scroll, let's move the camera forward along its viewing direction
    const scrollHandler = scrollProgress.on("change", (latest) => {
       // 'latest' goes from 0 to 1
       // When scrolling down, we move the camera 'forward' towards its lookAt point
       const currentX = startX + (endX - startX) * latest * 4; // Move significantly 
       // Optionally adjust Z or Y as well if we want a stronger zoom effect
       const currentZ = startZ + (-1000 - startZ) * latest * 2;
       
       camera.position.set(currentX, 800 - (latest * 150), currentZ)
       camera.lookAt(-1000, 810, currentZ) // Update lookat dynamic 
    })

    const handleResize = () => {
      if (!mountRef.current) return
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    function animate() {
      animationId = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      scrollHandler()
      cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [scrollProgress])

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
}

function generateHeight(width: number, height: number) {
  let seed = Math.PI / 4
  const random = function () {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }

  const size = width * height
  const data = new Uint8Array(size)
  const perlin = new ImprovedNoise()
  const z = Math.random() * 100

  let quality = 1

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < size; i++) {
      const x = i % width
      const y = ~~(i / width)
      data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 1.75)
    }
    quality *= 5
  }

  return data
}

function generateTexture(data: Uint8Array, width: number, height: number) {
  let context, image, imageData, shade

  const vector3 = new THREE.Vector3(0, 0, 0)
  const sun = new THREE.Vector3(1, 1, 1)
  sun.normalize()

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  context = canvas.getContext("2d")!
  context.fillStyle = "#000"
  context.fillRect(0, 0, width, height)

  image = context.getImageData(0, 0, canvas.width, canvas.height)
  imageData = image.data

  for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
    vector3.x = data[j - 2] - data[j + 2]
    vector3.y = 2
    vector3.z = data[j - width * 2] - data[j + width * 2]
    vector3.normalize()

    shade = vector3.dot(sun)

    imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007)
    imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007)
    imageData[i + 2] = (shade * 96) * (0.5 + data[j] * 0.007)
  }

  context.putImageData(image, 0, 0)

  // Scaled 4x
  const canvasScaled = document.createElement("canvas")
  canvasScaled.width = width * 4
  canvasScaled.height = height * 4

  context = canvasScaled.getContext("2d")!
  context.scale(4, 4)
  context.drawImage(canvas, 0, 0)

  image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height)
  imageData = image.data

  for (let i = 0, l = imageData.length; i < l; i += 4) {
    const v = ~~(Math.random() * 5)
    imageData[i] += v
    imageData[i + 1] += v
    imageData[i + 2] += v
  }

  context.putImageData(image, 0, 0)

  return canvasScaled
}
