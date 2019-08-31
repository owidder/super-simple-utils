import {showDataAsTable} from "./showDataAsTable/showDataAsTable";
import {hashSHA256} from "./hash/hash";

export const superSimpleUtils = {
    showDataAsTable,
    hashSHA256,
} as any;

(window as any).superSimpleUtils = superSimpleUtils;
