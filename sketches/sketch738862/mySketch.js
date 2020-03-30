//This code is  ported from  Golan Levin's awesome easing sketch written in Processing.
//https://github.com/golanlevin/Pattern_Master/blob/master/pattern_master/F00.pde

let offset;
let minX;
let maxX;
let minY;
let maxY;
let diameter;
let graphics;

function setup() {
  createCanvas(800, 800);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(100000, graphics);
  offset = width / 4;
  minX = offset;
  maxX = width - offset;
  minY = height / 2 - offset;
  maxY = height / 2 + offset;
  diameter = 200;
  frameRate(60);
}

function draw() {
  background("#4B9AAA");

  rectMode(CENTER);
  fill("#666666");
  noStroke();
  rect(width / 2, height / 2, width - offset * 2 + diameter, offset * 2 + diameter, 0, diameter, 0, diameter);
  let n = (frameCount / 150) % 2;
  n = constrain(n, 0, 1);

  let tx = pennerEaseOutBounce(n);
  let x = map(tx, 0, 1, minX, maxX);

  let ty = pennerEaseOutBounce(n)
  let y = map(ty, 0, 1, minY, maxY);
  noStroke();
  fill("#FFC107");
  ellipse(x, y, diameter, diameter);
  image(graphics, 0, 0);
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 100, 5);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 3);
    let h = random(1, 3);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}

// Penner's Equations

//------------------------------------------------------------------
function pennerEaseInBack(x) {
  let functionName = "Penner's Ease-In Back";

  let s = 1.70158;
  let y = x * x * ((s + 1.0) * x - s);
  return y;
}

//------------------------------------------------------------------
function pennerEaseOutBack(x) {
  let functionName = "Penner's Ease-Out Back";

  let s = 1.70158;
  x = x - 1.0;
  let y = (x * x * ((s + 1.0) * x + s) + 1.0);
  return y;
}

//------------------------------------------------------------------
function BrycePolynomial(x, n) {
  let functionName = "Bryce's Cubic";

  let xnm1 = pow(x, n - 1);
  let xn = xnm1 * x;

  return n * xnm1 - (n - 1) * xn;
}

//------------------------------------------------------------------
function pennerEaseInOutBack(x) {
  let functionName = "Penner's EaseInOut Back";

  let s = 1.70158 * 1.525;
  x /= 0.5;

  let y = 0;
  if (x < 1) {
    y = 1.0 / 2.0 * (x * x * ((s + 1.0) * x - s));
  } else {
    x -= 2.0;
    y = 1.0 / 2.0 * (x * x * ((s + 1.0) * x + s) + 2.0);
  }
  return y;
}


//------------------------------------------------------------------
function pennerEaseInQuadratic(t) {
  let functionName = "Penner's EaseIn Quadratic";
  return t * t;
}
//------------------------------------------------------------------
function pennerEaseOutQuadratic(t) {
  let functionName = "Penner's EaseOut Quadratic";
  return -1.0 * (t) * (t - 2);
}
//------------------------------------------------------------------
function pennerEaseInOutQuadratic(t) {
  let functionName = "Penner's EaseInOut Quadratic";
  if ((t /= 1.0 / 2) < 1) {
    return 1.0 / 2 * t * t;
  } else {
    return -1.0 / 2 * ((--t) * (t - 2) - 1);
  }
}

//------------------------------------------------------------------
function pennerEaseInCubic(x) {
  let functionName = "Penner's EaseIn Cubic";
  return x * x * x;
}

//------------------------------------------------------------------
function pennerEaseOutCubic(x) {
  let functionName = "Penner's EaseOut Cubic";
  x = x - 1.0;
  return (x * x * x + 1);
}


//------------------------------------------------------------------
function pennerEaseInOutCubic(x) {
  let functionName = "Penner's EaseInOut Cubic";

  x *= 2.0;
  let y = 0;

  if (x < 1) {
    y = 0.5 * x * x * x;
  } else {
    x -= 2.0;
    y = 0.5 * (x * x * x + 2.0);
  }
  return y;
}


//------------------------------------------------------------------
function pennerEaseInQuartic(t) {
  let functionName = "Penner's EaseIn Quartic";
  return t * t * t * t;
}
//------------------------------------------------------------------
function pennerEaseOutQuartic(t) {
  let functionName = "Penner's EaseOut Quartic";
  return -1.0 * ((t = t - 1) * t * t * t - 1.0);
}

//------------------------------------------------------------------
function pennerEaseInOutQuartic(t) {
  let functionName = "Penner's EaseInOut Quartic";

  if ((t /= 1.0 / 2.0) < 1) return 1.0 / 2.0 * t * t * t * t;
  return -1.0 / 2.0 * ((t -= 2.0) * t * t * t - 2.0);
}

//------------------------------------------------------------------
function pennerEaseInQuintic(t) {
  let functionName = "Penner's EaseIn Quintic";
  return t * t * t * t * t;
}
//------------------------------------------------------------------
function pennerEaseOutQuintic(t) {
  let functionName = "Penner's EaseOut Quintic";
  t = t - 1;
  return (t * t * t * t * t + 1.0);
}

//------------------------------------------------------------------
function pennerEaseInOutQuintic(t) {
  let functionName = "Penner's EaseInOut Quintic";
  if ((t /= 1.0 / 2) < 1) return 1.0 / 2 * t * t * t * t * t;
  return 1.0 / 2 * ((t -= 2) * t * t * t * t + 2);
}

//------------------------------------------------------------------
function pennerEaseInSine(t) {
  let functionName = "Penner's EaseIn Sine";
  return -1.0 * cos(t * (PI / 2)) + 1;
}

//------------------------------------------------------------------
function pennerEaseOutSine(t) {
  let functionName = "Penner's EaseOut Sine";
  return sin(t * (PI / 2));
}

//------------------------------------------------------------------
function pennerEaseInOutSine(t) {
  let functionName = "Penner's EaseInOut Sine";
  return -0.5 * (cos(PI * t) - 1);
}




//------------------------------------------------------------------
function pennerEaseInExpo(t) {
  let functionName = "Penner's EaseIn Exponential";
  return (t == 0) ? 0 : pow(2, 10 * (t - 1));
}

//------------------------------------------------------------------
function pennerEaseOutExpo(t) {
  let functionName = "Penner's EaseOut Exponential";
  return (t == 1) ? 1 : (-pow(2, -10 * t) + 1);
}

//------------------------------------------------------------------
function pennerEaseInOutExpo(t) {
  let functionName = "Penner's EaseInOut Exponential";
  if (t == 0) return 0.0;
  if (t == 1) return 1.0;
  if ((t /= 1.0 / 2) < 1) return 1.0 / 2 * pow(2, 10 * (t - 1));
  return 1.0 / 2 * (-pow(2, -10 * --t) + 2);
}

//------------------------------------------------------------------
function pennerEaseInElastic(t) {
  let functionName = "Penner's EaseIn Elastic";

  if (t == 0) return 0.0;
  if (t == 1) return 1.0;
  let p = 0.3;

  let s = p / 4;
  let postFix = pow(2, 10.0 * (t -= 1)); // this is a fix, again, with post-increment operators
  return -(postFix * sin((t - s) * (2 * PI) / p));
}

//------------------------------------------------------------------
function pennerEaseOutElastic(t) {
  let functionName = "Penner's EaseOut Elastic";

  if (t == 0) return 0.0;
  if (t == 1) return 1.0;
  let p = 0.3;
  let s = p / 4;

  return (pow(2, -10 * t) * sin((t - s) * (2 * PI) / p) + 1);
}

//------------------------------------------------------------------
function pennerEaseInOutElastic(t) {
  let functionName = "Penner's EaseInOut Elastic";

  if (t == 0) return 0;
  if ((t /= 0.5) == 2) return 1;
  let p = (.3 * 1.5);
  let a = 1;
  let s = p / 4;

  if (t < 1) {
    let postFix = pow(2, 10 * (t -= 1)); // postIncrement is evil
    return -0.5 * (postFix * sin((t - s) * (2 * PI) / p));
  }
  let postFix = pow(2, -10 * (t -= 1)); // postIncrement is evil
  return postFix * sin((t - s) * (2 * PI) / p) * .5 + 1;
}



//------------------------------------------------------------------
function pennerEaseOutBounce(t) {
  let functionName = "Penner's EaseOut Bounce";

  if ((t) < (1 / 2.75)) {
    return (7.5625 * t * t);
  } else if (t < (2 / 2.75)) {
    let postFix = t -= (1.5 / 2.75);
    return (7.5625 * (postFix) * t + 0.75);
  } else if (t < (2.5 / 2.75)) {
    let postFix = t -= (2.25 / 2.75);
    return (7.5625 * (postFix) * t + 0.9375);
  } else {
    let postFix = t -= (2.625 / 2.75);
    return (7.5625 * (postFix) * t + 0.984375);
  }
}

//------------------------------------------------------------------
function pennerEaseInBounce(t) {
  let functionName = "Penner's EaseIn Bounce";
  return (1.0 - function_PennerEaseOutBounce(1.0 - t));
}

//------------------------------------------------------------------
function pennerEaseInOutBounce(t) {
  let functionName = "Penner's EaseInOut Bounce";
  if (t < 0.5) {
    return function_PennerEaseInBounce(t * 2) * .5;
  } else {
    return function_PennerEaseOutBounce(t * 2 - 1) * .5 + .5;
  }
}

//------------------------------------------------------------------
function staircase(x, n) {
  let functionName = "Staircase";
  let y = floor(x * n) / (float)(n - 1);
  return y;
}

//------------------------------------------------------------------
function exponentialSmoothedStaircase(x, a, n) {
  let functionName = "Smoothed Exponential Staircase";
  // See http://web.mit.edu/fnl/volume/204/winston.html

  let fa = sq(map(a, 0, 1, 5, 30));
  let y = 0;
  for (let i = 0; i < n; i++) {
    y += (1.0 / (n - 1.0)) / (1.0 + exp(fa * (((i + 1.0) / n) - x)));
  }
  y = constrain(y, 0, 1);
  return y;
}



//------------------------------------------------------------------
function gompertz(x, a) {
  // http://en.wikipedia.org/wiki/Gompertz_curve
  let functionName = "Gompertz Function";

  let min_param_a = 0.0 + EPSILON;
  a = max(a, min_param_a);

  let b = -8.0;
  let c = 0 - a * 16.0;
  let y = exp(b * exp(c * x));

  let maxVal = exp(b * exp(c));
  let minVal = exp(b);
  y = map(y, minVal, maxVal, 0, 1);

  return y;
}