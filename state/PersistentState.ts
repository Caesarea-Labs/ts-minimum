import {State, useStateObject} from "./State"
import {defaultJsonSerializer, StringSerializer} from "../structures/json"

// TODO: I feel like you be able to pass a default value and then it won't return a nullable in getValue()
export class PersistentValue<T> {
    private readonly key: string
    private readonly serializer: StringSerializer<T>

    constructor(key: string, parser?: StringSerializer<T>) {
        this.key = key
        this.serializer = parser ?? defaultJsonSerializer()
    }

    getValue(): T | null {
        const result = localStorage.getItem(this.key)
        if (result === null) return null
        try {
            return this.serializer.parse(result)
        } catch (e) {
            console.error(`Failed to deserialize stored data, it will be flushed: ${result} error: ${e}`)
            this.setValue(null!)
            return null
        }
    }

    setValue(value: T) {
        localStorage.setItem(this.key, this.serializer.stringify(value))
    }
}


export function usePersistentState<T>(key: string, defaultValue: T | (() => T), jsonSerializer?: StringSerializer<T>): State<T> {
    const persistent = new PersistentValue<T>(key, jsonSerializer)
    const valueState = useStateObject<T>(
        persistent.getValue() ?? (typeof defaultValue === "function" ? (defaultValue as () => T)() : defaultValue)
    )

    return valueState.onSet(newValue => persistent.setValue(newValue))
}
