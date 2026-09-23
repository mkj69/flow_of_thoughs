# Contributing

The goal is a high-signal research map, not the largest possible list.

## Add a paper

A useful contribution should answer:

1. What is the paper's **thought/state representation**?
2. How does that state **evolve**?
3. How is **extra compute** allocated?
4. What is the strongest result or limitation relevant to this map?
5. Why does the paper change our understanding of recurrent / latent / flow-based reasoning?

Please add a structured entry to `docs/data/papers.json` and, when appropriate, update the taxonomy or reading paths.

## Inclusion criteria

Good fits usually do at least one of the following:

- introduce a reusable recurrent/latent reasoning mechanism;
- study adaptive or scalable test-time computation;
- analyze stability, convergence, fixed points, or overthinking;
- connect flow/diffusion objectives to iterative reasoning;
- study recurrent memory as a computational substrate;
- provide a scaling law or controlled mechanistic result.

A paper that simply uses the word "reasoning" or "flow" is not automatically in scope.

## Corrections

Please submit factual corrections aggressively. For emerging work, label uncertain interpretations as such rather than turning them into taxonomy facts.
