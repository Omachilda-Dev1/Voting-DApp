const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("VotingSystem", function () {
  let votingSystem;
  let admin, voter1, voter2, voter3;

  beforeEach(async function () {
    [admin, voter1, voter2, voter3] = await ethers.getSigners();
    const VotingSystem = await ethers.getContractFactory("VotingSystem");
    votingSystem = await VotingSystem.deploy();
  });

  describe("Test 1: Contract Deployment", function () {
    it("should set the deployer as admin", async function () {
      expect(await votingSystem.admin()).to.equal(admin.address);
    });

    it("should initialize with zero proposals", async function () {
      expect(await votingSystem.proposalCount()).to.equal(0);
    });
  });

  describe("Test 2: Proposal Creation", function () {
    it("should allow admin to create a proposal", async function () {
      await expect(votingSystem.createProposal("Proposal 1", 60))
        .to.emit(votingSystem, "ProposalCreated")
        .withArgs(1, "Proposal 1", await time.latest() + 3600);
      
      expect(await votingSystem.proposalCount()).to.equal(1);
    });

    it("should reject proposal creation from non-admin", async function () {
      await expect(
        votingSystem.connect(voter1).createProposal("Proposal 1", 60)
      ).to.be.revertedWith("Only admin can perform this action");
    });

    it("should reject empty description", async function () {
      await expect(
        votingSystem.createProposal("", 60)
      ).to.be.revertedWith("Description cannot be empty");
    });

    it("should reject zero duration", async function () {
      await expect(
        votingSystem.createProposal("Proposal 1", 0)
      ).to.be.revertedWith("Duration must be greater than 0");
    });
  });

  describe("Test 3: Voting Functionality", function () {
    beforeEach(async function () {
      await votingSystem.createProposal("Proposal 1", 60);
    });

    it("should allow a user to vote on an active proposal", async function () {
      await expect(votingSystem.connect(voter1).vote(1))
        .to.emit(votingSystem, "Voted")
        .withArgs(1, voter1.address);
      
      const proposal = await votingSystem.getProposal(1);
      expect(proposal.voteCount).to.equal(1);
    });

    it("should prevent double voting", async function () {
      await votingSystem.connect(voter1).vote(1);
      
      await expect(
        votingSystem.connect(voter1).vote(1)
      ).to.be.revertedWith("You have already voted");
    });

    it("should track multiple voters correctly", async function () {
      await votingSystem.connect(voter1).vote(1);
      await votingSystem.connect(voter2).vote(1);
      await votingSystem.connect(voter3).vote(1);
      
      const proposal = await votingSystem.getProposal(1);
      expect(proposal.voteCount).to.equal(3);
    });

    it("should reject voting on non-existent proposal", async function () {
      await expect(
        votingSystem.connect(voter1).vote(999)
      ).to.be.revertedWith("Proposal does not exist");
    });
  });

  describe("Test 4: Deadline Enforcement", function () {
    it("should reject votes after deadline", async function () {
      await votingSystem.createProposal("Proposal 1", 1);
      
      // Fast forward time by 2 minutes
      await time.increase(120);
      
      await expect(
        votingSystem.connect(voter1).vote(1)
      ).to.be.revertedWith("Voting period has ended");
    });

    it("should allow votes before deadline", async function () {
      await votingSystem.createProposal("Proposal 1", 60);
      
      // Fast forward time by 30 minutes (still before deadline)
      await time.increase(1800);
      
      await expect(votingSystem.connect(voter1).vote(1))
        .to.emit(votingSystem, "Voted");
    });

    it("should correctly report proposal active status", async function () {
      await votingSystem.createProposal("Proposal 1", 1);
      
      let proposal = await votingSystem.getProposal(1);
      expect(proposal.isActive).to.be.true;
      
      await time.increase(120);
      
      proposal = await votingSystem.getProposal(1);
      expect(proposal.isActive).to.be.false;
    });
  });

  describe("Test 5: Winner Determination", function () {
    it("should determine winner correctly", async function () {
      await votingSystem.createProposal("Proposal 1", 1);
      await votingSystem.createProposal("Proposal 2", 1);
      
      await votingSystem.connect(voter1).vote(1);
      await votingSystem.connect(voter2).vote(2);
      await votingSystem.connect(voter3).vote(2);
      
      await time.increase(120);
      
      const winner = await votingSystem.getWinner();
      expect(winner.winnerId).to.equal(2);
      expect(winner.votes).to.equal(2);
    });

    it("should reject getWinner when no proposals exist", async function () {
      await expect(
        votingSystem.getWinner()
      ).to.be.revertedWith("No proposals exist");
    });

    it("should reject getWinner when no proposals are completed", async function () {
      await votingSystem.createProposal("Proposal 1", 60);
      
      await expect(
        votingSystem.getWinner()
      ).to.be.revertedWith("No completed proposals found");
    });
  });

  describe("Test 6: Access Control", function () {
    it("should only allow admin to create proposals", async function () {
      await expect(
        votingSystem.connect(voter1).createProposal("Proposal", 60)
      ).to.be.revertedWith("Only admin can perform this action");
    });

    it("should allow anyone to vote", async function () {
      await votingSystem.createProposal("Proposal 1", 60);
      
      await expect(votingSystem.connect(voter1).vote(1))
        .to.emit(votingSystem, "Voted");
    });
  });

  describe("Test 7: Query Functions", function () {
    it("should return correct proposal details", async function () {
      await votingSystem.createProposal("Test Proposal", 60);
      
      const proposal = await votingSystem.getProposal(1);
      expect(proposal.id).to.equal(1);
      expect(proposal.description).to.equal("Test Proposal");
      expect(proposal.voteCount).to.equal(0);
    });

    it("should track voting status correctly", async function () {
      await votingSystem.createProposal("Proposal 1", 60);
      
      expect(await votingSystem.hasVoted(1, voter1.address)).to.be.false;
      
      await votingSystem.connect(voter1).vote(1);
      
      expect(await votingSystem.hasVoted(1, voter1.address)).to.be.true;
    });

    it("should return all proposals correctly", async function () {
      await votingSystem.createProposal("Proposal 1", 60);
      await votingSystem.createProposal("Proposal 2", 30);
      
      const allProposals = await votingSystem.getAllProposals();
      
      expect(allProposals.ids.length).to.equal(2);
      expect(allProposals.descriptions[0]).to.equal("Proposal 1");
      expect(allProposals.descriptions[1]).to.equal("Proposal 2");
    });
  });
});
