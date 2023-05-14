import fs from 'fs'
import { v4 as uuid } from 'uuid';
import { Account, AccountUpdate } from "./types/account"

const accountFile = 'src/accounts.json'

export const inputValidate = (input: AccountUpdate): boolean => {
    let passed = true
    const { name, address, phone, email, injured } = input;
    
    if (!!name) {
        const nameType = typeof name
        nameType === 'string' ? passed = true : passed = false
    }
    
    if (!!address) {
        const addressType = typeof address
        addressType === 'string' ? passed = true : passed = false
    }
    
    if (!!phone) {
        const phoneType = typeof phone
        phoneType === 'string' && phone.length <= 12 ? passed = true : passed = false
    }

    if (!!email) {
        const emailType = typeof email
        const emailRegex = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i;
        emailType === 'string' && emailRegex.test(email) ? passed = true : passed = false
    }

    if (!!injured) {
        const injuredType = typeof injured
        injuredType === 'boolean' ? passed = true : passed = false
    }

    return passed
}

export const getAllAccounts = (): Account[] => {
    const data = fs.readFileSync(accountFile).toString()
    const accounts: Account[] = JSON.parse(data)
    return accounts
}

export const getAccountEmails = (): string[] => {
    const accounts = getAllAccounts()
    return accounts.map(acc => acc.email)
}

export const checkEmailExists = (newEmail: string): boolean => {
    const emails = getAccountEmails()
    const accountExists = emails.some(email => email === newEmail)
    return accountExists
}

export const getAccount = (email: string): Account | undefined => {
    const accounts = getAllAccounts()
    const account = accounts.find(acc => acc.email === email)
    if (!!account) return account
}

export const createAccount = (newAccount: Omit<Account, 'id'>): boolean => {
    let createdSuccess: boolean
    const accountExists = checkEmailExists(newAccount.email);
    if (accountExists) {
        createdSuccess = false
        return createdSuccess
    }
    try {
        const accounts = getAllAccounts()
        const newId = uuid()
        const accountToAdd = { id: newId, ...newAccount}
        accounts.push(accountToAdd)
        fs.writeFileSync(accountFile, JSON.stringify(accounts))
        createdSuccess = true
        return createdSuccess;
    } catch(e) {
        createdSuccess = false
        return createdSuccess
    }
}   

export const updateAccount = (email: string, updateData: Account): boolean => {
    let updateSuccess: boolean
    const accountExists = checkEmailExists(email);
    if (!accountExists) {
        updateSuccess = false
        return updateSuccess
    }
    try {
        const accounts = getAllAccounts()
        const accountToUpdate = accounts.find(acc => acc.email === email)
        const updatedAccount = {...accountToUpdate, ...updateData}
        const updatedAccountsArr = accounts.filter(acc => acc.email !== email) 
        updatedAccountsArr.push(updatedAccount)
        fs.writeFileSync(accountFile, JSON.stringify(updatedAccountsArr))
        updateSuccess = true
        return updateSuccess
    } catch(e){
        updateSuccess = false
        return updateSuccess
    }
}

export const deleteAccount = (email: string) => {
    let deleteSuccess: boolean
    const accountExists = checkEmailExists(email);
    if (!accountExists) {
        deleteSuccess = false
        return deleteSuccess
    } try {
        const accounts = getAllAccounts()
        const updatedAccountsArr = accounts.filter(acc => acc.email !== email)
        fs.writeFileSync(accountFile, JSON.stringify(updatedAccountsArr))
        deleteSuccess = true
        return deleteSuccess
    } catch(e) {
        deleteSuccess = false
        return deleteSuccess
    }
}
