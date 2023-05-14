import express, { Express, Request, Response } from "express"
import { createAccount, deleteAccount, getAccount, getAllAccounts, inputValidate, updateAccount } from "./handlers";
import { Account } from "./types/account";

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())

// get all accounts
app.get('/api/accounts', async (req: Request, res: Response) => {
    try {
        const accounts = getAllAccounts();
        return res.status(200).json({ accounts });
    } catch(error) {
        return res.status(500).json({ err: 'Something went wrong' });
    }
})

// get single account
app.get('/api/accounts/:email', (req: Request, res: Response) => {
    const { email } = req.params;
    try {        
        const account = getAccount(email);
        if (!account) {
            return res.status(404).json({ err: 'No account found' });
        }
        return res.status(200).json({ account });
    } catch(error) {
        return res.status(500).json({ err: 'Something went wrong' });
    }
})

// create new account
app.post('/api/accounts', (req: Request, res: Response) => {
    const newAccount = req.body as Omit<Account, 'id'>
    const validationPassed = inputValidate(newAccount);
    if (!validationPassed) {
        return res.status(400).send();
    }
    try {
        const accountCreated = createAccount(newAccount)
        if (!accountCreated) {
            return res.status(500).json({ err: 'Account could not be created' });
        }
        return res.status(200).send();
    } catch(error) {
        return res.status(500).json({ err: 'Something went wrong' });
    }
})

// update existing account 
app.patch('/api/accounts/:email', (req: Request, res: Response) => {
    const { email } = req.params as Pick<Account, 'email'>;
    const newAccount = req.body as Account
    const validationPassed = inputValidate(newAccount);
    if (!validationPassed) {
        return res.status(400).send();
    }
    try {
       const accountUpdated = updateAccount(email, newAccount)
       if (!accountUpdated) {
        return res.status(500).json({ err: 'Account could not be updated' });
    }
       return res.status(200).send();
    } catch(e) {
        return res.status(500).json({ err: 'Something went wrong' });
    }
})

// delete single account
app.delete('/api/accounts/:email', (req: Request, res: Response) => {
    const { email } = req.params as Pick<Account, 'email'>;
    const validationPassed = inputValidate({ email: email });
    if (!validationPassed) {
        return res.status(400).send();
    }
    try {
        const accountDeleted = deleteAccount(email)
        if (!accountDeleted) {
            return res.status(500).json({ err: 'Account could not be deleted' });
        }
        return res.status(200).send();

    } catch(e) {
        return res.status(500).json({ err: 'Something went wrong' });
    }
})

app.listen(port, () => {
    console.log(`Running on ${port}`)
})