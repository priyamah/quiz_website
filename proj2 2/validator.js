var a=[1,1,1,1,1,1,1,1,1,1];
var flag=0;
var para;
var t;
var curr_quest;
var cnt_correct_qn=0;
var cnt_incorrect_qn=0;
var my_form,my_tb,my_label=[];
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var qtype = 0;
var num_qtype = 3;
var total_score=0;

function upd_title() {
    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = mm+'/'+dd+'/'+yyyy;
    document.getElementById("demo").innerHTML=today;
    qtype = dd % num_qtype;

    title_obj = document.getElementById("title");
    var str1 = title_obj.innerText;
    title_obj.innerText=title_obj.innerText.concat(Questions_db[qtype].Title);
}


function next_question(id) {
    ask_question(id);
}

var total_count=0;
var submit=0;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            display.style.visibility="hidden";
            end_test();
        }
     
        if (timer < 15) {
            display.style.color="red";
        }
    }, 1000);
}

function ask_question(id) {
    if (document.getElementById("start").value == "START") {
       ask_new_question(id);
       var oneMinute = 60,
       display = document.querySelector('#time');
       display.style.visibility="visible";
       startTimer(oneMinute, display);
    } else {
       check_input(id);
    }
}

function ask_next_question(id) {
    if (document.getElementById("start").value == "START") {
        window.alert("Please Start the test first !!!");
    } else if (submit == 0){
        window.alert("Submit the answer first !!!");
    } else if (total_count == 5) {
        window.alert("Last Question !!!");
    } else {
        submit = 0;
        ask_new_question(id);
    }
}

function check_input(id) {
    if(submit == 1) {
        window.alert("Answer already submitted");
        return;
    }
    if(Questions_db[qtype].Questions[curr_quest].questionType == 1) {
        radios = document.getElementsByName("myInput");
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) { // if this radio button is checked
                userpick = i;
                //userAns = radios[i].value;
                break;
            }
        }
    
        if(i == radios.length) {
            window.alert("Please choose an answer !!!");
        } else {
            submit = 1;
            check_answer();
        }
    } else {
        check_answer();
        submit = 1;
    }
}
        

function ask_new_question(id) { 
    while(1) { 
        var x=Math.floor(Math.random()*10);
        var j=0;
	var k;
        if(a[x]==1) {
            curr_quest = x;
            para = document.getElementById("quest");
            while(para.firstChild) {
                para.removeChild(para.firstChild);
	    }
            t=document.createTextNode(Questions_db[qtype].Questions[x].question);
	    para.appendChild(t);
            my_form=document.getElementById("quest_form");
	    while(my_form.firstChild) {
		my_form.removeChild(my_form.firstChild);
	    }
            my_form.name='myForm';
	    if (Questions_db[qtype].Questions[x].questionType==1) {
                for(k=0;k<=4;k++) {
		    var mybr = document.createElement('br');
		    my_tb=document.createElement('Input');
	            my_tb.type='radio';
	            my_tb.name='myInput';
		    my_tb.value=Questions_db[qtype].Questions[x].choices[k];
                    //my_tb.onclick="checkanswer(my_tb.name);";
		    my_form.appendChild(my_tb);
		    my_label[k]=document.createElement('label');
		    var text=Questions_db[qtype].Questions[x].choices[k];
		    my_label[k].innerHTML=text;
		    my_form.appendChild(my_label[k]);
		    my_form.appendChild(mybr);
				        	
		    flag=1;
	        }
	    } else {
		my_tb=document.createElement("input");
		my_tb.type="text";
		my_tb.name="text";
                my_tb.id="inpText";
                my_tb.style.fontSize="20px";
                my_tb.style.fontWeight="900";
		my_form.appendChild(my_tb);
                var mybr = document.createElement('br');
                my_form.appendChild(mybr);
                my_form.appendChild(mybr);
	    } 
	
	    a[x]=0;
            break;
	}
    }
    document.getElementById("start").value='SUBMIT';
}    

function rotate_elem(elem) {
    var rotate = 0;
  
    function frame() {
 
        rotate += 5;
        var str = "rotateY(" + rotate + "deg)";

        elem.style.transform=str;
        if(rotate==360)
            clearInterval(id);
    }
 
    var id = setInterval(frame, 10);
}

        
    

function check_answer() {
    if(Questions_db[qtype].Questions[curr_quest].questionType == 1) {
        radios = document.getElementsByName("myInput");
        for (var i = 0; i < radios.length; i++) {
           if (radios[i].checked) { // if this radio button is checked
               userpick = i;
               //userAns = radios[i].value;
               break;
           }
        }


        ans = Questions_db[qtype].Questions[curr_quest].correctAnswer;
        // get index of correct answer
        if (userpick != ans) {
            my_label[userpick].style.color="red";
            cnt_incorrect_qn++;
            tmp_var = document.getElementById("incorrect_qn");
            tmp_var.innerText=cnt_incorrect_qn;
            tmp_var.style.color="red";
            var timer1;
            timer1=window.setInterval(function(){ 
                if(tmp_var.style.visibility == "hidden") {
                    tmp_var.style.visibility="visible";
                } else {
                    tmp_var.style.visibility="hidden";
                }}, 500);
            window.setTimeout( function() { clearInterval(timer1); 
                  tmp_var.style.visibility="visible";
            }, 5000);
            
        } else {
            total_score += Questions_db[qtype].Questions[curr_quest].score;
            cnt_correct_qn++;
            tmp_var = document.getElementById("correct_qn");
            tmp_var.innerText=cnt_correct_qn;
            tmp_var.style.color="Green";
            var timer1;
            timer1=window.setInterval(function(){    
                if(tmp_var.style.visibility == "hidden") {
                    tmp_var.style.visibility="visible";
                } else {
                    tmp_var.style.visibility="hidden";
                }}, 250);
            window.setTimeout( function() { clearInterval(timer1);
                  tmp_var.style.visibility="visible";
            }, 3000);

        }
        my_label[ans].style.color="Lime";
    } else {
        text = document.getElementById("inpText");
        var val = Questions_db[qtype].Questions[curr_quest].correctAnswer;
        if(text.value.toUpperCase() == val.toUpperCase()) {
            total_score += Questions_db[qtype].Questions[curr_quest].score;
            cnt_correct_qn++;
            tmp_var = document.getElementById("correct_qn");
            tmp_var.innerText=cnt_correct_qn;
            tmp_var.style.color="Green";
            my_tb.style.color="Lime";
            var timer1;
            timer1=window.setInterval(function(){    
                if(tmp_var.style.visibility == "hidden") {
                    tmp_var.style.visibility="visible";
                } else {
                    tmp_var.style.visibility="hidden";
                }}, 250);
            window.setTimeout( function() { clearInterval(timer1);
                  tmp_var.style.visibility="visible";
            }, 3000);

            para = document.getElementById("quest_form");
            t=document.createTextNode("CORRECT ANSWER!!!");
            para.appendChild(t);
        } else {
            cnt_incorrect_qn++;
            tmp_var = document.getElementById("incorrect_qn");
            tmp_var.innerText=cnt_incorrect_qn; 
            tmp_var.style.color="red";
            my_tb.style.color="red";
            var timer1;
            timer1=window.setInterval(function(){    
                if(tmp_var.style.visibility == "hidden") {
                    tmp_var.style.visibility="visible";
                } else {
                    tmp_var.style.visibility="hidden";
                }}, 250);
            window.setTimeout( function() { clearInterval(timer1);
                  tmp_var.style.visibility="visible";
            }, 3000);


            para = document.getElementById("quest_form");
            t=document.createTextNode(Questions_db[qtype].Questions[curr_quest].correctAnswer);
            para.appendChild(t);
        }
        
    }
    elem=document.getElementById("section_qst");
    rotate_elem(elem);
    total_count++;
}


function end_test() {
    if (document.getElementById("start").value == 'START') {
        window.alert("Start the Test first !!!");
        return;
    } 

    para = document.getElementById("quest");
    while(para.firstChild) {
        para.removeChild(para.firstChild);
    }
    t=document.createTextNode("The Test is over");
//    para.appendChild(t);
    my_form=document.getElementById("quest_form");
    while(my_form.firstChild) {
        my_form.removeChild(my_form.firstChild);
    }
    my_form.style.textAlign="center";
    my_form.style.fontSize="3vw";
    my_form.style.fontWeight="bold";
    my_form.style.color="blue";

    var mybr = document.createElement('br');
    var mybr1 = document.createElement('br');
    var mybr2 = document.createElement('br');
    var mybr3 = document.createElement('br');
    my_form.appendChild(t);
    my_form.appendChild(mybr);
    t=document.createTextNode("Correct Answers: " + cnt_correct_qn);
    my_form.appendChild(mybr1);
    my_form.appendChild(t);
    t=document.createTextNode("Incorrect Answers:  " + cnt_incorrect_qn);
    my_form.appendChild(mybr2);
    my_form.appendChild(t);
    t=document.createTextNode("Total Score:  "+ total_score);
    my_form.appendChild(mybr3);
    my_form.appendChild(t);


    display = document.querySelector('#time');
    display.style.visibility="hidden";
}
