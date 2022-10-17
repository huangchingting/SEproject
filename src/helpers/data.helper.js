export const base64ImgToSrc = (base64) => {
    return `data:image/jpeg;base64,${base64}`
}

export const srcImgToBase64 = async(img) => {
    let reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort()
            reject(new DOMException("Problem parsing input file."))
        }
        reader.onload = () => {
            resolve(reader.result.replace('data:', '').replace(/^.+,/, ''))
        }

        reader.readAsDataURL(img)
    })
}

export const formatPrice = (price) => {
    return `$${price?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`
}