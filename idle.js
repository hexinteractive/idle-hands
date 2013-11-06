

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
    $html: null,
    $body: null,

    setIdle: function() {
      console.log('setIdle was called');
      // this.$html.css({'background':'deeppink'});
      this.isIdle = true;
      this.$html.addClass(this.idleClass).removeClass(this.activeCass);
      console.log('+x+x+x+x+x+x+x+x+x+x+IDLE+x+x+x+x+x+x+x+x+x+x+');
      // console.log('this: ', this);
      // console.log('$html: ', this.$html.hasClass(this.idleClass));
      // console.log('setIdle finished');

      //this.$body.bind('mousemove',{'pos':this.pos}, this.updatePosition);
      // this.updatePosition();
      this.startTracking();
    },

    unsetIdle: function() {
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

    startTimer: function(timerDelay) {
      console.log('startTimer was called');
      var self = this;
      function callLater(scope) {
        // return (function() { self.setIdle();});
        // instead of calling setIdle, maybe call startTracking
        return (function() { scope.setIdle();});
      }
      var func = callLater(self);
      this.idleTimer = setTimeout(func, timerDelay);
    },

    // function clearTimer(idleTimer) {
    // clearTimer: function(idleTimer) {
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

    // trackMotion: function(e) {
    startTracking: function() {
      console.log('startTracking was called');
      var self = this;
      function callLater(e,scope) {
        // console.log('callLater');
        (function() {
                  // console.log('inner');
                  scope.pos.x = e.pageX;
                  scope.pos.y = e.pageY;
                  // console.log('pos: ', scope.pos);
                })(e);
      }
      var func = function(e){callLater(e,self);};
      this.$body.one('mousemove', func)
                .bind('mousemove', this.updatePosition);
    },

    stopTracking: function() {
      console.log('stopTracking was called');
      // private.clearTimer();
      private.$body.unbind('mousemove',this.updatePosition);
    },

    updatePosition: function(e) {
      console.log('updatePosition was called');
      if( isNaN(e.pageX)) { return; /* this was not a real mouse event. get outta here*/ }

      var self = this;
      var delta = Math.max( Math.abs(private.pos.x - e.pageX) , Math.abs(private.pos.y - e.pageY) );
      var obj = {
        iX : private.pos.x, // initial X position
        eX : e.pageX, // mouse event X position
        abs : delta // difference between the initial X position and the X position during the mouse event
      };
      console.log(obj);
      //why was this checking for NaN not !NaN
      // if( isNaN(delta) || delta > 25 ){
      if(delta > 25 ){
        private.pos.x = e.pageX;
        private.pos.y = e.pageY;
        console.log('delta of ' + delta + ' removed the idleClass');
        // private.$html.removeClass(this.idleClass).addClass(this.activeCass);

        // private.resetTimer();
        private.unsetIdle();
      }

      // console.log('scroll: ', document.documentElement.scrollTop);

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
      // private.startTimer(private.timerDelay);
      // private.startTracking();
      private.isRunning = true;
      private.startTimer();
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


    // this just exposed the private parts
    // private: private

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
