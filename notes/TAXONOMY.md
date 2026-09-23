# Taxonomy

This taxonomy is meant to be **operational**, not merely descriptive. A good category should help us predict what a method can and cannot do.

## 1. Recurrent depth

A shared computation block is applied repeatedly:

`z_(t+1) = F_theta(z_t, x, t)`

Questions:
- Can the model extrapolate to more loops than seen in training?
- Does extra recurrence improve reasoning monotonically?
- What prevents residual/state explosion?
- How should time/depth be encoded?

Representative work: Universal Transformers, recurrent-depth test-time scaling, LoopFormer, Parcae.

## 2. Latent reasoning

Intermediate computation remains in continuous hidden state rather than being decoded into natural-language thought tokens.

Questions:
- What information is represented in latent thoughts?
- Are latent states causally necessary for the answer?
- Can latent computation support branching/search?
- How interpretable or steerable are the states?

Representative work: Coconut, PonderLM, recurrent-depth latent reasoning.

## 3. Flow-based reasoning

The candidate answer or latent state is refined through denoising / flow dynamics rather than standard left-to-right token generation.

Questions:
- What is the correct state space for a reasoning flow?
- Can correct solutions be stable fixed points or attractors?
- How should flow time relate to thinking time?
- Does finer integration genuinely buy reasoning depth?

Representative work: Flow Reasoning Models, Thinking with Looped Flows.

## 4. Adaptive computation

Compute is a decision variable rather than a constant.

Questions:
- Which tokens/problems deserve additional computation?
- Can a model learn to stop based on convergence rather than a fixed budget?
- What is the correct compute regularizer?
- How do we avoid shallow-halting traps or overthinking?

Representative work: ACT, Universal Transformer halting, PonderLM-3.

## 5. Recurrent memory

State is propagated across sequence positions/chunks so the model can carry compact information beyond a local attention window.

Questions:
- What should memory store?
- How large must recurrent state be relative to reasoning depth?
- Can memory be trained in parallel despite recurrent inference?
- When is state recurrence better than simply increasing context/KV cache?

Representative work: Block-Recurrent Transformer, Latent Recurrent Transformer, Maglev.

## 6. Reasoning dynamics

Rather than treating recurrence as an architectural trick, study it as a dynamical system.

Questions:
- Are correct solutions attractors?
- What are the basins of attraction of correct and incorrect solutions?
- Can we define a Lyapunov-like progress measure for reasoning?
- When do repeated updates converge, oscillate, diverge, or overthink?
- Are there scaling laws in recurrent depth / state size / test-time compute?

Representative work: Parcae, Attractor Models, Flow Reasoning Models.

## Cross-cutting axes

Every paper in the database should ideally be tagged along these axes:

- **state representation**: explicit tokens / hidden state / memory tokens / KV state / whole solution;
- **update rule**: autoregressive / recurrent block / self-conditioning / fixed-point solver / flow integration;
- **compute policy**: fixed / variable-budget / learned halt / convergence-based;
- **supervision**: next-token / reconstruction / denoising / task loss / RL;
- **evaluation**: LM loss / algorithmic reasoning / compositional generalization / ARC / long-context / compute-efficiency.
