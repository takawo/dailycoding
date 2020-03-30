f=0
draw=_=>{f==0?createCanvas(w=800,w):0
stroke(0,9)
a=[],randomSeed(w)
for(i=0;i<w;i++) {a.push((c=createVector)(x=(r=random)(w),y=r(w)).add(c(cos(m=noise(x,y,f/w)*6)*f,sin(m)*f)))}for(q of a){for(p of a){p5.Vector.dist(p,q)<19?line(p.x,p.y,q.x,q.y):0}}f++}//#つぶやきProcessing