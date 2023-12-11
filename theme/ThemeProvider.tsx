import {ReactComponent} from "../types/React"
import {createContext, CSSProperties} from "react"
import {systemIsDarkMode} from "./AppTheme"
import {MantineProvider} from "@mantine/core";
import React from "react";
import "./styles.global.css"

export function useLightMode(): boolean {
    return React.useContext(ThemeContext)
}

/**
 * Allows calling {@link useLightMode} in children components.
 * Required for {@link ThemeRoot}.
 */
export function ThemeProvider(props: { children: ReactComponent, light: boolean }) {
    return <ThemeContext.Provider value={props.light}>
        {props.children}
    </ThemeContext.Provider>
}

/**
 * Applies ts-minimum and Mantine css variables matching the current theme. Requires {@link ThemeProvider} to be a parent.
 */
export function ThemeRoot(props: { children: ReactComponent, style?: CSSProperties }) {
    const light = useLightMode()
    return <MantineProvider forceColorScheme={light ? "light" : "dark"}>
        <div style={props.style} className={light ? "light" : undefined}>
            {props.children}
        </div>
    </MantineProvider>
}

const ThemeContext = createContext(!systemIsDarkMode())
