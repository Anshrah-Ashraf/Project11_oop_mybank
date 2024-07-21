#!/usr/bin/env nodej
import inquirer from 'inquirer';

interface IBankAccount {
    debit(amount: number): string;
    credit(amount: number): string;
}

class BankAccount implements IBankAccount {
    public accountBalance: number;

    constructor(accountBalance: number) {
        this.accountBalance = accountBalance;
    }

    debit(amount: number): string {
        if (amount > this.accountBalance) {
            return "Insufficient funds";
        } else {
            this.accountBalance -= amount;
            return `Debited ${amount} from the account`;
        }
    }

    credit(amount: number): string {
        this.accountBalance += amount;
        return `Credited ${amount} to the account`;
    }
}

class Customer {
    public firstName: string;
    public lastName: string;
    public age: number;
    public gender: string;
    public mobileNumber: string;
    public bankAccount: BankAccount;

    constructor(firstName: string, lastName: string, age: number, gender: string, mobileNumber: string, bankAccount: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.bankAccount = bankAccount;
    }

    customerInfo(): string {
        return `Name: ${this.firstName} ${this.lastName}
Age: ${this.age}
Gender: ${this.gender}
Mobile: ${this.mobileNumber}
Account Balance: ${this.bankAccount.accountBalance}`;
    }
}

async function promptCustomerInfo(): Promise<Customer> {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter First Name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter Last Name:'
        },
        {
            type: 'input',
            name: 'age',
            message: 'Enter Age:'
        },
        {
            type: 'input',
            name: 'gender',
            message: 'Enter Gender:'
        },
        {
            type: 'input',
            name: 'mobileNumber',
            message: 'Enter Mobile Number:'
        },
        {
            type: 'input',
            name: 'initialBalance',
            message: 'Enter Initial Account Balance:'
        }
    ]);

    const bankAccount = new BankAccount(parseFloat(answers.initialBalance));
    return new Customer(
        answers.firstName,
        answers.lastName,
        parseInt(answers.age),
        answers.gender,
        answers.mobileNumber,
        bankAccount
    );
}

async function main() {
    const customer = await promptCustomerInfo();
    console.log('Customer Information:');
    console.log(customer.customerInfo());
}

main();