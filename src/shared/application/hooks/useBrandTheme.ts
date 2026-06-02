import { selectActiveComplex } from '@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector'
import { SETTINGS_STORAGE_KEYS } from '@/shared/application/constants/settings'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function useBrandTheme() {
    const activeComplex = useSelector(selectActiveComplex)

    useEffect(() => {
        if (!activeComplex) return
        
        const root = document.documentElement
        
        if (activeComplex.primaryColor) {
        root.style.setProperty('--brand-primary', activeComplex.primaryColor)
        }
        if (activeComplex.secondaryColor) {
        root.style.setProperty('--brand-secondary', activeComplex.secondaryColor)
        }

        const fallbackAccent = '#acced3'
        const fallbackSurface = '#f8f8f8'
        const fallbackSurface2 = '#e6e6e6'
        const raw = localStorage.getItem(SETTINGS_STORAGE_KEYS.COMPLEX_BRANDING)

        try {
            const brandingMap = raw ? (JSON.parse(raw) as Record<string, { accentColor?: string; surfaceColor?: string }>) : {}
            const branding = activeComplex.id ? brandingMap[activeComplex.id] : undefined

            root.style.setProperty('--brand-accent', branding?.accentColor ?? fallbackAccent)
            root.style.setProperty('--brand-accent-100', `${branding?.accentColor ?? fallbackAccent}4a`)
            root.style.setProperty('--app-background', branding?.surfaceColor ?? fallbackSurface)
            root.style.setProperty('--app-background-2', fallbackSurface2)
        } catch {
            root.style.setProperty('--brand-accent', fallbackAccent)
            root.style.setProperty('--brand-accent-100', `${fallbackAccent}4a`)
            root.style.setProperty('--app-background', fallbackSurface)
            root.style.setProperty('--app-background-2', fallbackSurface2)
        }
    }, [activeComplex])
}
