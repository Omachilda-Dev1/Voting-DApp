// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VotingSystem {
    address public admin;
    uint256 public proposalCount;
    
    struct Proposal {
        uint256 id;
        string description;
        uint256 deadline;
        uint256 voteCount;
        bool exists;
        mapping(address => bool) hasVoted;
    }
    
    mapping(uint256 => Proposal) public proposals;
    
    event ProposalCreated(uint256 indexed proposalId, string description, uint256 deadline);
    event Voted(uint256 indexed proposalId, address indexed voter);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier proposalExists(uint256 _proposalId) {
        require(proposals[_proposalId].exists, "Proposal does not exist");
        _;
    }
    
    constructor() {
        admin = msg.sender;
    }
    
    function createProposal(string memory _description, uint256 _durationInMinutes) external onlyAdmin {
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_durationInMinutes > 0, "Duration must be greater than 0");
        
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.description = _description;
        newProposal.deadline = block.timestamp + (_durationInMinutes * 1 minutes);
        newProposal.voteCount = 0;
        newProposal.exists = true;
        
        emit ProposalCreated(proposalCount, _description, newProposal.deadline);
    }
    
    function vote(uint256 _proposalId) external proposalExists(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        
        require(block.timestamp < proposal.deadline, "Voting period has ended");
        require(!proposal.hasVoted[msg.sender], "You have already voted");
        
        proposal.hasVoted[msg.sender] = true;
        proposal.voteCount++;
        
        emit Voted(_proposalId, msg.sender);
    }
    
    function getProposal(uint256 _proposalId) external view proposalExists(_proposalId) 
        returns (uint256 id, string memory description, uint256 deadline, uint256 voteCount, bool isActive) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.id,
            proposal.description,
            proposal.deadline,
            proposal.voteCount,
            block.timestamp < proposal.deadline
        );
    }
    
    function hasVoted(uint256 _proposalId, address _voter) external view proposalExists(_proposalId) returns (bool) {
        return proposals[_proposalId].hasVoted[_voter];
    }
    
    function getWinner() external view returns (uint256 winnerId, string memory description, uint256 votes) {
        require(proposalCount > 0, "No proposals exist");
        
        uint256 maxVotes = 0;
        uint256 winningProposal = 0;
        
        for (uint256 i = 1; i <= proposalCount; i++) {
            if (proposals[i].exists && block.timestamp >= proposals[i].deadline) {
                if (proposals[i].voteCount > maxVotes) {
                    maxVotes = proposals[i].voteCount;
                    winningProposal = i;
                }
            }
        }
        
        require(winningProposal > 0, "No completed proposals found");
        
        return (
            winningProposal,
            proposals[winningProposal].description,
            proposals[winningProposal].voteCount
        );
    }
    
    function getAllProposals() external view returns (
        uint256[] memory ids,
        string[] memory descriptions,
        uint256[] memory deadlines,
        uint256[] memory voteCounts,
        bool[] memory activeStatus
    ) {
        ids = new uint256[](proposalCount);
        descriptions = new string[](proposalCount);
        deadlines = new uint256[](proposalCount);
        voteCounts = new uint256[](proposalCount);
        activeStatus = new bool[](proposalCount);
        
        for (uint256 i = 0; i < proposalCount; i++) {
            uint256 proposalId = i + 1;
            Proposal storage proposal = proposals[proposalId];
            ids[i] = proposal.id;
            descriptions[i] = proposal.description;
            deadlines[i] = proposal.deadline;
            voteCounts[i] = proposal.voteCount;
            activeStatus[i] = block.timestamp < proposal.deadline;
        }
        
        return (ids, descriptions, deadlines, voteCounts, activeStatus);
    }
}
