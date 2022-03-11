This sampling procedure converges to the correct distribution, as long as our proposal distribution can actually reach every part of the domain of $P$. In essence, eventually samples produced by this procedure are indistinguishable from samples from the original probability distribution, meaning that we've solved our problem.

The proof of this is a bit complicated, but hopefully it makes intuitive sense. Over time, we "forget" where the chain started: the hundredth sample isn't tied to where we started in the way the second sample is. Once that happens, we move in proportion with the probability distribution, so we'll stay in each place proportionally as long as we should to generate samples from $P$.

### Theory and Praxis
Crucially, this is a *theoretical* guarantee about the *limit* of this process as it continues indefinitely. Practically, with a number of steps that is very much finite, this is merely an approximation. Whether it's a good approximation depends on a lot of specific choices. One of the big decisions is $Q(x^{\prime}\ |\ x)$, our proposal distribution.
 - If the proposal distribution is too narrow around the center, then the walk is slow and takes a long time to "forget" where it started. 
 - If the proposal distribution is too wide, then the chance that any new point is accepted becomes small, and generating samples becomes inefficient.
