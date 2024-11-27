// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./Roles.sol";

contract Tokens is ERC1155 {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    /*** Roles Contract Instance ***/
    Roles private rolesContractInstance;

    /*** Data Types ***/
    struct Token {
        uint256 id;
        string uri;
        uint256 mintedAt;
        address mintedBy;
    }

    /*** Storage ***/
    Counters.Counter private _tokenIdCounter; // Counter for auto-generating token IDs
    mapping(uint256 => Token) public tokenMetadata; // Token metadata by ID
    mapping(address => mapping(uint256 => EnumerableSet.UintSet)) private ownerTokens; // ownerTokens[tokenId][1,2,3]
    mapping(uint256 => mapping(uint256 => bool)) public tokenValidity; // Tracks token validity tokenValidity[typeId][unitId]: true/False

    /*** Modifiers ***/
    modifier onlySupplier() {
        require(
            rolesContractInstance.isSupplier(msg.sender),
            "Only supplier roles can perform this task"
        );
        _;
    }

    modifier onlyVendor() {
        require(
            rolesContractInstance.isVendor(msg.sender),
            "Only vendor roles can perform this task"
        );
        _;
    }

    modifier onlySupplierOrVendor() {
        require(
            rolesContractInstance.isSupplier(msg.sender) ||
                rolesContractInstance.isVendor(msg.sender),
            "Only suppliers or vendors can perform this task"
        );
        _;
    }

    /*** Events ***/
    event Mint(uint256 indexed id, uint256 amount, address indexed mintedBy);
    event Sell(
        address indexed seller,
        address indexed buyer,
        uint256 id,
        uint256 amount,
        uint256 timestamp
    );

    /*** Constructor ***/
    constructor(address _rolesContractAddress) ERC1155("") {
        rolesContractInstance = Roles(_rolesContractAddress);
    }

    /*** Methods ***/
    // Create a new token with metadata or add amount to a existing one
    function mint(
        string memory _uri,
        uint256 _typeID,
        uint256 _amount
    ) external onlySupplier {
        uint256 typeID = _typeID;

        // Create a new token type if it doesn't exist
        if (typeID == 0) {
            _tokenIdCounter.increment();
            typeID = _tokenIdCounter.current();

            tokenMetadata[typeID] = Token({
                id: typeID,
                uri: _uri,
                mintedAt: block.timestamp,
                mintedBy: msg.sender
            });
        } else {
            // Ensure the typeID exists
            require(tokenMetadata[typeID].mintedAt != 0, "Token ID does not exist");
        }

        // Update storage vars
        for (uint256 i = 1; i <= _amount; i++) {
            tokenValidity[typeID][i] = true;
            ownerTokens[msg.sender][typeID].add(i);
        }

        // Mint tokens
        _mint(msg.sender, typeID, _amount, "");

        emit Mint(typeID, _amount, msg.sender);
    }

    // Transfer token(s) to another user without invalidating
    function transfer(address _to, uint256 _typeID, uint256 amount) external {
        require(tokenMetadata[_typeID].mintedAt != 0, "Token ID does not exist");
        require(balanceOf(msg.sender, _typeID) >= amount, "Insufficient balance");

        // Update ownership tracking
        ownerTokens[msg.sender][_typeID].remove(unitID);
        ownerTokens[to][typeID].add(unitID);

        // Transfer tokens
        safeTransferFrom(msg.sender, _to, id, amount, "");
    }

    // Sell a token and invalidate it
    function sell(
        address to,
        uint256 id,
        uint256 amount
    ) external onlySupplierOrVendor {
        require(balanceOf(msg.sender, id) >= amount, "Insufficient balance");
        require(tokenMetadata[id].isValid, "Invalid tokens cannot be sold");

        // Mark token as invalid
        tokenMetadata[id].isValid = false;

        // Update ownership tracking
        ownerTokens[msg.sender].remove(id);
        ownerTokens[to].add(id);

        // Transfer tokens
        safeTransferFrom(msg.sender, to, id, amount, "");

        emit Sell(msg.sender, to, id, amount, block.timestamp);
    }

    // Given an id, returns token data
    function getTokenById(
        uint256 id
    ) public view returns (uint256, string memory, uint256, bool) {
        require(tokenMetadata[id].mintedAt != 0, "Token ID does not exist");
        Token memory token = tokenMetadata[id];
        return (token.id, token.uri, token.mintedAt, token.isValid);
    }

    // List tokens ids owned by the caller
    function listMyTokens() external view returns (uint256[] memory) {
        uint256[] memory tokens = new uint256[](
            ownerTokens[msg.sender].length()
        );
        for (uint256 i = 0; i < ownerTokens[msg.sender].length(); i++) {
            tokens[i] = ownerTokens[msg.sender].at(i);
        }
        return tokens;
    }

    // Check if a token is valid
    function isValidToken(uint256 id) public view returns (bool) {
        return tokenMetadata[id].isValid;
    }
}
