import {useEffect, useState} from "react"

/**
 * MIGRATION NOTE - New usePromise() now returns an array instead of a single value.
 * To make it compile, do `[value] = usePromise()` instead of `value = usePromise()`
 * HOWEVER all usages of usePromise() should optimally do `[value, loading] = usePromise()` and show some sort of loading indicator while
 * `loading` is true. This is because `value` will no longer be undefined after the first value has been received.
 * This is generally better because old usages of usePromise() would just completely lose all content while a new value is being loaded, leading
 * to bad user experience.
 *
 * Effect for easily using Promises in React components.
 * A value will always exist once it has been resolved in the first place.
 *
 * @param promise
 * @param deps
 * @param throwOnError If false, when fetching fails this will return undefined instead of throwing.
 * @return T | undefined: The result of the promise or undefined if no promise has been resolved yet.
 * @return boolean: Whether a promise is currently in the process of being resolved. Use this to know whether we are "loading".
 * @return a callback that allows setting the value by the client
 */
export function usePromise<T>(promise: () => Promise<T> | T, deps: unknown[], throwOnError = true): [T | undefined, boolean, (value: T) => void] {
    const [result, setResult] = useState<PromiseState<T>>({kind: "loading", oldValue: undefined})

    const clientSetResult: (value: T) => void = (value) => {
        setResult({kind: "success", value})
    }

    useEffect(() => {
        setResult({kind: "loading", oldValue: getPromiseStateValue(result)})
        void Promise.resolve(promise()).then(newValue => {
            setResult({kind: "success", value: newValue})
        }).catch(err => {
            setResult({kind: "error", error: err})
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
    switch (result.kind) {
        case "loading":
            return [result.oldValue, true, clientSetResult]
        case "success":
            return [result.value, false, clientSetResult]
        case "error": {
            if (throwOnError) {
                throw result.error
            } else {
                return [undefined, false, clientSetResult]
            }
        }
    }
}

function getPromiseStateValue<T>(state: PromiseState<T>): T | undefined {
    switch (state.kind) {
        case "loading":
            return state.oldValue
        case "success":
            return state.value
        case "error":
            return undefined
    }
}


interface PromiseError {
    error: unknown
    kind: "error"
}

interface PromiseFulfilled<T> {
    value: T
    kind: "success"
}

interface PromiseLoading<T> {
    kind: "loading"
    oldValue: T | undefined
}

type PromiseState<T> = PromiseLoading<T> | PromiseFulfilled<T> | PromiseError

