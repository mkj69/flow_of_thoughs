# Flow of Thoughts

**A living map of recurrent, latent, flow-based, and adaptive reasoning.**

This repository organizes a fast-moving cluster of work around a simple question:

> **How should thoughts flow through a model beyond token-by-token chain-of-thought?**

Today, reasoning is often identified with generating a longer visible chain of tokens. This repository tracks alternatives that restructure computation through recurrent depth, latent states, self-conditioning, fixed-point refinement, recurrent memory, flow dynamics, and adaptive halting. These methods do not necessarily spend more compute; they change where, how, and when computation happens.

## Evidence before speculation

The repository separates four levels of claims:

- **DIRECT** — explicitly reported in a paper;
- **FOLLOW-UP** — later work directly tests or challenges an earlier claim;
- **SYNTHESIS** — an inference supported across multiple papers;
- **HYPOTHESIS** — a falsifiable conjecture, not an established result.

The scientific core lives in [`notes/INSIGHTS.md`](notes/INSIGHTS.md). Open questions are promoted to the main site only after they are grounded in concrete results, limitations, ablations, or future-work statements.

## Scope

We organize the field along six interacting axes:

1. **Recurrent depth** — reuse a block across depth so test-time compute can scale without adding parameters.
2. **Latent reasoning** — reason in hidden/continuous state rather than only in natural-language CoT.
3. **Flow-based reasoning** — use denoising / flow dynamics to iteratively refine a solution.
4. **Adaptive computation** — learn where and how long to spend extra compute.
5. **Recurrent memory** — propagate compact latent/KV state across tokens or chunks.
6. **Reasoning dynamics** — study stability, attractors, convergence, overthinking, and scaling laws.

The goal is **not** to become an exhaustive paper dump. We prefer papers that clarify one of these axes, expose a reusable mechanism, establish a scaling result, or sharpen a scientific question.

## Website

The static site lives in [`docs/`](docs/) and is designed for GitHub Pages. It includes:

**Live site:** <https://mkj69.github.io/flow_of_thoughs/>

- an interactive taxonomy;
- a searchable paper explorer;
- curated reading paths;
- a timeline;
- open research questions;
- a contribution workflow for adding papers and corrections.

## Start here

- [`reading-lists/START_HERE.md`](reading-lists/START_HERE.md) — three compact reading paths.
- [`notes/TAXONOMY.md`](notes/TAXONOMY.md) — the conceptual map used by the site.
- [`notes/OPEN_QUESTIONS.md`](notes/OPEN_QUESTIONS.md) — questions that can become actual research projects.
- [`docs/data/papers.json`](docs/data/papers.json) — the structured paper database.

## Design principle

A useful way to compare methods is to ask four questions:

| Question | Examples |
|---|---|
| **What is the thought state?** | tokens, residual stream, latent tokens, candidate solution, KV memory |
| **How does it evolve?** | recurrence, self-conditioning, fixed-point solve, flow integration |
| **How is compute allocated?** | fixed loops, adaptive halting, per-token pondering, finer time grid |
| **What does the computation buy?** | refinement, search, contraction, memory propagation, compositional depth |

## Initial research thesis

The emerging field may be understood as a shift from

`reasoning = only generate more tokens`

toward

`reasoning = structure and route computation across tokens, latent states, depth, and memory`.

That framing is intentionally broad. One purpose of this repository is to test where it is useful and where it breaks.

## Contribution

Corrections and additions are welcome. Please see [`CONTRIBUTING.md`](CONTRIBUTING.md).

Maintained as a research map by [@mkj69](https://github.com/mkj69).

## Evidence standard

The repository now has two evidence layers:

1. **Paper dossiers / claim ledgers** — direct findings, scope, explicit limitations and future work.
2. **Cross-paper synthesis** — conclusions only after paper-level evidence is separated from hypotheses.

See `notes/CLAIM_LEDGERS.md`, `notes/INSIGHTS.md`, and `notes/RESEARCH_GAPS.md`.
