var crowdfunder;
var crowdfunder;
var Web3;
var web3;
var address=new Array();
var customers=Array();
customers.push(["Id", "Tit", "Tat"]);
var tats=new Array();;
class Funder {
    constructor(address,tit, tat)
    {
        this.address=address;
        this.tit=tit;
        this.tat=tat;    
    }
};
$(document).ready(function () {
Web3 = require('web3');
web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
var accounts = web3.eth.accounts;
accounts.forEach(function(v) {
    $("#supportFrom").append("<option val=\"" + v + "\">" + v + "</option>");
    $("#projectAddr").append("<option val=\"" + v + "\">" + v + "</option>");
});
var abi = JSON.parse('[{"constant":true,"inputs":[{"name":"b","type":"address"}],"name":"getTats","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"b","type":"address"}],"name":"getA","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tit","type":"uint256"},{"name":"tats","type":"uint256"}],"name":"addByLoad","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"b","type":"address"}],"name":"getTits","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tit","type":"uint256"},{"name":"tats","type":"uint256"}],"name":"addByTats","outputs":[],"payable":true,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[],"name":"AuctionEnded","type":"event"}]');
var contract = web3.eth.contract(abi);
crowdfunder = contract.at('0x976f5f2d322cb8e8094b4b20269e7640216d9a82');
document.getElementById('Add').value='0x976f5f2d322cb8e8094b4b20269e7640216d9a82' ; 
web3.eth.getBalance("0x976f5f2d322cb8e8094b4b20269e7640216d9a82",function(error, result) {
		if(!error)
		{
            document.getElementById('bal').value=result.c[0];
		}
        else
         document.getElementById('bal').value=error
    });
});


$("#submitBtn").click(function() {
    crowdfunder.addByTats.sendTransaction($("#tit").val(), $("#tat").val(), {
        from: $("#projectAddr").val(),
        value: $("#tit").val(),
        gas: 600000,
    }, function(err, data) {
        console.log(data);
         document.getElementById('txn').value=data;
        if (err) {
            console.error(err);
        }
    });
    web3.eth.getBalance("0x976f5f2d322cb8e8094b4b20269e7640216d9a82",function(error, result) {
		if(!error)
		{
            document.getElementById('bal').value=result.c[0];
		}
        else
         document.getElementById('bal').value=error
    });
});


$("#finishBtn").click(function() {
    //console.log('finished!');
    customers = new Array();
    tats=new Array();
    crowdfunder.getLength(function(err, data,callback ) {
        //console.log(data.c[0]);
        for(var j=0; j<=data.c[0]-1 ;j++)
            {
                crowdfunder.getAddress(j,function(err1, data1) {
                    address.push(data1);
                        crowdfunder.getA(data1,function(err2, data2) {
                        //console.log(data2);
                            customers.push([data1,data2[0].c[0],data2[1].c[0]])
                            tats.push([data1,data2[0].c[0],data2[1].c[0]])
                            if (err2) 
                            {
                                    console.error(err2);
                            }
                        });
                        if (err) 
                        {
                            console.error(err1);
                        }
                
            })
            }
        if(callback)
            {
             if(customers.length>1)
                    GenerateTable();
                    document.getElementById('txn').value=data;
                    tats=tats.sort(function(a,b)
                                   {
                                        return a[2] - b[2];
                                    });
                            var sum = 0;
for(var k=0;k<customers.length;k++){
    console.log(customers[k]);
    sum += customers[k][1];
}
        //console.log(customers);
        console.log(tats);
        console.log(sum);   
            
        
    };
    
    })
});

function FinalizeDonars() {
    var m=0;
    for(m=0;m<=tats.length;m++)
    {
            
    }
};

function GenerateTable() {
    //Build an array containing Customer records.
    
    var table = document.createElement("TABLE");
    table.border = "1";
 
    //Get the count of columns.
    var columnCount = customers[0].length;
 
    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = customers[0][i];
        row.appendChild(headerCell);
    }
 
    //Add the data rows.
    for (var i = 1; i < customers.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = customers[i][j];
        }
    }
 
    var dvTable = document.getElementById('dvTable');
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
};

