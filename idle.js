

// function hitch(scope, callback, args) {
//     return function () {
//          return callback.apply(scope, args); // Array.prototype.slice.call(args)
//     };
// }



var idle = function() {

  var private, public;

  private = {

    idleClass: 'idle',
    activeCass: 'notIdle',
    idleTimer: null,
    timerDelay: 3000,
    events: ['mousemove', 'scroll','keydown','click','resize'],
    pos: {
      'x': null,
      'y': null//,
      // 'top': null,
      // 'left': null
    },
    $html: null,
    $body: null,

    setIdle: function() {
      console.log('setIdle was called');
      this.$html.css({'background':'deeppink'});
      this.$html.addClass(this.idleClass);
      console.log('this: ', this);
      console.log('$html: ', this.$html.hasClass(this.idleClass));
      console.log('setIdle finished');

      this.$body.bind('mousemove',{'pos':this.pos}, this.updatePosition);
      // this.updatePosition();
    },

    startTimer: function(timerDelay) {
      console.log('startTimer was called');
      var self = this;
      function callLater(self) {
        // return (function() { self.setIdle();});
        return (function() { self.setIdle();});
      }
      var func = callLater(self);
      this.idleTimer = setTimeout(func, timerDelay);
    },

    // function clearTimer(idleTimer) {
    clearTimer: function(idleTimer) {
      console.log('clearTimer was called');
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    },

    trackMotion: function(e) {
      // body...
    },

    updatePosition: function(e) {

      if( !isNaN(e.pageX)) {

        var delta = Math.max( Math.abs(e.data.pos.x - e.pageX) , Math.abs(e.data.pos.y - e.pageY) );
        var obj = {
          iX : e.data.pos.x,
          eX : e.pageX,
          abs : delta
        };
        console.log(obj);
        //why was this checking for NaN not !NaN
        // if( isNaN(delta) || delta > 25 ){
        if(delta > 25 ){
          $html.removeClass(this.idleClass).addClass(this.activeCass);
          $body.unbind('mousemove',this.updatePosition);
        }
      }
      // console.log('scroll: ', document.documentElement.scrollTop);

    }
  };



  public = {

    init: function() {
      private.$html = $('html');
      private.$body = $('body');
    },

    start: function() {
      // start the idleTimer
      console.log('start was called');
      private.startTimer(private.timerDelay);
    },

    stop: function() {
      console.log('stop was called');
      private.clearTimer();
    },

    setTimerDelay: function(ms) {
      if(isNaN(ms)) {return false;}
      private.timerDelay = ms;
    },

    getTimerDelay: function() {
      return private.timerDelay;
    }


    // this just exposed the private parts
    // private: private

  };

  return public;

}();







$(document).ready(function(){
  idle.init();
  idle.start();

});//end of ready
