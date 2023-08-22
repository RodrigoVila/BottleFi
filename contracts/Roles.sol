// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/access/AccessControl.sol';

contract Roles is AccessControl {
	/*** Data Types ***/

	struct Profile {
		string name;
		string description;
	}

	/*** Roles ***/

	bytes32 public constant SUPPLIER_ROLE = keccak256('SUPPLIER_ROLE');
	bytes32 public constant VENDOR_ROLE = keccak256('VENDOR_ROLE');

	/*** Storage ***/

	mapping(address => Profile) public suppliers;
	mapping(address => Profile) public vendors;

	/*** Modifiers ***/

	modifier onlyWithoutAssignedRole() {
		require(!hasRole(SUPPLIER_ROLE, msg.sender), 'Already registered as a supplier');
		require(!hasRole(VENDOR_ROLE, msg.sender), 'Already registered as a vendor');
		_;
	}

    /*** Events ***/

	event ProfileRegistered(address indexed account, bytes32 indexed role, string name);

	/*** Methods ***/

	function registerSupplier(string memory _name, string memory _description)
		public
		onlyWithoutAssignedRole
		returns (bool)
	{
		suppliers[msg.sender] = Profile(_name, _description);
		_grantRole(SUPPLIER_ROLE, msg.sender);
		emit ProfileRegistered(msg.sender, SUPPLIER_ROLE, _name);
		return true;
	}

	function registerVendor(string memory _name, string memory _description)
		public
		onlyWithoutAssignedRole
		returns (bool)
	{
		vendors[msg.sender] = Profile(_name, _description);
		_grantRole(VENDOR_ROLE, msg.sender);
		emit ProfileRegistered(msg.sender, VENDOR_ROLE, _name);
		return true;
	}
}
