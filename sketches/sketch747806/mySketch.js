l=[],f=0
preload=_=>{for(i=0;i<(n=99);i++){l[i]=loadImage('https://loremflickr.com/9/9?random='+i)}}
draw=_=>{f==0?createCanvas(a=800,a):0
randomSeed(f/a)
for(i of l){push()
translate(((x=(r=random)(a))+tan(b=(m=noise)(x/n)*6)*f)%a,(r(a)+sin(b)*f)%a)
rotate(f/n)
image(i,0,0,r(n))
pop()}f++}