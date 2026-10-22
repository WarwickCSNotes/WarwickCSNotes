#Y1/CS143 
Since $\epsilon$-NFAs can have more than one run on a single word, we can represent all the possible runs in a diagram called a **run tree**. We draw states and transitions between them, but each row of the diagram represents a new letter being read! For example take the following machine $M$:
![Pasted image 20260130134354](assets/Pasted%20image%2020260130134354.png)

The run tree of $M$ on "baaab" would look like the following:
![Pasted image 20260205014740](assets/Pasted%20image%2020260205014740.png)
We can easily see from this that there is no accepting run of $M$ on "baaab".

However there is lots of repetition here, we can simplify this tree greatly into what we call the **run graph** of $M$ on "baaab" by ensuring there are no repeat states on the same level.
![Pasted image 20260205023727](assets/Pasted%20image%2020260205023727.png)

**Def:** Let the **run graph** of $M$ on $w$ be $G_{M,w}$.