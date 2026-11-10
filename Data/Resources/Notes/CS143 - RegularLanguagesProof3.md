#Y1/CS143 
We haven't been given a proof of this but here is an example.

See the machine $M$:
![Pasted image 20260205013305](assets/Pasted%20image%2020260205013305.png)


We can find $M'$ by reversing all the arrows and making the initial state final, and the final state initial.
![Pasted image 20260205013340](assets/Pasted%20image%2020260205013340.png)
Note that the above is now an $\varepsilon$-NFA and not a DFA anymore (however of course we can make it into a DFA since the two are equi-expressive - see below).

![Pasted image 20261020191616](assets/Pasted%20image%2020261020191616.png)