import { useEffect, useRef, useState } from 'react'

/**
 * Intersection Observer hook — Option A scroll-in animation.
 * Toggles `isInView` when the element crosses the visibility threshold.
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  const {
    threshold = 0.2,
    rootMargin = '0px 0px -8% 0px',
    once = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isInView]
}
