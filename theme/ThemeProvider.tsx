import {ReactComponent} from "../types/React"
import {createContext, CSSProperties} from "react"
import {systemIsDarkMode} from "./AppTheme"
import {MantineProvider} from "@mantine/core";
import React from "react";
import "./styles.global.css"

export function useLightMode(): boolean {
    const ctx = ThemeContext()
    return React.useContext(ctx)
}

/**
 * Allows calling {@link useLightMode} in children components.
 * Required for {@link ThemeRoot}.
 */
export function ThemeProvider(props: { children: ReactComponent, light: boolean }) {
    const ctx = ThemeContext()
    return <ctx.Provider value={props.light}>
        {props.children}
    </ctx.Provider>
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

// Make it lazy for it to not trigger in non-browser contexts (it accesses window which would be bad for them)
const ThemeContext = () => createContext(!systemIsDarkMode())
