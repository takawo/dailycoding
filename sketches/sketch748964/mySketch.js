f=0;
setup=_=>createCanvas(w=800,w)
draw=_=>{background(0);
for(r=w;r>0;r-=6){for(a=0;a<(t=TAU);a+=t/9){
strokeWeight((s=tan((r+a+f)%(t/4))*r)/r)
stroke(w)
point(w/2+cos(r/13+a)*s,w/2+sin(r/17+a)*s)}}f+=.002}//#つぶやきProcessing