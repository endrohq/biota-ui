// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract IncidentContract {
    address owner;

    struct Incident {
        bytes32 id;
        string cid;
        address author;
    }

    mapping(bytes32 => Incident) public incidents;
    bytes32[] private incidentIds;


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

    function getIncidentByPage(uint page) public view returns (Incident[] memory) {
        uint size = 4;

        uint incidentCount = incidentIds.length;
        uint start = page * size;
        uint end = start + size;

        // Ensure the start index is not out of bounds
        require(start < incidentCount, "Start index out of bounds");

        // Adjust the end index if it's out of bounds
        if (end > incidentCount) {
            end = incidentCount;
        }

        Incident[] memory incidentsPage = new Incident[](end - start);

        // Loop through the range and assign each proposal to the new array
        for (uint i = 0; i < (end - start); i++) {
            bytes32 id = incidentIds[start + i];
            incidentsPage[i] = incidents[id];
        }
        return incidentsPage;
    }

    function getIncidentById(bytes32 _incidentId) public view returns (Incident memory) {
        return incidents[_incidentId];
    }

}
