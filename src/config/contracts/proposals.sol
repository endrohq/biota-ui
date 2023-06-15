// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ProposalContract {
    address owner;

    struct Proposal {
        bytes32 id;
        string cid;
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

    function createProposal(bytes32 id, string memory cid) public {
        proposals[id] = Proposal({
            id: id,
            cid: cid,
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

    function getProposalsPage(uint page) public view returns (Proposal[] memory) {
        uint size = 10;

        uint start = page * size;
        uint end = start + size;

        // Ensure the start index is not out of bounds
        require(start < proposalIds.length, "Start index out of bounds");

        // Adjust the end index if it's out of bounds
        if (end > proposalIds.length) {
            end = proposalIds.length;
        }

        Proposal[] memory proposalPage = new Proposal[](end - start);

        // Loop through the range and assign each proposal to the new array
        for (uint i = 0; i < (end - start); i++) {
            bytes32 id = proposalIds[start + i];
            proposalPage[i] = proposals[id];
        }

        return proposalPage;
    }

    function getVotes(bytes32 id) public view returns (uint, uint, uint) {
        Proposal storage proposal = proposals[id];
        return (proposal.forVotes, proposal.againstVotes, proposal.abstainVotes);
    }

}
