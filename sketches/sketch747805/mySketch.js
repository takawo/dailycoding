f=0,p=[],a=800
draw=_=>{r=random
if(f==0){createCanvas(a,a)
for(i=0;i<a*10;i++){p[i]=createVector(r(a),r(a))}
background(20)}
for(q of p){q.add(cos(b=noise(q.x/99,q.y/99)*TAU),sin(b))
stroke(a,f)
point((c=constrain)(q.x,d=a/10,e=a-d),c(q.y,d,e))}
f++} //#つぶやきProcessing