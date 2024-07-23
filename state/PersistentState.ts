import {State, useStateObject} from "./State"
import {defaultJsonSerializer, StringSerializer} from "../structures/json"

/**
 * Stores a value in local storage, easily accessible with simple getValue() and setValue() methods.
 *
 * This supports any kind of object, by serializing it with a {@link StringSerializer}.
 *
 * A {@link key} must be passed to identify the data uniquely in local storage.
 */
export class PersistentValue<T> {
    private readonly serializer: StringSerializer<T>

    constructor(private readonly key: string, parser?: StringSerializer<T>) {
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
            localStorage.removeItem(this.key)
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
