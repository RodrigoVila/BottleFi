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

    mapping(address => Profile) public profiles;

    /*** Modifiers ***/

    modifier onlyWithoutAssignedRole() {
        require(
            !hasRole(SUPPLIER_ROLE, msg.sender),
            "Already registered as a supplier"
        );
        require(
            !hasRole(VENDOR_ROLE, msg.sender),
            "Already registered as a vendor"
        );
        _;
    }

    /*** Events ***/

    event RoleAssigned(
        address indexed account,
        bytes32 indexed role,
        string name
    );

    /*** Methods ***/

	function register(
		string memory _name,
		string memory _description,
		string memory _roleType
	) public onlyWithoutAssignedRole returns (bool) {
		bytes32 roleType;
		if (keccak256(abi.encodePacked(_roleType)) == keccak256("supplier")) {
			roleType = SUPPLIER_ROLE;
		} else if (keccak256(abi.encodePacked(_roleType)) == keccak256("vendor")) {
			roleType = VENDOR_ROLE;
		} else {
			 revert("Invalid role type, must be 'supplier' or 'vendor'");
		}

		profiles[msg.sender] = Profile(_name, _description);
		_grantRole(roleType, msg.sender);
		emit RoleAssigned(msg.sender, roleType, _name);
		return true;
	}

    function isSupplier(address _account) external view returns (bool) {
        return hasRole(SUPPLIER_ROLE, _account);
    }

    function isVendor(address _account) external view returns (bool) {
        return hasRole(VENDOR_ROLE, _account);
    }
}
