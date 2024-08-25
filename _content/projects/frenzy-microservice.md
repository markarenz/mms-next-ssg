---
title: Figure Five Frenzy and Scores Micro-Service
datePublished: 2022-04-22
image: projects/51.jpeg
images: ['projects/51-1.jpeg', 'projects/51-2.jpeg', 'projects/51-3.jpeg']
metaDescription: Figure Five Frenzy is a simple math game I originally built back in the golden age of Flash. A few decades later, I remade it in React.
link: https://figurefive.ridiculopathy.com/
---

Figure Five Frenzy is a simple math game I originally built back in the golden age of Flash. A few decades later, I remade it in React. What makes the game interesting is the high score board. I had been looking for an excuse to make use of DynamoDB and Lambdas, and an API for storage and retrieval of high scores data seemed like an ideal use case. With only a few relationships between the tables and relatively low throughput requirements, a scores API would play to the strengths of these AWS services without the complexities that result from trying to shove an SQL-shaped peg in a no-SQL-shaped hole.

I put together a [YouTube video](https://www.youtube.com/watch?v=M-7L6zTiphs) about the project with more detail on the project's architecture and and underlying code.
