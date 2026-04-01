import { selectActiveComplex } from '@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector'
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
    }, [activeComplex])
}