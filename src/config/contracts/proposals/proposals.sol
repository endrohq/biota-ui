// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ProposalContract {
    address owner;

    struct Proposal {
        bytes32 id;
        uint256 forestTokenId;
        string cid;
        address author;
        uint forVotes;
        uint againstVotes;
        uint abstainVotes;
    }

    mapping(bytes32 => Proposal) public proposals;
    bytes32[] public proposalIds;
    mapping(bytes32 => mapping(address => bool)) public voted; // Mapping to keep track of who voted on which proposal



    constructor() {
        owner = msg.sender;
    }

    function createProposal(uint256 _forestTokenId, bytes32 _proposalId, string memory cid) public {
        proposals[_proposalId] = Proposal({
            id: _proposalId,
            cid: cid,
            forestTokenId: _forestTokenId,
            author: msg.sender,
            forVotes: 0,
            againstVotes: 0,
            abstainVotes: 0
        });
        proposalIds.push(_proposalId);
    }

    function vote(bytes32 _proposalId, bool voteFor, bool voteAgainst) external payable {
        require(voted[_proposalId][msg.sender] == false, "User has already voted."); // Require that the user has not already voted

        Proposal storage proposal = proposals[_proposalId];

        if (voteFor) {
            proposal.forVotes += 1;
        } else if (voteAgainst) {
            proposal.againstVotes += 1;
        } else {
            proposal.abstainVotes += 1;
        }

        voted[_proposalId][msg.sender] = true; // Mark user as having voted on this proposal
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
