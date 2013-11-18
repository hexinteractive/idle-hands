

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
    timerDelay: 5000,
    isIdle: false,
    isRunning: false,
    // TODO: accept an array of events to listen to
    // events: ['mousemove', 'scroll','keydown','click','resize'],
    pos: {
      'x': null,
      'y': null//,
      // 'top': null,
      // 'left': null
    },
    threshold: {
      'mouse': 25,
      'scroll': 10
    },
    $html: null,
    $body: null,

    setIdle: function() { // sets the idle class on <HTML>
      console.log('setIdle was called');
      // this.$html.css({'background':'deeppink'});
      this.isIdle = true;
      this.$html.addClass(this.idleClass).removeClass(this.activeCass);
      console.log('+x+x+x+x+x+x+x+x+x+x+IDLE+x+x+x+x+x+x+x+x+x+x+');
      this.startTracking();
    },

    unsetIdle: function() {// sets the active class on <HTML>
      console.log('unsetIdle was called');
      this.isIdle = false;
      private.$html.removeClass(this.idleClass).addClass(this.activeCass);
      console.log('x*x*x*x*x*x*x*x*x*x*x*ACTIVE*x*x*x*x*x*x*x*x*x*x*x');
      private.stopTracking();
      private.resetTimer();
    },

    // getIsIdle: function() {
    //   return private.getIsIdle;
    // },

    startTimer: function(timerDelay) { // after some delay this calls setIdle()
      console.log('startTimer was called');
      function resetTimerLater(scope) {
        return (function() { scope.resetTimer();});
      }
      function setIdleLater(scope) {
        return (function() { scope.setIdle();});// instead of calling setIdle, maybe call startTracking
      }
      // this.$body.one('mousemove', resetTimerLater(this));// this fires too often
      this.idleTimer = setTimeout(setIdleLater(this), timerDelay);
    },

    clearTimer: function() {
      console.log('clearTimer was called');
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    },

    // TODO: prob refactor to use private or the hitch function
    resetTimer: function() {
      console.log('resetTimer was called');
      private.clearTimer();
      private.startTimer(private.timerDelay);
    },

    startTracking: function() { // records the mouse position of the first mousemove event and binds updatePosition() to mousemove events
      console.log('startTracking was called');
      var self = this;
      function callLater(e,scope) {
        (function() {
                  scope.pos.x = e.pageX;
                  scope.pos.y = e.pageY;
                  // console.log('pos: ', scope.pos);
                })(e);
      }
      var func = function(e){callLater(e,self);};
      this.$body.one('mousemove', func)
                .bind('mousemove', this.updatePosition)
                .bind('keydown', this.unsetIdle);
    },

    stopTracking: function() {
      console.log('stopTracking was called');
      // private.clearTimer();
      private.$body.unbind('mousemove', this.updatePosition)
                   .unbind('keydown', this.unsetIdle);
    },

    // compare the current mouse position to the mouse position that was recorded in startTracking()
    // if the delta between mouse positions is greater than the mouse threshold then call unsetIdle()
    updatePosition: function(e) {

      console.log('updatePosition was called');
      if( isNaN(e.pageX)) { return; /* this was not a real mouse event. get outta here*/ }

      var self = this;
      var delta = Math.max( Math.abs(private.pos.x - e.pageX) , Math.abs(private.pos.y - e.pageY) );
      console.log({initialX : private.pos.x, eventX : e.pageX, absDelta : delta });

      if(delta > private.threshold.mouse ){
        // private.pos.x = e.pageX;
        // private.pos.y = e.pageY;
        console.log('delta of ' + delta + ' removed the idleClass');
        private.unsetIdle();
      }

    }
  };



  public = {

    init: function() {
      console.log('init was called');
      private.$html = $('html');
      private.$body = $('body');
    },

    start: function() {
      if(private.isRunning) {
        console.log('start was called but it was already started');
        return;
      }
      console.log('start was called');
      private.isRunning = true;
      private.startTimer(private.timerDelay);
    },

    stop: function() {
      if(!private.isRunning) {
        console.log('stop was called but it weas already stopped');
        return;
      }
      console.log('stop was called');
      private.unsetIdle();
      private.clearTimer();
      private.isRunning = false;
    },

    setTimerDelay: function(ms) {
      console.log('setTimerDelay was called with ', ms);
      if(isNaN(ms)) {return false;}
      private.timerDelay = ms;
    },

    getTimerDelay: function() {
      console.log('getTimerDelay was called');
      return private.timerDelay;
    },

    trackScrollingOf: function(elem) {
      // use this to allow user to add elements that can be scrolled
    }

    // ,private: private // this exposes the private parts

  };

  return public;

}();







$(document).ready(function(){
  // console.log('manually trigger it to start');
  idle.init();
  idle.start();

  $('input[value="start"]').click(function() {
    console.info('start button pushed');
    idle.start();
  });
  $('input[value="stop"]').click(function() {
    console.info('stop button pushed');
    idle.stop();
  });

});//end of ready
