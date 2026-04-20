> [!note]- Describe the functions of the network layer.
> - Moves packets from source node to destination node via intermediate nodes (routers.)
> - Runs in end hosts and routers.
> - Main protocol is IP.

### Internet Protocol

> [!note]- Describe **internet protocol (IP)**.
> - IP header contains source and destination IPv4 address.
> - Source — add IP header to segments from transport layer and send to link layer.
> - Routers — check destination IP to decide next hop router, run routing protocols.
> - Destination — receive IP datagram, strip IP header, deliver to transport layer.

> [!note]- Describe **public and private IP addresses**.
> - **Public IP** — IPs unique globally, address provided ONLY to gateway router.
> - **Private IP** — IPs unique within a subnet.
> - IPv4 — 32 bit, 8 bit dotted decimal.
> - IPv6 — 128 bit, 16 bit parts, colon separated.
> - **The customisability of an IP is given by the number of non-assigned bits.**
>
> **Allocation:**
>
> - ICANN allocates public IP addresses to ISPs.
> - ISPs allocate public IP addresses to network devices.
> - Some IP addresses are reserved for use as private IP addresses:
>     - 10 . x . x . x
>     - 172 . (16 to 32) . x . x
>     - 192 . 168 . x . x

> [!note]- Describe **DHCP**.
> - Application level protocol that assigns dynamically assigns IP addresses from a server (usually the gateway router).
> - Pool of available IP addresses is managed by the server.
> - Can also provide network information such as default gateway address to a device.

> [!note]- Describe **network address translation (NAT)**.
> - Allows private IPs to communicate with public IPs, via a gateway router.
> - Uses port number to identify host.
>     - Controversial as port numbers should identify processes, not hosts.
>     - IPv6 (128 bit addresses) should be used to solved shortage.
>
> **Process:**
>
> - Host sends request with destination IP outside of the subnet.
> - Packet forwarded to NAT router:
>     - Host private IP address → gateway public IP address.
>     - Random port number assigned to identify host.
>     - NAT entry is <host source IP, process port number> → <gateway public IP, host port number>
> - Packet forwarded to destination.
> - Destination responds to translated address <gateway public IP, host identifying port number>.
> - Response packet destination and port number translated then forwarded to correct host.

> [!note]- Describe **subnets**.
> - Interfaces on same subnet can communicate directly with each other.
>
> **Classless Inter-Domain Routing (CIDR):**
>
> - **a.b.c.d/x** where x is the number of bits used in the subnet.
> - Subnet mask used to find subnet prefix.
>
> **Process:**
>
> - If source and destination IP on **same subnet:**
>     - Use ARP to get MAC address of destination from IP address.
>     - Packet sent directly to destination using link layer switch.
> - If on different subnets - gateway router used:
>     - Forward packets to default gateway router, then NAT.

### Routing

> [!note]- Describe routers in the network layer.
> - **Forwarding** — move packets to appropriate router output.
> - **Routing** — construct routing tables.
>
> **Routing table:**
>
> - Need to map input IPs to output links.
> - Can map **address ranges → output link.**
>     - IPs may not divide into nice ranges.
> - **Longest prefix matching** → output link.

> [!note]- Describe **routing algorithms**.
> - Network abstracted as weighted graph G = (N, E).
> - Edges have cost c(x, y) associated with it.
>
> **Global algorithms** - need knowledge of complete at each router, including costs (link state algorithms).
>
> - **Dijkstra’s algorithm:**
>     - Computes least cost paths from source node to all other nodes.
>     - Implemented in open shortest path first protocol (OSPF).
>     - Link costs are broadcasted to the entire network so the topology and costs are known.
>     
>     ![Dijkstra Example](/Resources/Images/DijkstraExample.png)
>     
>
> **Local algorithms** - only need knowledge of local neighbourhood at each router.
>
> - **Distance vector algorithm:**
>     - $d_x(y)$ = length of shortest path from x to y.
>     - Based on the Bellman-Ford equation:
>         - Relates $d_x(y) \ \text{to} \ d_v(y) \ \text{where} \ v \in N(x) \ \text{(v in the neighbours of x)}$
>         - $d_x(y) = \underset{v \in N(x)}{min} \{c(x,v)+d_v(y)\}$
>     
>     **Process:**
>     
>     - Each node has a table of the distances to every other node.
>     - t = 0 — each node’s table has the distance to its immediate neighbours.
>     - t = 1:
>         - All nodes receive distances from neighbours.
>         - Nodes compute the new distances (using min).
>         - If ANY distance in a node’s distance vector changed, retransmit it (message passing).
>     - When no more transmissions, done.
>     
>     **Shit maths notation process:**
>     
>     - $D_x(y)$ = current estimate of minimum length from x to y.
>         - Each node x, maintains vector of current estimates $D_x = [D_x(y): y \in N]$
>     - Each node x performs update $D_x = \underset{v \in N(x)}{min} \{c(x,v) \ + \ D_v(y) \}$
>         - Needs cost to each neighbour v: c(x, v)
>         - Distance vector of each neighbour v - obtained through message passing.
>     
>     ![Dijkstra Recomputation Each Node](/Resources/Images/DijkstraRecomputeEachNode.png)
>     
>     ![Computation Table Dijkstra 1](/Resources/Images/CompTableDijkstra1.png)
>     
>     ![Computation Table Dijkstra 2](/Resources/Images/CompTableDijkstra2.png)
