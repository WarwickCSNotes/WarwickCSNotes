# Computer Networks

> [!note]- Describe a network and its rough structure.
> - Allows processes on different devices to communicate.
>
> **Edge (end hosts):**
>
> - Run network applications.
> - Break down app messages into packets.
> - Add packet headers (IP → host, port → application on host).
>
> **Core:**
>
> - Packet switches that forward data packets (switch and router).
> - **Routing** - run routing algorithms and construct routing tables.
> - **Forwarding** - forward packets to appropriate output link according to routing table.
>
> **Links:**
>
> - Carry data between devices.

> [!note]- Define a protocol.
> - Define format and order of messages sent and received among network entities.
> - Define the action taken on transmission and receipt.

# Packet Routing

> [!note]- Describe the **store and forward** principle.
> - Entire packet must arrive at router before transmitting to next link.
>     
>     ![Store and Forward Example](/Resources/Images/StoreForwardDiagram.png)
>     
> - L/R seconds to push packet into link (**transmission delay**).
>
> **Transmission time:**
>
> - Transmission time of all links for 1 packet.
> - For remaining packets, bottleneck speed.

> [!note]- Describe **packet switching** and **circuit switching**.
> - **Flow** — source-destination pair.
>
> **Packet switching:**
>
> - Packets take different routes to their destination.
> - (+) Different flows share resources (links) along their routes.
> - (+) Good for the bursty nature of internet traffic - good resource utilisation.
> - (+) Flows can change routes if link fails or becomes congested.
>
> **Circuit switching:**
>
> - A circuit is **reserved** for each flow **for the entire call duration (blocking)**.
> - (-) Bad resource utilisation — wasteful.
> - (-) Call ends in case of failure.
> - (+) Guaranteed rate.
> - (+) Delivered in correct order.

> [!note]- Describe **throughput**.
> - Rate at which bits are transferred in a **specific flow** for a given time window.
>     - **Throughput = bits transferred / time**
>     - Links in the flow may have different speeds.
> - Minimum speed link bandwidth on a flow will **bottleneck** the throughput.
> - Instantaneous = gradient.
> - Average = rate over a longer period.

> [!note]- Describe the **four sources of packet delay**.
>
> **Transmission delay:**
>
> - $d_{trans}=\underbrace{L/R}_{\text{packet size / bandwidth}}$
> - L = packet length (bits)
> - R = link bandwidth (bits/s)
>
> **Queueing delay:**
>
> - Time waiting at output link of transmission (depends on router congestion level).
> - Happens if **arrival rate > transmission** **rate** of link.
> - Packets may be lost if buffer fills.
>
> **Nodal processing:**
>
> - Time to check bit errors and determine output link.
> - Typically less than milliseconds.
>
> **Propagation delay:**
>
> - distance / time for the signal.
> - $d_{prop}=d/s$
> - s is approximately $2 \times 10^8ms^{-1}$

> [!note]- Describe **MAC addresses and ARP**.
> - Uniquely identify network interfaces.
> - In the link layer header.
> - Source and destination MAC addresses change in each hop.
>
> **ARP:**
>
> - **Used when transmitting a link layer frame to device on same subnet.**
> - Can be used to provide default gateway MAC address.
> - **IP address → MAC address** of device on same subnet.
> - Router broadcasts an ARP request packet to all connected interfaces.
>     - Hacker can send unsolicited ARP reply.
> - ARP reply is sent back to the node.
> - IP address → MAC address mapping is stored in the ARP cache for future use.

# Layering

> [!note]- Describe layering.
> - **Layer 1 = physical layer (closest to hardware).**
> - Layer N uses services in layer N-1 and provides services to layer N+1.
>
> **Pros:**
>
> - (+) Easy to add services to a layer.
> - (+) Easy to change the implementation of a layer.

> [!note]- Describe the layers of the IP suite model.
> - Application = layer 5.
> - Transport = layer 4.
> - Network = layer 3.
> - Link = layer 2.
> - Physical = layer 1.
>
> ![IPSuiteModel](/Resources/Images/IPSuiteModel.png)
