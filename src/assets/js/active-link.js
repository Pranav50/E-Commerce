
var header = document.getElementsByClassName("list-group");
var btns = header.getElementsByClassName("list-group-item-action");
for (var i = 0; i < btns; i++) {
btns[i].addEventListener("click", function() {
var current = document.getElementsByClassName("active");
if(current.length > 0) {
  current[0].className = current[0].className.replace(" active", "");
  }
this.className += " active";
  });
}
