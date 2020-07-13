

shell_width = 1;
r_inner = 20.5 / 2.0;
r_outer = r_inner + shell_width;
w_inner = 73.5;
w_outer = w_inner + 2 * shell_width;

xdist_bolt_holes_centered = 20.7;
ydist_bolt_holes_centered = 13;


let width_subst = 25.5;

function nut(radius_, width_) {
    let cl = circle({ r: radius_, fn: 100 });
    let sq = translate([radius_, 0], square([width_ - (2 * radius_), (2 * radius_)]));
    let u1 = union(cl, sq);
    let cr = translate([width_ - (2 * radius_), 0], circle({ r: radius_, fn: 100 }));
    return union(u1, cr);
}

function holes(x_centered, y_centered, r_bolthole, height_) {

    let lower_left = cylinder({
        start: [0, 0, 0],
        end: [0, 0, height_],
        r: r_bolthole,
    });
    let lower_right = cylinder({
        start: [x_centered, 0, 0],
        end: [x_centered, 0, height_],
        r: r_bolthole,
    });
    u = union(lower_left, lower_right);
    u = union(u, translate([0, y_centered, 0], u));
    let middle_left = cylinder({
        start: [1, (y_centered / 2), 0],
        end: [1, (y_centered / 2), height_],
        r: r_bolthole,
    });
    let middle_right = cylinder({
        start: [x_centered - 1, (y_centered / 2) , 0],
        end: [x_centered - 1, (y_centered / 2) , height_],
        r: r_bolthole,
    });

    return translate([r_bolthole, r_bolthole, 0], union(u, union(middle_left, middle_right)));
}

function base(height_) {
    b = linear_extrude({ height: height_ }, nut(r_outer, w_outer));
    let height_subst = 1.5;
    let q = translate([(w_outer / 2) - (width_subst / 2), 0, height_ - height_subst], cube([width_subst, r_inner * 2 + shell_width, height_subst]));
    d = difference(b, q);
    let r_bolthole = 2.5;
    let holes_ = translate(
        [w_outer / 2 - (xdist_bolt_holes_centered + 2 * r_bolthole) / 2, 2.2, 0],
        holes(xdist_bolt_holes_centered, ydist_bolt_holes_centered, r_bolthole, 5)
    );
    return difference(d, holes_);
}

function shell(height_) {
    let n_outer = nut(r_outer, w_outer);
    let n_inner = translate([shell_width, shell_width], nut(r_inner, w_inner));
    v = linear_extrude({ height: height_ }, difference(n_outer, n_inner));
    let c = translate([w_outer / 2 - width_subst / 2, 0, 0], cube({ size: [width_subst, shell_width, height_] }));
    return difference(v, c);
}

function main() {
    //return holes(20.7, 13, 2.5, 4);

    let base_height = 5
    b = base(base_height);
    return union(b, translate([0, 0, base_height], shell(15)));
}