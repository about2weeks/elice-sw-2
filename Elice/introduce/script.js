
// 1) Scroll Navigation
var aTags = document.querySelectorAll('header a');
for(var i = 0; i < aTags.length; i ++) {
    aTags[i].onclick = function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute("href"));

        window.scrollTo({
            'behavior': 'smooth',
            'top': target.offsetTop
        })
    }
}


// 3) Tabs

var links = document.querySelectorAll(".tabs-list li a")
var items = document.querySelectorAll(".tabs-list li")
for (var i = 0; i < links.length; i++) {
    links[i].onclick = function(e) {
        e.preventDefault();
    }
}

for (var i = 0; i < items.length; i++) {
    items[i].onclick = function() {
        var tabId = this.querySelector("a").getAttribute("href");
        console.log(this.classList);
        document.querySelectorAll(".tabs-list li, .tabs div.tab").forEach(function(item) {
            item.classList.remove("active");
            console.log(item);
        });
        document.querySelector(tabId).classList.add("active");
        this.classList.add("active");
    }  
} 

// 4) items

function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
 
  
   this.style.backgroundColor = bgColor;
    }

    function exit(){
        this.style.backgroundColor = 'transparent';
    }

    var hobItems = document.querySelectorAll(".item");

for(var i = 0; i<hobItems.length; i++){
    hobItems[i].addEventListener("mouseenter", random_bg_color);
    hobItems[i].addEventListener("mouseleave",exit);
}


