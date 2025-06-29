<!-- To make a web server : -->

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('GeeksforGeeks!');
    res.end();
}).listen(8080);


<p>
the Node run time has several dependencies and the most important ones are the V8 JavaScript engine and Libuv.

The V8 engine is responsible for converting JavaScript code into machine code that a computer can understand, but it is insufficient to develop a complete server-side framework like Node.js. As a result, libuv is likewise included in Node.

Libuv is a free and open-source library that focuses on asynchronous I/O. This layer offers Node access to the computer's underlying operating system, file system, networking, and other features. Aside from that, libuv supports two crucial Node.js features: the Event Loop and the Thread Pool.
</p>


<p><h3>Front End Development</h3>: Everything that occurs in the web browser is referred to as frontend development. As a result, the name front-end refers to the process of planning and developing the final website that will be visible to users.</p>

<p><h3>Server:</h3>a basic server is actually just a computer linked to the internet that first stores a website's files, such as HTML, CSS, and graphics, and then run the HTTP server, which can recognize URLs and respond to requests. This piece of HTTP server software is what uses requests and responses to connect with the browser.</p>