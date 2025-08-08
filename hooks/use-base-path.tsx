import { useEffect, useState } from 'react'

export function useBasePath() {
  const [basePath, setBasePath] = useState('')

  useEffect(() => {
    // En el cliente, detectamos si estamos en GitHub Pages por la URL
    const isGitHubPages = window.location.hostname === 'neuradm.github.io'
    setBasePath(isGitHubPages ? '/Portfolio' : '')
  }, [])

  return basePath
}