# An Example Redux Observable Application using Feathers & Next.js frameworks

**Repository:** [mjbrown/stream-feathers-nextjs-react-hooks-example](https://gitlab.com/mjbrown/stream-feathers-nextjs-react-hooks-example.git)


This is an experimental project for honing Node.js full-stack skills, notably:

- Redux-Observable for stream epics
- RxJS libraray for stream processing
- anonmyous websocket steams

It is built upon a project foundation developed for:

- [mjbrown/chat-feathers-nextjs-react-hooks-example](https://gitlab.com/mjbrown/chat-feathers-nextjs-react-hooks-example.git)
  
which implements the following features:

- Feathers: a REST and real-time API layer for Node.js and the browser
- Next.js React framework
- composing Express applications: Feathers & Next.js
- React Hooks
- styling w/ Bulma Sass
- Markdown
- Immer for state immutability
- axios http w/ async/wait
- websocket-based messaging
- LWT-based user authentication
- ARIA tags for accessibilty & testing
- AVA and Jest for unit testing
- Cypress for integration and end-to-end testing

with the following notable enhancements:

- superagent replaces axios
  - (cf. [the sad state of axios](https://www.reddit.com/r/javascript/comments/cp5qhm/askjs_the_sad_state_of_axios/))
- use of latest/proposed Javascript features:
  - nullish-coalescing-operator (i.e., '??', superseding rambdax defaultToStrict function)
  - optional-chaining (i.e., 'a?.b?.c')
- retooling & refactoring to support Flow annotations in server-side source code


*Note:* This is just a simple demo application. It is not intended to be complete, nor useful except to present how the applied technologies can be utilized. Consequently, not all features of the foundational project(s) are used herein (e.g., user authentication). The test coverage is not thorough, it provides just a few example cases of various kinds of tests.


See the [documentation](./public/index.md) for more information about installation, operation, and technologies.

# License

[MIT](./LICENSE)
