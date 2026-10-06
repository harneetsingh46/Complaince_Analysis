let success = true;

function promise() {
  return new Promise((resolve, reject) => {
    if (success) {
      resolve("Data Fetched Successfully !");
    } else {
      reject("INSIDE CATCH, something went wrong !");
    }
  });
}
// promise.then((response)=>{
//     console.log(response)
// }).catch((err)=>{
//     console.log(err)
// })

async function test() {
  try {
    const response = await promise(success);
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Promise Execution is completed");
  }
}

// test();


const arr = [2,5,6,7,8];
let sum = 0
arr.forEach((e)=>{
    sum+=e;
})
console.log(sum,"Primitive")

const Sum = arr.reduce((acc,e)=>{
    return acc + e
},0)

console.log(Sum,"using reduce")


let signal = "red";

switch(signal){
    case "green" :
        console.log("Green, GO!")
        break;
    case "yellow":
        console.log("Yellow, Be Ready !")
        break;
    case "red":
        console.log("Red, Stop !")
        break;
    default:
        console.log("Something Went Wrong")
}