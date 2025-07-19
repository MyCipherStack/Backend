

// let str="asdfasdflkkwer"


// let res=str.split("")


// console.log(res)
// let ans=res.reduce((acc,value)=>acc[value]=acc[value] ? acc[value]+1 : 1,{})

// console.log(ans)



// let arr=[1,4,5,6,7,83,4,6]


// let tem=[]
// for(let i=0;i<arr.length;i++){
//     flag=false
//     let value=arr[i]
//     for(let j=2;j<value/2;j++){
//         if(value/j){
//             flag=true
//             break
//         }
//     }
    
//     if(!flag){
//         tem.push(value)
//     }
    
// }


// console.log(tem)






// const abc = [
//     { a: 3, p: 34 ,d:{p:12}},
//     { a: 3, p: 34 },
//     { a: 3, p: 234 },
//   ];

// function icrement(abc){
    
//     for(let i=0;i<abc.length;i++){
//         console.log(abc[i])

// let obj =abc[i]

// for(let obj of value){
//  console.log(obj)
// }
//     }
// }

// icrement(abc)








const axios = require("axios");


async function askAI() {
  const res = await axios.post("http://localhost:11434/api/generate", {
    model: "starcoder",
    prompt: "Write a JavaScript function to check if a number is prime",
    stream: false  ,
  });

  console.log("AI Response:\n", res.data.response);
}

askAI();
























