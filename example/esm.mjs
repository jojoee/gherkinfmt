/**
 * ESM example for gherkinfmt
 */
import { check, format } from '../dist/esm/index.js';

// Hardcoded string for simplicity and copy-paste friendliness
// (see resource/all-cases.conf for comprehensive test cases)
const input = `
Feature: User Login
In order to access my account
As a registered user
I want to log in

Scenario: Successful login
Given I am on the login page
When I enter valid credentials
Then I should see the dashboard
`;

console.log('=== gherkinfmt ESM Example ===\n');

// Check if formatted
console.log('Is formatted:', check(input));

// Format the input
const formatted = format(input);
console.log('\nFormatted output:');
console.log(formatted);

// Check again
console.log('Is formatted now:', check(formatted));
