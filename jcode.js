

$(document).ready(function(){

  window.idle = null;
  // window.idlePosition = {x:null,y:null};
  var idleStart = function(pos){
    // $('#box').animate({ opacity: 0}, 3000);
    // window.idlePosition = pos;
    // console.log('idlestart pos',pos); 
    $('html').removeClass('notIdle').addClass('idle');
    $('body').bind('mousemove',{'pos':pos},idleStop);
  };
  
  var idleStop = function(e){
    // $('#box').animate({ opacity: 1}, 400);
    console.log('e.data',e.data);
    var obj = {
      iX : e.data.pos.x,
      eX : e.pageX,
      abs : Math.abs(e.data.pos.x - e.pageX)
    };
    console.log(obj);
    // if(Math.max( Math.abs(window.idlePosition.x - e.pageX) , Math.abs(window.idlePosition.y - e.pageY) ) > 25 ){
      var delta = Math.max( Math.abs(e.data.pos.x - e.pageX) , Math.abs(e.data.pos.y - e.pageY) );
      if( isNaN(delta) || delta > 25 ){
      $('html').removeClass('idle').addClass('notIdle');
      $('body').unbind('mousemove',idleStop);
    }
  };
  
  window.idle = setTimeout(idleStart,3000);
  
  $('body').mousemove(function(e){
    clearTimeout(window.idle);
    var pos = {'x':e.pageX, 'y':e.pageY};
    // console.log('move pos',pos); 
    window.idle = setTimeout(function(){idleStart(pos);},3000);
    // window.idlePosition = {x:e.pageX, y:e.pageY};
    // console.log('window.idlePosition',window.idlePosition);
  });




});//end of ready








