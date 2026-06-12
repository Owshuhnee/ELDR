// 1. Grabbing tools from the React library
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

// 2. Describing the SHAPE of our context data (TypeScript only)
type AccessibilityContextType = {
    isAccessibilityMode: boolean;
    toggleAccessibilityMode: () => void;
}

// 3. Creating the actual context object (React)
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

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
        localStorage.setItem('accessibilityMode', String(isAccessibilityMode));
    }, [isAccessibilityMode]);

    return (
        <AccessibilityContext.Provider value={{ isAccessibilityMode, toggleAccessibilityMode }}>
            {children}
        </AccessibilityContext.Provider>
    )
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        throw new Error('useAccessibility must be used within AccessibilityProvider');
    }
    return context;
}