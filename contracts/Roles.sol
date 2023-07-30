// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract MainContract is AccessControl {

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

    /*** Methods ***/
    
    function addNewSupplier(string memory _name, string memory _description)
        public
        returns (Supplier memory)
    {
        require(bytes(_name).length >0 && bytes(_description).length >0 , "Name and desc cant be empty");
        require(!checkIfSupplierExist(), "Supplier already exist");
        suppliers[msg.sender].name = _name;
        suppliers[msg.sender].description = _description;
        _setupRole(SUPPLIER_ROLE, msg.sender);
        return getCurrentSupplier();
    }

    function addNewVendor(string memory _name, string memory _description)
        public
        returns (Vendor memory)
    {
        require(bytes(_name).length >0 && bytes(_description).length >0 , "Name and desc cant be empty");
        require(!checkIfVendorExist(), "Vendor already exist");
        vendors[msg.sender].name = _name;
        vendors[msg.sender].description = _description;
        _setupRole(VENDOR_ROLE, msg.sender);
        return getCurrentVendor();
    }

    function getCurrentSupplier() public view returns (Supplier memory) {
        return suppliers[msg.sender];
    }

    function getCurrentVendor() public view returns (Vendor memory) {
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
