// noinspection JSDeprecatedSymbols

import "./Extensions"
import {TsKey} from "../types/Basic"
import {HashSet} from "../structures/hashmap/HashSet"

export {}

String.prototype.removeExpectedSuffix = function (suffix: string) {
    if (!this.endsWith(suffix)) throw new Error(`Expected string to end with '${suffix}', but is actually: '${this}'`)
    return this.slice(0, -1 * suffix.length)
}
String.prototype.removeExpectedPrefix = function (this: string, prefix: string) {
    if (!this.startsWith(prefix)) throw new Error(`Expected string to start with '${prefix}', but is actually: '${this}'`)
    return this.slice(prefix.length)
}

String.prototype.removeSuffix = function (this: string, suffix: string) {
    if (!this.endsWith(suffix)) return this
    return this.slice(0, -1 * suffix.length)
}
String.prototype.removePrefix = function (this: string, prefix: string) {
    if (!this.startsWith(prefix)) return this
    return this.slice(prefix.length)
}

String.prototype.splitToTwo = function (this: string, splitOn: string): [string, string] {
    const index = this.indexOf(splitOn)
    if (index === -1) throw new Error(`Could not split to two because split string '${splitOn}' does not exist in target string '${this}'`)
    return [this.slice(0, index), this.slice(index + 1)]
}
String.prototype.splitToTwoOnLast = function (this: string, splitOn: string): [string, string] | undefined {
    const index = this.lastIndexOf(splitOn)
    // if (index === -1) throw new Error(`Could not split to two because split string '${splitOn}' does not exist in target string '${this}'`)
    if (index === -1) return undefined
    return [this.slice(0, index), this.slice(index + 1)]
}

String.prototype.removeBeforeFirstExclusive = function (this: string, removeBefore: string): string {
    const index = this.indexOf(removeBefore)
    if (index === -1) {
        return this
    } else {
        return this.slice(index + removeBefore.length)
    }
}

String.prototype.removeBeforeFirstInclusive = function (this: string, removeBefore: string): string {
    const index = this.indexOf(removeBefore)
    if (index === -1) {
        return this
    } else {
        return this.slice(index)
    }
}
String.prototype.removeBeforeLastInclusive = function (this: string, removeBefore: string): string {
    const index = this.lastIndexOf(removeBefore)
    if (index === -1) {
        return this
    } else {
        return this.slice(index)
    }
}

String.prototype.removeBeforeLastExclusive = function (this: string, removeBefore: string): string {
    const index = this.lastIndexOf(removeBefore)
    if (index === -1) {
        return this
    } else {
        return this.slice(index + removeBefore.length)
    }
}

String.prototype.removeAfterFirstInclusive = function (this: string, removeAfter: string): string {
    const index = this.indexOf(removeAfter)
    if (index === -1) {
        return this
    } else {
        return this.slice(0, index + removeAfter.length)
    }
}

String.prototype.removeAfterFirstExclusive = function (this: string, removeAfter: string): string {
    const index = this.indexOf(removeAfter)
    if (index === -1) {
        return this
    } else {
        return this.slice(0, index)
    }
}

String.prototype.removeAfterLastInclusive = function (this: string, removeBefore: string): string {
    const index = this.lastIndexOf(removeBefore)
    if (index === -1) {
        return this
    } else {
        return this.slice(0, index + removeBefore.length)
    }
}

String.prototype.removeAfterLastExclusive = function (this: string, removeBefore: string): string {
    const index = this.lastIndexOf(removeBefore)
    if (index === -1) {
        return this
    } else {
        return this.slice(0, index)
    }
}
String.prototype.isDigit = function (this: string): boolean {
    if (this.length !== 1) return false
    // Using switch because I'm guessing browsers optimize it
    switch (this) {
        case "0" :
            return true
        case "1" :
            return true
        case "2" :
            return true
        case "3" :
            return true
        case "4" :
            return true
        case "5" :
            return true
        case "6" :
            return true
        case "7" :
            return true
        case "8" :
            return true
        case "9" :
            return true
        default:
            return false
    }
}
String.prototype.removeAfterFirst = function (this: string, removeAfter: string): string {
    return this.removeAfterFirstInclusive(removeAfter)
}

String.prototype.removeAfterLast = function (this: string, removeAfter: string): string {
    return this.removeAfterLastInclusive(removeAfter)
}

Array.prototype.toRecord = function <T, K extends TsKey, V>(this: Array<T>, map: (element: T, index: number) => [K, V]): Record<K, V> {
    const record = {} as Record<K, V>
    this.forEach((element, index) => {
        const [key, value] = map(element, index)
        record[key] = value
    })
    return record
}

Array.prototype.toMap = function <T, K, V>(this: Array<T>, mapper: (element: T, index: number) => [K, V]): Map<K, V> {
    const map = new Map<K,V>()
    this.forEach((element, index) => {
        const [key, value] = mapper(element, index)
        map.set(key,value)
    })
    return map
}


Array.prototype.arrayEquals = function <T>(this: T[], other: T[]): boolean {
    if (this.length !== other.length) return false
    for (let i = 0; i < this.length; i++) {
        if (this[i] !== other[i]) return false
    }
    return true
}

Array.prototype.insertAt = function <T>(this: T[], index: number, item: T): void {
    this.splice(index, 0, item)
    // return [
    //     ...this.slice(0, index),
    //     item,
    //     ...this.slice(index)
    // ]
}


Array.prototype.remove = function <T>(this: T[], item: T): void {
    const index = this.indexOf(item)
    if (index !== -1) this.splice(index, 1)
}
Array.prototype.removeAt = function <T>(this: T[], index: number): T {
    return this.splice(index, 1)[0]
}
Array.prototype.replacedAt = function <T>(this: T[], index: number, value: T): T[] {
    const newArr = [...this]
    newArr[index] = value
    return newArr
}
Array.prototype.firstOr = function <T, V>(this: T[], or: () => V): T | V {
    if (this.length === 0) {
        return or()
    } else {
        return this[0]
    }
}
Array.prototype.take = function <T>(this: T[], amount: number): Array<T> {
    const newArr = new Array(amount)
    for (let i = 0; i < amount; i++) {
        newArr[i] = this[i]
    }
    return newArr
}
Array.prototype.drop = function <T>(this: T[], amount: number): Array<T> {
    const newArr = new Array(this.length - amount)
    for (let i = amount; i < this.length; i++) {
        newArr[i - amount] = this[i]
    }
    return newArr
}
Array.prototype.mapSync = async function <T, NT>(this: T[], map: (item: T, index: number) => Promise<NT>): Promise<Array<NT>> {
    const newArr = new Array<NT>(this.length)
    for (let i = 0; i < this.length; i++) {
        newArr[i] = await map(this[i], i)
    }
    return newArr
}
Array.prototype.isEmpty = function <T>(this: T[]): boolean {
    return this.length === 0
}

Array.prototype.none = function <T>(this: T[], test: (item: T) => boolean): boolean {
    for (const item of this) {
        if (test(item)) return false
    }
    return true
}

Array.prototype.sum = function <T>(this: T[], numberMap: (item: T) => number): number {
    let sum = 0
    for (const item of this) {
        sum += numberMap(item)
    }
    return sum
}

Array.prototype.splitBy = function <T>(this: T[], predicate: (item: T, index: number) => boolean): [Array<T>, Array<T>] {
    const arr1: T[] = []
    const arr2: T[] = []
    let i = 0
    for (const item of this) {
        if (predicate(item, i)) {
            arr1.push(item)
        } else {
            arr2.push(item)
        }
        i++
    }
    return [arr1, arr2]
}

Array.prototype.indexOfOrThrow = function <T>(this: T[], element: T): number {
    const index = this.indexOf(element)
    if (index === -1) throw new Error(`Item '${JSON.stringify(element)}' is missing in array '${JSON.stringify(this)}'!`)
    return index
}

Array.prototype.sortedBy = function <T, V>(this: T[], comparisonKey: (element: T) => V, options?: { descending: boolean }) {
    // Default - false
    const desc = options?.descending === true
    return [...this].sort((a, b) => {
        const aValue = comparisonKey(a)
        const bValue = comparisonKey(b)

        const result = compare(aValue, bValue)
        return desc ? -result : result
    })
}

function compare(a: unknown, b: unknown): number {
    // Use more accurate number sorting for numbers
    const aNumber = Number(a)
    const bNumber = Number(b)
    if (!isNaN(aNumber) && !isNaN(bNumber)) return aNumber - bNumber

    if (a === b) {
        return 0
    } else if (String(a) < String(b)) {
        return -1
    } else {
        return 1
    }
}


Array.prototype.getOrThrow = function <T>(this: T[], index: number): T {
    if (index < 0) throw new Error(`Index ${index} is negative`)
    if (index >= this.length) throw new Error(`Index ${index} is out of bounds of array of size ${this.length}`)
    return this[index]
}
Array.prototype.last = function <T>(this: T[]): T {
    return this[this.length - 1]
}
Array.prototype.lastOrNull = function <T>(this: T[]): T | null {
    return this.length === 0 ? null : this[this.length - 1]
}


Array.prototype.first = function <T>(this: T[]): T {
    return this[0]
}
Array.prototype.firstIndex = function <T>(this: T[], predicate: (item: T) => boolean): number {
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i])) return i
    }
    throw new Error(`Item matching predicate is missing in array '${JSON.stringify(this)}'!`)
}

Array.prototype.dropLast = function <T>(this: T[], amount: number): Array<T> {
    const newArray = new Array(this.length - amount)
    for (let i = 0; i < this.length - amount; i++) {
        newArray[i] = this[i]
    }
    return newArray
}

Array.prototype.distinct = function <T>(this: T[]): Array<T> {
    return this.distinctBy(value => value)
}

Array.prototype.distinctBy = function <T, V>(this: T[], value: (element: T) => V): Array<T> {
    const newArray = []
    const existingTracker = HashSet.ofCapacity(this.length)
    for (const item of this) {
        const mapped = value(item)
        if (!existingTracker.contains(mapped)) {
            newArray.push(item)
            // Track items that were already inserted to prevent duplication
            existingTracker.put(mapped)
        }
    }
    return newArray
}


Array.prototype.zip = function <T, T2>(this: T[], other: T2[]): [T, T2][] {
    const newArray: [T, T2][] = []
    for (let i = 0; i < this.length; i++) {
        newArray[i] = [this[i], other[i]]
    }
    return newArray
}
