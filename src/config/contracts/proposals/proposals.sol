// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ProposalContract {
    address owner;

    struct Proposal {
        bytes32 id;
        string forestTokenId;
        string cid;
        address author;
        uint forVotes;
        uint againstVotes;
        uint abstainVotes;
        uint startTimestamp;
        uint endTimestamp;
    }

    enum VoteChoice { FOR, AGAINST, ABSTAIN }

    struct VoterData {
        address voter;
        VoteChoice choice;
    }

    mapping(bytes32 => Proposal) public proposals;
    bytes32[] public proposalIds;
    mapping(bytes32 => mapping(address => bool)) private hasVoted;
    mapping(bytes32 => VoterData[]) public voters;



    constructor() {
        owner = msg.sender;
    }

    function createProposal(string memory _forestTokenId, bytes32 _proposalId, string memory cid, uint startTimestamp, uint endTimestamp) public {
        proposals[_proposalId] = Proposal({
            id: _proposalId,
            cid: cid,
            forestTokenId: _forestTokenId,
            author: msg.sender,
            forVotes: 0,
            againstVotes: 0,
            abstainVotes: 0,
            startTimestamp: startTimestamp,
            endTimestamp: endTimestamp
        });
        proposalIds.push(_proposalId);
    }

    function vote(bytes32 _proposalId, bool voteFor, bool voteAgainst) external {
        require(!hasVoted[_proposalId][msg.sender], "User already voted for this proposal");
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp >= proposal.startTimestamp && block.timestamp <= proposal.endTimestamp, "Voting period is not active");

        VoteChoice choice = VoteChoice.ABSTAIN;

        if (voteFor) {
            proposal.forVotes += 1;
            choice = VoteChoice.FOR;
        } else if (voteAgainst) {
            proposal.againstVotes += 1;
            choice = VoteChoice.AGAINST;
        } else {
            proposal.abstainVotes += 1;
        }

        hasVoted[_proposalId][msg.sender] = true;
        voters[_proposalId].push(VoterData({
            voter: msg.sender,
            choice: choice
        }));
    }

    function getVotersForProposal(bytes32 _proposalId) public view returns (VoterData[] memory) {
        return voters[_proposalId];
    }

    function getProposalsByPage(uint page) public view returns (Proposal[] memory) {
        uint size = 4;

        uint tokenCount = proposalIds.length;
        uint start = page * size;
        uint end = start + size;

        // Ensure the start index is not out of bounds
        require(start < tokenCount, "Start index out of bounds");

        // Adjust the end index if it's out of bounds
        if (end > tokenCount) {
            end = tokenCount;
        }

        Proposal[] memory proposalsPage = new Proposal[](end - start);

        // Loop through the range and assign each proposal to the new array
        for (uint i = 0; i < (end - start); i++) {
            bytes32 id = proposalIds[start + i];
            proposalsPage[i] = proposals[id];
        }
        return proposalsPage;
    }

    function getProposalById(bytes32 _proposalId) public view returns (Proposal memory) {
        return proposals[_proposalId];
    }

}
