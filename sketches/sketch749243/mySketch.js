draw=_=>{createCanvas(a=800,a)
p=[],c=ceil((r=random)(9)),o=a/9,m=o/2
w=(a-o*2-m*(c-1))/c
for(k=0;k<c;k++){for(j=0;j<c;j++){for(l=0;l<9;l++)p.push({x:o+j*(m+w)+r(w),y:o+k*(m+w)+r(w)})}}for(q of p){for(r of p)dist(q.x,q.y,r.x,r.y)<w/2?line(q.x,q.y,r.x,r.y):0}}//#つぶやきProcessing