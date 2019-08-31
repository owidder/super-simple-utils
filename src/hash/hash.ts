// from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
const hex = (buffer: ArrayBufferLike): string => {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        const value = view.getUint32(i)
        // toString(16) will give the hex representation of the number without padding
        const stringValue = value.toString(16)
        // We use concatenation and slice for padding
        const padding = '00000000'
        const paddedValue = (padding + stringValue).slice(-padding.length)
        hexCodes.push(paddedValue)
    }

    // Join all the hex strings into one
    return hexCodes.join("")
}

export const hashSHA256 = (text: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const buffer = new TextEncoder().encode(text);
        crypto.subtle.digest("SHA-256", buffer).then((hash) => {
            resolve(hex(hash));
        }, (e) => {
            console.error(e);
            reject(e);
        })
    })
}

(window as any).hashSHA256 = hashSHA256;
