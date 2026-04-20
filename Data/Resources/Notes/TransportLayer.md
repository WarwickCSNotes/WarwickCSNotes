# Transport Layer

> [!note]- Describe the purpose of the transport layer.
> - Provides **logical communication** **between application processes** (not connected) running on different hosts.
> - **Sender:**
>     - Split app messages into **segments** of MSS (maximum segment size).
>     - Add header to segments — port numbers, segment numbers (if TCP), EC info.
>     - Pass segments to network layer.
> - **Receiver:**
>     - Reassembles segments into messages.
>     - Passes to correct application using port number.

### TCP/UDP

> [!note]- Describe the **UDP protocol**.
> - Sender — splits data into segments, adds UDP header, sends to network layer.
> - Receiver — if packet reaches destination, deliver to right process.
> - Connection-less — Each UDP segment is treated independently.
> - (+/-) No congestion control — can send at any rate.
> - (+) Reliability can be added at application layer.
> - (+) Faster due to smaller headers and no connection initialisation.

> [!note]- Describe the **TCP protocol**.
> - Data split into segments, adds TCP headers, sends to the network layer.
> - (+) Provides reliable, in-order ****packet sending.
>     - Compensates for unreliable network layer.
>     - **Checksums** — detect bit errors.
>     - **ACKs** — is packet received?
>     - **Timeout** — if ACK not received in certain interval.
>     - **Retransmission** — automatic repeat request (ARQ for lost/corrupted packets).
>     - **Sequence number** — correctly order packets.
> - **Flow control** — sender speed matched to receiver speed.
> - **Congestion control** — adjust rate based on congestion**.**
> - **Connection oriented** — need to do TCP handshake.
>     - **TCP handshake** — Send syn=1, respond syn=1, ack=1, send ack=1 with request.

### Retransmission Protocols

> [!note]- Describe **stop and wait** automatic repeat request (ARQ) protocol.
> - Send packet then WAIT until ACK sent back.
>     - ACK → next packet sent.
>     - No ACK → timeout, retransmit.
> - **Alternating bit protocol** — sufficient to use 1 bit sequence number for ACK packet.
>
> **Speed:**
>
> - Poor utilisation of link capacity (EACH packet is transmission time + RTT).
>     
>     ![Stop and Wait ARQ](/Resources/Images/ARQProtocol.png)
>     
>     - L = packet size.
>     - R = link speed.

> [!note]- Describe the **delay bandwidth product** automatic repeat request (ARQ) protocol.
> - Sender can send multiple packets without waiting for the ACK.
> - Go back N and selective repeat are used to resend missing packets.
> - **Delay bandwidth product = R x RTT** (bits of additional data that can be sent during RTT interval).
> - **Pipeline length = L + R x RTT** (can be approximated as R x RTT).
>
> **Receiver buffer:**
>
> - Must not overflow the receiver’s buffer.
> - Window size should be ≤ free buffer width, otherwise limit sending.
> - Receiver advertises free buffer space in receive window field.
> - **Window size (W) = last byte sent (seq. num) - last byte ACKed (seq. num)** (the difference in the sequence numbers gives the window size).

> [!note]- Describe the automatic repeat request retransmission protocol **go back N**.
> - N = window size (which depends on the sender) — the window is how many packets are “pending” for their acc.
> - If the ACK for a frame is not received in a certain time period, all frames in the current window are transmitted.
> - If sender is expecting packet n, the possible sequence numbers of packets is **n - W to n + W - 1**
>     - n - W to n - 1 — assuming all packets in the send window were lost.
>     - n to n + W - 1 — assuming all packets were ACKed.
> - If **n == expectedseqnum** (expected packet ACKed):
>     - expectedseqnum++
>     - ACK(n) — **cumulative ACK** for ≤ n (mitigates losses on receiver sending ACKs, just have to wait).
>     - Send packet n+1 (window slides over by 1).
> - Else:
>     - Discard packet.
>     - ACK(expectedseqnum-1)
>     - Retransmit whole window when problematic packet times out.
>
> **Examples:**
>
> ![GoBackN 1](/Resources/Images/GoBackN1.png)
>
> ![GoBackN 2](/Resources/Images/GoBackN2.png)

> [!note]- Describe the automatic repeat request retransmission protocol **selective repeat**.
> - Sender sends packets, receiver sends ACKs for packets it receives.
> - Can receive a packet with a sequence number outside its receive window.
>     - If ACK gets lost and receive window is ahead of that packet.
> - If ACK is received:
>     - Send next packet (shift window by 1).
> - Else:
>     - Make note of missing packet and retransmit it.
>
> **Example:**
>
> ![Selective Repeat](/Resources/Images/SelectiveRepeat.png)

> [!note]- Describe the **TCP automatic repeat request (ARQ)** retransmission protocol.
> - Mixture of GBN and SR — cumulative ACKS but problematic packets are individually retransmitted.
> - TCP ACK — check against expectedseqnum for other side.
>
> **Structure of segment:**
>
> - Each byte of data is numbered.
> - Segment can carry data and serve as ACK (allows for duplex communication with ACKs).
>
> **Fast retransmit:**
>
> - Timeouts can be long, instead we can detect missing packets in other ways.
> - Can use duplicate ACKs to detect packet lost.
> - **3 duplicate ACKS → retransmit data** without waiting for timeout.
>
> **Examples:**
>
> - W = 8
>
> ![TCP ARQ 1](/Resources/Images/TCPARQ1.png)
>
> ![TCP ARQ 2](/Resources/Images/TCPARQ2.png)

### Congestion Control

> [!note]- Describe **additive increase, multiplicative decrease (AIMD)** for congestion control.
> - Transmission rate is controlled depending on level of congestion.
> - Increase congestion window size until loss occurs, then cut window in half (saw tooth graph).
>
> **TCP slow start:**
>
> - Increase convergence speed by exponentially (rather than +1).
> - Increasing window size until a threshold (ssthresh) is reached.
>
> **Detection and action:**
>
> - In case of timeout loss (more series) → enter slow start phase (a reset).
> - In case of duplicate ACKs → half congestion window.
>
> **What to control?**
>
> - **Window size (W) = (seq. num of last byte sent) - (seq. num of last byte ACKed)**
>     - **W ≤ min(cwnd, b)** (window needs be smaller than congestion window and receiver buffer).
>     
>     ![Window Size](/Resources/Images/WindowSize.png)
>     
> - **Rate of transmission ~= W/RTT**
>     - Have to wait RTT to receive an ACK for the window until the next window can be sent.
>     - Controlling W controls the transmission rate.
> - **Number of segments to transmit data = |W/MSS|**
>     - MSS = max segment size and is determined by the link layer protocol.
>
> **Why is AIMD fair?**
>
> - 2 TCP senders sharing same link — each should have R/2 rate.
> - Additive increase gives slope of 1 as throughput increases.
> - Multiplicative decrease decreases throughput proportionally.
> - Converges to = R/2, R/2
>     
>     ![AIMD Fair](/Resources/Images/AIMDFair.png)
