   var parent;
   parent = document.getElementsByClassName("pages")[0];

   function first(e) {
       var e = e.firstChild;
       while (e && e.nodeType !== 1) {
           e = e.nextSibling;
       }
       return e;
   }

   function last(e) {
       var e = e.lastChild;
       while (e && e.nodeType !== 1) {
           e = e.previousSibling;
       }
       return e;
   }

   function install(direction, num) {
       var div, img, pagenum;
       pagenum = num;
       div = document.createElement("div");
       div.setAttribute("pagenum", pagenum);
       div.className = "page";
       img = document.createElement("img");
       img.src = "images/" + num + ".jpg";
       img.onload = function() {
           div.appendChild(img);
           if (direction == 1) {
               parent.style.left = "0px";
               parent.appendChild(div);
           } else {
               parent.style.left = "-1190px";
               parent.insertBefore(div, first(parent));

           }
           movement(direction);
           var paper = document.getElementsByClassName("pager")[0],
               len = paper.children.length,
               childr = paper.children;
           i = 0;
           for (; i < len; i++) {
               if (i == (num - 1)) {
                   childr[i].setAttribute("class", "current");
               } else {
                   childr[i].setAttribute("class", "");
               }
           }
       }


   }

   function remove(direction) {
       if (direction == 1) {
           parent.removeChild(first(parent));
       } else {
           parent.removeChild(last(parent));
       }
       parent.style.left = "0px";
   }

   function movement(direction) {
       var juli = parseInt(parent.style.left),
           num,
           count = 0;
       var timer = setInterval(function() {
               if (count == 10) {
                   clearInterval(timer);
                   remove(direction);
               } else {
                   count++;
                   direction == 1 ? juli -= 119 : juli += 119;;
                   num = juli + "px";
                   parent.style.left = num;
               }

           },
           41);

   }

   function main(direction, num, tote) {
       var pointer = num,
           total,
           direc;
       total = tote,
           direc = direction;

       function automatism() {
           var timer1 = setInterval(function() {
               if (direc == -1) {
                   pointer = pointer % (tote + 1) + direc;
               } else {
                   pointer = pointer % tote + direc;
               }
               if (pointer == 0 && direc == -1) {
                   pointer = tote;
               }
               install(direc, pointer);

           }, 6000);
           return timer1;
       }
       var timeTag = automatism();
       var div = document.getElementsByClassName("connect")[0];
       div.addEventListener('click', function(e) {
           var e = e || window.event;
           var target = e.target || e.srcElement;
           var classname, pagenum, value;
           pagenum = target.getAttribute("pagenum");
           classname = target.getAttribute("class");
           value = pagenum || classname;
           clearInterval(timeTag);
           if (value == "btnprev") {
               pointer--;
               if (pointer == 0) {
                   pointer = tote;
               }
               install(-1, pointer);
               timeTag = automatism();

           } else if (value == "btnnext") {
               pointer++;
               if (pointer == tote + 1) {
                   pointer = 1;
               }
               install(1, pointer);
               timeTag = automatism();

           } else if (parseInt(value) > 0) {
               var n = parseInt(value),
                   d = n - pointer;
               if (d < 0) {
                   install(-1, n);
               } else if (d > 0) {
                   install(1, n);
               }
               pointer = n;
               timeTag = automatism();
           }
           // console.log(timeTag);

       });
   }

   function init(tote, num, dire) {
       if (!num) {
           num = 1;
       }
       if (dire != -1) {
           dire = 1;
       }
       div = document.createElement("div");
       div.setAttribute("pagenum", num);
       div.setAttribute("width", "1190")
       div.className = "page";
       img = document.createElement("img");
       img.src = "images/" + num + ".jpg";
       div.appendChild(img);
       parent.appendChild(div);
       var i = 1;
       while (i <= tote) {
           var pager = document.getElementsByClassName("pager")[0],
               div = document.createElement('div');
           if (i == num) {
               div.setAttribute("class", "current");
           } else {
               div.setAttribute("class", "");
           }
           div.setAttribute("pagenum", i);
           pager.appendChild(div);
           i++;
       }
       main(dire, num, tote);
   }