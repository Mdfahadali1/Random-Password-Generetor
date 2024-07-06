let inputPwdHolder = document.querySelector('#PwdGenretorDisplay');
let imgfUserDefineTag = document.querySelector('[ImagefUserDefineTag]');
let dataCopy1 = document.querySelector('[dataCopy]');
let slider = document.querySelector('[input-dataslider]');
let output = document.querySelector('.pwdLen');
let upperCaseC = document.querySelector('#upperCase');
let lowerrCaseC = document.querySelector('#lowercase');
let numberS = document.querySelector('#numbers');
let sybmolS = document.querySelector('#sybmols');
let manualStrings = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
//accssing through the typr of a input type
let checkList = document.querySelectorAll('input[type=checkbox]');
let indicator = document.querySelector('.colorAsperPwd');
let genpassWord = document.querySelector('.genPASSWORD');


let password = "";
let passwordLength = 9;
//atleast one default should be selected however

let checkCount = 0;//update it asper requirement

//handling the function slidier
 sliderFunction()
function sliderFunction(){
    //whatever the passwordLength s it will reflect to your inputTag
    //below line 26 has bug-solevd instead of writing slider ,inputPwdHolder has written so it is appered in input box
    slider.value = passwordLength;
    //dispalyin the length of the password onto the screen
    output.innerText = passwordLength;
    // handling the slider asper value range ups and down
    const minVAl = slider.min;
    const MaxVal = slider.max;
    slider.style.backgroundSize = ( (passwordLength - minVAl)*100/(MaxVal - minVAl)) + "% 100%"
}

//making live a range and adding the values to the passwordlength as per range size in numbers
slider.addEventListener('input' , (e)=>{
    passwordLength = e.target.value;
    sliderFunction()
})

//style pending setting indicator
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "0px 0px 14px 1.8px"
    
}

// set min max func for getting the random values
function getRandInteger(min,max){
    return Math.floor(Math.random() * (max-min)) +min;
    
}
//getting the single digit number
function getRandomNumbers(){
    return getRandInteger(0,9);
}

//getting the Caps in Alphabets
function getUpperCase(){
    return String.fromCharCode(getRandInteger(65,91));
 }

 //getting the lowerCase in alphabets 
 function getLowerCase(){
    return String.fromCharCode(getRandInteger(97,123));
 }

 //geting the uniqueSymbols by using the random and charAt method for getting the random symbol 
 function getRandomSymbols(){
    let randomSymbols = getRandInteger(0,manualStrings.length)
    //to get random symbol which is present at manualStrings use char at
    return manualStrings.charAt(randomSymbols);
    //charAt uses charAt() not []
 }

 //function for checking the pwd strenght and calci it

 function strenghtCalci(){
    //creating the varibles for checking wheather the given checkBoxes are marked are not and asper 
    //this it will  genereate a color on its strenght
    let hassUpperCase = false;
    let hassLowerCase =false;
    let hasNumbers = false;
    let hassSymbols = false;
// checking the checkboxes
        if(upperCaseC.checked){
            hassUpperCase = true;
        
        }

        if(lowerrCaseC.checked){
            hassUpperCase = true;
        
        }

        if(numberS.checked){
            hasNumbers = true;
        }

        if(sybmolS.checked){
            hasNumbers = true;
        }
       
        if(hassUpperCase && hassLowerCase && (hasNumbers && hassSymbols)  && passwordLength >= 8 ){
            setIndicator('#f00')
        }
     else if((hassUpperCase && hassLowerCase) || (hassSymbols && passwordLength) >=6 ){
            setIndicator('#ff0');

        }

         else if(hassUpperCase && hassLowerCase || hassSymbols || hasNumbers)
            {
            setIndicator('#f00');
         }
        else{
            setIndicator('#fff')
        }
    
 }




//checking the checkList  

// checkList.addEventListener('change', counCheckList)
// you cannot directly add event listners for a whole but individul
//sloution

checkList.forEach(checkBxoes => {
    checkBxoes.addEventListener('change',counCheckList)
})

//if any changes occuers then it will call the below function countchecklist()
//and for every change it starts the count from the begning 
function counCheckList(e){
    //
    checkCount=0;
    checkList.forEach((checkingList) =>{
        if(checkingList.checked)
            checkCount ++;
    })
}


//specialcondition
if(passwordLength < checkCount){
    passwordLength = checkCount;
    sliderFunction()//to reflect the password length onto the screen
}
 //because it is copy it shoukd only execute when itis required
  async function copiClipBoard(){
    // await is used due untill the below is executing the interpreter wont run any where
    //i think there is a chance of getting an error so hanle it through error handling
   
//activating the class for adding the copied txt

    try{
        // loreksdfljz
              //await is removed due to making glicthes
//     // await navigator.clipboard.writeText(inputPwdHolder.value)
//     // console.log(inputPwdHolder.innerText)
//     // imgfUserDefineTag.innerText = 'copied'
        await navigator.clipboard.writeText(inputPwdHolder.value);
        imgfUserDefineTag.innerText = "copied";
   } catch(e) {
    imgfUserDefineTag.innerText ='failed';
}
imgfUserDefineTag.classList.add('active');

   setTimeout( ()=>{
    imgfUserDefineTag.innerText = "";
    imgfUserDefineTag.classList.remove('active');
   },2000)
  
}


function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

// addinfg a bowser event for making web page alive
//add event to button not imgage keep in state
dataCopy1.addEventListener('click', ()=>{
    //if the input box have any value ,only then its is accessible
    if(inputPwdHolder.value){
        copiClipBoard();
    }
})

// special condition if
// if(checkList < )

//shuffling the password



genpassWord.addEventListener('click', ()=>{
    if(checkCount === 0){
        return;
      
    }

    // SPECIAL CONDITION 
    if(passwordLength < checkCount){
        passwordLength=checkCount;
        sliderFunction();
    }

    // remove old password
password="";

// 
let funArr =[];

if(upperCaseC.checked){
    funArr.push(getUpperCase)
}

if(lowerrCaseC.checked){
    funArr.push(getLowerCase);
}

if(numberS.checked){
    funArr.push(getRandomNumbers)
}


if(sybmolS.checked){
    funArr.push(getRandomSymbols)
}

//comulsory condition-dry run important-> it takes only one charecter of specified checklist item
for(let i=0; i<funArr.length; i++){
     password += funArr[i]();
}
//remaining part of password generation
for(let i=0; i<passwordLength-funArr.length; i++){
    let ranDIndex = getRandInteger(0,funArr.length);
    // console.log('ranDIndex',ranDIndex)
    password +=funArr[ranDIndex]();

}
password = shufflePassword(Array.from(password))

// ui display
inputPwdHolder.value = password;


strenghtCalci(); 

})
// password = shufflePassword(Array.from(password))

// // ui display
// inputPwdHolder.value = password;
