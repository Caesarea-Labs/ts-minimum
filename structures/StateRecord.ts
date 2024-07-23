import {useState} from "react"
import {TsKey} from "../types/Basic"
import {recordForEach} from "../methods/Javascript"


/**
 * Record that uses React state to make it so when the record is modified, components will get re-rendered.
 */
export interface StateRecord<K extends TsKey, V> {
    delete(key: K): void

    set(key: K, value: V): void
    replaceBy(record: Record<K,V>): void

    values(): V[]
}

/**
 * Creates a {@link StateRecord} as a state effect, initialized with {@link initialRecord}.
 * Calling mutations to this StateRecord will trigger a 'recomposition'.
 */
export function useStateRecord<K extends TsKey, V>(initialRecord?: Record<K, V>): StateRecord<K, V> {
    // We store the record inside another object and copy it whenever mutation happens, to trick react into thinking it's a new object now.
    const [record, setRecord] = useState<{ value: Record<K, V> }>({value: initialRecord ?? {} as Record<K, V>
    })
    return {
        delete(key: K) {
            setRecord(old => {
                delete old.value[key]
                return {value: old.value}
            })
        },
        values(): V[] {
            return Object.values(record.value)
        },
        set(key: K, value: V) {
            setRecord(old => {
                old.value[key] = value
                return {value: old.value}
            })
        },
        replaceBy(record: Record<K, V>) {
            setRecord({value: record})
        }
    }
}