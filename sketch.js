var colors = ["#e96211", "#ffa404", "#cdbb7f", "#2e2a1f", "#f3f6f4"];// set weights for each color 
var weights = [0,2, 2, 2, 2, 2];


var myScale = 3;

var nAgents = 80;

let agent = [];

var direction = -1;

var par = 0;

let border = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 300, 100, 100, 100);
	strokeCap(SQUARE);

	background(0);
	
	for (let i = 0; i < nAgents; i++) {
		agent.push(new Agent());
	}

}

function draw() {
	
	if(frameCount > 1000)
	{
      noLoop();
	}

	for (let i = 0; i < agent.length; i++) {
		agent[i].update();
		let iP = agent[i].getPartner();
		strokeWeight(random(0.1,0.01));
		arc(agent[i].getP().x,agent[i].getP().y,
		  	agent[iP].getP().x,agent[iP].getP().y,0,5*PI,OPEN);
	}
  
    var words = ["But oh that deep romantic chasm which slanted","Down the green hill athwart a cedarn cover", "A savage place. as holy and inchanted", "As e'er beneath a waning moon was haunted", "By woman wailing for her demon-lover", "And from this chasm, with ceaseless turmoil seething", "As if this earth in fast thick pants were breathing"]
       
    if(mouseIsPressed) {
		r = (255)
		g = (255)
		b = (255)
		
		fill(colors)
    text(random(words), mouseX, mouseY);
  }

}


class Agent {
	constructor() {
		
		this.p = createVector(random(border,width-border), random(border,height/2+border));
      
		this.pOld = createVector(this.p.x, this.p.y);

		this.step = random(0.5,4);
		
		this.size = random(0.1,2);
		
		this.color = generateColor(20);

		this.color2 = generateColor(20);
		
		this.partner = floor(random(1,nAgents));
		
		this.strokeWidth = 0.1;
		
		this.amplitud = random(-10,10);
		
		this.scale = 2;
		
		this.period = random(0.01,0.1);
		
		this.wave = 0.1;
	}
	
	getPartner() {
		return this.partner;
	}

	getP() {
		return this.p;
	}


	update() {

		this.p.x += direction * vector_field(this.p.x, this.p.y,this.scale).x * this.step;
		this.p.y += direction * vector_field(this.p.x, this.p.y,this.scale).y * this.step;

		strokeWeight(this.strokeWidth);
		stroke(this.color2);
		noFill();

		let m = (this.p.y - this.pOld.y)/(this.p.x - this.pOld.x);
		
		let dd = dist(this.p.x,this.p.y,this.pOld.x,this.pOld.y);
		
		
		if (dd < 1000)
		{
		if(this.wave > 0.1)
		{
			beginShape();
			for(let x = this.pOld.x;x <= this.p.x;x+=0.5)
			{
	     	vertex(x,-m*(x - this.pOld.x) + this.pOld.y + this.amplitud*sin(this.period*x));
			}
			endShape();
			}else
			{
				line(this.pOld.x, this.pOld.y, this.p.x, this.p.y);
			}
		};	


	}

}



function vector_field(x, y,myScale) {

	x = map(x, 0, width, -myScale, myScale);
	y = map(y, 0, height, -myScale, myScale);

	let k1 = 5 + sin(frameCount);
	let k2 = 10 + sin(frameCount);

	let u = sin(k1 * y) + cos(k2 * y);
	let v = sin(k2 * x) - cos(k1 * x);
	
	return createVector(u, v);
}

function vector_field2(x,y,myScale) {
  
	x = map(x, 0, width, -myScale, myScale);
	y = map(y, 0, height,-myScale, myScale);

  let u = sin(5.0*y + x);
  let v = cos(5.0*x - y);
  
  return createVector(u,v);
}

function vector_field3(x,y,myScale) {
  
	x = map(x, 0, width/2, -myScale, myScale);
	y = map(y, 0, height/2,-myScale, myScale);

  let u = sin(5.0*y + cos(9*x));
  let v = cos(5.0*x - cos(15*y));
  
  return createVector(u,v);
}


function generateColor(scale) {
	let temp = myRandom(colors, weights);

	myColor = color(hue(temp) + randomGaussian() * scale,
		              saturation(temp) + randomGaussian() * scale,
		              brightness(temp) - scale/2, 
									random(9,100));

	return myColor;
}

// function to select 

function myRandom(colors, weights) {
	let sum = 0;

	for (let i = 0; i < colors.length; i++) {
		sum += weights[i];
	}

	let rr = random(0, sum);

	for (let j = 0; j < weights.length; j++) {

		if (weights[j] >= rr) {
			return colors[j];
		}
		rr -= weights[j];
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}