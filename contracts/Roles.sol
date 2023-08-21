// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Roles is AccessControl {
    /*** Data Types ***/

    struct Profile {
        string name;
        string description;
    }

    /*** Roles ***/

    bytes32 public constant SUPPLIER_ROLE = keccak256("SUPPLIER_ROLE");
    bytes32 public constant VENDOR_ROLE = keccak256("VENDOR_ROLE");

    /*** Storage ***/

    mapping(address => Profile) public suppliers;
    mapping(address => Profile) public vendors;

    /*** Events ***/

    event ProfileRegistered(address indexed account, string role, string name);

    /*** Methods ***/

    function register(
        string memory _role,
        string memory _name,
        string memory _description
    ) public returns (bool) {
        bytes32 parsedRole = keccak256(abi.encodePacked(_role));
        require(
            !hasRole(parsedRole, msg.sender),
            "Already registered as this role"
        );
        require(
            bytes(_name).length > 0 && bytes(_description).length > 0,
            "Name and desc cant be empty"
        );

        if (parsedRole == SUPPLIER_ROLE) {
            suppliers[msg.sender] = Profile(_name, _description);
        } else {
            vendors[msg.sender] = Profile(_name, _description);
        }

        _grantRole(parsedRole, msg.sender);

        emit ProfileRegistered(msg.sender, _role, _name);

        return true;
    }

    // TODO: Delete if not needed
    // function supplierExist() public view returns (bool) {
    //     return bytes(suppliers[msg.sender].name).length > 0;
    // }

    // function vendorExist() public view returns (bool) {
    //     return bytes(vendors[msg.sender].name).length > 0;
    // }
}
