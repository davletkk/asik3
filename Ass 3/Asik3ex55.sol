function swapNFT(uint256 oldTokenId, uint256 newTokenId) public {
    require(_isApprovedOrOwner(_msgSender(), oldTokenId), "Not approved or not owner of the old token");
    require(!_exists(newTokenId), "New token ID already exists");

    _burn(oldTokenId);
    _safeMint(_msgSender(), newTokenId);
}
