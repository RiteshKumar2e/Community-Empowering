import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
    const [isLight, setIsLight] = useState(() => {
        return document.body.classList.contains('light-theme')
    })

    useEffect(() => {
        if (isLight) {
            document.body.classList.add('light-theme')
        } else {
            document.body.classList.remove('light-theme')
        }
    }, [isLight])

    return (
        <button
            onClick={() => setIsLight(!isLight)}
            className="theme-toggle"
            aria-label="Toggle theme"
        >
            {isLight ? (
                <Moon size={20} className="theme-icon" />
            ) : (
                <Sun size={20} className="theme-icon" />
            )}
        </button>
    )
}

export default ThemeToggle
