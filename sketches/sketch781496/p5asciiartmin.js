p5.prototype.AsciiArt=function(t,i,e,s){this.__sketch=t,this.__fontName="monospace",this.__fontSize=24,this.__textStyle=this.__sketch.NORMAL,this.__graphics=this.__sketch.createGraphics(10,10),this.__range={min:32,max:126},this.__weightTable=[],this.__automaticPixelsDataTransferFlag=!0,this.invertBrightnessFlag=!1,arguments.length>1&&(this.__fontName=i),arguments.length>2&&(isNaN(e)||(e=Math.floor(Math.abs(e)))>5&&(this.__fontSize=e)),arguments.length>3&&(this.__textStyle=s),this.createWeightTable()},p5.prototype.AsciiArt.prototype.resizeGraphicsWorkaround=function(t,i,e){null==t?(t=createGraphics(i,e)).pixelDensity(1):(t.width=i,t.height=e,t.elt.width=i,t.elt.height=e,t.elt.style.width=i+"px",t.elt.style.height=e+"px",t.pixelDensity(1),t.loadPixels(),t.elt.setAttribute("style","display: none")),t.updatePixels(),t.background(0),t.loadPixels(),i*e!=t.pixels.length/4&&console.log("[AsciiArt, resizeGraphicsWorkaround] _w * _h !== _g.pixels.length / 4:\n_w = "+i+" _h = "+e+"\n_g.width = "+t.width+" _g.height = "+t.height+"\n_w * _h = "+i*e+"\n_g.pixels.length / 4 = "+t.pixels.length/4)},p5.prototype.AsciiArt.prototype.createArray2d=function(t,i){for(var e=[],s=0;s<t;s++){for(var r=[],h=0;h<i;h++)r[h]=0;e[s]=r}return e},p5.prototype.AsciiArt.prototype.typeArray2d=function(t,i,e,s,r,h){if(null!==t)if(void 0!==t){switch(arguments.length){case 2:e=0,s=0,r=width,h=height;break;case 4:r=width,h=height;break;case 6:break;default:return void console.log("[AsciiArt, typeArray2d] bad number of arguments: "+arguments.length)}if(null!==i.canvas)if(void 0!==i.canvas){var a=i.canvas.getContext("2d");if(null!==a)if(void 0!==a)for(var o=r/t.length,n=h/t[0].length,l=e+.5*o,_=s+.5*n,c=0;c<t[0].length;c++)for(var g=0;g<t.length;g++)a.fillText(t[g][c],l+g*o,_+c*n);else console.log("[AsciiArt, typeArray2d] _dst canvas 2d context is undefined");else console.log("[AsciiArt, typeArray2d] _dst canvas 2d context is null")}else console.log("[AsciiArt, typeArray2d] _dst.canvas === undefined");else console.log("[AsciiArt, typeArray2d] _dst.canvas === null")}else console.log("[AsciiArt, typeArray2d] _arr2d === undefined");else console.log("[AsciiArt, typeArray2d] _arr2d === null")},p5.prototype.AsciiArt.prototype.convert2dArrayToString=function(t){if(1!==arguments.length)return console.log("[AsciiArt, convert2dArrayToString] bad number of arguments: "+arguments.length),"";if(null===t)return console.log("[AsciiArt, draw] _arr2d === null"),"";if(void 0===t)return console.log("[AsciiArt, draw] _arr2d === undefined"),"";for(var i="",e=0;e<t[0].length;e++){for(var s=0;s<t.length;s++)i+=t[s][e];e<t[0].length-1&&(i+="\n")}return i},p5.prototype.AsciiArt.prototype.printWeightTable=function(){for(var t=0;t<this.__weightTable.length;t++)console.log("["+t+"] "+this.__sketch.char(this.__weightTable[t].code)+" "+this.__weightTable[t].weight)},p5.prototype.AsciiArt.prototype.createWeightTable=function(){var t,i,e=[],s=5*this.__fontSize,r=3*this.__fontSize;this.resizeGraphicsWorkaround(this.__graphics,s,r),this.__graphics.textFont(this.__fontName),this.__graphics.textSize(this.__fontSize),this.__graphics.textStyle(this.__textStyle),this.__graphics.textAlign(this.__sketch.CENTER,this.__sketch.CENTER),this.__graphics.noStroke(),this.__graphics.fill(255);for(var h=this.__range.min;h<=this.__range.max;h++){this.__graphics.background(0),this.__graphics.text(this.__sketch.char(h),.5*s,.5*r),this.__graphics.loadPixels(),t=0;for(var a=0;a<this.__graphics.pixels.length;a+=4)t+=this.__graphics.pixels[a];e[h-this.__range.min]={code:h,weight:t}}this.__weightTable.splice(0,this.__weightTable.length);do{i=-1,t=-1;for(h=0;h<e.length;h++)e[h].weight>=0&&(t<0||e[h].weight<t)&&(t=e[h].weight,i=h);i>=0&&(this.__weightTable[this.__weightTable.length]={code:e[i].code,weight:e[i].weight},e[i].weight=-1)}while(i>=0)},p5.prototype.AsciiArt.prototype.convert=function(t,i,e){if(1!==arguments.length&&3!==arguments.length)return console.log("[AsciiArt, convert] bad number of arguments: "+arguments.length),null;if(null===t)return console.log("[AsciiArt, convert] _image === null"),null;if(void 0===t)return console.log("[AsciiArt, convert] _image === undefined"),null;if(3===arguments.length){if(isNaN(i))return console.log("[AsciiArt, convert] _w is not a number (NaN)"),null;if(isNaN(e))return console.log("[AsciiArt, convert] _h is not a number (NaN)"),null;(i=Math.floor(Math.abs(i)))<1&&(i=1),(e=Math.floor(Math.abs(e)))<1&&(e=1),this.__graphics.width===i&&this.__graphics.height===e||this.resizeGraphicsWorkaround(this.__graphics,i,e)}else this.__graphics.width===t.width&&this.__graphics.height===t.height||this.resizeGraphicsWorkaround(this.__graphics,t.width,t.height);return this.__graphics.background(0),this.__graphics.image(t,0,0,this.__graphics.width,this.__graphics.height),this.__convert()},p5.prototype.AsciiArt.prototype.__convert=function(){this.__automaticPixelsDataTransferFlag&&this.__graphics.loadPixels();for(var t,i,e=this.createArray2d(this.__graphics.width,this.__graphics.height),s=this.__weightTable.length-1,r=0;r<this.__graphics.height;r++)for(var h=0;h<this.__graphics.width;h++)i=4*(r*this.__graphics.width+h),t=(this.__graphics.pixels[i]+this.__graphics.pixels[i+1]+this.__graphics.pixels[i+2])/765,t=Math.floor(t*s),this.invertBrightnessFlag&&(t=s-t),e[h][r]=this.__sketch.char(this.__weightTable[t].code);return this.__automaticPixelsDataTransferFlag&&this.__graphics.updatePixels(),e};