"use strict"

function idr(num) {
    return num.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'idr'
    })
}

module.exports = idr