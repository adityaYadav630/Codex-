// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SplitChain {
    uint public expenseCount;

    struct Expense {
        uint id;
        string title;
        uint amount;
        address paidBy;
    }

    mapping(uint => Expense) public expenses;

    function addExpense(string memory _title) public payable {
        require(msg.value > 0, "Amount must be > 0");

        expenseCount++;

        expenses[expenseCount] = Expense(
            expenseCount,
            _title,
            msg.value,
            msg.sender
        );
    }
}
