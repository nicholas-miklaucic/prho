# Bayes In the Real World: The Metropolis-Hastings Algorithm

Last time, we talked about Bayesian statistics as a powerful framework to learn from data and make
decisions in an uncertain world. I ended on a bit of downer: unfortunately, the math behind Bayesian
statistics is only tractable in a small set of problems. In order to use Bayesian inference in the
real world, we're going to have to find ways of approximating the correct answer when finding it
exactly is impossible. The existence of algorithms to do this is why Bayesian statistics is in a
renaissance: before ten or fifteen years ago, finding an intractable integral was simply a dead end.
Now, it's possible to press on, unlocking the power of Bayesian inference in far more applications.

The Metropolis-Hastings algorithm is the first step on the road to the state-of-the-art used today,
and its concepts underpin almost every approach that comes after it. So what is this seminal
algorithm, and what problem does it solve? I'll begin by describing it abstractly, without reference
to Bayes, and then we'll see how the two connect.

# Challenge: Sampling From an Unnormalized Probability Distribution

Let's say you have some probability distribution function $P(x)$: for now, we'll assume that $x$ can
be any real number. You'd like to generate random samples from this probability distribution, but
unfortunately there's a catch: $P(x)$ doesn't sum to 1, like most probability distributions. It sums
to some constant $c$ that you don't know. Another way of imagining this is that every output we get
is multiplied by some constant $c$ that we can't see.

This is what the Metropolis-Hastings algorithm does: it lets us sample from this distribution while
requiring very few evaluations of $P$.[^int]

[^int]: In a way, you can think of this algorithm as a way of approximating integrals: we're estimating
    $\int_{x \in \mathbb{R}} P(x)\ dx$. That's a fine way of thinking about it, but in Bayesian stats
    we normally take these samples directly, without going to the extra step of estimating $c$.

It's worth taking some time to explore alternative approaches. Take a second to think about what you
might try if given this problem!

# Can We Just Take Integrals?
One solution is to compute $\int_{x \in \mathbb{R}} P(x)\ dx$ using some numerical integration
method. This can work, but it has some big problems:
 - Where do we start and end the integral? Remember $P$ is a black box: we don't know what we can
   reasonably restrict our search space to.
 - It scales very poorly with dimensionality: if we have a 2D or 3D probability distribution,
   there's a lot more space we have to search through.
 - Without knowing anything about $P$, it's hard to say how fine-grained our integration needs to
   be: too fine-grained and it won't be possible to compute $P$ for all of the values we want, and
   if we are too coarse we'll miss parts of the distribution.

These problems will pop up again and again, and we'll become intimately familiar with them. I've
been *extremely* optimistic in using a single-variable normal distribution as my imagined $P$:
distributions with crazy spikes, very long tails, or separated "islands" will be much harder to deal
with.
