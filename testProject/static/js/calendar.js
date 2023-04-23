const monthRef = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dayRef = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
const current = new Date();
const content = document.getElementById("content")
const monthHeader = document.getElementById("monthHeader")
monthHeader.setAttribute("data-month", current.getMonth())

const d = new Date(current.getYear(), monthHeader.dataset.month);
let month = monthRef[d.getMonth()];
const monthName = document.getElementById("month")
monthName.dataset.month = month;
monthName.dataset.year = current.getFullYear();

function nextMonth(){
  document.getElementById("prev").style.visibility = "visible"
  if(Number(monthHeader.dataset.month) == 10){
    document.getElementById("next").style.visibility = "hidden"
  }
  if(Number(monthHeader.dataset.month) >= 11){
    return
  }
  let theMonth = monthHeader.dataset.month 
  theMonth = Number(theMonth)
  theMonth += 1
  monthHeader.dataset.month = theMonth.toString()
  monthName.setAttribute("data-month", monthRef[monthHeader.dataset.month])
  renderCalendar();
}
function prevMonth(){
  document.getElementById("next").style.visibility = "visible"
  if(Number(monthHeader.dataset.month) == 1){
    document.getElementById("prev").style.visibility = "hidden"
  }
  if(Number(monthHeader.dataset.month) <= 0){
    return
  }
  let theMonth = monthHeader.dataset.month 
  theMonth = Number(theMonth)
  theMonth -= 1
  monthHeader.dataset.month = theMonth.toString()
  monthName.setAttribute("data-month", monthRef[monthHeader.dataset.month])
  renderCalendar();
}
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}
function weekCount(year, month_number) {

    var firstOfMonth = new Date(year, month_number, 1);
    var lastOfMonth = new Date(year, month_number + 1, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();
    
    return Math.ceil( used / 7);
}
function renderCalendar(){
  content.innerHTML = ""
  for(let week = 0, date = 1; week < weekCount(current.getFullYear(), Number(monthHeader.dataset.month)); week++){
    var weekTitle = document.createElement('span')
    var column = document.createElement('div')
    weekTitle.classList.add("divider")
    weekTitle.setAttribute("data-set-nthWeek", week+1)
    column.classList.add("column")
    
    for(let day = 0; day < 7; ){
        let firstDay = new Date(current.getFullYear(), Number(monthHeader.dataset.month), 1)
        
        if(date > daysInMonth(Number(monthHeader.dataset.month)+1, current.getFullYear()))
            break
        
        if(date == 1 && day != firstDay.getDay()){
            column.innerHTML += 
                `<div class="dayCard hide" data-set-empty="true" >
                    <span class="day ${dayRef[day]}"></span>
                    <span class="date"></span>
                    <ul class="cardContent"></ul>
                </div>`
            
        }else if(day==1){
            column.innerHTML += 
            `<div class="dayCard" data-set-empty="false">
                <span class="day ${dayRef[day]}"></span>
                <span class="date"> ${date} </span>
                <ul class="cardContent">
                    <span class="cardTitle"></span>
                    <li class="task" data-duration="safe"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank"> Assignment A</a></li>
                    <li class="task" data-duration="warning"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Assignment B</a></li>
                    <li class="task" data-duration="near"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">subject Assignment C</a></li>
                    <li class="task" data-duration="near"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">subject Assignment C</a></li>
                    <li class="task" data-duration="near"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">subject Assignment C</a></li>
                </ul>
             </div>`
             date++;
        }
        else{
        column.innerHTML += 
            `<div class="dayCard" data-set-empty="true">
                <span class="day ${dayRef[day]}"></span>
                <span class="date"> ${date} </span>
                <ul class="cardContent">
                </ul>
             </div>`
             date++;
            }
        day++
    }
    content.appendChild(weekTitle)
    content.appendChild(column)
    
}
}
renderCalendar();
// const myText = document.querySelector(".text");
// const thisText = myText.textContent;

// myText.onmouseover = function () {
//     myText.textContent = myText.textContent + myText.dataset.extra;
  
// }
// myText.onmouseout = async function () {
//   await setTimeout(() => {
//     myText.textContent = thisText;
//   }, 100);
// };