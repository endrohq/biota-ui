// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract IncidentContract {
    address owner;

    struct Incident {
        bytes32 id;
        string cid;
        address author;
    }

    struct Proposal {
        bytes32 id;
        string cid;
        address author;
        uint forVotes;
        uint againstVotes;
        uint abstainVotes;
    }

    mapping(bytes32 => Incident) public incidents;
    bytes32[] private incidentIds;
    mapping(bytes32 => mapping(bytes32 => Proposal)) public proposals;
    mapping(bytes32 => bytes32[]) private proposalIds;


    constructor() {
        owner = msg.sender;
    }

    function createIncident(bytes32 _incidentId, string memory cid) public {
        incidents[_incidentId] = Incident({
            id: _incidentId,
            cid: cid,
            author: msg.sender
        });
        incidentIds.push(_incidentId);
    }

    function createProposal(bytes32 _incidentId, bytes32 _proposalId, string memory cid) public {
        proposals[_incidentId][_proposalId] = Proposal({
            id: _proposalId,
            cid: cid,
            author: msg.sender,
            forVotes: 0,
            againstVotes: 0,
            abstainVotes: 0
        });
        proposalIds[_incidentId].push(_proposalId); // add the proposalId to the list of proposalIds for this incident
    }

    function vote(bytes32 _incidentId, bytes32 _proposalId, bool voteFor, bool voteAgainst) external payable {
        Proposal storage proposal = proposals[_incidentId][_proposalId];

        if (voteFor) {
            proposal.forVotes += 1;
        } else if (voteAgainst) {
            proposal.againstVotes += 1;
        } else {
            proposal.abstainVotes += 1;
        }
    }

    function getIncidentByPage(uint page) public view returns (Incident[] memory) {
        uint size = 4;

        uint start = page * size;
        uint end = start + size;

        // Ensure the start index is not out of bounds
        require(start < incidentIds.length, "Start index out of bounds");

        // Adjust the end index if it's out of bounds
        if (end > incidentIds.length) {
            end = incidentIds.length;
        }

        Incident[] memory incidentsPage = new Incident[](end - start);

        // Loop through the range and assign each proposal to the new array
        for (uint i = 0; i < (end - start); i++) {
            bytes32 id = incidentIds[start + i];
            incidentsPage[i] = incidents[id];
        }
        return incidentsPage;
    }

    function getProposalsByIncidentIdAndPage(bytes32 _incidentId, uint page) public view returns (Proposal[] memory) {
        uint size = 4;

        uint start = page * size;
        uint end = start + size;

        // Ensure the start index is not out of bounds
        require(start < proposalIds[_incidentId].length, "Start index out of bounds");

        // Adjust the end index if it's out of bounds
        if (end > proposalIds[_incidentId].length) {
            end = proposalIds[_incidentId].length;
        }

        Proposal[] memory proposalsPage = new Proposal[](end - start);

        // Loop through the range and assign each proposal to the new array
        for (uint i = 0; i < (end - start); i++) {
            bytes32 id = proposalIds[_incidentId][start + i];
            proposalsPage[i] = proposals[_incidentId][id];
        }
        return proposalsPage;
    }

    function getIncidentById(bytes32 _incidentId) public view returns (Incident memory) {
        return incidents[_incidentId];
    }

    function getProposalById(bytes32 _incidentId, bytes32 _proposalId) public view returns (Proposal memory) {
        return proposals[_incidentId][_proposalId];
    }

}
