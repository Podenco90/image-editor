This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## TO-DO:

- Add unit/integration tests (Jest)
- Add E2E tests (Cypress)
- Add error handling (Try/Catch + Error Boundaries)
- Add responsive behaviour for the the editor on mobile screens
- Refine zoom behaviour in editor (zoom on size change, button to fit image into screensize, ...)
- Resize listener on screen to resize canvas / reset zoom (?)
- Persist zoom in URL (?)
- Possibly add SSR on image search
- Add progressive image enhancement for search (Blur hash or prefetch small image)
- Refactor css (CSS in JS or SASS)
- ~~Split search page into reasonable components~~
- Move search page state to Zustand
- Add commit hooks
- Check app performance & accessibility
- ~~Unify number/string handling to avoid type conversions in the code base~~
- Add caching and prefetching on search (react-query)

## Getting Started

Add `.env.local` with the API_URL for picsum:

```
NEXT_PUBLIC_BASE_URL=https://picsum.photos
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

<!-- ## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
