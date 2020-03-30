setup=_=>{createCanvas(w=800,w)
blendMode(DIFFERENCE)
v=(w-(o=w/9)*2)/(c=int((r=random)(9)))
for(j=0;j<c;j++){for(i=0;i<c;i++){translate(i/c*(n=w-o*2)+o+(g=v/2),j/c*n+o+g)
rotate((j*c+i*13)*(p=PI/2))
quad(-g,-g,g,-g,g,g)
arc(-g,-g,x=v*2,x,0,p)
resetMatrix()}}}//#つぶやきProcessing