// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ObjectionContract {
    address owner;

    struct Objection {
        bytes32 id;
        string cid;
        bytes32 proposalId;
        address author;
    }

    mapping(bytes32 => Objection) public objections;
    // Store the ids that belong to a proposal
    mapping(bytes32 => bytes32[]) private objectionsByProposalId;


    constructor() {
        owner = msg.sender;
    }

    function createObjection(bytes32 _objectionId, bytes32 _proposalId, string memory cid) public {
        objections[_objectionId] = Objection({
            id: _objectionId,
            cid: cid,
            proposalId: _proposalId,
            author: msg.sender
        });
        objectionsByProposalId[_proposalId].push(_objectionId);
    }

    function getObjectionsByPage(bytes32 _proposalId, uint page) public view returns (Objection[] memory) {
        uint size = 4;
        uint objectionCount = objectionsByProposalId[_proposalId].length;

        uint start = page * size;
        uint end = start + size;

        // Ensure the start index is not out of bounds
        require(start < objectionCount, "Start index out of bounds");

        // Adjust the end index if it's out of bounds
        if (end > objectionCount) {
            end = objectionCount;
        }

        Objection[] memory objectionsPage = new Objection[](end - start);

        // Loop through the range and assign each proposal to the new array
        for (uint i = 0; i < (end - start); i++) {
            bytes32 id = objectionsByProposalId[_proposalId][start + i];
            objectionsPage[i] = objections[id];
        }
        return objectionsPage;
    }

    function getObjectionById(bytes32 _objectionId) public view returns (Objection memory) {
        return objections[_objectionId];
    }

}
