---
title: 'A React Dev Making the Move to Angular'
datePublished: 2025-05-20
image: posts/51.jpg
metaDescription: Up until last year, I was all in for ReactJS, but that's starting to change. These days, I lead a team working in a mixed fabric of frameworks and libraries...
---

Up until last year, I was all in for ReactJS, but that's starting to change. These days, I lead a team working in a mixed fabric of frameworks and libraries. On a daily basis, I'm touching backend Typescript code, Terraform for IaC, a bit of Symfony, React and Angular. I love the variety and the ability to bring battle-tested code patterns from one world into another with relative ease.

I'm not all that interested in an "Angular vs. React" discussion. Both are great, without a doubt, but my perspective on this has evolved a great deal.

When I started to get serious about JS frontend work more than a decade ago, I spent time doing test projects in each. Although Angular seemed to exhibit more of what I was used to seeing from my earlier work with server-side MVC frameworks like Laravel, I found React more to my liking at the time. JSX is just neat.

Angular seemed older, though not by much, and I bought into the idea that React represented a more modern way to develop web front-ends. Years later, both React and Angular have matured quite a lot. I found myself talking to engineers doing cool things with Angular at the enterprise level, and I didn't quite understand what all the fuss was about.

After working with Angular for a while now, I think I finally get it. In fact, I feel compelled to let loose with a hot take: I kinda/sorta like Angular more than React. Please allow me to explain.

There are the basics we all know about, of course. Angular is an honest-to-goodness framework. That means you can use nifty CLI tools for scaffolding components, services and tests. The thing I really like is how Angular is such a unified whole right out of the box, so to speak. It's trivial to set up an injectable service and set up observables and subscriptions to serve data to components without prop drilling.

Even hotter take: I like that Angular is class-based. I like that there are no hooks. Five years ago, I probably would have been burned at the stake for saying that out loud in a crowd of software engineers, or at the very least dismissed as out of date.

When you work with teams of people with varying skill levels, sometimes hooks can become a tad problematic. People got so used to writing `useEffect()` hooks with poorly managed dependencies, they routinely slapped an eslint-disable above the dependency array without a second thought. We called it _"abuseEffect()."_

It's still workable, of course, and it's quite easy to write bad code with any such system, but the flexibility of React can be a real problem for long-lived projects maintained in high-turnover environments or teams of off-shore contractors. Of course, that's the real issue at the core of all of this. A lack of ownership over code of any language or framework is going to be a problem, and over time that just becomes worse until the whole thing becomes a digital Jenga tower.

That said, the same rigidity in Angular that many folks dislike I find refreshing. Perhaps this is because the projects I've been working on or creating in my spare time are not unfamiliar use cases where React's flexibility would be required. Regardless, if you're in a role that requires you to review code and enforce code quality and alignment, you may welcome some inflexibility.

To that end, I've been pivoting my personal projects from NextJS and React to Angular, and it's been a blast. I'm working on an adventure game engine focusing on the game editor. I started making it in NextJS a while ago and then pivoted to Angular. The process has been easier than I expected, frankly.

If you already have a lot of experience with modern React, you may find yourself picking it up quite quickly. If you were creating a to-do app, for example, you could handle all of your data functions within a todo service. The service can store your todo items as well as the associated functions. The todo items can be stored in an array that is made publicly available as an observable. The todo list display component can subscribe to the observable and run logic against the data as it changes. This is similar to what you might do with a useContext hook or a Redux slice, but in Angular it's all right there from the start. Angular splits your controller logic from your HTML markup as well, which can make for very readable components.

Testing is interesting as well. When Angular scaffolds a component for you, it also creates a simple test to get you started. I'm using Jasmine for testing, and the TestBed pattern for setting up tests is remarkably easy. Setting up mocks is also very similar to what we do with React for mocking API calls and such. The main difference with Angular is that I can subscribe to the observables in a service as I make changes and assert expectations on the values. With functional React components, tests often have to rely on the changes to the HTML, which is fine though it can make your tests brittle.

Since I still use both React and Angular regularly, I don't need to play favorites. That said, I plan to make most of my personal projects in Angular for the time being. If you're a long-time React developer looking for something to learn, give it a shot. It's been a blast so far.
