import {keyValuesCompletable} from "./Completables";

const AllDateOptions = [
    "today",
    "yesterday",
    "lastWeek",
    "lastMonth"
]

export const defaultCompletables = [keyValuesCompletable("from", AllDateOptions), keyValuesCompletable("to", AllDateOptions)]