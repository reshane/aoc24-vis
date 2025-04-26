# Advent of Code 2024 Visualization

This project compiles several workspace crates into wasm binaries and packs them into a static site.

## Quick Start

```bash
npm install
export RUSTFLAGS='--cfg getrandom_backend="wasm_js"'
npm run serve
```
Navigate to `http://localhost:8080`

## About
Each page is a visualization of either an advent of code problem, or something I found interesting.
The visualizations are written in rust and compiled to web assembly - using the web_sys crate to interact with dom elements & the canvas.
The maze-gen crate currently only performs Wilson's algorithm and does not export the generated maze in a useable format. I plan to change this soon but for now I'm going to go touch grass.
