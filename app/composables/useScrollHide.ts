export function useScrollHide() {
  const navHidden = ref(false)

  if (import.meta.server) return { navHidden }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return { navHidden }

  let lastY = 0
  const onScroll = () => {
    const currentY = window.scrollY
    const delta = currentY - lastY
    lastY = currentY

    if (Math.abs(delta) < 6) return

    if (currentY < 130) {
      navHidden.value = false
      return
    }

    navHidden.value = delta > 0
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { navHidden }
}
