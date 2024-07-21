#!/usr/bin/env nodej
import inquirer from 'inquirer';
class BankAccount {
    accountBalance;
    constructor(accountBalance) {
        this.accountBalance = accountBalance;
    }
    debit(amount) {
        if (amount > this.accountBalance) {
            return "Insufficient funds";
        }
        else {
            this.accountBalance -= amount;
            return `Debited ${amount} from the account`;
        }
    }
    credit(amount) {
        this.accountBalance += amount;
        return `Credited ${amount} to the account`;
    }
}
class Customer {
    firstName;
    lastName;
    age;
    gender;
    mobileNumber;
    bankAccount;
    constructor(firstName, lastName, age, gender, mobileNumber, bankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.bankAccount = bankAccount;
    }
    customerInfo() {
        return `Name: ${this.firstName} ${this.lastName}
Age: ${this.age}
Gender: ${this.gender}
Mobile: ${this.mobileNumber}
Account Balance: ${this.bankAccount.accountBalance}`;
    }
}
async function promptCustomerInfo() {
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
    return new Customer(answers.firstName, answers.lastName, parseInt(answers.age), answers.gender, answers.mobileNumber, bankAccount);
}
async function main() {
    const customer = await promptCustomerInfo();
    console.log('Customer Information:');
    console.log(customer.customerInfo());
}
main();
