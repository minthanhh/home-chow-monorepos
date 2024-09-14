export function calculateArrayOrNumberPercentage(num: number, totalMass: number): number
export function calculateArrayOrNumberPercentage(num: number[], totalMass: number): number[]

export function calculateArrayOrNumberPercentage(num: number | number[], totalMass: number): number | number[] {
    if (Array.isArray(num)) {
        const numsLength = num.length
        const percentages: number[] = []
        for (let i = 0; i < numsLength; i++) {
            percentages.push(calculatePercentage(num[i], totalMass))
        }
        return percentages
    }
    return calculatePercentage(num, totalMass)
}

export function calculatePercentage(n: number, totalMass: number): number {
    return Number(((n / totalMass) * 100).toFixed(2))
}
