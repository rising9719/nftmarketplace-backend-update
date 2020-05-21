let signUtil = require('eth-sig-util')

function getSignTypedData({ owner }) {
    return {
        types: {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'host', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' }
            ],
            Test: [
                { name: 'owner', type: 'string' },
            ]
        },
        domain: {
            name: 'Ether Mail',
            host: 'https://test.matic.network',
            version: '1',
            verifyingContract: '0x0',
            chainId: 3
        },
        primaryType: 'Test',
        message: { owner }
    }
}

function isValidSignature({ owner, signature }) {
    const signedData = getSignTypedData({ owner })
    let recovered
    try {
        recovered = signUtil.recoverTypedSignature({
            data: signedData,
            sig: signature
        })
    } catch (e) { }

    if (!recovered || recovered !== owner) {
        return false
    }
    return true
}

module.exports = {
    isValidSignature
}
