var matter=function(){"use strict";var engine=null;var mouseEnabled=[];var init=function(manual){if(engine===null){engine=Matter.Engine.create();if(!manual){Matter.Engine.run(engine)}}};var addToWorld=function(physicalObject){init();Matter.World.addBody(engine.world,physicalObject.body)};var makeBall=function(x,y,diameter,options){var ball=new Ball(x,y,diameter,options);addToWorld(ball);return ball};var makeBlock=function(x,y,width,height,options){var block=new Block(x,y,width,height,options);addToWorld(block);return block};var makeBarrier=function(x,y,width,height,options){var barrier=new Block(x,y,width,height,options);barrier.freeze();addToWorld(barrier);return barrier};var makeSign=function(text,x,y,options){var sign=new Sign(text,x,y,options);addToWorld(sign);return sign};var connect=function(physicalObjectA,physicalObjectB,options){options=options||{};options.bodyA=physicalObjectA.body;options.bodyB=physicalObjectB.body;var constraint=Matter.Constraint.create(options);var conn=new Connection(constraint,physicalObjectA,physicalObjectB);physicalObjectA.connections.push(conn);physicalObjectB.connections.push(conn);init();Matter.World.addConstraint(engine.world,constraint);return conn};var normalGravity=function(){changeGravity(0,1)};var invertedGravity=function(){changeGravity(0,-1)};var zeroGravity=function(){changeGravity(0,0)};var changeGravity=function(x,y){init();engine.world.gravity.x=x;engine.world.gravity.y=y};var forget=function(physicalObjectOrConnection){init();if(physicalObjectOrConnection===null){return}if(physicalObjectOrConnection.body){var physicalObject=physicalObjectOrConnection;var connections=physicalObject.connections;for(var i=connections.length-1;i>=0;i--){forget(connections[i])}Matter.World.remove(engine.world,physicalObject.body)}else if(physicalObjectOrConnection.constraint){var connection=physicalObjectOrConnection;var physObj=connection.physicalObjectA;var index=physObj.connections.lastIndexOf(connection);if(index>=0){physObj.connections.splice(index,1)}physObj=connection.physicalObjectB;index=physObj.connections.lastIndexOf(connection);if(index>=0){physObj.connections.splice(index,1)}Matter.World.remove(engine.world,connection.constraint)}physicalObjectOrConnection.active=false};var manualTick=function(){init(true);Matter.Engine.update(engine)};var mouseInteraction=function(canvas){var canvasElt;if(canvas&&canvas.elt){canvasElt=canvas.elt}else if(window&&window.canvas){canvasElt=window.canvas}else{canvasElt=null}if(canvasElt&&!mouseEnabled.includes(canvasElt)){var mouse=Matter.Mouse.create(canvasElt);mouse.pixelRatio=pixelDensity();init();Matter.World.add(engine.world,Matter.MouseConstraint.create(engine,{mouse:mouse}));mouseEnabled.push(canvasElt)}};var PhysicalObject=function(body,width,height){if(this.constructor===PhysicalObject){throw new Error("PhysicalObject is an abstract class, "+"so you can't make instances of it!")}this.body=body;this.width=width;this.height=height;this.connections=[];this.active=true};PhysicalObject.prototype.getPositionX=function(){return this.body.position.x};PhysicalObject.prototype.getPositionY=function(){return this.body.position.y};PhysicalObject.prototype.setPosition=function(xPos,yPos){Matter.Body.setPosition(this.body,{x:xPos,y:yPos})};PhysicalObject.prototype.setPositionX=function(xPos){this.setPosition(xPos,this.getPositionY())};PhysicalObject.prototype.setPositionY=function(yPos){this.setPosition(this.getPositionX(),yPos)};PhysicalObject.prototype.getVelocityX=function(){return this.body.velocity.x};PhysicalObject.prototype.getVelocityY=function(){return this.body.velocity.y};PhysicalObject.prototype.setVelocity=function(xVel,yVel){Matter.Body.setVelocity(this.body,{x:xVel,y:yVel})};PhysicalObject.prototype.setVelocityX=function(xVel){this.setVelocity(xVel,this.getVelocityY())};PhysicalObject.prototype.setVelocityY=function(yVel){this.setVelocity(this.getVelocityX(),yVel)};PhysicalObject.prototype.getWidth=function(){return this.width};PhysicalObject.prototype.getHeight=function(){return this.height};PhysicalObject.prototype.getAngle=function(){return this.body.angle};PhysicalObject.prototype.setAngle=function(angle){Matter.Body.setAngle(this.body,angle)};PhysicalObject.prototype.isFrozen=function(){return this.body.isStatic};PhysicalObject.prototype.freeze=function(){Matter.Body.setStatic(this.body,true)};PhysicalObject.prototype.unfreeze=function(){Matter.Body.setStatic(this.body,false)};PhysicalObject.prototype.isOffCanvas=function(bufferZone){bufferZone=bufferZone||0;var x=this.getPositionX();var y=this.getPositionY();var wid=this.getWidth();var hgt=this.getHeight();var minX=-(wid+bufferZone);var minY=-(hgt+bufferZone);var maxX=width+wid+bufferZone;var maxY=height+hgt+bufferZone;return x<minX||x>maxX||y<minY||y>maxY};PhysicalObject.prototype.isActive=function(){return this.active};PhysicalObject.prototype.show=function(){throw new Error("PhysicalObject.show is an abstract method, "+"so you can't invoke it!")};PhysicalObject.prototype.getX=function(){return this.body.position.x};PhysicalObject.prototype.getY=function(){return this.body.position.y};var Ball=function(x,y,diameter,options){var body=Matter.Bodies.circle(x,y,diameter/2,options);PhysicalObject.call(this,body,diameter,diameter)};Ball.prototype=Object.create(PhysicalObject.prototype);Ball.prototype.constructor=Ball;Ball.prototype.show=function(){push();translate(this.getPositionX(),this.getPositionY());rotate(this.getAngle());ellipseMode(CENTER);ellipse(0,0,this.getWidth(),this.getHeight());pop()};Ball.prototype.getDiameter=Ball.prototype.getWidth;Ball.prototype.getRadius=function(){return this.getDiameter()/2};var Block=function(x,y,width,height,options){var body=Matter.Bodies.rectangle(x,y,width,height,options);PhysicalObject.call(this,body,width,height)};Block.prototype=Object.create(PhysicalObject.prototype);Block.prototype.constructor=Block;Block.prototype.show=function(){push();translate(this.getPositionX(),this.getPositionY());rotate(this.getAngle());rectMode(CENTER);rect(0,0,this.getWidth(),this.getHeight());pop()};var Sign=function(text,x,y,options){this.text=text;Block.call(this,x,y,textWidth(text),textSize(),options)};Sign.prototype=Object.create(Block.prototype);Sign.prototype.constructor=Sign;Sign.prototype.getText=function(){return this.text};Sign.prototype.show=function(){push();translate(this.getPositionX(),this.getPositionY()+this.getHeight()*.25);rotate(this.getAngle());textAlign(CENTER);text(this.getText(),0,0);pop()};var Connection=function(constraint,physicalObjectA,physicalObjectB){this.constraint=constraint;this.physicalObjectA=physicalObjectA;this.physicalObjectB=physicalObjectB;this.active=true};Connection.prototype.isActive=function(){return this.active};Connection.prototype.show=function(){var aX=this.physicalObjectA.getPositionX();var aY=this.physicalObjectA.getPositionY();if(this.constraint.pointA){aX+=this.constraint.pointA.x;aY+=this.constraint.pointA.y}var bX=this.physicalObjectB.getPositionX();var bY=this.physicalObjectB.getPositionY();if(this.constraint.pointB){aX+=this.constraint.pointB.x;aY+=this.constraint.pointB.y}line(aX,aY,bX,bY)};return{init:init,makeBall:makeBall,makeBlock:makeBlock,makeBarrier:makeBarrier,makeSign:makeSign,connect:connect,normalGravity:normalGravity,invertedGravity:invertedGravity,zeroGravity:zeroGravity,changeGravity:changeGravity,forget:forget,manualTick:manualTick,mouseInteraction:mouseInteraction}}();