function hideAllButCurrent(){$("nav > ul > li > ul li").hide();var a=window.location.pathname.split("/").pop();$("nav > ul > li > a[href^='"+a+"']").parent().find("> ul li").show()}$(document).ready(function(){hideAllButCurrent()});