//flocking algorithm is forked from https://p5js.org/examples/simulate-flocking.html;

 let flock;
 let flockNum = 100;
 let pallete = ["#508391", "#FCA258", "#CE270E", "#070F19", "#F35F1A", "#F78B30", "#354838", "#F2C3A9", "#508391"];
 let bg;

 function setup() {
   createCanvas(800, 800);
   let n = int(random(pallete.length));
   bg = pallete[n];
   pallete.splice(n, 1);

   background(bg);

   flock = new Flock();
   for (let i = 0; i < flockNum; i++) {
     let b = new Boid(
       random(width),
       random(height),
       pallete.concat());
     flock.addBoid(b);
   }
 }

 function draw() {
   flock.run();
   flock.removeBoid();
 }
 function keyPressed() {
   background(bg);
 }
 function mouseDragged() {
   flock.addBoid(new Boid(mouseX, mouseY, pallete.concat()));
 }

 class Flock {
   constructor() {
     this.boids = [];
   }
   run() {
     for (let b of this.boids) {
       b.run(this.boids);
     }
   }
   addBoid(b) {
     this.boids.push(b);
   }
   removeBoid() {
     let removeBoid = [];
     let n = 0;
     for (let b of this.boids) {
       if (b.isDead()) {
         removeBoid.push(n);
       }
       n++;
     }
     for (let i = removeBoid.length; i > 0; i--) {
       this.boids.splice(removeBoid[i], 1);
     }
   }
 }

 class Boid {
   constructor(x, y, p) {
     this.acceleration = createVector(0, 0);
     this.velocity = createVector(random(-1, 1), random(-1, 1));
     this.position = createVector(x, y);
     this.rMax = 6;
     this.r = random(this.rMax / 2, this.rMax);
     this.maxspeed = 3;
     this.maxforce = 0.05;
     this.pallete = p;
     this.c = random(this.pallete);
     this.life = 5;
     this.lifeSpan = this.life / random(150, 300);
   }

   run(boids) {
     this.flock(boids);
     this.update();
     this.borders();
     this.render();
   }
   isDead() {
     return this.life < 0;
   }
   applyForce(force) {
     this.acceleration.add(force);
   }

   flock(boids) {
     let sep = this.separate(boids); // Separation
     let ali = this.align(boids); // Alignment
     let coh = this.cohesion(boids); // Cohesion
     sep.mult(1.5);
     ali.mult(1.0);
     coh.mult(1.0);
     this.applyForce(sep);
     this.applyForce(ali);
     this.applyForce(coh);
   }

   update() {
     this.velocity.add(this.acceleration);
     this.velocity.limit(this.maxspeed);
     this.position.add(this.velocity);
     this.acceleration.mult(0);
     this.life -= this.lifeSpan;
   }

   seek(target) {
     let desired = p5.Vector.sub(target, this.position);
     desired.normalize();
     desired.mult(this.maxspeed);
     let steer = p5.Vector.sub(desired, this.velocity);
     steer.limit(this.maxforce);
     return steer;
   }

   render() {
     let theta = this.velocity.heading() + radians(90);
     this.r = map(this.life, 5, 0, this.rMax, 0);
     fill(this.c);
     noStroke();
     push();
     translate(this.position.x, this.position.y);
     rotate(theta);
     beginShape();
     vertex(0, -this.r * 2);
     vertex(-this.r, this.r * 2);
     vertex(this.r, this.r * 2);
     endShape(CLOSE);
     pop();
   }

   borders() {
     if (this.position.x < -this.r) this.position.x = width + this.r;
     if (this.position.y < -this.r) this.position.y = height + this.r;
     if (this.position.x > width + this.r) this.position.x = -this.r;
     if (this.position.y > height + this.r) this.position.y = -this.r;
   }

   separate(boids) {
     let desiredseparation = 25.0;
     let steer = createVector(0, 0);
     let count = 0;
     for (let i = 0; i < boids.length; i++) {
       let d = p5.Vector.dist(this.position, boids[i].position);
       if ((d > 0) && (d < desiredseparation)) {
         let diff = p5.Vector.sub(this.position, boids[i].position);
         diff.normalize();
         diff.div(d);
         steer.add(diff);
         count++;
       }
     }
     if (count > 0) {
       steer.div(count);
     }

     if (steer.mag() > 0) {
       steer.normalize();
       steer.mult(this.maxspeed);
       steer.sub(this.velocity);
       steer.limit(this.maxforce);
     }
     return steer;
   }

   align(boids) {
     let neighbordist = 50;
     let sum = createVector(0, 0);
     let count = 0;
     for (let i = 0; i < boids.length; i++) {
       let d = p5.Vector.dist(this.position, boids[i].position);
       if ((d > 0) && (d < neighbordist)) {
         sum.add(boids[i].velocity);
         count++;
       }
     }
     if (count > 0) {
       sum.div(count);
       sum.normalize();
       sum.mult(this.maxspeed);
       let steer = p5.Vector.sub(sum, this.velocity);
       steer.limit(this.maxforce);
       return steer;
     } else {
       return createVector(0, 0);
     }
   }

   cohesion(boids) {
     let neighbordist = 50;
     let sum = createVector(0, 0);
     let count = 0;
     for (let i = 0; i < boids.length; i++) {
       let d = p5.Vector.dist(this.position, boids[i].position);
       if ((d > 0) && (d < neighbordist)) {
         sum.add(boids[i].position);
         count++;
       }
     }
     if (count > 0) {
       sum.div(count);
       return this.seek(sum);
     } else {
       return createVector(0, 0);
     }
   }
 }