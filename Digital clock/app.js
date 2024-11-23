

var hoursSp = document.getElementById("hours");
var minSp = document.getElementById("min");
var secSp = document.getElementById("sec");
var ap = document.getElementById("amPm");
var currentDay = document.getElementById("Day")
var currentDate = document.getElementById("Date")
var currentMonth = document.getElementById("Month")
var currentYear = document.getElementById("Year")

setInterval(()=>{

    var time = new Date ();

    hoursSp.innerText = time.getHours();
    minSp.innerText = time.getMinutes();
    secSp.innerText = time.getSeconds();
    ap.innerText = "AM";

    count = 12

    if(count = 12){
        hoursSp.innerText = time.getHours() - count
        count++
    }


    count = 12
    if (count = 12){
        ap.innerText =  "PM";
        
    }
   
    hoursSp.innerText = (hoursSp.innerText < 10) ? "0" + hoursSp.innerText: hoursSp.innerText;
    minSp.innerText = (minSp.innerText < 10) ? "0" + minSp.innerText: minSp.innerText;
    secSp.innerText = (secSp.innerText < 10) ? "0" + secSp.innerText: secSp.innerText;


    currentDay.innerText = time.toLocaleString('default', { weekday: 'long' });
    currentDate.innerText = time.getDate()
    currentMonth.innerText = time.toLocaleString('default', { month: 'long' });
    currentYear.innerText = time.getFullYear()


}, 1000)