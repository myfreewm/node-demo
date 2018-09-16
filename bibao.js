
 var my = (function(){
     return function(){
         console.log("thi si go new")
     }
})()

setTimeout(function(){my()},2000)
