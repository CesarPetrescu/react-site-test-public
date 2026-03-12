import { useRef } from 'react'
import { useInView } from 'framer-motion'

export default function useFadeIn() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return [ref, inView]
}
