// Paste in your own link from jsonstore.io
var root = "https://www.jsonstore.io/1b89b2eed054f2c1ca3dd67350837b6b5349a5da46bb8c7de60fb07a2e65d037";
$("#readonly").hover(function(){
  this.innerHTML = "Read only"
}, function(){
  this.innerHTML = "👀"
});

$("#copyonly").hover(function(){
  this.innerHTML = "Copy link"
}, function(){
  this.innerHTML = "📋"
});

$("#newonly").hover(function(){
  this.innerHTML = "<span style='color:#3d3d3d'>New Note</span>"
}, function(){
  this.innerHTML = "➕"
});
 var placeholder = true;
// Service Worker for add to homescreen
  if ('serviceWorker' in navigator) {
    console.log("Will the service worker register?");
    navigator.serviceWorker.register('service-worker.js')
      .then(function(reg){
        console.log("Yes, it did.");
      }).catch(function(err) {
        console.log("No it didn't. This happened: ", err)
      });
  }


  function update(){
    $.ajax({
      'url': root + "/" + window.location.hash.substr(1),
      'type': 'POST',
      'data': JSON.stringify(quill.getContents()),
      'dataType': 'json',
      'contentType': 'application/json; charset=utf-8'
    })
    count = 0;
    console.log("saving...")
  }
    var count = 0;
    var first = true;
    function fin(){
      if(first===true && placeholder===true){quill.setContents({"ops":[{"attributes":{"header":1},"insert":"\n"}]}); first = false;}
      if(count === 0){
        
        setTimeout(update, 3000)
        count = 1
      }
    }
  if(window.location.hash == ""){
    window.location.hash =Math.random().toString(32).substring(2, 5) + Math.random().toString(36).substring(2, 5);
  }
  var hashh = window.location.hash.substr(1)
  if(hashh.charAt(0) == "$"){
    document.getElementsByTagName("button")[0].style.display = "none";
    hashh = hashh.substr(1);
    hashh = hashh.split("").reverse().join(""); 
    var quill = new Quill('#editor', {
      theme: 'snow',
      "modules": {
          "toolbar": false
      }
    });
    quill.disable();
  }
  else{
    var quill = new Quill('#editor', {
      theme: 'snow'
    });
  }
  $.getJSON(root + "/" + hashh, function(data){
    data = data["result"];
    
    if(data!=null){
      quill.setContents(data)
      placeholder = false;
    }
    
  })
document.getElementsByTagName("button")[1]["data-cliboard-text"] = window.location.href;
  function readonly(){
    window.location.hash = "$" + window.location.hash.substr(1).split("").reverse().join("")
    location.reload()
  }

  function copy(){
    simplecopy(window.location.href);
  }
