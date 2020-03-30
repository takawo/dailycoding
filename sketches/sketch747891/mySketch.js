draw=_=>{r=random,p=[]
createCanvas(a=800,a,WEBGL)
background(33)
stroke(a)
for(i=0;i<a;i++){p[i]=createVector((c=cos)(d=r(6))*c(e=r(-3,3))*(u=a/3),(s=sin)(d)*c(e)*u,s(e)*u)}
for(o of p){for(q of p){p5.Vector.dist(o,q)<40?line(o.x,o.y,o.z,q.x,q.y,q.z):0}}}//#つぶやきProcessing