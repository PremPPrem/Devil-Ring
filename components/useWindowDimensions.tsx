import { useState, useEffect } from "react"

export function useWindowDimensions() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    url: "",
    zoomWidth: 100,
  })

  useEffect(() => {

    if (typeof window !== "undefined") {
        
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          url: window.location?.toString(),
          zoomWidth: Math.round(window.devicePixelRatio * 100)
        })
      }

      window.addEventListener("resize", handleResize)

      handleResize()

      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])
  return windowSize
}
