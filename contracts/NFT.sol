// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './Roles.sol';

contract NFT is ERC721, ERC721Enumerable, ERC721URIStorage {
	using Counters for Counters.Counter;

	/*** Roles contract instance ***/

	Roles private rolesContractInstance;

	/*** Data Types ***/

	struct Token {
		uint256 id;
		string uri;
		uint256 mintedAt;
		address mintedBy; //This could be cellar name inherited from main contract
	}

	/*** Storage ***/

	//Token ID count
	Counters.Counter private _tokenIdCounter;

	//Tracks tokens
	mapping(uint256 => Token) private indexToToken;

	// Which tokens owner has
	mapping(address => uint256[]) private tokensOwnedBy;

	//Token validity (Used to know if bottle is authentic or not).
	mapping(uint256 => bool) public tokenIndexIsValid;

	/*** Modifiers ***/

	modifier onlySupplier() {
		require(rolesContractInstance.hasRole(rolesContractInstance.SUPPLIER_ROLE(), msg.sender), 'Only Suppliers');
		_;
	}

	modifier onlyVendor() {
		require(rolesContractInstance.hasRole(rolesContractInstance.VENDOR_ROLE(), msg.sender), 'Only Vendors');
		_;
	}

	modifier onlySupplierOrVendor() {
		require(
			rolesContractInstance.hasRole(rolesContractInstance.SUPPLIER_ROLE(), msg.sender) ||
				rolesContractInstance.hasRole(rolesContractInstance.VENDOR_ROLE(), msg.sender),
			'Only Suppliers or Vendors'
		);
		_;
	}

	/*** Events ***/

	event Mint(uint256 id, string tokenURI, uint256 mintedAt, address mintedBy);
	event Sell(address seller, address to, uint256 id);

	/*** Constructor ***/

	constructor(address _rolesContractAddress) ERC721('BottleFi', 'BTF') {
		rolesContractInstance = Roles(_rolesContractAddress);
	}

	/*** Methods ***/

	function mint(string memory _uri) external onlySupplier {
		uint256 tokenId = _tokenIdCounter.current();
		_tokenIdCounter.increment();

		Token memory token = Token({ id: tokenId, uri: _uri, mintedAt: block.timestamp, mintedBy: msg.sender });

		indexToToken[tokenId] = token;
		tokenIndexIsValid[tokenId] = true;
		tokensOwnedBy[msg.sender].push(tokenId);

		_safeMint(msg.sender, tokenId);
		_setTokenURI(tokenId, _uri);

		emit Mint(tokenId, _uri, block.timestamp, msg.sender);
	}

	function transfer(address _to, uint256 _tokenId) external onlySupplier returns (uint256) {
		address seller = ownerOf(_tokenId);
		require(seller == msg.sender, 'Only owner of this token can transfer');

		transferFrom(seller, _to, _tokenId);

		return _tokenId;
	}

	function sell(address _to, uint256 _tokenId) external onlySupplierOrVendor returns (uint256) {
		address seller = ownerOf(_tokenId);
		require(seller == msg.sender, 'Only owner of this token can sell');

		tokenIndexIsValid[_tokenId] = false;

		transferFrom(seller, _to, _tokenId);

		emit Sell(seller, _to, _tokenId);

		return _tokenId;
	}

	//Return token validity (Sold bottle = Invalid token)
	function isValidToken(uint256 _tokenId) external view returns (bool) {
		return tokenIndexIsValid[_tokenId];
	}

	//Return array of token owned IDs
	function tokensOfOwner() external view returns (uint256[] memory) {
		return tokensOwnedBy[msg.sender];
	}

	// Given an id, returns token data
	function getTokenById(uint256 _tokenId)
		public
		view
		returns (
			uint256,
			string memory,
			uint256,
			bool
		)
	{
		uint256 id = indexToToken[_tokenId].id;
		string memory uri = indexToToken[_tokenId].uri;
		uint256 mintedAt = indexToToken[_tokenId].mintedAt;
		bool isValid = tokenIndexIsValid[_tokenId];

		return (id, uri, mintedAt, isValid);
	}

	// The following functions are overrides required by Solidity.

	function supportsInterface(bytes4 interfaceId)
		public
		view
		override(ERC721, ERC721Enumerable, ERC721URIStorage)
		returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 tokenId,
		uint256 batchSize
	) internal override(ERC721, ERC721Enumerable) {
		super._beforeTokenTransfer(from, to, tokenId, batchSize);
	}

	function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
		super._burn(tokenId);
	}

	function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
		return super.tokenURI(tokenId);
	}
}
