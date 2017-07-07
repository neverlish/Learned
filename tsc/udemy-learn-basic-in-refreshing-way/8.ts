function findAnswer(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(42);
    }, 1000);
  });
}

findAnswer().then(answer => {
  console.log('the answer is ' + answer);
})

async function getAsyncAnswer() {
  let answer = 0;
  try {
      answer = await findAnswer();
  }
  catch (err) {
    console.log('an error has occured: ' + err);
    return;
  }
  console.log('the answer2 is ' + answer);
}

getAsyncAnswer();
