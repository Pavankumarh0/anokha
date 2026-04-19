"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Sky } from "three/examples/jsm/objects/Sky.js"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const MODEL_INDEX_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/model-index.json"
const SAMPLE_ASSETS_BASE_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/"

async function getSponzaModelURL() {
  const response = await fetch(MODEL_INDEX_URL)
  const models = (await response.json()) as Array<{
    name: string
    variants?: Record<string, string>
  }>

  const sponzaInfo = models.find((model) => model.name === "Sponza")

  if (!sponzaInfo) {
    throw new Error("Sponza entry was not found in the glTF sample model index.")
  }

  const variants = sponzaInfo.variants || {}
  const variantName =
    variants["glTF-Binary"] ||
    variants["glTF"] ||
    variants["glTF-Embedded"] ||
    Object.values(variants)[0]

  if (!variantName) {
    throw new Error("Sponza has no supported glTF variant in the model index.")
  }

  const variantFolder = variantName.endsWith(".glb") ? "glTF-Binary" : "glTF"
  return `${SAMPLE_ASSETS_BASE_URL}${sponzaInfo.name}/${variantFolder}/${variantName}`
}

type HeroThreeRefs = {
  scene: THREE.Scene | null
  camera: THREE.PerspectiveCamera | null
  renderer: THREE.WebGLRenderer | null
  animationId: number | null
  clock: THREE.Clock | null
  lookTarget: THREE.Vector3
  baseCameraPos: THREE.Vector3
  zoomCameraPos: THREE.Vector3
  currentCameraPos: THREE.Vector3
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollProgressRef = useRef(0)

  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoadingModel, setIsLoadingModel] = useState(true)
  const totalSections = 2

  const threeRefs = useRef<HeroThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    animationId: null,
    clock: null,
    lookTarget: new THREE.Vector3(0, 0, 0),
    baseCameraPos: new THREE.Vector3(0, 18, 95),
    zoomCameraPos: new THREE.Vector3(0, 10, 40),
    currentCameraPos: new THREE.Vector3(0, 18, 95),
  })

  useEffect(() => {
    if (!canvasRef.current) return

    let isDisposed = false

    const initThree = async () => {
      const refs = threeRefs.current

      refs.clock = new THREE.Clock()
      refs.scene = new THREE.Scene()

      refs.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        2500
      )
      refs.camera.position.copy(refs.baseCameraPos)

      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true,
      })
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
      refs.renderer.setSize(window.innerWidth, window.innerHeight)
      refs.renderer.shadowMap.enabled = true
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping
      refs.renderer.toneMappingExposure = 1.0

      const sky = new Sky()
      sky.scale.setScalar(450000)
      refs.scene.add(sky)

      const skyUniforms = sky.material.uniforms
      skyUniforms["turbidity"].value = 10
      skyUniforms["rayleigh"].value = 2
      skyUniforms["mieCoefficient"].value = 0.005
      skyUniforms["mieDirectionalG"].value = 0.8

      const sun = new THREE.Vector3()
      const phi = THREE.MathUtils.degToRad(35)
      const theta = THREE.MathUtils.degToRad(35)
      sun.setFromSphericalCoords(1, phi, theta)
      sky.material.uniforms["sunPosition"].value.copy(sun)

      const ambient = new THREE.AmbientLight(0xffffff, 0.1)
      refs.scene.add(ambient)

      const dirLight = new THREE.DirectionalLight(0xfff2dc, 8)
      dirLight.castShadow = true
      dirLight.shadow.mapSize.setScalar(2048)
      dirLight.shadow.camera.near = 0.1
      dirLight.shadow.camera.far = 1500
      refs.scene.add(dirLight)
      refs.scene.add(dirLight.target)

      const manager = new THREE.LoadingManager()
      manager.onLoad = () => {
        if (!isDisposed) setIsLoadingModel(false)
      }

      try {
        const loader = new GLTFLoader(manager)
        const modelURL = await getSponzaModelURL()
        const gltf = await loader.loadAsync(modelURL)

        if (isDisposed || !refs.scene || !refs.camera) return

        const model = gltf.scene
        const embeddedLights: THREE.Light[] = []

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
          } else if ((child as THREE.Object3D & { isLight?: boolean }).isLight) {
            embeddedLights.push(child as THREE.Light)
          }
        })

        for (const light of embeddedLights) {
          if (light.parent) light.parent.remove(light)
        }

        refs.scene.add(model)

        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())

        refs.lookTarget.set(center.x, center.y + size.y * 0.22, center.z)

        const maxSize = Math.max(size.x, size.y, size.z)
        const baseDistance = maxSize * 1.35
        const zoomDistance = maxSize * 0.72

        refs.baseCameraPos.set(
          center.x - baseDistance * 0.75,
          center.y + size.y * 0.48,
          center.z + baseDistance * 0.15
        )

        refs.zoomCameraPos.set(
          center.x - zoomDistance * 0.65,
          center.y + size.y * 0.38,
          center.z + zoomDistance * 0.12
        )

        refs.currentCameraPos.copy(refs.baseCameraPos)
        refs.camera.position.copy(refs.baseCameraPos)
        refs.camera.lookAt(refs.lookTarget)

        const shadowExtent = Math.max(size.x, size.z) * 0.7
        dirLight.shadow.camera.left = -shadowExtent
        dirLight.shadow.camera.right = shadowExtent
        dirLight.shadow.camera.top = shadowExtent
        dirLight.shadow.camera.bottom = -shadowExtent

        dirLight.position.set(
          center.x + maxSize * 0.5,
          center.y + maxSize * 0.8,
          center.z + maxSize * 0.25
        )
        dirLight.target.position.copy(refs.lookTarget)
        dirLight.target.updateMatrixWorld()
      } catch (error) {
        console.error("Failed to load Sponza model:", error)
        setIsLoadingModel(false)
      }

      const animate = () => {
        if (isDisposed) return
        refs.animationId = requestAnimationFrame(animate)

        if (refs.camera && refs.renderer && refs.scene) {
          const easedProgress = THREE.MathUtils.smoothstep(scrollProgressRef.current, 0, 1)
          refs.currentCameraPos.lerpVectors(
            refs.baseCameraPos,
            refs.zoomCameraPos,
            easedProgress
          )
          refs.camera.position.lerp(refs.currentCameraPos, 0.09)
          refs.camera.lookAt(refs.lookTarget)
          refs.renderer.render(refs.scene, refs.camera)
        }
      }

      animate()
    }

    initThree()

    const handleResize = () => {
      const refs = threeRefs.current
      if (!refs.camera || !refs.renderer) return
      refs.camera.aspect = window.innerWidth / window.innerHeight
      refs.camera.updateProjectionMatrix()
      refs.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      isDisposed = true
      window.removeEventListener("resize", handleResize)

      const refs = threeRefs.current
      if (refs.animationId) cancelAnimationFrame(refs.animationId)

      if (refs.scene) {
        refs.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose()
            if (Array.isArray(obj.material)) {
              obj.material.forEach((material) => material.dispose())
            } else {
              obj.material.dispose()
            }
          }
        })
      }

      if (refs.renderer) refs.renderer.dispose()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const startTrigger = rect.top
      const height = rect.height - window.innerHeight

      let progress = -startTrigger / height
      progress = Math.max(0, Math.min(progress, 1))

      scrollProgressRef.current = progress
      setScrollProgress(progress)

      const newSection = Math.floor(progress * totalSections)
      setCurrentSection(progress === 1 ? 2 : newSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [totalSections])

  const titles = ["ANOKHA", "THIS MAY", "8TH & 9TH"]
  const subtitles = [
    { line1: "A NEW RHYTHM OF CELEBRATION", line2: "" },
    { line1: "A NEW RHYTHM OF CELEBRATION", line2: "" },
    { line1: "A NEW RHYTHM OF CELEBRATION", line2: "" },
  ]

  const getSectionStyle = (index: number) => {
    const sectionStart = index / 3
    const sectionEnd = (index + 1) / 3

    let opacity = 0
    let y = 50

    if (scrollProgress >= sectionStart && scrollProgress <= sectionEnd) {
      const sectionLocalProgress = (scrollProgress - sectionStart) * 3

      if (index === 0) {
        if (sectionLocalProgress > 0.7) {
          opacity = 1 - (sectionLocalProgress - 0.7) / 0.3
          y = -50 * (1 - opacity)
        } else {
          opacity = 1
          y = 0
        }
      } else {
        if (sectionLocalProgress < 0.3) {
          opacity = sectionLocalProgress / 0.3
          y = 50 * (1 - opacity)
        } else if (sectionLocalProgress > 0.7 && index !== 2) {
          opacity = 1 - (sectionLocalProgress - 0.7) / 0.3
          y = -50 * (1 - opacity)
        } else {
          opacity = 1
          y = 0
        }
      }
    } else if (index === 2 && scrollProgress > 0.66) {
      opacity = 1
      y = 0
    }

    return {
      opacity,
      transform: `translateY(${y}px)`,
      visibility: opacity > 0 ? ("visible" as const) : ("hidden" as const),
      transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
    }
  }

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />

        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-black/15 to-black/50" />

        {isLoadingModel && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <div className="rounded-md bg-black/55 px-4 py-2 text-sm tracking-[0.2em] text-white/85 uppercase">
              Loading Scene
            </div>
          </div>
        )}

        {titles.map((title, i) => (
          <div
            key={title}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center p-8"
            style={getSectionStyle(i)}
          >
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-center text-5xl font-bold uppercase tracking-widest text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.8)] md:text-8xl lg:text-[10rem]">
              {title}
            </h1>

            <div className="font-[family-name:var(--font-space-grotesk)] mt-8 text-center text-xl font-bold uppercase tracking-widest text-red-500 drop-shadow-md md:text-3xl">
              <p>{subtitles[i].line1}</p>
              {subtitles[i].line2 && <p>{subtitles[i].line2}</p>}
            </div>

            {i === 2 && (
              <div className="pointer-events-auto mt-12">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-4 font-semibold text-black transition-transform hover:scale-105"
                >
                  Explore Events
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        ))}

        <div className="absolute bottom-12 right-8 z-20 flex flex-col items-center gap-4">
          <div className="origin-left rotate-90 translate-y-[-2rem] text-xs tracking-[0.2em] text-white/60 uppercase">
            Scroll
          </div>
          <div className="relative h-32 w-px bg-white/20">
            <div
              className="absolute top-0 w-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)] transition-all duration-100 ease-out"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="font-mono text-sm text-white/80">
            {String(currentSection + 1).padStart(2, "0")} / 03
          </div>
        </div>
      </div>
    </div>
  )
}
