

window.onLoad = Physics(function(world) {

  var viewWidth = 600;
  var viewHeight = 600;


  var renderer = Physics.renderer('pixi', {
      el: 'viewport', // The DOM element to append the stage to
      width: viewWidth,
      height: viewHeight
   });

   world.add(renderer);

   // render on each step
     world.on('step', function(){
       world.render();
     });

     // bounds of the window
     var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

     // constrain objects to these bounds
     world.add(Physics.behavior('edge-collision-detection', {
         aabb: viewportBounds,
         restitution: 0.99,
         cof: 0.99
     }));

     // add a circle
     world.add(
         Physics.body('circle', {
           x: 50, // x-coordinate
           y: 30, // y-coordinate
           vx: 0.2, // velocity in x-direction
           vy: 0.01, // velocity in y-direction
           radius: 20
         })
     );

     // ensure objects bounce when edge collision is detected
     world.add( Physics.behavior('body-impulse-response') );

     // add some gravity
     world.add( Physics.behavior('constant-acceleration') );

     // subscribe to ticker to advance the simulation
     Physics.util.ticker.on(function( time, dt ){

         world.step( time );
     });

     // start the ticker
     Physics.util.ticker.start();


});
