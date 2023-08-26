# Blog Project

## Getting Started

This is a Next 13 project. You'll first need to install NPM dependencies, and then run a local development server. Here are the relevant terminal commands:

```bash
# Install dependencies:
npm install

# Run a development server:
npm run dev
```

To create new components, you can use this helper script. It saves you a bit of time, creating all the files and adding the standard code:

```bash
# Create a new component:
npm run new-component [TheNewComponentName]
```

> **Using a Markdown renderer**
>
> For best results, you should use a Markdown renderer to view this file. This README includes lots of embedded images and screen recordings, and you'll need a Markdown renderer to be able to view them.
>
> In VS Code, you can render this README by opening the command palette (`Ctrl` + `Shift` + `P` on Windows/Linux, `⌘` + `Shift` + `P` on MacOS), typing “Markdown”, and selecting “Markdown: Open Preview”.

## Troubleshooting

- When you run a dev server, you may notice a warning: _You have enabled experimental feature (outputFileTracingIncludes)_. This warning can safely be ignored. `outputFileTracingIncludes` is a configuration option required to make sure that our MDX files are included when deploying our application to Vercel.

- If the dev server seems to be stuck on a stale error, and restarting the dev server doesn't help, you can clear Next's cache by deleting the `.next/cache` subdirectory. Don't worry about losing anything important: everything inside the `.next` directory is derived from the rest of the codebase.
