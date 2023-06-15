// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ProposalContract {
    address owner;

    struct Proposal {
        string fileId;
        uint forVotes;
        address author;
        uint againstVotes;
        uint abstainVotes;
    }

    mapping(bytes32 => Proposal) public proposals;
    bytes32[] private proposalIds;

    constructor() {
        owner = msg.sender;
    }

    function createProposal(bytes32 id, string memory fileId) public {
        proposals[id] = Proposal({
            fileId: fileId,
            author: msg.sender,
            forVotes: 0,
            againstVotes: 0,
            abstainVotes: 0
        });
        proposalIds.push(id);
    }

    function vote(bytes32 id, bool voteFor, bool voteAgainst) external payable {
        Proposal storage proposal = proposals[id];

        if (voteFor) {
            proposal.forVotes += 1;
        } else if (voteAgainst) {
            proposal.againstVotes += 1;
        } else {
            proposal.abstainVotes += 1;
        }
    }

    function getProposalById(bytes32 id) public view returns (Proposal memory) {
        return proposals[id];
    }

    function getProposalIds() public view returns (bytes32[] memory) {
        return proposalIds;
    }

    function getVotes(bytes32 id) public view returns (uint, uint, uint) {
        Proposal storage proposal = proposals[id];
        return (proposal.forVotes, proposal.againstVotes, proposal.abstainVotes);
    }

}
