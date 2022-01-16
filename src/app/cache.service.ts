import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    constructor() { }

    save(options: LocalStorageSaveOptions) {
        // Set default values for optionals
        options.expirationMins = options.expirationMins || 0

        // Set expiration date in miliseconds
        const expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0

        const record = {
            value: typeof options.data === 'string' ? options.data : JSON.stringify(options.data),
            expiration: expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
            hasExpiration: expirationMS !== 0 ? true : false
        }
        localStorage.setItem(`${options.group}.${options.key}`, JSON.stringify(record))
    }

    load(group: string, key?: string) {
        // Get cached data from localstorage
        if (group !== undefined && key === undefined) {
            const items = Object.entries(localStorage).filter(item => item[0].startsWith(group))

            if (items == null  || items.length <= 0) {
                return null;
            }

            const now = new Date().getTime()
            // Check if any are expired
            const expired = items?.find(c => {
                const record = JSON.parse(c[1])
                return (record.hasExpiration && record.expiration <= now);
            }) !== undefined;

            if (expired) {
                return null;
            }

            return items?.flatMap(c => JSON.parse(JSON.parse(c[1]).value));
        }

        const item = localStorage.getItem(`${group}.${key}`)
        if (item !== null) {
            const record = JSON.parse(item)
            const now = new Date().getTime()
            // Expired data will return null
            if (!record || (record.hasExpiration && record.expiration <= now)) {
                return null
            } else {
                return JSON.parse(record.value)
            }
        }
        return null
    }

    remove(key: string) {
        localStorage.removeItem(key)
    }

    cleanLocalStorage() {
        localStorage.clear()
    }
}

export class LocalStorageSaveOptions {
    group: string
    key?: string
    data: any
    expirationMins?: number
}