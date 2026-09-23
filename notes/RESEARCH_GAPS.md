# Evidence-derived research programs

## G1 — Train for self-application beyond the training horizon

**Evidence chain.** Flow Reasoning Models identifies exposure mismatch under recursive self-conditioning. Thinking with Looped Flows identifies short-horizon credit assignment as a separate problem. LRT shows that explicitly training the recurrent pathway matters even when recurrence is amortized across tokens.

**Question.** What objective makes the marginal value of another recurrent update remain positive beyond the horizon seen during training?

**Minimal test.**
- Match model, data, and inference FLOPs.
- Compare rollout-state exposure, local temporal objectives, and truncated BPTT.
- Evaluate progress per step beyond the training recurrence horizon.
- Measure both accuracy gain and attraction to wrong fixed points.

**Hypothesis.** Useful recurrence requires both induced-state-distribution matching and a local notion of progress; either one alone eventually fails at long depth.

## G2 — Correct attractors versus merely stable attractors

**Evidence chain.** Parcae addresses numerical stability. EqR links successful reasoning to solution-aligned attractors. FRM shows a stable fixed point can still be confidently wrong. FPRM uses convergence as a halting signal.

**Question.** Which local properties of a recurrent trajectory predict that its attractor is valid?

**Minimal diagnostics.**
- fixed-point residual;
- Jacobian spectral radius / local contraction;
- verifier score;
- trajectory curvature;
- ensemble basin agreement;
- robustness to perturbing the recurrent state.

**Hypothesis.** Contraction is useful for reliable halting but insufficient for correctness; perturbation-based basin consistency plus a learned progress variable should outperform residual-only stopping OOD.

## G3 — Verifier-friendly latent thought geometry

**Evidence chain.** Coconut shows latent states can preserve multiple alternatives. Follow-up continuous-space inference-time scaling finds that standard reward-model discrimination transfers poorly.

**Question.** Can thought states make solution progress geometrically decodable without collapsing their ability to preserve alternatives?

**Minimal test.**
- answer-only training;
- contrastive progress training;
- verifier-aware latent training;
- bottlenecked / structured latent state;
- evaluate single-trajectory accuracy, Pass@N, latent-RM AUROC, and steering sensitivity.

**Hypothesis.** A calibrated progress objective will improve best-of-N selection more than single-trajectory accuracy, showing representation geometry—not only solver strength—is the bottleneck.

## G4 — A unified compute router

**Evidence chain.** EqR exposes depth and breadth. PonderLM-3 routes compute across tokens. FRM spends compute on whole-solution refinement. Looped Flows changes temporal resolution and stochastic initializations.

**Question.** Given one more unit of compute, should the system spend it on another local update, another trajectory, another token, or stop?

**Minimal test.** Price all actions in measured FLOPs and latency, then train a router to predict marginal improvement.

**Hypothesis.** A marginal-value-of-compute router will dominate fixed depth/breadth schedules on the accuracy–latency Pareto frontier.

## G5 — Coupled scaling of parameters, data, recurrence, and state capacity

**Evidence chain.** Parcae treats recurrence as a scaling axis. LRT shifts recurrent work toward pretraining. Maglev introduces fixed-size recurrent memory.

**Question.** Under a fixed deployment budget, when is it better to buy a larger model, more data, more recurrence, or more recurrent-state capacity?

**Minimal model.** Fit a scaling surface rather than a single curve:

`loss = f(parameters, data, recurrent_steps, state_capacity, latency)`

**Hypothesis.** Optimal recurrence grows sublinearly with parameter scale, and state capacity becomes a bottleneck once recurrence exceeds the task's intrinsic computational depth.
