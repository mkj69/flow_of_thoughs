# Open Research Questions

These are intentionally phrased as **falsifiable research programs**, not slogans.

## A. What is the right thought state?

Can we identify a state representation `z_t` for which additional reasoning compute becomes a simple, stable update `z_(t+1)=F(z_t)`?

Useful tests:
- causal interventions on intermediate states;
- transfer of a state across model scale or tasks;
- linear/nonlinear probes of progress variables;
- whether state distance predicts remaining reasoning depth.

## B. Why should more loops improve an answer?

Many systems empirically benefit from recurrence, but the mechanism is unclear.

Possible hypotheses:
- contraction toward a task-dependent fixed point;
- iterative constraint propagation;
- implicit search over alternatives;
- repeated feature composition;
- recurrent memory accumulation.

A strong result would distinguish these mechanisms rather than merely report an accuracy gain.

## C. When should thinking stop?

A useful system should not require a fixed global loop count.

Questions:
- Can convergence statistics predict answer correctness?
- Can a learned halting rule generalize out of distribution?
- Can the model avoid both premature stopping and overthinking?
- What is the Pareto frontier between compute and accuracy?

## D. Can recurrent depth extrapolate?

Train on `T <= T_train`, evaluate on `T > T_train`.

Questions:
- Which time/depth parameterizations extrapolate?
- What training curricula enable depth generalization?
- Does stability at large `T` require explicit spectral or contraction constraints?

## E. Are reasoning flows controllable?

If reasoning is a trajectory, can we steer the trajectory rather than only the final output?

Questions:
- Can we define directions corresponding to verification, backtracking, exploration, or honesty?
- Do steering directions transfer across model scale?
- Can multiple steering directions compose without destroying convergence?

This connects reasoning dynamics to weak-to-strong and steerability.

## F. Is there a scaling law for "thinking"?

We know how loss scales with parameters/data/compute in standard pretraining. What replaces that law when extra compute is recurrent?

Candidate variables:
- parameter count `N`;
- training tokens `D`;
- recurrent steps `T`;
- state capacity `M`;
- test-time compute `C_test`.

A useful law might explain when it is better to buy parameters, memory, or recurrent depth.

## G. What is the relation between flows and loops?

Flow models provide a continuous-time language for state evolution; looped models provide repeated discrete computation.

Questions:
- When does a discrete loop approximate a continuous vector field?
- Does a flow objective improve long-horizon recurrent credit assignment?
- Can time-conditioned loops generalize to unseen discretizations?
- Is "finer time grid = more thinking" a principled or accidental effect?

## H. What should be observable?

A recurrent reasoner may hide all computation in latent state.

Questions:
- How do we audit an answer without explicit CoT?
- Can we expose compact certificates or state summaries?
- Are latent thoughts faithful to the actual causal mechanism?
- What diagnostics reveal shortcuts or spurious fixed points?
