const _readline = require('readline');

const _reader = _readline.createInterface({
  input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
  _inputLines.push(line);
});

process.stdin.on('end', solve);

function isSplitPossible(arr) {
  // let sum = arr.reduce((acc, curr) => acc += curr);
  // if (sum % 2 !== 0) {
  //   return 'False';  // if the sum is not divisible by two - it's false
  // }
  
  // sum /= 2;  // our target
  
  // const dp = Array.from({length: arr.length}, () => new Array(sum + 1).fill(false));  // initialize nested array filled with falsey values.
  // rows is the index of the nums array, columns is from 0 .... to .... target

  // for (let i = 0; i < dp.length; i++) {
  //   for (let j = 0; j < dp[i].length; j++) { 
  //       if (i === 0) dp[i][j] = arr[i] === j; // base case - only time a single number equals target is when they are the same
  //   }
  // }
  
  // for (let i = 1; i < dp.length; i++) {
  //   for (let j = 1; j < dp[i].length; j++) { 
  //     if (dp[i-1][j]) dp[i][j] = true; // can we reach target excluding the current element?
  //     else if (arr[i] < j) { // if the current element is smaller than current target
  //       dp[i][j] = dp[i-1][j - arr[i]]; // can we reach target including the current element?
  //     }
  //   }
  // }
  
  // const lastRow = dp.length - 1;
  // const lastCol = dp[lastRow].length - 1;
  // return dp[lastRow][lastCol] ? 'True' : 'False';

  let sum = 0;
  for(let num of arr) sum += num; 

  if(sum%2 !=0) 
    return 'False'; 

  sum /=2 

  let dp = new Array(sum+1).fill(false);
  dp[0] = true;
  
  for(let num of arr){
    
      for(let i=sum; i>0; i--){
          if(num <= i){
              dp[i] = dp[i] || dp[i-num];
          }
      }
  }
  return dp[sum] ? 'True' : 'False';

  // var sum = arr.reduce((a, b) => a + b, 0);
    
  // if (sum % 2 !== 0) {
  //     return 'False';
  // }
  
  // var half = sum / 2; // Never will have decimal, hence safe to just divide.
  
  // // Now, our aim is to find if atleast one subarray has the sum equal to the value `half`
  // // As we can be sure that the other half of the subarray will have the same value
  
  // var dp = [];
  
  // // Base cases
  // dp[0] = true;
  
  // for (var index = 0; index < arr.length; ++ index) {
  //     var num = arr[index];
  //     for (var i = half; i >= num; -- i) {
  //         dp[i] = dp[i] || dp[i - num];
  //     }
  // }
  
  // return dp[half] ? 'True' : 'False';
}

function solve() {
  const n = readInt();
  const arr = readArray();
  
  process.stdout.write(`${isSplitPossible(arr)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  const arr = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
  _curLine++;
  return arr;
}