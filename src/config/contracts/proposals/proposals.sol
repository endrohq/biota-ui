// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ProposalContract {
    address owner;

    struct Proposal {
        bytes32 id;
        bytes32 incidentId;
        string cid;
        address author;
        uint forVotes;
        uint againstVotes;
        uint abstainVotes;
    }

    mapping(bytes32 => Proposal) public proposals;
    mapping(bytes32 => bytes32[]) public proposalsByIncident;


    constructor() {
        owner = msg.sender;
    }

    function createProposal(bytes32 _incidentId, bytes32 _proposalId, string memory cid) public {
        proposals[_proposalId] = Proposal({
            id: _proposalId,
            cid: cid,
            incidentId: _incidentId,
            author: msg.sender,
            forVotes: 0,
            againstVotes: 0,
            abstainVotes: 0
        });
        proposalsByIncident[_incidentId].push(_proposalId);
    }

    function vote(bytes32 _proposalId, bool voteFor, bool voteAgainst) external payable {
        Proposal storage proposal = proposals[_proposalId];

        if (voteFor) {
            proposal.forVotes += 1;
        } else if (voteAgainst) {
            proposal.againstVotes += 1;
        } else {
            proposal.abstainVotes += 1;
        }
    }

    function getProposalsByIncidentIdAndPage(bytes32 _incidentId, uint page) public view returns (Proposal[] memory) {
        uint size = 4;

        uint incidentCount = proposalsByIncident[_incidentId].length;
        uint start = page * size;
        uint end = start + size;

        // Ensure the start index is not out of bounds
        require(start < incidentCount, "Start index out of bounds");

        // Adjust the end index if it's out of bounds
        if (end > incidentCount) {
            end = incidentCount;
        }

        Proposal[] memory proposalsPage = new Proposal[](end - start);

        // Loop through the range and assign each proposal to the new array
        for (uint i = 0; i < (end - start); i++) {
            bytes32 id = proposalsByIncident[_incidentId][start + i];
            proposalsPage[i] = proposals[id];
        }
        return proposalsPage;
    }

    function getProposalById(bytes32 _proposalId) public view returns (Proposal memory) {
        return proposals[_proposalId];
    }

}
