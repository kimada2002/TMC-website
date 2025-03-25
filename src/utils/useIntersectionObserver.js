export function useIntersectionObserver(callback, options = {}) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => callback(entry))
  }, options)

  return observer
}