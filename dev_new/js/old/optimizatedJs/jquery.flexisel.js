!function(a){a.fn.flexisel=function(b){var f,c=a.extend({visibleItems:4,animationSpeed:200,autoPlay:!1,autoPlaySpeed:3e3,pauseOnHover:!0,setMaxWidthAndHeight:!1,enableResponsiveBreakpoints:!0,clone:!0,multipleSlides:!1,responsiveBreakpoints:{portrait:{changePoint:480,visibleItems:1},landscape:{changePoint:640,visibleItems:2},tablet:{changePoint:768,visibleItems:3}}},b),d=a(this),e=a.extend(c,b),g=!0,h=e.visibleItems,i=d.children().length,j=[],k={init:function(){return this.each(function(){k.appendHTML(),k.setEventHandlers(),k.initializeItems()})},initializeItems:function(){var b=d.parent(),g=(b.height(),d.children());k.sortResponsiveObject(e.responsiveBreakpoints);var i=b.width();if(f=i/h,g.width(f),e.clone){if(e.multipleSlides){var j=g;j.map(function(b){var c=g.length-b;c<=h&&a(this).insertBefore(g.first())})}else g.last().insertBefore(g.first()),g.last().insertBefore(g.first());d.css({left:-f})}d.fadeIn(),a(window).trigger("resize")},appendHTML:function(){if(d.addClass("nbs-flexisel-ul"),d.wrap("<div class='nbs-flexisel-container'><div class='nbs-flexisel-inner'></div></div>"),d.find("li").addClass("nbs-flexisel-item"),e.setMaxWidthAndHeight){var b=a(".nbs-flexisel-item img").width(),c=a(".nbs-flexisel-item img").height();a(".nbs-flexisel-item img").css("max-width",b),a(".nbs-flexisel-item img").css("max-height",c)}if(a("<div class='nbs-flexisel-nav-left'></div><div class='nbs-flexisel-nav-right'></div>").insertAfter(d),e.clone){var f=d.children().clone();d.append(f)}},setEventHandlers:function(){var b=d.parent(),c=d.children(),i=b.find(a(".nbs-flexisel-nav-left")),j=b.find(a(".nbs-flexisel-nav-right"));a(window).on("resize",function(g){k.setResponsiveEvents();var l=a(b).width(),m=a(b).height();f=l/h,c.width(f);var n=-f;e.multipleSlides&&(n=-(f*h)),e.clone?d.css({left:n}):d.css({left:0});var o=i.height()/2,p=m/2-o;i.css("top",p+"px"),j.css("top",p+"px")}),a(i).on("click",function(a){k.scrollLeft()}),a(j).on("click",function(a){k.scrollRight()}),1==e.pauseOnHover&&a(".nbs-flexisel-item").on({mouseenter:function(){g=!1},mouseleave:function(){g=!0}}),1==e.autoPlay&&setInterval(function(){1==g&&k.scrollRight()},e.autoPlaySpeed)},setResponsiveEvents:function(){var b=a("html").width();if(e.enableResponsiveBreakpoints){var c=j[j.length-1].changePoint;for(var d in j){if(b>=c){h=e.visibleItems;break}if(b<j[d].changePoint){h=j[d].visibleItems;break}}}},sortResponsiveObject:function(a){var b=[];for(var c in a)b.push(a[c]);b.sort(function(a,b){return a.changePoint-b.changePoint}),j=b},scrollLeft:function(){if(d.position().left<0&&1==g){g=!1;var b=d.parent(),c=b.width();f=c/h;var i=d.children(),j=f;e.multipleSlides&&(j=f*h),d.animate({left:"+="+j},{queue:!1,duration:e.animationSpeed,easing:"linear",complete:function(){if(e.clone)if(e.multipleSlides){var b=i,c=new Array;b.map(function(b){var d=i.length-b;d<=h&&(c[h-d]=a(this))});for(var d=0;d<c.length;d++)c[d].insertBefore(i.first())}else i.last().insertBefore(i.first());k.adjustScroll(),g=!0}})}},scrollRight:function(){var b=d.parent(),c=b.width();f=c/h;var j=f-c,l=d.position().left+(i-h)*f-c*h;if(j<Math.ceil(l)&&!e.clone){if(1==g){g=!1;var m=f;e.multipleSlides&&(m=f*h),d.animate({left:"-="+m},{queue:!1,duration:e.animationSpeed,easing:"linear",complete:function(){k.adjustScroll(),g=!0}})}}else if(e.clone&&1==g){g=!1;var n=d.children(),m=f;e.multipleSlides&&(m=f*h),d.animate({left:"-="+m},{queue:!1,duration:e.animationSpeed,easing:"linear",complete:function(){if(e.multipleSlides){var b=n,c=new Array;b.map(function(b){var d=b;d<h&&(c[d]=a(this))});for(var f=0;f<c.length;f++)n=d.children(),c[f].insertAfter(n.last())}else n.first().insertAfter(n.last());k.adjustScroll(),g=!0}})}},adjustScroll:function(){var a=d.parent(),b=d.children(),c=a.width();if(f=c/h,b.width(f),e.clone){var g=-f;e.multipleSlides&&(g=-(f*h)),d.css({left:g})}}};return k[b]?k[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error('Method "'+method+'" does not exist in flexisel plugin!'):k.init.apply(this)}}(jQuery);