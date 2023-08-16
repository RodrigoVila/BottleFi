// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.19;

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

    modifier onlySupplier() {
        require(hasRole(SUPPLIER_ROLE, msg.sender), "Only Suppliers");
        _;
    }

    modifier onlyVendor() {
        require(hasRole(VENDOR_ROLE, msg.sender), "Only Vendors");
        _;
    }

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
        require(!checkIfSupplierExist(), "Supplier already exist");
        require(
            !checkIfVendorExist(),
            "Account already registered as a vendor"
        );
        suppliers[msg.sender] = Supplier(_name, _description);
        _setupRole(SUPPLIER_ROLE, msg.sender);
        return getCurrentSupplier();
    }

    function addNewVendor(
        string memory _name,
        string memory _description
    ) public onlyDataCompleted(_name, _description) returns (Vendor memory) {
        require(!checkIfVendorExist(), "Vendor already exist");
        require(
            !checkIfSupplierExist(),
            "Account already registered as a supplier"
        );
        vendors[msg.sender] = Vendor(_name, _description);
        _setupRole(VENDOR_ROLE, msg.sender);
        return getCurrentVendor();
    }

    function getCurrentSupplier() internal view returns (Supplier memory) {
        return suppliers[msg.sender];
    }

    function getCurrentVendor() internal view returns (Vendor memory) {
        return vendors[msg.sender];
    }

    function checkIfSupplierExist() public view returns (bool) {
        return bytes(suppliers[msg.sender].name).length > 0;
    }

    function checkIfVendorExist() public view returns (bool) {
        return bytes(vendors[msg.sender].name).length > 0;
    }

    function getSenderAddress() public view returns (address) {
        return msg.sender;
    }
}
