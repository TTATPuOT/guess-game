export enum IgdbImageSize {
    cover_small = 'cover_small',
    screenshot_med = 'screenshot_med',
    cover_big = 'cover_big',
    logo_med = 'logo_med',
    screenshot_big = 'screenshot_big',
    screenshot_huge = 'screenshot_huge',
    thumb = 'thumb',
    micro = 'micro',
    '720p' = '720p',
    '1080p' = '1080p'
}

export default function getIgdbImageUrl(size: IgdbImageSize, hash: string): string {
    return `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.jpg`
}
