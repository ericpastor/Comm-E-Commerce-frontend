export const transformPrice = (priceToTransform: number) => {
    const priceTransformet = new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' }).format(priceToTransform)
    return priceTransformet
}