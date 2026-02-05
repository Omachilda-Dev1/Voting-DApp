# Testing Documentation

## Test Suite Overview

The VotingSystem smart contract includes 21 comprehensive test cases organized into 7 test suites.

## Running Tests

```bash
npx hardhat test
```

## Test Coverage

### Test 1: Contract Deployment (2 tests)
- ✅ Verifies deployer is set as admin
- ✅ Confirms initial proposal count is zero

### Test 2: Proposal Creation (4 tests)
- ✅ Admin can create proposals
- ✅ Non-admin cannot create proposals
- ✅ Empty descriptions are rejected
- ✅ Zero duration is rejected

### Test 3: Voting Functionality (4 tests)
- ✅ Users can vote on active proposals
- ✅ Double voting is prevented
- ✅ Multiple voters are tracked correctly
- ✅ Voting on non-existent proposals fails

### Test 4: Deadline Enforcement (3 tests)
- ✅ Votes after deadline are rejected
- ✅ Votes before deadline are accepted
- ✅ Proposal active status is accurate

### Test 5: Winner Determination (3 tests)
- ✅ Winner is correctly determined
- ✅ getWinner fails when no proposals exist
- ✅ getWinner fails when no proposals completed

### Test 6: Access Control (2 tests)
- ✅ Only admin can create proposals
- ✅ Anyone can vote

### Test 7: Query Functions (3 tests)
- ✅ Proposal details are returned correctly
- ✅ Voting status is tracked accurately
- ✅ All proposals can be retrieved

## Test Results

```
  VotingSystem
    Test 1: Contract Deployment
      √ should set the deployer as admin
      √ should initialize with zero proposals
    Test 2: Proposal Creation
      √ should allow admin to create a proposal
      √ should reject proposal creation from non-admin
      √ should reject empty description
      √ should reject zero duration
    Test 3: Voting Functionality
      √ should allow a user to vote on an active proposal
      √ should prevent double voting
      √ should track multiple voters correctly
      √ should reject voting on non-existent proposal
    Test 4: Deadline Enforcement
      √ should reject votes after deadline
      √ should allow votes before deadline
      √ should correctly report proposal active status
    Test 5: Winner Determination
      √ should determine winner correctly
      √ should reject getWinner when no proposals exist
      √ should reject getWinner when no proposals are completed
    Test 6: Access Control
      √ should only allow admin to create proposals
      √ should allow anyone to vote
    Test 7: Query Functions
      √ should return correct proposal details
      √ should track voting status correctly
      √ should return all proposals correctly

  21 passing (4s)
```

## Adding More Tests

To add additional tests, edit `test/VotingSystem.test.js`:

```javascript
describe("Your Test Suite", function () {
  it("should do something", async function () {
    // Your test code
  });
});
```

## Test Utilities

The test suite uses:
- **Hardhat Network Helpers**: For time manipulation
- **Chai**: For assertions
- **Ethers.js**: For contract interaction

## Coverage Report

To generate a coverage report:

```bash
npx hardhat coverage
```

## Continuous Integration

Add to `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npx hardhat test
```
