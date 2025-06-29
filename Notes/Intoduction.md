<!-- To make a web server : -->
<pre>
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('GeeksforGeeks!');
    res.end();
}).listen(8080);
</pre>

<p>
the Node run time has several dependencies and the most important ones are the V8 JavaScript engine and Libuv.

The V8 engine is responsible for converting JavaScript code into machine code that a computer can understand, but it is insufficient to develop a complete server-side framework like Node.js. As a result, libuv is likewise included in Node.

Libuv is a free and open-source library that focuses on asynchronous I/O. This layer offers Node access to the computer's underlying operating system, file system, networking, and other features. Aside from that, libuv supports two crucial Node.js features: the Event Loop and the Thread Pool.
</p>


<p><h3>Front End Development:</h3>Everything that occurs in the web browser is referred to as frontend development. As a result, the name front-end refers to the process of planning and developing the final website that will be visible to users.</p>

<p><h3>Server:</h3>a basic server is actually just a computer linked to the internet that first stores a website's files, such as HTML, CSS, and graphics, and then run the HTTP server, which can recognize URLs and respond to requests. This piece of HTTP server software is what uses requests and responses to connect with the browser.</p>


<p> <h3>How Libuv is used : </h3> Some tasks are simply too difficult. They're too expensive to run in the event loop because they'd lock up the single thread. That's where the thread pool comes in, which, like the event loop, is provided by the Libuv package to Node.js. The thread pool provides us with four other threads that are fully independent of the main thread. And we can actually configure it up to 128 threads. As a result, these threads formed a thread pool, which the event loop can use to offload costly activities like file system API, cryptography, compression, DNS lookups, and so on.</p>

<p> <h3> Node Worker Thread: </h3>Node.js Worker Threads: Worker Threads in Node.js is useful for performing heavy JavaScript tasks. With the help of threads, Worker makes it easy to run javascript codes in parallel making it much faster and more efficient. We can do heavy tasks without even disturbing the main thread. Worker threads were not introduced in the older versions of Node. Therefore first update your Node.js for getting started.
<br>
<h5>worker.js</h5>
<pre>
const { workerData, parentPort } = require('worker_threads')
  
console.log('Welcome to the '+ workerData);
  
parentPort.postMessage({ fileName: workerData, status: 'Done' })
</pre>
<h5>index.js</h5>
<pre>
const { Worker } = require('worker_threads')
  
function runService(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(
                './worker.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(
`The exit code was used to stop the Worker Thread: ${code}`));
        })
    })
}
  
async function run() {
    const result = await runService('GeeksForGeeks')
    console.log(result);
}
  
run().catch(err => console.error(err))
</pre>
</p>