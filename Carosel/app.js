

var img = document.getElementById("imgTagg")
var link = ["img1.jpeg","img2.jpeg","img3.jpeg","img4.jpeg"]


var count = 0


function para(value){

    
    if(count < 0){
        count = 1
    }

    img.setAttribute("src", link[0]);

    if(value === "+"){
        count ++
        return
    }
    count --
}

setInterval(para,1000);
