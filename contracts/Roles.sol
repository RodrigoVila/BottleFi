// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Roles is AccessControl {
    /*** Data Types ***/

    struct Supplier {
        string name;
        string description;
    }

    struct Vendor {
        string name;
        string description;
    }

    bytes32 public constant SUPPLIER_ROLE = keccak256("SUPPLIER_ROLE");
    bytes32 public constant VENDOR_ROLE = keccak256("VENDOR_ROLE");

    /*** Storage ***/

    mapping(address => Supplier) public suppliers;
    mapping(address => Vendor) public vendors;

    /*** Modifiers ***/

    modifier onlyDataCompleted(
        string memory _name,
        string memory _description
    ) {
        require(
            bytes(_name).length > 0 && bytes(_description).length > 0,
            "Name and desc cant be empty"
        );
        _;
    }

    /*** Methods ***/

    function addNewSupplier(
        string memory _name,
        string memory _description
    ) public onlyDataCompleted(_name, _description) returns (Supplier memory) {
        require(!supplierExist(), "Supplier already exist");
        require(!vendorExist(), "Account is already a vendor");

        suppliers[msg.sender] = Supplier(_name, _description);

        _grantRole(SUPPLIER_ROLE, msg.sender);

        return getCurrentSupplier();
    }

    function addNewVendor(
        string memory _name,
        string memory _description
    ) public onlyDataCompleted(_name, _description) returns (Vendor memory) {
        require(!vendorExist(), "Vendor already exist");
        require(!supplierExist(), "Account is already a supplier");

        vendors[msg.sender] = Vendor(_name, _description);

        _grantRole(VENDOR_ROLE, msg.sender);

        return getCurrentVendor();
    }

    function getCurrentSupplier() internal view returns (Supplier memory) {
        return suppliers[msg.sender];
    }

    function getCurrentVendor() internal view returns (Vendor memory) {
        return vendors[msg.sender];
    }

    function supplierExist() public view returns (bool) {
        return bytes(suppliers[msg.sender].name).length > 0;
    }

    function vendorExist() public view returns (bool) {
        return bytes(vendors[msg.sender].name).length > 0;
    }
}
