# Evidence-backed synthesis

This document is the scientific core of **Flow of Thoughts**. It is deliberately stricter than a normal paper list.

## Evidence labels

- **DIRECT** — the paper explicitly reports the result, limitation, or future direction.
- **FOLLOW-UP** — a later paper directly tests or challenges an earlier claim.
- **SYNTHESIS** — a conclusion supported by multiple papers but not necessarily stated verbatim by any one of them.
- **HYPOTHESIS** — a falsifiable conjecture suggested by the synthesis; it should not be presented as established fact.
- **CONFLICT** — papers provide meaningfully different evidence or conclusions.

## Curation rule

A research question enters the main site only when it has:

1. at least two concrete pieces of published evidence;
2. a clear separation between what the papers show and what we infer;
3. an unresolved gap that can be turned into an experiment;
4. at least one falsifiable hypothesis.

## Current synthesis programs

### 1. Useful recurrence has to be trained for self-application

**Direct evidence.** Flow Reasoning Models identifies an exposure mismatch between one-step training states and recursively generated inference states and introduces Fixed-Point Forcing. Thinking with Looped Flows argues that short-horizon backpropagation does not adequately train early updates to support later computation, and instead temporally aligns local denoising objectives. Latent Recurrent Transformer introduces an interleaved parallel training procedure so recurrent memory is explicitly present during supervision.

**Synthesis.** The central training problem is state-distribution mismatch plus long-horizon credit assignment, not simply architectural recurrence.

**Open gap.** Find a general objective under which additional self-application remains useful beyond the recurrent horizon used during training.

### 2. Stability is not correctness

**Direct evidence.** Parcae stabilizes recurrent dynamics using spectral constraints. Flow Reasoning Models shows that stable dynamics can still converge confidently to wrong structured solutions. Equilibrium Reasoners ties successful test-time scaling to solution-aligned attractors.

**Synthesis.** Recurrent reasoning should be studied through the geometry of its attractor landscape, not merely whether the loop is numerically stable.

**Open gap.** Distinguish correct convergence from spurious convergence without assuming an external checker.

### 3. A thought state must be useful to verify and control

**Direct evidence.** Coconut shows continuous hidden states can carry alternative next steps. Coconut also calls out the need for latent-reasoning training without language-chain supervision. Follow-up work on inference-time scaling in continuous space finds that standard PRM/ORM recipes have trouble discriminating correct and incorrect latent trajectories.

**Synthesis.** A useful reasoning state should support representation, progress estimation, error discrimination, and steering.

**Open gap.** Learn latent geometry that is simultaneously expressive and verifier-friendly.

### 4. Test-time compute is a vector, not a scalar

**Direct evidence.** EqR separates depth from breadth. Ouro learns how many recurrent passes to allocate to an input through an exit distribution and Q-exit policy. PonderLM-3 allocates compute token-wise. FRM repeatedly refines whole candidate solutions. Looped Flows changes temporal discretization and can sample multiple solutions.

**Synthesis.** The problem is not simply how much compute to spend, but where the next unit of compute should go.

**Open gap.** Compare compute-allocation policies under matched FLOPs, latency, and memory.

### 5. Looping is a scaling axis, but returns saturate

**Direct evidence.** Ouro scales LoopLM pretraining to 7.7T tokens and reports 2–3× parameter efficiency, while also finding that eight-loop training is unstable enough to require a four-loop final design. Parcae reports recurrence/data scaling laws and saturating test-time gains; its future-work section asks whether these laws survive larger budgets and how parameters, data, and recurrence should be scaled jointly. LRT explores a different point on the systems frontier by moving recurrent refinement into training while keeping one decoding forward per token.

**Synthesis.** Recurrence should be modeled as a resource with a cost, not as free intelligence.

**Open gap.** Derive a coupled scaling law over parameters, data, recurrence, memory/state capacity, and latency.

### 6. Convergence may help decide when to stop — after attractors are aligned

**Direct evidence.** EqR links convergence behavior to difficulty and successful scaling. FRM shows the counterexample: convergence can be confidently wrong. PonderLM-3 treats marginal value of extra computation as non-uniform across tokens.

**Synthesis.** A stopping policy should estimate expected value of another update, rather than use convergence magnitude as a correctness certificate.

**Open gap.** Build OOD-calibrated halting rules that remain robust to spurious fixed points.

## Primary sources

- Flow Reasoning Models — https://arxiv.org/abs/2606.29150
- Thinking with Looped Flows — https://arxiv.org/abs/2609.11801
- Equilibrium Reasoners — https://arxiv.org/abs/2605.21488
- Parcae — https://arxiv.org/abs/2604.12946
- Coconut — https://arxiv.org/abs/2412.06769
- Towards Inference-time Scaling for Continuous Space Reasoning — https://aclanthology.org/2026.findings-acl.1338/
- PonderLM-3 — https://arxiv.org/abs/2603.02023
- Latent Recurrent Transformer — https://arxiv.org/abs/2605.26797
- Ouro / Scaling Latent Reasoning via Looped Language Models — https://arxiv.org/abs/2510.25741
