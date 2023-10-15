
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private _baseURI;
    
    constructor(string memory baseURI) ERC721("MyNFT", "NFT") {
        _baseURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURI;
    }

    function setBaseURI(string memory newBaseURI) external {
        _baseURI = newBaseURI;
    }

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
