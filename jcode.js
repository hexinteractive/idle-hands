

$(document).ready(function(){
  // console.log('manually trigger it to start');
  var startDelay = 30000;
  idle.init();
  idle.start(startDelay);

  $('input[value="start"]').click(function() {
    console.info('start button pushed');
    idle.start(15000);
  });
  $('input[value="stop"]').click(function() {
    console.info('stop button pushed');
    idle.stop();
  });

});//end of ready
