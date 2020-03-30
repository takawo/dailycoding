i=0
setup=_=>createCanvas(w=600,w);
draw=_=>{
  for(j=0;j<(s=w/99)*2;j++){
  t=i*TAU/((sqrt(5)+1)/2)
  r=sqrt(i)*s
  x=(v=w/2)+cos(t)*r
  y=v+sin(t)*r
  strokeWeight(s)
  stroke(dist(x,y,v,v)/(m=sqrt(v*v*2))*255);
  point(x,y)
  if (r>m)clear(i=0)
  i++
  }
}//#つぶやきProcessing
// reference:https://dartpad.dartlang.org/a559420eed617dab7a196b5ea0b64fba
