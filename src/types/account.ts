export type Account = {
    id: string
    name: string
    address: string
    phone: string
    email: string
    injured: boolean
}

export type AccountUpdate = {
    name?: string
    address?: string
    phone?: string
    email: string
    injured?: boolean
}
