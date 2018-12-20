const uncompress = key => {
    if (!key.compressed) {
        throw new Error('Publick key is not compressed.')
    }

    const x = key.point.getX()
    const y = key.point.getY()

    const xbuf = x.toBuffer({
        size: 32,
    })

    const ybuf = y.toBuffer({
        size: 32,
    })

    return Buffer.concat([Buffer.from([0x04]), xbuf, ybuf])
}

const compress = key => {
    if (key.compressed) {
        throw new Error('Publick key is already compressed.')
    }
    const x = key.point.getX()
    const y = key.point.getY()

    const xbuf = x.toBuffer({
        size: 32,
    })
    const ybuf = y.toBuffer({
        size: 32,
    })

    let prefix

    const odd = ybuf[ybuf.length - 1] % 2
    if (odd) {
        prefix = new Buffer([0x03])
    } else {
        prefix = new Buffer([0x02])
    }
    return Buffer.concat([prefix, xbuf])
}

module.exports = {
    compress,
    uncompress,
}
