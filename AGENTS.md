# Repository Guidelines

## Project Structure & Module Organization

This repository is currently an empty project workspace. No source code, tests, assets, or package configuration exists yet. When adding the first implementation, establish a clear layout and document it in `README.md`. Suggested directories are `src/` for application code, `tests/` for automated tests, and `assets/` for static resources; create them only when needed. Keep related modules together and avoid introducing empty scaffolding.

## Build, Test, and Development Commands

No build, test, or development commands are configured. When selecting a language and toolchain, add reproducible setup instructions and exact commands to `README.md`. Document dependency installation, local execution, production builds, and automated checks. Do not assume commands such as `npm test` or `make build` work until their configuration is committed.

## Coding Style & Naming Conventions

Follow the chosen language's standard conventions. Configure a formatter and linter when code is introduced, and use their defaults consistently. Match surrounding code when editing existing files. Choose descriptive module, function, and variable names; keep each module focused on one responsibility. Document indentation and filename conventions alongside the initial implementation.

## Testing Guidelines

No testing framework or coverage threshold is established. Add tests for new behavior and regression tests for bug fixes once a framework is selected. Use descriptive names that explain the expected behavior, and document the test command. Keep tests deterministic and independent of production credentials.

## Commit & Pull Request Guidelines

No Git history is available to establish existing commit conventions. Use concise, imperative commit subjects, such as `Add initial application setup`. Keep changes focused. Pull requests should describe the purpose, relevant issue links, and validation performed. Include screenshots for visible UI changes and identify any checks that could not be run.

## Security & Configuration

Never commit credentials or private keys. Provide placeholder values in an example configuration file, and ignore local secrets and generated output once the toolchain is established.
