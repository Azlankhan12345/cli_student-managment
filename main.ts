#!/usr/bin/env node
import inquirer from "inquirer";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);

let myBalance: number = 0;

async function main() {
    const answer = await inquirer.prompt([
        {
            name: "student",
            type: "input",
            message: "Enter student name:",
            validate: function (value: string) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please Enter a non-empty value.";
            },
        },
        {
            name: "course",
            type: "list",
            message: "Select the course to enroll",
            choices: ["MS.OFFICE", "HTML", "JAVASCRIPT", "Typescript", "PYTHON"],
        },
    ]);

    const tuitionfees: { [key: string]: number } = {
        "MS.OFFICE": 1000,
        "HTML": 1500,
        "JAVASCRIPT": 2500,
        "Typescript": 5000,
        "PYTHON": 7500,
    };

    console.log(`\nTuition Fees: ${tuitionfees[answer.course]}/-\n`);

    let paymentType = await inquirer.prompt([
        {
            name: "payment",
            type: "list",
            message: "select payment method",
            choices: ["Bank Transfer", "Easypasia", "Jazzcash"]
        },
        {
            name: "amount",
            type: "input",
            message: "Transfer Money",
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please Enter a non-empty value.";
            },
        }
    ]);

    console.log(`\nyou select Payment Method ${paymentType.payment}`);

    const tuitionFees = tuitionfees[answer.course];
    const paymentAmount = parseFloat(paymentType.amount);

    if (tuitionFees === paymentAmount) {
        console.log(`Congratulations, you have successfully enrolled in ${answer.course}.\n`);
    } else {
        console.log("Invalid amount due to course\n");
    }

    let ans = await inquirer.prompt([
        {
            name: "Select",
            type: "list",
            message: "what would you like to do next?",
            choices: ["View status", "Exit"]
        }
    ]);

    if (ans.Select === "View status") {
        console.log("\n******Status******\n");
        console.log(`Student Name: ${answer.student}`);
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Course: ${answer.course}`);
        console.log(`Tuition Fees Paid: ${paymentAmount}`);
        console.log(`Balance: ${myBalance += paymentAmount}`);
    } else {
        console.log("\nExiting Student Management System\n");
    }
}
main()