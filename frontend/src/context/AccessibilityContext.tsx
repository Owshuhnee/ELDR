'use client'

// Grabbing tools from the React library
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

// Describing the SHAPE of our context data (TypeScript only)
type AccessibilityContextType = {
    isAccessibilityMode: boolean;
    toggleAccessibilityMode: () => void;
}

// Creating the actual context object (React)
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// This is the broadcaster
export function AccessibilityProvider ({ children }: { children: ReactNode }) {

    const [isAccessibilityMode, setIsAccessibilityMode] = useState<boolean>(false);
    const toggleAccessibilityMode  = () => {
        setIsAccessibilityMode(prev => !prev);
    }

    useEffect (() => {
        const saved = localStorage.getItem('accessibilityMode')
        if (saved !== null) {
            setIsAccessibilityMode(saved === 'true')}
    }, []);
    
    useEffect (() => {
    if (isAccessibilityMode) {
        document.documentElement.classList.add('a11y-on')
    } else {
        document.documentElement.classList.remove('a11y-on')
    }
    }, [isAccessibilityMode]);

    return (
        <AccessibilityContext.Provider value={{ isAccessibilityMode, toggleAccessibilityMode }}>
            {children}
        </AccessibilityContext.Provider>
    )
}

// this is what AccessibilityToggle.tsx uses to read the state and get the toggle function
export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        throw new Error('useAccessibility must be used within AccessibilityProvider');
    }
    return context;
}