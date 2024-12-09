// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Roles.sol";

contract TokenValidation {
    // Types
    enum TokenState { Valid, Invalid }

    struct OwnerHistory {
        address owner;
        uint256 transferDate;
    }

    struct Token {
        address currentOwner;       // Current owner of the token
        TokenState state;           // Valid or Invalid
        uint256 productId;          // Reference to shared product metadata
        uint256 mintDate;           // Token minting timestamp
    }

    struct Batch {
        uint256 batchId;            // Unique batch ID
        uint256 productId;          // Reference to product metadata
        uint256 mintDate;           // Batch minting timestamp
        string ipfsHash;            // Batch-specific metadata
    }

    // Storage
    mapping(uint256 => Token) public tokens;                 // Token data by ID
    mapping(uint256 => Batch) public batches;                // Batch data by ID
    mapping(uint256 => uint256) public tokenToBatchId;       // Map token ID to batch ID
    uint256 private currentTokenId;                          // Auto-incrementing ID for tokens
    uint256 private currentBatchId;                          // Auto-incrementing ID for batches
    uint256 private currentProductId;                        // Auto-incrementing ID for products

    // Roles contract
    Roles private roles;

    // Events
    event ProductAdded(uint256 indexed productId, string ipfsHash);
    event BatchCreated(uint256 indexed batchId, uint256 productId, string ipfsHash);
    event TokensMinted(uint256 batchId, uint256[] tokenIds, uint256 productId, address indexed supplier);
    event TokensTransferred(uint256[] tokenIds, address indexed from, address indexed to);
    event TokensInvalidated(uint256[] tokenIds, address indexed vendor);
    event TokenOwnershipChanged(uint256 indexed tokenId, address from, address to, uint256 timestamp);

    constructor(address _rolesAddress) {
        roles = Roles(_rolesAddress);
    }

    /**
     * @dev Add a new product with metadata stored on IPFS.
     * Emits a {ProductAdded} event.
     * @param _ipfsHash The IPFS hash of the product metadata.
     */
    function addProduct(string calldata _ipfsHash) external {
        roles.ensureSupplier(msg.sender);

        currentProductId++;
        emit ProductAdded(currentProductId, _ipfsHash);
    }

    /**
     * @dev Mint tokens in a batch with shared metadata.
     * Emits {BatchCreated} and {TokensMinted} events.
     * @param _productId The ID of the product these tokens are associated with.
     * @param _quantity The number of tokens to mint.
     * @param _batchMetadata Batch-specific metadata stored off-chain.
     */
    function mintBatch(uint256 _productId, uint256 _quantity, string calldata _batchMetadata) external {
        roles.ensureSupplier(msg.sender);
        require(_quantity > 0, "Must mint at least one token");

        currentBatchId++;
        batches[currentBatchId] = Batch({
            batchId: currentBatchId,
            productId: _productId,
            mintDate: block.timestamp,
            ipfsHash: _batchMetadata
        });

        uint256[] memory mintedTokenIds = new uint256[](_quantity);

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 newTokenId = ++currentTokenId;

            tokens[newTokenId] = Token({
                currentOwner: msg.sender,
                state: TokenState.Valid,
                productId: _productId,
                mintDate: block.timestamp
            });

            tokenToBatchId[newTokenId] = currentBatchId;
            mintedTokenIds[i] = newTokenId;
        }

        emit BatchCreated(currentBatchId, _productId, _batchMetadata);
        emit TokensMinted(currentBatchId, mintedTokenIds, _productId, msg.sender);
    }

    /**
     * @dev Transfer ownership of multiple tokens in a batch.
     * Emits {TokensTransferred} and {TokenOwnershipChanged} events.
     * @param _tokenIds Array of token IDs to transfer.
     * @param _to The address of the new owner.
     */
    function transferTokens(uint256[] calldata _tokenIds, address _to) external {
        require(_to != address(0), "Cannot transfer to zero address");

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            uint256 tokenId = _tokenIds[i];
            Token storage token = tokens[tokenId];
            require(token.currentOwner == msg.sender, "Not the owner of this token");
            require(token.state == TokenState.Valid, "Token must be valid to transfer");

            address previousOwner = token.currentOwner;
            token.currentOwner = _to;

            emit TokenOwnershipChanged(tokenId, previousOwner, _to, block.timestamp);
        }

        emit TokensTransferred(_tokenIds, msg.sender, _to);
    }

    /**
     * @dev Invalidate multiple tokens in a batch.
     * Emits a {TokensInvalidated} event.
     * @param _tokenIds Array of token IDs to invalidate.
     */
    function invalidateTokens(uint256[] calldata _tokenIds) external {
        roles.ensureVendor(msg.sender);

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            uint256 tokenId = _tokenIds[i];
            Token storage token = tokens[tokenId];
            require(token.currentOwner == msg.sender, "Not the owner of this token");
            require(token.state == TokenState.Valid, "Token must be valid to invalidate");

            token.state = TokenState.Invalid;
        }

        emit TokensInvalidated(_tokenIds, msg.sender);
    }

    /**
     * @dev View token metadata by ID.
     * @param _tokenId The ID of the token to query.
     * Token details including owner, state, product ID, and mint date.
     */
    function getTokenInfo(uint256 _tokenId)
        external
        view
        returns (
            address currentOwner,
            TokenState state,
            uint256 productId,
            uint256 mintDate
        )
    {
        require(tokens[_tokenId].currentOwner != address(0), "Token does not exist");
        Token memory token = tokens[_tokenId];
        return (token.currentOwner, token.state, token.productId, token.mintDate);
    }

    /**
     * @dev Get batch metadata for a specific token.
     * @param _tokenId The ID of the token to query.
     * Batch metadata including product ID, mint date, and batch-specific IPFS hash.
     */
    function getBatchMetadata(uint256 _tokenId)
        external
        view
        returns (
            uint256 batchId,
            uint256 productId,
            uint256 mintDate,
            string memory batchMetadata
        )
    {
        require(tokens[_tokenId].currentOwner != address(0), "Token does not exist");
        uint256 tokenBatchId = tokenToBatchId[_tokenId]; 
        Batch memory batch = batches[tokenBatchId];
        return (batch.batchId, batch.productId, batch.mintDate, batch.ipfsHash);
    }
}
