class Polling {
  constructor(fn, delay, attempts) {
    this.fn = fn;
    this.delay = delay;
    this.attempts = attempts;
  }

  async start() {
    while (this.attempts > 0) {
      await promiseAll([this.fn, this.delayedFn]);
      this.attempts--;
    }
  }

  delayedFn = () => {
    return new Promise((res) => setTimeout(res, this.delay, "delayed"));
  }
}
async function promiseAll(fns) {
  const result = [];
  const promises = [];
  for (const fn of fns) {
    const p = fn();
    promises.push(p);
  }

  for (const p of promises) {
    const res = await p;
    result.push(res);
  }

  return result;
}
const wait = (delay) => new Promise((res) => setTimeout(res, delay));

async function fn1() {
  await wait(1000);
  console.log("FN 1");
  return Promise.resolve(1);
}

async function fn2() {
  await wait(4000);
  console.log("FN 2");
  return Promise.resolve(1);
}

const poll = new Polling(fn1, 2000, 4);
poll.start(); // 4 times each 2s delay

const poll2 = new Polling(fn2, 2000, 4);
poll2.start(); // 4 times each 4s delay
