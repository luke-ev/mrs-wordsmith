import { inputValidate, getAllAccounts, getAccountEmails, checkEmailExists, getAccount, createAccount, updateAccount, deleteAccount } from "./handlers";

const testAccounts = [
    {
        "id": "566869d3-159c-47bd-8586-b52d758af382",
        "name": "Mohamed Salah",
        "address": "12 Anfield Road Liverpool L4 0TH",
        "phone": "07733111222",
        "email": "ms@lfc.co.uk",
        "injured": true
    },
    {
        "id": "5fda75eb-e8a8-4885-a292-a28c9581bc7c",
        "name": "Virgil van Dijk",
        "address": "14 Anfield Road Liverpool L4 0TH",
        "phone": "07733333444",
        "email": "vvd@lfc.co.uk",
        "injured": false
    },
    {
        "id": "7364b1f4-5c85-475f-a1fa-72e5b9cd1ece",
        "name": "Trent Alexander-Arnold",
        "address": "16 Anfield Road Liverpool L4 0TH",
        "phone": "07733555666",
        "email": "taa@lfc.co.uk",
        "injured": false
    },
    {
        "id": "43816053-4640-46ba-8dd6-3a057e42e844",
        "name": "Alisson Becker",
        "address": "18 Anfield Road Liverpool L4 0TH",
        "phone": "07733777888",
        "email": "ab@lfc.co.uk",
        "injured": false
    },
    {
        "id": "dc90839c-c9da-4836-a181-d3e17e2a43c5",
        "name": "Andrew Robertson",
        "address": "20 Anfield Road Liverpool L4 0TH",
        "phone": "07733999999",
        "email": "ar@lfc.co.uk",
        "injured": false
    }
]

test('inputs are validated correctly', () => {
    expect(inputValidate({ email: 'ms@lfc.co.u', injured: false })).toEqual(true)
})

test('all accounts are returned', () => {
    expect(getAllAccounts()).toEqual(testAccounts)
})

test('all account emails are returned', () => {
    expect(getAccountEmails()).toEqual(testAccounts.map(acc => acc.email))
})

test('should return true of email exists in account array', () => {
    expect(checkEmailExists('ms@lfc.co.uk')).toEqual(true)
})

test('should return correct account', () => {
    expect(getAccount('ms@lfc.co.uk')).toEqual(testAccounts.find(acc => acc.email === 'ms@lfc.co.uk'))
})
