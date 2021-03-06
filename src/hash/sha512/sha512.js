var _sha512_block_size = 128,
    _sha512_hash_size = 64;

function sha512_constructor ( options ) {
    options = options || {};
    options.heapSize = options.heapSize || 4096;

    if ( options.heapSize <= 0 || options.heapSize % 4096 )
        throw new IllegalArgumentError("heapSize must be a positive number and multiple of 4096");

    this.heap = options.heap || new Uint8Array(options.heapSize);
    this.asm = options.asm || sha512_asm( global, null, this.heap.buffer );

    this.BLOCK_SIZE = _sha512_block_size;
    this.HASH_SIZE = _sha512_hash_size;

    this.reset();
}

sha512_constructor.BLOCK_SIZE = _sha512_block_size;
sha512_constructor.HASH_SIZE = _sha512_hash_size;
var sha512_prototype = sha512_constructor.prototype;
sha512_prototype.reset =   hash_reset;
sha512_prototype.process = hash_process;
sha512_prototype.finish =  hash_finish;

var sha512_instance = null;

function get_sha512_instance () {
    if ( sha512_instance === null ) sha512_instance = new sha512_constructor( { heapSize: 0x100000 } );
    return sha512_instance;
}
