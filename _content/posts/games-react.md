---
title: Making Games with JS and React
datePublished: 2023-02-21
image: posts/47.jpeg
metaDescription: It's generally a good idea to begin with your distribution method in mind. Will the game live in the browser or as a download in an app store?
---

_NOTE: This post is based on a talk I gave to a couple of coding meet-up groups here in Indianapolis a few months ago. This is also available as a [YouTube video](https://www.youtube.com/watch?v=DFt-CL68Qb0) as well. It's more or less the same content with 100% more of my nasally voice._

While I don't consider myself a game developer, I have made loads of games over the years. I've done it ever since I was a kid, banging out games in BASIC on my parents' TRS-80. It's a great creative outlet, and in many ways I would rather make a game than play it. Games are fun to make, fun to play, and if you're lucky you might end up making something that people might actually want to play. Even more than that, games are a great learning opportunity. As software engineers, we're constantly working on side projects and test apps just to practice and extend our skills.

I'm also a big believer in seeing test projects through to completion: cleaning up the code, writing useful tests, and deploying to production. Maybe it's just me, but if I do a tutorial and a simple POC on a new pattern or library, I don't feel like I really learned it until I dig deeply enough to make real mistakes with it. The great thing about making games is that you have an incentive to deploy a finished project so your friends can play it and, hopefully, enjoy it.

Back in the early 2000's I made about 3 dozen Flash games. Remember Flash? I do (sniff). From there I went on to making games and game-like kids' book apps for iOS devices. About a year ago, I made a game for Steam using Godot. It's called Star Squadron: Student Driver, and it's very silly. It's a survival space shooter where your only weapon shoots ping pong balls, so that should give you an idea of how seriously to take that game- as in, not at all. Over the last 5 years, though, as I've spent more time with Javascript, I've started making more games in that language, specifically with React since I use that every day for my job.

In the process of making games in React, you'll run into a lot of the ideas you may already be fairly familiar with such as managing state, testing, SVG animations, etc., but you may get to see them from another angle or learn them more deeply as a result. In this post, we will go through a handful of recent ReactJS games and discuss what each one taught me, intentionally or inadvertently, along the way.

## Planning

First let's talk about planning your game. It's generally a good idea to begin with your distribution method in mind. Is the player going to engage with your game directly through the browser or are they going to download it as a stand-alone app from an app store? Do you want to monetize the game? For example, if you plan to make a high-action game that you plan to release on Steam or Itch.io, you'll probably be using an engine like Unity, Godot, or Unreal to accomplish this. If you want to make a turn-based strategy game, something like React hosted in an AWS S3 bucket might be ideal.

Another thing to consider is the amount of artwork you will need. Some games have very intense art requirements such as a 3D game with models and textures while a solitaire game may only need assets for a deck of cards. On the other hand, some game styles require quite a bit of design & illustration. A point-and-click adventure game, for example, could require dozens of hand-made backgrounds and two versions of each item, one for the environment and a different version for the inventory display. If you're making a 2D platformer, you will probably use a tile-based art system. You'll need to build sprites and tile-sets, but this hybrid approach can save you loads of time over other options. The bottom line is that you don't want the artwork lift to surprise you, so include that in your planning. This can include music and sound effects as well if you want to make a noisy game.

It's also a good idea to set your goals and priorities up front. Why are you making this game? What do you want out of it? If you finished the game after 3 months of work and only a few hundred people played it, would you be satisfied with this? Personally, I would be fine with that, but you may feel differently.

> Back in the days of Flash, I had loads of people playing those stupid things. On an average day, the traffic count was around 15k and some days it was as high as 100k. For 2005, that wasn't bad. As a result, though, my hosting bills ballooned, and people made a habit out of stealing my work and claiming it as their own. What I'm saying is that making something "popular" isn't all that fantastic. Here's how I'd sum it up: having loads of people play my games didn't feel as good as I thought it would, and having only a handful of people play other games didn't feel as bad as I thought it would. So, if you're doing this because making games is fun, then you're on your way. If you're doing this to make a quick buck, my prediction is that life will continue to be difficult for you. (End side note.)

### Project Scope

A note on project scope. Often when we start making games, we want to replicate something we've played in the past, something ambitious and way outside our technical and artistic capabilities, not to mention the fact that an entire team of people probably made that thing you love so much. There's a strong tendency to bite off more than you can comfortably chew, so to speak, and it's best to avoid it when you can.

That said, I definitely advocate for pushing yourself with every project. Getting in a bit over your head is a good way to learn. If it scares you a little, all the better. Going from "I can't" to "I will" and finally "I did" is how you level up, after all. So, yes, I like the idea of picking up a few new ideas or patterns to practice. Picking up too many new ideas could lead to burn out and non-completion, though, so be careful. For example, if you know React but are fuzzy on Redux, make something with Redux but you may want to avoid using Typescript, NextJS, and Redux all for the first time in one project. Just thinking about that gives me a dull headache. Also, I know enough about my own shoddy attention span to realize that a silly side project that will take 6-12 months to complete is probably not in my wheelhouse. Given the advantages of taking a project through to production, keeping the scope manageable is one of the best ways to ensure completion.

### Design Documents

The initial planning for a project like this will usually happen in a proposal or design document. A design document is a bit like a paper prototype, a place to write down what you intend to do and how you plan to do it in general terms. As you think through the core game mechanics and the tone of the project, you may decide that it just won't work or just isn't worth it. Thats' fine. You just saved yourself a few weeks of work. Some of my design docs turn into something like a manifesto. I'll describe what I plan to do and what I dislike about other games in the category. I find this sort of thing useful for setting guidelines for my future self. Weeks later, when I'm eager to move on to another dumb project, I may feel a bit lazy and corner-cutty. The design doc is a great way to remind me of what I'm actually trying to do.

Also, it's OK to be distractible. If you write a design doc on one day then the next you write two more because they seem more exciting, that's great. Sometimes if I'm strapped for an idea, I write up a doc for a game I don't really intend to make and ideas start coming to me for something else. This is why I hate to tell people about what I'm working on before it's done. If someone asks about that project I was so excited about two weeks ago, I don't want to have to respond, "oh, that was four ideas ago."

### Inside Out or Outside In

Another thing to note at this point is that you can plan from the inside out or the outside in. You can, for example, write up your design doc describing everything you plan to build including general art style inspirations, etc. "It's a pirate game with crafting and word puzzle mini-games," you might say. I call this the outside-in approach. This is a very professional approach since you need to present this shiny exterior to managers and investors, etc., to keep things moving. It's great because at the end of the process, you can deliver a known commodity to the stakeholders.

However, when I'm making something just for me, I tend to work inside out. This means I work ages on a core game mechanic and work outwards from there to find the theme and art style.

For example, with Star Squadron: Student Driver, it was originally just a character controller test in Godot. I tried using Asteroids-like controls and I didn't like it as much as I thought I would. I spend about a month tweaking it until I had the controls and general environment I wanted. The idea didn't make sense, though. We had floaty low-gravity controls like a spaceship, but I didn't want to just have it floating in open space. That would be boring, so I built some tile maps of interior spaces like futuristic buildings. It started to become a ship inside a ship game, like a silly 2D version of Descent. That led me to the idea of a driving test and the group administering the test being negligent relative to your personal safety. Once I had the controls, the story and theme took no more than an hour to complete. The scaffolding was already there. I just added some other bits to make it feel like a game.

### The Value Proposition

One thing to bear in mind when making a game is that the player is always doing you a favor. Even if you spent years making something then give it away for free, someone playing your game is doing you a favor. That sounds harsh, but it's true. You may have spent loads of time and money completing your project, and you might feel like the players owe you something, but in truth they don't. We all have other things we could do with our time, so a player spending five minutes with your game is giving up the opportunity to do something else.

Of course, the act of playing your game is something very close to magic. By taking the thing that was in your head for all that time and making it come alive in someone else's head, the two of you have made "art." Now, I put quotes around art because I am not a fancy person who would dare to claim any understanding of the term. That said, making "art" that lives in someone else's head is rad. On the rather short list of "coolest things human beings can do" this sort of thing is very near the top, just under "making and raising other humans."

With that in mind, think about how much you ask of the player in terms of cost, time and complexity.

## Testing and Tic Tac Toe

Incidentally, I made a game specifically for the coder meet-up talks last year. It's called Tic-Tac-Know. I realize this is a bad name. I am fully cognizant of the fact that, other than naming my own kids, I am not to be trusted with the responsibility of naming things. I am bad at it. I called it Tic-Tac-Know since it learns as you play, though I wouldn't call it real AI or machine learning. The game keeps a set of previous game history data in local-storage and uses it to determine its next move.

Here are the features of the game:

- Basic tic tac toe rule set
- Game history stored in local storage (if unique) used for "learning"
- 4 levels of "intelligence" for the CPU player
- Player can pick X or O
- Coin flip to decide who goes first

### State Management

Given the simple nature of the game, all the state management is centralized in the Game component. Normally, with turn-based games (like the text adventure engine I built last year) I put all the state elements in one useState instance. In this case, since we had a CPU player we needed separate elements to be able to pick out specific elements as they change.

One thing to note about useState: state updates are not instantaneous in React. I know that. You know that. You probably have a tattoo saying "state updates are not instantaneous in React" on your forearm because you are a cool person with cool tattoos. State updates are queued, of course, and we use hooks like useEffect() to trigger functions when those queued changes propagate. One thing with game development in React is that these familiar concepts have a way of coming at you hard when you don't expect it. Of course, we can't just run the player's turn then immediately start the CPU's turn. Very late at night, scratching my beard looking at the results, figuring that out took me longer than I'd care to admit.

The Game component has a few useEffect hooks to catch changes in whoseTurn and other critical game loop state vars. The trick, of course, is to make sure you set your dependency array properly so the hook doesn't run on every re-render. That would be a mess.

### Testing

One of the things I set out to do with this project is to learn more about React test library and using chains of click events to run through various UI scenarios in my tests. The library includes several handy async functions for just this purpose.

```
  it("renders renders with clicks", async () => {
    mockRandom(0.5);
    const container = render(
      <Game
        aiLevel={mocks.aiLevel}
        goToMenu={mocks.goToMenu}
        playerSide={mocks.playerSide}
      />
    );

    let btnId = "gameStart-btn-start";
    await waitFor(() => expect(screen.getByTestId(btnId)).not.toBeDisabled(), {
      timeout: 2000,
    });
    fireEvent(
      screen.getByTestId(btnId),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    btnId = "cell-btn-1";
    await waitFor(() => expect(screen.getByTestId(btnId)).not.toBeDisabled(), {
      timeout: 2000,
    });
    await screen.findByTestId(btnId);
    fireEvent(
      screen.getByTestId(btnId),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    btnId = "cell-btn-4";
    await waitFor(() => expect(screen.getByTestId(btnId)).not.toBeDisabled(), {
      timeout: 2000,
    });
    expect(container).toMatchSnapshot();

});
```

Another complicating factor that games provide is randomness. In our case, the coin flip and various randomized elements in the CPU's thinking strategies will cause havoc with our testing. We can run the test again and again and find broken snapshots half the time.

To fix this, we simply mock the random function. In the code sample above, I used mockRandom() from a library, but in retrospect it's not necessary. We can mock global random easily and set all responses to the same fractional value to ensure consistent test results

Another global element I needed to mock was the local storage getter and setter. Since the game uses local storage to save game data as well as the player's win/loss history, we needed to inject mock data in the local storage getter calls to test in various scenarios.

In this example, we use the mocked getItem function to return the game history data to guarantee that the top right corner (3) should be selected by the CPU for the next turn. We also provide an empty history array knowing that the answer should be the top left corner (1) every time since we mocked randomness.

```
  it("Select for SMRT", async () => {
    turnHistory = [
      { i: 1, whoseTurn: "cpu" },
      { i: 5, whoseTurn: "player" },
      { i: 2, whoseTurn: "cpu" },
      { i: 7, whoseTurn: "player" },
    ];
    jest.useFakeTimers();
    Storage.prototype.getItem = jest.fn(
      () =>
        '[[{"i":1,"whoseTurn":"cpu"},{"i":5,"whoseTurn":"player"},{"i":2,"whoseTurn":"cpu"},{"i":7,"whoseTurn":"player"}, {"i":3,"whoseTurn":"cpu"}, {"side": "cpu", "winningPattern": 0}],[{"i":1,"whoseTurn":"cpu"},{"i":5,"whoseTurn":"player"},{"i":2,"whoseTurn":"cpu"},{"i":7,"whoseTurn":"player"}, {"i":8,"whoseTurn":"cpu"}, {"i":9,"whoseTurn":"player"}, {"side": "player", "winningPattern": 7}]]'
    );
    let result = await cpuSelectMove(
      { 3: PLAYER },
      AI_LEVELS.AI_LEVEL_SMRT,
      turnHistory
    );
    jest.runAllTimers();
    expect(result).toBe(3);

    Storage.prototype.getItem = jest.fn(() => "[]");
    result = await cpuSelectMove({ 3: PLAYER }, AI_LEVELS.AI_LEVEL_SMRT, []);
    jest.runAllTimers();
    expect(result).toBe(1);

});
```

## Noodle Quest: Memoization and SVG

Noodle Quest is an isometric adventure game I started during the opening weeks of the pandemic lock-down thinking that it might be a fun thing for kids to play around with for a few minutes during their time at home. From a technical standpoint, the thrust of the project was to dive deeper into memoization to reduce unnecessary re-renders in React. With isometric games, you're dealing with at least one hundred tiles on screen at any given time and as characters move through the space, we need to do depth swapping to maintain the illusion of "3D" space. Without memoizing the tile components, this thing wasn't going to work at all. With the memoization on the Tile components as well as useMemo hooks to calm down re-renders during depth-swapping, the game plays smoothly and it's a lot of fun. It's got a dialog system, inventory mechanic as well as a map editor.

Beyond memoization, Noodle Quest was an opportunity to play around with SVG graphics. Unlike pixel-based graphic formats like JPG and PNG, SVG has the advantage of being resolution independent. Blow it up as much as you want, and the lines are still crisp. More importantly, SVG is made of markup. Open an SVG file and you'll just see text, and most of it is quite readable. So, instead of using SVGs as IMG tags with the SVG file as the SRC attribute, you can paste the contents into its own React component and have a good old time. Add some classes to animate CSS properties. If you're careful, you can even tween the path-d values, creating smooth shape animations. For this game, the main doodle-bug protagonist is made up of simple SVG shapes: ovals, lines and circles. As the player hits a key to move down and to the right (this is an isometric game, after all, the WASD directions are rotated 45 degrees), we can set classes to determine the character's pose. We even have an even-odd class that creates a walking animation in the feet and legs. All in all, the animation takes fewer lines of SCSS than you might think.

I used Illustrator to make the tiles and most of the items, but these days I would probably use Inkscape. It's open source and, frankly, since it uses SVG as its native save format, it's an ideal choice for this kind of work.

Another fun example of using SVGs for animation and character design was a vanilla JS game I made a while back called Mugwump. It's a twist on a classic BASIC game where you hunt a monster in a 10x10 grid guessing where it is. In this version, you're the monster, presumably hunting treasure or something. You have a limited number of turns, and each correct guess adds a few turns. This is plain CSS at work here, but with some set-timeout JS statements, we can toggle classes on and off, creating a friendly wave when the monster comes into view at the beginning of each round. This is also an isometric presentation, but since you click on the screen for each guess, the isometric walls and floor tiles don't really do anything.

Another game with heavy SVG use is The Dragon Botherers, an unfinished game I can only describe as a "minimalist RPG." The idea is that instead of moving around with a character controller, you just click on the map to go from place to place. All travel is fast travel. It's inspired by games like Kingdom of Loathing, which is still running and still amazing.

The map graphics are all SVG, but the main event is the character creator. I spent a Saturday drawing a single human face with dozens of different options for hair, face paint, and accessories. Plus, all of those elements have fully customizable colors. My favorite is the combination of Princess Leia hair and Ziggy Stardust makeup. I can spend entire evenings just pumping the "randomize" button. It's more fun than I should be allowed to have. I love the character creator, but eventually I'll get back to the actual game. I haven't entirely given up on it.

![Dragon Botherers Character Creator](https://i.imgur.com/j0mhPVf.gif)

## Figure Five Frenzy and AWS Micro-services

This is a math game similar to the numbers round on Countdown in the UK. In this case, you get 4 cards that feature numbers and 1 target card. The player then uses mathematical operations and grouping to make an equation that equals the target card's value. It's an easy game, though I am not great at it. We played a version of this growing up and, in spite of my crushingly nerdy exterior, rarely won a round.

Like most of the other games we're talking about here, this one is also made with React. For this game, I wanted a way to keep a high scores list with initials, etc., and while free (or nearly free) APIs existed for this purpose, it seemed like an ideal opportunity to make a micro-service to handle the read and write requests. I ended up using the serverless framework for infrastructure-as-code (IaC) along with a slew of fun AWS services like Dynamo DB and lambda for the brains of the API. Up to that point, I had spent time reading about Dynamo DB but struggled to find a good use case for actually using it in something practical. Using DynamoDB meant I didn't have to pay to have an always-on mySQL or PostgreSQL server listening for requests. However, DDB can be tricky when you have complex schema with many relationships. In this case, the relationships were minimal, so it seemed like a perfect fit.

The service is built to serve multiple games on multiple IP addresses. For security and cost containment, the service rejects requests where the API key and IP range do not match the values provided. In this case, we include the IP of the game's CloudFront distribution in the game's record in our DDB table to give us access and include the API key in the score creation request. The API gateway hands the request off to the Lambda, which springs to life and saves the data to DynamoDB. It's all marvelously efficient (and cheap) for low traffic use cases.

For the high scores page, the service will pull up the first set of scores data, and the page presents a "load more" button to load and add more scores to the page. This kind of pagination is a little different from the usual "page 1, page 2" style of pagination, and that's intentional. Unlike SQL where you can pass in a limit clause for pagination, DynamoDB's massively scalable architecture doesn't allow it to think that way. Instead, you provide the last key you received and it will send the next set of scores.

There's a video about this as well as another post, so we won't get into the details here.

## Conclusion: a Plea for You To Finish That Game Project You've Been Working On

Where is your game idea going to come from? Sometimes I find it helpful to take a common game type and tweak it a bit to make it silly or funny. That way you're replicating a known game mechanic that you can be relatively sure will end up being fun to play.

Leonardo da Vinci is alleged to have said, "To conceive an idea is noble. To complete the work is servile." While that's largely true, I think it misses the point by a country mile. There is nothing wrong with serving the idea by completing it. In fact, I'd say that qualifies as its own kind of nobility.

Allow me put it another way. In this world, there are 2 types of fun: Type 1 fun and Type 2 fun. Type 1 fun is fun at the time. Riding a roller coaster or having dinner with friends, those are fun in real-time. Type 2 fun is only fun in retrospect. Hiking 80 miles in the Rockies may not be Type 1 fun, but once you're off the mountain and swapping stories about that trek you somehow survived, that's Type 2 fun. In many ways, Type 2 fun is better. It leads to more vivid memories (not dying) and lessons learned (hang your bear bags as soon as you set up camp).

Starting a game project is Type 1 fun. It might even be fun for several weeks, but at a certain point other ideas pile up and the sheer weight of what remains to be done becomes too much, and you want to quit. If you do, though, you'll never get to the Type 2 fun. If you finish your game and release it, you can let other people play it and somehow turn that dumb thing in your head into "art" (again with the quotes) shared with random strangers.

If you think your game is bad, that's OK, too. Here's a hot take: the world needs more bad games. There, I said it. Sure, the world is already chock-a-block with _samey-samey_ bad games, but _uniquely_ bad games? Now, that's interesting. Millions of us (or OK maybe just dozens of us) are out here waiting for you to run your weird little thought-nugget into something we can play.

**Here are links to some of the games covered in this post:**

- [Noodle Quest](https://noodlequest.ridiculopathy.com)
- [Text Adventures](https://adventure.ridiculopathy.com)
- [Figure Five Frenzy](https://figurefive.ridiculopathy.com)
- [Mugwomp](https://thing.ridiculopathy.com/02-mugwump)
