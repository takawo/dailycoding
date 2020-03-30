p=[]
setup=_=>{createCanvas(a=800,a)
for(i=0;i<a;i++){p[i]=createVector((r=random)(a),r(a))}
background(0)
f=r(a)}
draw=_=>{randomSeed(a)
for(q of p){text(String.fromCodePoint(int(random(127744,128318))),q.add(cos(b=noise(q.x/99,q.y/99)*TAU),sin(b)).x,q.y)}
}//#つぶやきProcessing