> [!note]- Describe the application layer.
> - An interface between the user, the **network application** and the lower layers of the stack.
> - Generate data to be communicate
> - Relevant application layer protocol chosen for the communication.
> - Messages passed to and from transport layer using sockets.

### Network Applications and Sockets

> [!note]- Describe network applications.
> - Processes on host machines that can communicate via the network.
> - Built on top of the transport service — TCP or UDP chosen.
> - Must choose/build a protocol — the format of messages exchanged and their order.
>     - HTTP, SMTP, FTP, DHCP, DNS, SSH
>     - Or develop client and server side of protocol.

> [!note]- Describe sockets.
> - Socket — API between the application and transport layer.
> - Processes send and receive messages via sockets.
>
> **Sending a message with sockets:**
>
> - Sender creates socket (“mailbox”).
> - Bind the socket to a local IP address and port number (the “mailbox” location). These identify the device and process.
> - Write the message into the socket.
> - Layers below the socket transfer the message to the receiver socket.
> - Receiver reads from the socket.
>     
>     ![Sockets](/Resources/Images/Sockets.png)

### HTTP

> [!note]- Describe HTTP, persistent HTTP and non-persistent HTTP.
> - HTTP message structure — status lines, header lines, data.
> - Server — runs network application on port 80.
> - Client — sends request to server with port 80.
>
> **Process:**
>
> - Client **initiates a TCP connection (1 RTT)** with the server and **sends request (1 RTT)**.
>     - **Client SYN** → server.
>     - **Server SYN-ACK** → client.
>     - **Client ACK + request** → server.
> - Server **establishes connection** and **responds** with base HTML file.
> - Then must get referenced files using HTTP v1.0 or HTTP v1.1.
>     - Objects are addressable by URL.
>
> **HTTP v1.0:**
>
> - **Transmission time = 2RTT x number of files + download time of files**
>     - RTT 1 — setup connection.
>     - RTT 2 — request for file.
> - Example question — assume a throughput of R b/s and webpage of L bits that references 3 objects of 2L bits
>     - **8 RTT *+* 7L/R**
> - (-) Bad for server - resources allocated for each requests.
>
> **HTTP v1.1 (persistent):**
>
> - **Transmission time = 2RTT + (RTT + download time of files)**
>     - RTT 1 — setup connection.
>     - RTT 2 — request 1.
>     - RTT 3 — request for files.
> - Example (same as above) — **3 RTT + 7L/R**
> - (+) Multiple objects sent over single TCP connection.
> - **Complete response time = 2RTT + total data transfer time**

### Caching

> [!note]- Describe web caching.
> - Web cache is a **proxy server** which tries to **satisfy client request without involving origin server**.
> - Usually serves requests of popular content.
> - (+) Quicker response time
> - (+) Reduces traffic out of ISP network, reduces internet traffic.
> - Typically installed by ISPs.
