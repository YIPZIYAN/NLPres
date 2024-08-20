export interface Label {
    id: number
    name: string
    color: string
}

export default defineEventHandler((event) => {
    return {
        hello: 'world'
    }
})