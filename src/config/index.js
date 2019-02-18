
module.exports = {
    PROVIDER: 'http://localhost:8545',
    DEMO_BORROWER_ADDRESS: "0xf4dd79a1d3cfb2758d3814e5e1e1788a3743729a",
    DEMO_LENDER_ADDRESS: "0x234ac10312ad2c32eca022b86691558c1f337a24",
    // DEMO_CONTRACT_ADDRESS: "0x3271579e495d3717e849170666e0720c420903c2",
    DEMO_CONTRACT_ADDRESS: "0xce03189Fd47a41A06A8a6bCC87fd78fe64E0686a",

    KYBER_NETWORK_PROXY: "0xd3add19ee7e5287148a5866784aE3C55bd4E375A",

    KNC_ADDRESS: '0x8c13AFB7815f10A8333955854E6ec7503eD841B7',
    MANA_ADDRESS: '0xe19Ec968c15f487E96f631Ad9AA54fAE09A67C8c',
    OMG_ADDRESS: '0x3750bE154260872270EbA56eEf89E78E6E21C1D9',
    SALT_ADDRESS: '0x7ADc6456776Ed1e9661B3CEdF028f41BD319Ea52',
    ZIL_ADDRESS: '0x400DB523AA93053879b20F10F56023b2076aC852',

    // TODO: import abis from external files
    OMG_ABI: [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}],
    CONTRACT_ABI: [{ "constant": true, "inputs": [], "name": "proxy", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xec556889" }, { "inputs": [ { "name": "_proxy", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "sender", "type": "address" }, { "indexed": false, "name": "destToken", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Swap", "type": "event", "signature": "0xea368a40e9570069bb8e6511d668293ad2e1f03b0d982431fd223de9f3b70ca6" }, { "constant": false, "inputs": [ { "name": "token", "type": "address" }, { "name": "destAddress", "type": "address" } ], "name": "execSwap", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0x5eab968d" }, { "constant": true, "inputs": [], "name": "meaningOfLife", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "pure", "type": "function", "signature": "0x5353455a" } ], 
    CONTRACT_BYTECODE: "0x6060604052341561000f57600080fd5b60405160208061057b83398101604052808051906020019091905050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506105008061007b6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635353455a1461005c5780635eab968d14610085578063ec556889146100d2575b600080fd5b341561006757600080fd5b61006f610127565b6040518082815260200191505060405180910390f35b6100d0600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610130565b005b34156100dd57600080fd5b6100e56104af565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000602a905090565b6000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663809a9e5573eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee86346000604051604001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200193505050506040805180830381600087803b151561024657600080fd5b6102c65a03f1151561025757600080fd5b5050506040518051906020018051905050809250506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637a2a04563486856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506020604051808303818588803b151561033857600080fd5b6125ee5a03f1151561034957600080fd5b505050506040518051905090508373ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b151561040157600080fd5b6102c65a03f1151561041257600080fd5b50505060405180519050151561042757600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167fea368a40e9570069bb8e6511d668293ad2e1f03b0d982431fd223de9f3b70ca68583604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a250505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a723058207629fe9a84f59396d900b1464a31d8014c68540a8b92d33eff48e49b032e49610029", 
}