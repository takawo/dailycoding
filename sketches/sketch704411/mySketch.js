let points = [];

function setup() {
    createCanvas(600, 600);
    colorMode(HSB, 360, 100, 100, 100);
    angleMode(DEGREES);
}

function draw() {
    background(0, 0, 100);
    let cx = width / 2;
    let cy = height / 2;
    let rate = 0.85;
    let r = width / 2 * rate;

    push();
    translate(cx, cy + r / 5);
    rotate(30);
    beginShape();
    for (let i = 0; i < 3; i++) {
        let angle = 360 / 3 * i;
        let x = cos(angle) * r;
        let y = sin(angle) * r;
        vertex(x, y);
        let p = createVector(x, y);
        points.push(p);
    }
    endShape(CLOSE);

    for (let i = 0; i < 3; i++) {
        let p0 = points[i % 3];
        let p1 = points[(i + 1) % 3];
        let p2 = points[(i + 2) % 3];
        noFill();
        let offset = 1 / 3;
        for (let i = offset; i < 1; i += (1 - offset) / 10) {
            let pA = p5.Vector.lerp(p1, p0, i);
            let pB = p5.Vector.lerp(p2, p0, i);
            beginShape();
            vertex(pA.x, pA.y);
            vertex(pB.x, pB.y);
            vertex(p0.x, p0.y);
            endShape(CLOSE);
        }
    }
    pop();
    noLoop();
}
