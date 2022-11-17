// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Contract that creates the ERC721 Ownable profile image
contract ProfileImageNft is ERC721, Ownable {
    // Increments the number of NFTs with a counter 
    using Counters for Counters.Counter;
    using Strings for uint256;

    // Create the IDs for the tokens using the incremented counter.
    Counters.Counter _tokenIds;
    
    // Maps over the object and get the ID
    mapping(uint256 => string) _tokenURIs;

    struct RenderToken {
        uint256 id;
        string uri;
        string space;
    }

    constructor() ERC721("ProfileImageNft", "NUT") {}

    // Function that defines the Token URIs
    function _defineTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    // Maps the object and returns info based on the given tokenId
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "This URI doesn't exist on the provided ID");

        string memory _ActualURI = _tokenURIs[tokenId];
        return _ActualURI;
    }

    // Gives the user all their created tokens
    function getAllTokens() public view returns (RenderToken[] memory) {
        uint256 latestId = _tokenIds.current();
        RenderToken[] memory renders = new RenderToken[](latestId);
        
        for(uint256 index = 0; index <= latestId; index++) {
            if(_exists(index)) {
                // Creates an URI string
                string memory uri = tokenURI(index);

                // Appends the object to the renders array
                renders[index] = RenderToken(index, uri, " ");
            }
        }

        return renders;
    }

    // Function to mint the new NFTs
    function mint(address recipients, string memory _uri) public returns (uint256) {
        uint256 newId = _tokenIds.current();
        _mint(recipients, newId);
        _defineTokenURI(newId, _uri);
        _tokenIds.increment();

        return newId;
    }
}


