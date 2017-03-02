function *generators(){
    console.log(1);
    // return 3;
    var b = yield () => {return 5};
    console.log(b);
    yield 2;
}

var a = generators()
var c = a.next();
console.log( c )
console.log( a.next() )

// console.log( generators().next() )