// Paste in your own link from jsonstore.io
var root = "https://www.jsonstore.io/1b89b2eed054f2c1ca3dd67350837b6b5349a5da46bb8c7de60fb07a2e65d037";


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
    function fin(){
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
    }
  })
document.getElementsByTagName("button")[1]["data-cliboard-text"] = window.location.href;
  function readonly(){
    window.location.hash = "$" + window.location.hash.substr(1)
    location.reload()
  }

  function copy(){
    simplecopy(window.location.href);
  }
