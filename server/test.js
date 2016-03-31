function asyncQueue(id) {
  const obj = {};
  obj.storage = [];
  obj.enqueue = (f) => {
    obj.storage.push(obj._wrap(f));
    if (obj.storage.length === 1) {
      obj.storage[0]();
    }
  }
  obj._wrap = (f) => {
    const wrappedF = () => {
      f().then((data) => {
        console.log(id, data);
        obj.storage.shift();
        if (obj.storage.length) {
          obj.storage[0]();
        }
      })
    };
    return wrappedF;
  }
  return obj;
}

let i = 0;
function promiseReturningFunction1() {
  return () => (
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(i++), 1000);
    })
  );
}

let j = 0;
function promiseReturningFunction2() {
  return () => (
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(j++), 500);
    })
  );
}

function generateRequest1(queue) {
  queue.enqueue(promiseReturningFunction1());
}

function generateRequest2(queue) {
  queue.enqueue(promiseReturningFunction2());
}

const q1 = asyncQueue('a');
const q2 = asyncQueue('b');
for (let k = 0; k < 50; k++) {
  setTimeout(() => generateRequest1(q1), 100);
  setTimeout(() => generateRequest2(q2), 1000);
}
