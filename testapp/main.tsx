import React from 'react'
import ReactDOM from 'react-dom/client'
import "../theme/styles.global.css"
import {MantineProvider, MantineThemeProvider} from "@mantine/core";
import {SearchitBar} from "../searchit/SearchitBar";
import {spacedCompletion, substringCompletable} from "../searchit/Completables";
import {useStateObject} from "../state/State";
import "../extensions/ExtensionsImpl"
import {ThemeProvider, ThemeRoot} from "../theme/ThemeProvider";
import "@mantine/core/styles.css"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider light={false}>
            <ThemeRoot>
                <TestApp/>
            </ThemeRoot>
        </ThemeProvider>
    </React.StrictMode>,
)


function TestApp() {
    return <MantineProvider>
        <SearchitBar config={{
            error: undefined,
            alwaysShowCompletions: true,
            completables: [substringCompletable([spacedCompletion("text1"), spacedCompletion("text2")])]
        }
        } query={useStateObject("")} loading={false}>
        </SearchitBar>
    </MantineProvider>
}