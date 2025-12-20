export default function getRandomArrayItems<T>(array: T[]): T[] {
    if (array.length === 0) return []

    const randomIndex = Math.floor(Math.random() * array.length)
    return [array[randomIndex]]
}
