num=6,t=0,draw=o=>{for(t+=.5,createCanvas(w=800,w),background(w),(d=drawingContext).shadowColor=color(0),d.shadowBlur=2*num,scale(num),y=0;y<w/num;y++)for(x=0;x<w/num;x++)(x-(3*cos((t+x)/17)-2.2*sin((t-y)/13))^x|x+y)%5||point(x,y)};//#つぶやきProcessing