//Element Selection
var data_input= document.getElementById('data_input'),
    select_one= document.getElementById('section_one'),
    select_two= document.getElementById('section_two'),
    form= document.getElementById('form'),
    result= document.getElementById('result'),
    table_body= document.getElementById('tbody'),
    show_result= document.getElementById('show_result'),
    copy_button= document.getElementById('copy_button'),
    alert= document.getElementsByClassName('alert')[0];
var storeValue= new Array();
//Input Validation
data_input.addEventListener('input',()=>{
    if(data_input.value.length>6){
       data_input.value = data_input.value.slice(0, 6);
       alert.style.top='-11%';
       setTimeout(()=>{
        alert.style.top='32%'
    },2000)
    }else{alert.style.top='32%'}
});
//Form Submit Action Here
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    let a=[data_input.value,Number(select_one.value),Number(select_two.value)];
    let returnval=calculate(a);
    if(returnval=='NaN'){
        show_result.innerText='Input Wrong Number System';
        result.setAttribute('class','shake');
        result.style.color='red';
        copy_button.style.display='none';
        setTimeout(() => {
            result.removeAttribute('class','shake')
        }, 700);
    }else{
        show_result.innerText=returnval;
        result.removeAttribute('class','shake')
        result.style.color='';
        copy_button.style.display='inline-block';
        storeValue.push({
            inputType:select_one.value,
            input:data_input.value,
            outputType:select_two.value,
            output:returnval
        })
        localStorage.setItem('NumberSystem',JSON.stringify(storeValue))
        getData()
    }
})
//Get To The Local Storage And Set into Array.
getData()
function getData(){
    let getValue= localStorage.getItem('NumberSystem');
    if(getValue != null){
        storeValue= JSON.parse(getValue);
    }
    showData()
}
//Show All Element in WebPage
function showData(){
    let child=tbody.children.length;
    for(i=child;i<storeValue.length;i++){
        let a=[storeValue[i].inputType,storeValue[i].input,storeValue[i].outputType,storeValue[i].output];
        let tr=document.createElement('tr');
        for(let x=0; x<4;x++){
            let td=document.createElement('td');
            td.innerText=dataType(a[x]);
            tr.appendChild(td);
        }
        tbody.appendChild(tr)
    }
}
//All Number System Convert Here
function calculate(a){
    var decimal;
    if(a[1]==2){
        decimal = parseInt(Number(a[0]), 2);
        return decimal.toString(a[2]);
    }else if(a[1]==10){
        return Number(a[0]).toString(a[2]);
    }else if(a[1]==8){
       decimal = parseInt(Number(a[0]), 8);
        return decimal.toString(a[2]);
    }else if(a[1]==16){
        decimal = parseInt('0x'+a[0].toString(), 16);
        return decimal.toString(a[2]);
    }
}
//Data Type Check
function dataType(a){
    if(a==2){
        return "Binary";
    }else if(a==8){
        return "Octal";
    }else if(a==16){
        return "Hexadecimal";
    }else if(a==10){
        return "Decimal";
    }else{
        return a;
    }
}
//Clear Data
function clearData(){
    localStorage.removeItem('NumberSystem');
    location.reload();
}
//Copy Text
copy_button.addEventListener('click',()=>{
    var temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value= show_result.innerText;
    temp.select();
    document.execCommand("copy");
    temp.style.display='none';
});
//Dark Mode Button
function myFunction(a) {
    var checkBox = document.getElementById("myCheck");
    if (checkBox.checked == true){
        localStorage.setItem('theme',JSON.stringify(true));
        dark()
    } else {
       localStorage.removeItem('theme');
       dark()
    }
  }
//Refreash Page Not Change Saved Mode
dark();
function dark(){
  let val       =  localStorage.getItem('theme');
  var body      = document.getElementsByTagName('body')[0];
  let mycheck   = document.getElementById('myCheck');
  let indicator =  document.querySelector('.indicator');
    if(val !=null){
        body.style.background='#121212'
        body.style.color='#fff';
       indicator.style.transform='translate3d(25%, 0, 0)';
       mycheck.setAttribute('checked','true');
    }else{
        body.style.background='#fff';
        body.style.color='';
       indicator.style.transform='';
       mycheck.removeAttribute('checked');
    }
}