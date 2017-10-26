pragma solidity ^0.4.0;

// add call guard
// add schedule
// add withdraw


contract Tats {
    struct Funder {
        uint tit;
        uint tats; 
        bool done;
    } //overflow??
    
    mapping(address => Funder) funders;
    address[] fundersA;
    
    
    address owner;
    
    event AuctionEnded(); //use for withdraw
    
    function Tats() {
        owner = msg.sender;
    }
    function add(address funder, uint _tit, uint _tats) internal {
        
        //disallow reentry? or your recalc is fucekd.
        
        funders[funder] = Funder({
            tit: _tit,
            tats: _tats,
            done: false
        });
        
        fundersA.push(funder);
        
    }
    
    function addByTats(uint tit,uint tats) payable {
        add(msg.sender, tit, tats);
    }
	

    function addByLoad(uint tit,uint tats) payable {
        add(msg.sender, tit, tats); // mult overflow!!
    }
    
    function getTits(address b) constant returns(uint)
    {
        return funders[b].tit;
    }
    
    function getTats(address b) constant returns(uint)
    {
        return funders[b].tats;
    }
    
    
    function getLength() constant returns(uint)
    {
        return fundersA.length;
    }
    function getAddress(uint i) constant returns(address)
    {
        return fundersA[i];
    }
    
   function getA(address b) constant returns(uint,uint)
    {
        return (funders[b].tit,funders[b].tats);
    }
    
    
}T
