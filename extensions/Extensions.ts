import {TsKey} from "../types/Basic";

export {}
declare global {
    interface String {
        removePrefix(suffix: string): string

        removeSuffix(suffix: string): string

        removeExpectedPrefix(prefix: string): string

        removeExpectedSuffix(prefix: string): string

        // Splits on the first occurrence
        splitToTwo(splitOn: string): [string, string]

        // Splits on the last occurrence, returns undefined if splitOn doesn't exist in this
        splitToTwoOnLast(splitOn: string): [string, string] | undefined

        removeAfterFirstInclusive(removeAfter: string): string

        removeAfterFirstExclusive(removeAfter: string): string

        removeAfterLastInclusive(removeAfter: string): string

        removeAfterLastExclusive(removeBefore: string): string

        removeBeforeFirstInclusive(removeBefore: string): string

        removeBeforeFirstExclusive(removeBefore: string): string

        removeBeforeLastInclusive(removeBefore: string): string

        removeBeforeLastExclusive(removeBefore: string): string

        isDigit(): boolean

        /**
         * @deprecated use removeAfterFirstInclusive instead
         */

        removeAfterFirst(removeAfter: string): string

        /**
         * @deprecated use removeAfterLastInclusive instead
         */
        removeAfterLast(removeAfter: string): string
    }

    interface Array<T> {
        isEmpty(): boolean

        arrayEquals(array: T[]): boolean

        none(test: (item: T) => boolean): boolean

        insertAt(index: number, item: T): void


        remove(item: T): void

        /**
         * Returns the removed value
         */
        removeAt(index: number): T

        /**
         * Immutable variant of assigning a value at an index, as this will not modify the array and will instead return a new array.
         */
        replacedAt(index: number, value: T): T[]


        firstOr<V>(or: () => V): T | V

        getOrThrow(index: number): T

        first(): T

        last(): T

        lastOrNull(): T | null

        firstIndex(predicate: (item: T) => boolean): number

        indexOfOrThrow(item: T): number

        sum(numberMap: (item: T) => number): number;

        take(amount: number): T[]

        drop(amount: number): T[]

        dropLast(amount: number): T[]

        sortedBy<V>(comparisonKey: (element: T) => V, options?: { descending: boolean }): T[]

        /**
         * Uses Hashset semantics so will respect object structure for equality
         */
        distinct(): T[]
        /**
         * Uses Hashset semantics so will respect object structure for equality
         */
        distinctBy<V>(value: (element: T) => V): T[]

        splitBy(predicate: (item: T, index: number) => boolean): [T[], T[]]

        /**
         * Happens synchronously, every item is evaluated after the previous one
         */
        mapSync<NT>(map: (item: T, index: number) => Promise<NT>): Promise<NT[]>

        toRecord<K extends TsKey, V>(map: (element: T, index: number) => [K, V]): Record<K, V>;
        toMap<K, V>(map: (element: T, index: number) => [K, V]): Map<K, V>;

        /**
         * The length of this array will be used
         */
        zip<T2>(other: T2[]): [T,T2][]
    }
}

