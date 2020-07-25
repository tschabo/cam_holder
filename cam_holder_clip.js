
let w = 25;
let h = 23;

function horns() {
    let distance = 17.2
    let c = difference(
        cube({size:[2,2,1.4]}),
        translate(
            [0,0,0.8],
            cube({size:[2,1.1,0.6]})
            )
        );
    let both = union(
        c,
        translate(
            [distance, 0, 0],
            c
        )
    );
    return translate(
        [(w-distance)/2-1,h,0],both
    );
}

function base() {
    return union(
        cube({size:[w,h,1.4]}),
        translate(
            [-2,-2.8,0],
            cube({size:[w+4,4,1.4]})
        )
    )
}

function baseWithHorns() {
    return union(
        base(),
        horns()
    );
}

function baseWithHornsAntHole() {
    let side=14.5;
    c = cube({size:[side,side,1.5]});
    c = union(
        c,
        cylinder(
            {
                start:[side/2,side/2+3,0],
                end:[side/2,side/2+3,1.5],
                r:7
            }
        )
    )
    wihtHole = difference(
        baseWithHorns(),
        translate(
            [(w-side)/2, (h-side)/2+1,0],
            c
        )
    );
    wihtHole = difference(
        wihtHole,
        translate(
            [(w-side)/2-4,h/2-0.6,0],
            cube({size:[4,4,0.8]})
        )
    );
    return difference(
        wihtHole,
        translate(
            [(w-side)/2+side,h/2-0.5,0],
            cube({size:[4,4,0.8]})
        )
    );
}

function baseWithAll(){
    let teil = difference(
        cube({size:[1.5,5,-9]}),
        translate(
            [0,4,0],
            cube({size:[1.5,1,-7.9]})
        )
    );
    ret = union(
        baseWithHornsAntHole(),
        translate(
            [-2,-2.8,0],
            teil
        )
    );
    return union(
        ret,
        translate(
            [w+0.5, -2.8, 0],
            teil
        )
    );
}

function  main() {
    return baseWithAll();
}
