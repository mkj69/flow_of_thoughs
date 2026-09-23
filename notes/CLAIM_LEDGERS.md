# Paper claim ledgers

This is the audit layer behind the synthesis.

## Evidence rules

- **DIRECT** — explicitly reported or stated by the paper.
- **SCOPE** — a demonstrated boundary; do not generalize beyond it.
- **SYNTHESIS** — a cross-paper inference, always labeled as such.
- Missing limitations are left missing rather than invented.


## Path Independent Equilibrium Models Can Better Exploit Test-Time Computation (2022)

**Research question.** Why do some equilibrium models improve when given more inference iterations, especially on harder examples?

**State.** Equilibrium hidden state

**Update.** Iterative equilibrium dynamics from different initializations

**Compute policy.** Run more iterations at test time

### Direct findings

- **DIRECT — Abstract**: Upward generalization on harder examples strongly correlates with path independence: convergence toward the same steady-state behavior across different initializations.
- **DIRECT — Abstract**: Interventions that promote path independence improve generalization, while interventions that penalize it degrade this ability.
- **DIRECT — Abstract**: For strong in-distribution models, path independence on OOD samples is strongly associated with per-example accuracy.

### Limitations / future directions

- **SCOPE — Abstract / stated future direction**: The paper explicitly motivates path independence as a general modeling principle for scalable test-time computation.

### Why it matters

A precursor to the current attractor/fixed-point wave: it turns 'more iterations help' into a property of the learned dynamics rather than a purely architectural claim.

**Connections:** Equilibrium Reasoners, Fixed-Point Reasoners, Flow Reasoning Models

**Source:** https://arxiv.org/abs/2211.09961

## Training Large Language Models to Reason in a Continuous Latent Space (2024)

**Research question.** Can an LLM carry intermediate reasoning in continuous hidden states instead of committing every step to language tokens?

**State.** Last hidden state used as a continuous thought

**Update.** Feed the previous hidden state back as the next input embedding

**Compute policy.** Sequential latent-thought steps; fixed-length latent mode in the main experiments

### Direct findings

- **DIRECT — Abstract / §1**: Continuous thoughts can encode multiple alternative next reasoning steps, producing breadth-first-search-like behavior instead of early commitment to one textual path.
- **DIRECT — Abstract / §1**: Coconut outperforms language CoT on some logical-reasoning tasks requiring substantial planning or backtracking, while using fewer thinking tokens.
- **DIRECT — §3 Training Procedure**: Training uses a multi-stage curriculum in which language CoT steps are progressively replaced by continuous thoughts.

### Limitations / future directions

- **SCOPE — §3 Training Details**: Sequential latent-thought forward passes create a parallelism bottleneck; improving training efficiency is explicitly identified as future work.
- **SCOPE — §3 Inference Process**: The authors discuss adaptive termination with a binary classifier, but use a constant latent-thought length for simplicity in the reported experiments.

### Why it matters

Coconut makes the 'thought state' concrete and exposes two field-defining problems: how to train latent reasoning efficiently and how to decide when latent computation should stop.

**Connections:** Continuous-space inference-time scaling, PonderLM-3, Latent Recurrent Transformer

**Source:** https://arxiv.org/abs/2412.06769

## Scaling Latent Reasoning via Looped Language Models / Ouro (2025)

**Research question.** Can recurrent depth become a practical pretraining-scale resource for language models, rather than a small-scale architectural experiment?

**State.** Token representations carried through a parameter-shared Transformer stack

**Update.** Apply the same weight-tied layers repeatedly so each recurrent pass refines the latent computation

**Compute policy.** Train an exit distribution with entropy regularization, then use Q-exit to choose recurrent depth

### Direct findings

- **DIRECT — Abstract / §1**: The 1.4B and 2.6B Ouro models are pretrained on 7.7T tokens and report performance comparable to 4B and 8B standard Transformers on most evaluated benchmarks.
- **DIRECT — §1 / §6**: Controlled experiments attribute the advantage primarily to improved knowledge manipulation and multi-hop composition rather than increased raw knowledge storage.
- **DIRECT — §3.3 / §5.4**: Entropy regularization prevents immediate collapse of the learned exit distribution to the deepest loop, while focused gate training improves the accuracy–compute trade-off.
- **DIRECT — §3.2 / §5.4**: Q-exit converts the learned exit distribution into an inference policy that can terminate simple inputs earlier and allocate deeper recurrence when useful.

### Limitations / future directions

- **SCOPE — §4.3**: Training with eight recurrent steps produced loss spikes and gradient oscillations, so the final large-scale models use four recurrent steps.
- **SCOPE — §5.3**: Reasoning performance generally peaks near the trained recurrent depth and is not guaranteed to improve monotonically with additional loops.
- **SCOPE — §5.4**: The best adaptive-exit trade-off requires specialized second-stage gate training rather than emerging perfectly from language-model pretraining alone.

### Why it matters

Ouro is the large-scale bridge between early looped-Transformer ideas and modern recurrent reasoning: it shows that loop depth can be trained at foundation-model scale, while making stability and compute allocation impossible to ignore.

**Connections:** Scaling up Test-Time Compute with Latent Reasoning, Parcae, PonderLM-3, Fixed-Point Reasoners

**Source:** https://arxiv.org/abs/2510.25741

## PonderLM-3: Adaptive Token-Wise Pondering with Differentiable Masking (2026)

**Research question.** If extra inference compute is useful, which tokens should receive it?

**State.** Token representations inside a pondering language model

**Update.** Additional per-token computation controlled by differentiable masking

**Compute policy.** Learned token-wise allocation with matching hard pruning at inference

### Direct findings

- **DIRECT — Abstract**: Extra compute is treated as an allocatable per-token resource rather than a uniform cost paid by every token.
- **DIRECT — Abstract**: Differentiable masking during pretraining is paired with a matching hard-pruning rule at inference.
- **DIRECT — Abstract**: The reported model improves the perplexity–inference-FLOP Pareto frontier and uses fewer inference FLOPs than a fixed-step PonderLM-2 comparison.

### Limitations / future directions

- **SCOPE — Scope of method**: The mechanism routes compute across tokens; routing across trajectory depth, breadth, or whole-solution refinement is outside this paper's scope.

### Why it matters

It converts test-time compute from a scalar budget into a routing problem, one of the central questions for adaptive reasoning systems.

**Connections:** Equilibrium Reasoners, Flow Reasoning Models, Thinking with Looped Flows

**Source:** https://arxiv.org/abs/2603.02023

## Parcae: Scaling Laws For Stable Looped Language Models (2026)

**Research question.** Can looped language models become a stable, predictable scaling axis rather than an unstable architectural trick?

**State.** Residual-stream hidden state reused across recurrent depth

**Update.** Looped Transformer dynamics with spectrally constrained injection

**Compute policy.** Scale both training recurrence and test-time recurrence

### Direct findings

- **DIRECT — Abstract / §1**: The paper traces a major instability mode to large spectral norms in injection parameters and models looping as a nonlinear dynamical system over the residual stream.
- **DIRECT — Abstract**: Parcae stabilizes recurrent training and reports lower validation perplexity than prior large-scale looped models.
- **DIRECT — Abstract / §1**: Under the studied budgets, training FLOPs can be scaled through both data and looping, while test-time gains from additional loops follow a saturating exponential trend.

### Limitations / future directions

- **SCOPE — Evidence-bounded scope**: The reported scaling laws are empirical and bounded by the model/data regimes studied; extrapolation to substantially larger frontier scales is not established by the paper.

### Why it matters

Parcae separates numerical stability from semantic progress. A recurrent system can be stable enough to study scaling, but stability alone does not explain why another loop should improve reasoning.

**Connections:** Path Independent Equilibrium Models, Equilibrium Reasoners, Fixed-Point Reasoners

**Source:** https://arxiv.org/abs/2604.12946

## Equilibrium Reasoners: Learning Attractors Enables Scalable Reasoning (2026)

**Research question.** What internal dynamics make iterative latent reasoning generalize and keep improving with more test-time compute?

**State.** Task-conditioned latent state

**Update.** Iterative dynamics trained to form solution-aligned attractors

**Compute policy.** Depth through more iterations; breadth through multiple stochastic initializations

### Direct findings

- **DIRECT — Abstract**: The paper proposes task-conditioned attractors whose stable fixed points correspond to valid solutions as a mechanism for generalizable iterative reasoning.
- **DIRECT — Abstract**: Test-time compute is scaled along two distinct axes: depth and breadth.
- **DIRECT — Abstract**: Simple instances converge in a few iterations, while harder instances benefit from substantially more iterative compute.

### Limitations / future directions

- **SCOPE — Scope of experiments**: The evidence is strongest on structured reasoning problems; whether the same attractor mechanism explains open-ended language reasoning is not established.

### Why it matters

EqR supplies a mechanistic hypothesis for test-time scaling: extra compute works when the learned dynamics contain a basin that pulls states toward valid solutions.

**Connections:** Path Independent Equilibrium Models, Fixed-Point Reasoners, Flow Reasoning Models

**Source:** https://arxiv.org/abs/2605.21488

## Latent Recurrent Transformer: Architecture Exploration, Training Strategies, and Scaling Behavior (2026)

**Research question.** Can recurrent latent computation be moved into cross-token memory so decoding still uses one normal forward pass per token?

**State.** High-level source-layer hidden state from the previous token

**Update.** Cross-token recurrent memory injected through KV and residual pathways

**Compute policy.** Spend extra compute mainly during recurrent-aware pretraining, not extra decoding loops

### Direct findings

- **DIRECT — Abstract / §1**: LRT reuses a previous token's high-level hidden state as recurrent memory while preserving the standard KV-cache interface and one forward pass per generated token.
- **DIRECT — Abstract / §3**: Interleaved parallel training approximates token-level recurrence without exact sequential unrolling.
- **DIRECT — Abstract**: The reported setup improves language-modeling and in-context metrics under matched effective compute with about 9% decoding latency overhead.
- **DIRECT — Appendix D.6**: Increasing the number of interleaved subsets did not improve BPB in the reported ablation; one recurrent-memory-aware refinement step per token captured the observed gain.

### Limitations / future directions

- **SCOPE — §6 Conclusion and Future Work**: The authors explicitly call for better training efficiency and broader evaluation on mathematical reasoning, code generation, and long-context QA.
- **SCOPE — Limitations**: The paper notes that it does not yet cover larger production-scale models and that hardware efficiency depends on implementation details.
- **SCOPE — §6 Conclusion and Future Work**: The authors suggest combining LRT with complementary additional-computation mechanisms such as latent thought tokens.

### Why it matters

LRT is an important counterpoint to 'think longer by looping': recurrent computation can be amortized into the token-to-token state pathway instead of paid repeatedly at inference.

**Connections:** Maglev, Coconut, PonderLM-3

**Source:** https://arxiv.org/abs/2605.26797

## Fixed-Point Reasoners: Stable and Adaptive Deep Looped Transformers (2026)

**Research question.** Can fixed-point convergence provide both a stable deep-loop architecture and an end-to-end halting mechanism?

**State.** Looped Transformer hidden state

**Update.** Deep repeated Transformer updates with pre-norm and residual scaling

**Compute policy.** Stop using a fixed-point convergence criterion

### Direct findings

- **DIRECT — Abstract**: The model uses fixed-point convergence as an end-to-end halting mechanism rather than a separately supervised router.
- **DIRECT — Abstract**: The reported fixed-point halting adapts computation to task difficulty.
- **DIRECT — Abstract**: The paper evaluates the approach on Sudoku, Maze, state-tracking, and ARC-AGI.

### Limitations / future directions

- **SCOPE — Cross-paper scope note**: The broader literature shows that convergence can be stable yet wrong, so fixed-point residual alone should not automatically be treated as a universal correctness certificate.

### Why it matters

FPRM turns a dynamical quantity—distance to a fixed point—into a concrete compute policy, bridging stability theory and adaptive inference.

**Connections:** Parcae, Equilibrium Reasoners, Flow Reasoning Models

**Source:** https://arxiv.org/abs/2606.18206

## Flow Reasoning Models: Turning Flows Into Efficient Recurrent Reasoners (2026)

**Research question.** Can a flow model become a recurrent reasoner by conditioning on and revising its own past solutions?

**State.** Whole structured candidate solution / model prediction

**Update.** Self-conditioned flow refinement; Fixed-Point Forcing trains on model-induced recurrent states

**Compute policy.** Increase recurrent depth / denoiser evaluations

### Direct findings

- **DIRECT — Abstract**: Conventional self-conditioning becomes unreliable at greater recurrent depth because training sees one-step states while inference sees recursively generated states.
- **DIRECT — Abstract / §6**: Fixed-Point Forcing trains on states produced by the model's own inference dynamics while preserving the flow-matching objective.
- **DIRECT — §6 Discussion**: The authors report that this training makes additional recurrent depth productive on structured reasoning tasks.
- **DIRECT — Appendix C**: A near-zero adjacent-state residual indicates convergence, not necessarily correctness; conventional self-conditioning can converge to confidently wrong fixed points.

### Limitations / future directions

- **SCOPE — §6 Discussion**: The authors explicitly identify scaling to larger models and less structured tasks as an important future direction.
- **SCOPE — Scope of experiments**: The strongest evidence is on structured exact-solution domains, not open-ended natural-language reasoning.

### Why it matters

FRM cleanly demonstrates that recurrence must be trained on the distribution created by self-application—and that stable convergence can still be wrong.

**Connections:** Equilibrium Reasoners, Fixed-Point Reasoners, Thinking with Looped Flows

**Source:** https://arxiv.org/abs/2606.29150

## Self-conditioned Flow Map Language Models via Fixed-point Flows (2026)

**Research question.** What exactly is self-conditioning doing inside continuous flow language models, and can the resulting recurrence be compressed?

**State.** Denoising estimate used as self-conditioning state

**Update.** Fixed-point iteration coupled to the flow process

**Compute policy.** Compress both fixed-point iterations and flow integration through distillation

### Direct findings

- **DIRECT — Abstract**: The paper characterizes self-conditioned flow language models as solving a fixed-point iteration that bootstraps the learned denoiser.
- **DIRECT — Abstract**: It formulates a two-dimensional view in which one axis is flow progress and the other is fixed-point iteration.
- **DIRECT — Abstract**: The proposed distillation compresses both fixed-point iterations and the flow process for one- and few-step language generation.

### Limitations / future directions

- **SCOPE — Cross-paper relevance**: The paper focuses on language-generation efficiency rather than structured reasoning, but its two-axis decomposition is directly relevant to recurrent flow reasoners.

### Why it matters

It provides a mathematical bridge between self-conditioning, recurrence, and flow integration—three ideas that otherwise look like independent implementation choices.

**Connections:** Flow Reasoning Models, Thinking with Looped Flows, One-step Language Modeling via Continuous Denoising

**Source:** https://arxiv.org/abs/2607.00714

## Thinking with Looped Flows (2026)

**Research question.** How can recurrent states remain useful over many updates when backpropagation covers only a short horizon?

**State.** Recurrent hidden state coupled to a denoising / probability-flow state

**Update.** Local denoising objectives linked through temporal association

**Compute policy.** Use a finer temporal grid for more recurrent computation; sample multiple initial noises for breadth

### Direct findings

- **DIRECT — Abstract**: The paper identifies short-horizon backpropagation as a training problem: early updates are not necessarily trained to support later computation.
- **DIRECT — Abstract**: Local denoising objectives are temporally associated through progressively decreasing noise and shared noise, avoiding full-horizon backpropagation.
- **DIRECT — Abstract**: Inference integrates a probability flow coupled with recurrent state, and a finer temporal grid spends more computation.

### Limitations / future directions

- **SCOPE — Evidence-bounded scope**: The experiments show the mechanism across several reasoning benchmarks, but a general guarantee that local objectives produce useful long-horizon recurrence remains open.

### Why it matters

Looped Flows attacks the long-horizon credit-assignment problem differently from FRM: local temporally linked objectives instead of rollout-state exposure.

**Connections:** Flow Reasoning Models, Self-conditioned Flow Map Language Models via Fixed-point Flows, Equilibrium Reasoners

**Source:** https://arxiv.org/abs/2609.11801

## Maglev: Sliding Recurrent Memory (2026)

**Research question.** Can a fixed-size recurrent memory preserve useful long-history computation while keeping inference efficient?

**State.** Fixed-size recurrent key/value memory

**Update.** Decoder memory is trained to match a more expressive prefiller's memory target

**Compute policy.** Use the stronger prefiller during training; use the lightweight recurrent decoder alone at inference

### Direct findings

- **DIRECT — Abstract**: Maglev couples a prefiller Q with richer historical access to a decoder P that uses sliding-window attention plus recurrent K/V injection.
- **DIRECT — Abstract**: A memory-consistency loss aligns decoder memories to prefiller-produced targets so inference can use P alone.
- **DIRECT — Abstract**: The paper reports improvements over sliding-window and latent-recurrent baselines, while sharing P/Q parameters preserves most gains and reduces parameter memory.

### Limitations / future directions

- **SCOPE — Scope of abstract/results**: The abstract establishes the architecture and initial gains, but not the full large-scale answer to how its advantage changes with model capacity and training compute.

### Why it matters

Maglev broadens the notion of a reasoning state: recurrent computation can persist as compressed memory across a token stream rather than only as repeated same-token depth.

**Connections:** Latent Recurrent Transformer, Parcae, Recurrent memory models

**Source:** https://arxiv.org/abs/2608.02870
