import React from "react";

/**
 * Typescript utility for defining a "children" argument type in components
 */
export type ReactComponent = React.JSX.Element | React.JSX.Element[] | string | false

export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>