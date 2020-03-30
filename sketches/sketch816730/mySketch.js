let s = function(p) {
	let ns = 80;
	let graphics;
	let img;
	let texture;

	p.preload = function() {
		img = p.loadImage("mainvisual_logo.png");
		texture = p.loadImage("mainvisual_texture.png");
	}

	p.setup = function() {
		p.createCanvas(1840 / 2, 900 / 2);
		p.colorMode(p.HSB, 360, 100, 100, 100);
		p.angleMode(p.DEGREES);
	};

	p.draw = function() {
		//画面を覆うため対角線の長さを計算
		let w = p.sqrt(p.sq(p.width) + p.sq(p.height));

		p.background(0, 0, 10)
		p.push();
		p.translate(p.width / 2, p.height / 2);
		//予め画面を回転させておく
		p.rotate(p.int(p.random(8)) * 360 / 8);
		//p.rotate(45);
		//分割
		separateGrid(-w / 2, -w / 2, w);
		p.pop();
		p.image(img, 0, 0, p.width, p.height);
		//粒状感を載せる
		p.image(texture, 0, 0, p.width, p.height);
		p.noLoop();
	};

	separateGrid = function(x, y, d) {
		let sepNum = p.int(p.random(1, 4));
		let w = d / sepNum;
		for (let i = x; i < x + d - 1; i += w) {
			for (let j = y; j < y + d - 1; j += w) {
				let n = p.noise(i / ns, j / ns, p.frameCount / ns);
				if (n > 0.5 && d > p.width / 5) {
					separateGrid(i, j, w);
				} else {
					drawWave(i, j, w);
				}
			}
		}
	}

	// @reona396
	function drawWave(x, y, w) {
		const themeColor = p.random(360);

		const wavesNumArray = [5, 10, 30, 50];
		const wavesNum = p.random(wavesNumArray);

		p.push();
		p.translate(x + w / 2, y + w / 2);
		p.rotate(p.int(p.random(4)) * 360 / 4);
		p.translate(-w / 2, -w / 2);
		let g = p.createGraphics(w, w);
		g.colorMode(p.HSB, 360, 100, 100, 100);
		g.fill(themeColor, p.random(30, 100), p.random(80, 100));
		g.noStroke();
		g.rect(0, 0, w, w);

		for (let i = 0; i < wavesNum; i++) {
			const hue = i % 2 ? themeColor : (themeColor + 180) % 360;
			const saturation = p.random(30, 100);
			const brightness = p.random(80, 100);
			const ox = p.random(-w / 2, w / 2);
			const oy = 0;
			let x, y;
			const yStepA = p.floor(p.random(1, 6));
			const yStepB = p.floor(p.random(1, 6));
			let xoff = 0.0;
			let xoffStep = p.random(0.005, 0.02)

			g.noStroke();
			g.fill(hue, saturation, brightness);

			g.push();
			g.translate(ox, oy);
			g.beginShape();
			// 行き
			let offset = w / 10;
			for (y = -offset; y <= w + offset; y += yStepA) {
				x = p.map(p.noise(xoff), 0, 1, 0, w);
				g.curveVertex(x, y);
				xoff += xoffStep;
			}
			xoff = 0.0;
			// 帰り
			for (y = w + offset; y >= -offset; y -= yStepB) {
				x = p.map(p.noise(xoff), 0, 1, 0, w);
				g.curveVertex(x, y);
				xoff += xoffStep;
			}
			g.endShape();
			g.pop();
			d = 5;
			p.image(g, d, d, w - d * 2, w - d * 2);
		}
		p.pop();
	}
}

let myp5 = new p5(s);