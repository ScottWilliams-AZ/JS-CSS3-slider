


(function ($, window, i) {
  $.fn.stwillslider = function (options) {

    // Default settings
    var settings = $.extend({
      "speed": 4500,            
      "timeout": 8000,
      "namespace" : "stwillslider",
      "before": $.noop,         // Function: Before callback
      "after": $.noop           // Function: After callback       
    }, options);

    return this.each(function () {

      // Index for namespace
      i++;

      var $this = $(this),

      namespace = settings.namespace,
      namespaceIndex = namespace + '_' + i,

      // Classes
      activeClassName = namespace + "_active",
      visibleClassName = namespaceIndex + "_visible",
      IDPrefix = namespaceIndex + "_s",

      index = 0,
      $slide = $this.children(),
      length = $slide.size(),
      fadeTime = parseFloat(settings.speed),
      waitTime = parseFloat(settings.timeout),
     
      

      // Styles for visible and hidden slides
      visible = {
        "float": "left", 
        "opacity": 1, 
        "zIndex": 2
      },
      hidden = {
        "float": "none",
        "opacity": 0,
        "zIndex": 1,
        "right":0,
        "left":0
     },
      


      
      // Fading animation
        moveToSlide = function (pidx,nidx,idx) {

              $slide.eq(pidx).css({"zIndex":1,"position":"relative"});
              $slide.eq(idx).css({"zIndex":2,"position":"absolute","opacity":1})
              $slide.eq(idx).css(visible).addClass("animated");

              $slide.eq(idx).children().addClass("animated");            
             
              

           index = idx;

            setTimeout(function () {

              $slide.eq(pidx).css({"zIndex":0,"position":"absolute","opacity":0});
              $slide.eq(idx).css({"zIndex":1,"position":"relative"});
              $slide.eq(nidx).css({"zIndex":2,"position":"absolute"}).removeClass("animated");
              $slide.eq(nidx).children().removeClass("animated");
              
              
              settings.after(idx);
            }, fadeTime);
          
        };


      $slide.each(function (i) {
        this.id = IDPrefix + i;
        $(this).children("img:first-of-type").css({"width":"100%"});
      
      });


      $this.css({"position":"relative"});

      $slide
        .css(hidden)
        .removeClass("animated")
        .css({"position":"absolute"})
        .hide()
        .eq(0)
        .css(visible)
        .css({"position":"relative"})
        .addClass("animated");
        
        $slide.show();
                
      startCycle = function () {
            rotate = setInterval(function () {

              // Clear the event queue
              $slide.stop(true, true);
              var pidx = index;
              var idx = index + 1 < length ? index + 1 : 0;
              var nidx = idx + 1 < length ? idx + 1 : 0;

              moveToSlide(pidx,nidx,idx);
            }, waitTime);
          };

          // Init cycle
          var pidx = length-1;
          var idx = 0;
          var nidx = idx + 1 < length ? idx + 1 : 0;

           moveToSlide(pidx,nidx,idx);
          startCycle();

    });
  };
})(jQuery, this,0);

 
$(document).ready(function(){
$(".stwillSlider").stwillslider();
});