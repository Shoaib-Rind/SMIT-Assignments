

var studentName = [];

var sName = prompt("Enter Your Complete Name");

studentName.push(sName);



var student = document.getElementById("Student")

    student.innerText = "Full Name : " + studentName









var subjectName = ["English","Urdu","Maths","Science","Computer"];
var marks = [];

for (let i = 0; i < subjectName.length; i++){
    
    let mark = prompt(subjectName[i] + " Marks");
    marks.push(parseFloat(mark));
    
}


var totalMarks = 0; 

for (let i = 0; i < marks.length; i++) {
    totalMarks += marks[i]; 
}

//    document.write("Total Marks:", totalMarks); 








var masterDiv = document.getElementById("master")


var tableElement = document.createElement("table")
tableElement.setAttribute("border" , "2")

for ( let i = 0; i < 5 ; i++){

    var tabRow1 = document.createElement("tr");
    var tbCol = document.createElement("td");
    var tbCol2 = document.createElement("td");
    tbCol.innerText = "col 1";
    tbCol2.innerText = "col 2";
    tabRow1.appendChild(tbCol)
    tabRow1.appendChild(tbCol2)
    tableElement.appendChild(tabRow1)

    tbCol.innerText = subjectName[i];
    tbCol2.innerText = marks[i];
} 

masterDiv.appendChild(tableElement)


var total = document.getElementById("Total");

    total.innerText = "Obtained Mark : " + totalMarks


// var percentTot = document.getElementById("Percent");

//     percentTot.innerText = "Percentage : " + totalNum



    var percentTot = document.getElementById("Percent");
    percentTot.innerText = "Percentage: " + percentage.toFixed(2) + "%"; // Display up to 2 decimal places





// function Grade(totalMarks){
//     var percentage = (totalMarks / 500) * 100;
//     return percentage
// }

// var totalNum = totalMarks
// Grade(totalMarks)
// console.log(Grade(totalNum))










// var tableElm = document.createElement("table");
// tableElm.setAttribute("border", "1")



// for (let i = 0; i < 5; i++) {
//     var tableRow1 = document.createElement("tr");
//     var tbCol = document.createElement("td");
//     var tbCol2 = document.createElement("td");
//     tbCol.innerText = "col 1";
//     tbCol2.innerText = "col 2";
//     tableRow1.appendChild(tbCol)
//     tableRow1.appendChild(tbCol2)
//     tableElm.appendChild(tableRow1)
// }

// mainDiv.appendChild(tableElm)