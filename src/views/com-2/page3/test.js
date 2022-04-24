async function async1() {
  await new Promise((resolve, reject) => {
    resolve();
    console.log("async2 promise");
  });
  console.log("async1 end"); //微任务1
}

async1();
new Promise((resolve) => {
  resolve();
})
  .then(() => {
    console.log("promise1");
  })
  .then(() => {
    console.log("promise2");
  });
