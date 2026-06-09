---
title: Teeny Quests - Choose Your Own Itty Bitty Adventure
datePublished: 2026-06-08
image: posts/20260608.jpg
metaDescription: Teeny Quests is a browser-based game featuring itsy-bitsy, teeny-tiny adventures for you to play.
---

After more than a year of off-and-on development, it is at last nearly ready for human consumption. Teeny Quests is a browser-based game featuring itsy-bitsy, teeny-tiny adventures for you to play. Bravely explore, solve puzzles, fight monsters and endeavor to find a way to complete your bite-sized quest's specific goals. So, yeah, it's a simple casual game with cute isometric SVG graphics and zero barriers to entry. It's more than that, though, because the real emphasis of the project is the quest editor where anybody with an idea and 20 minutes to burn can log in and make a quest all their very own.

The project sports a whole host of inspirations: the aesthetic of OG Zelda games, the thrill of making Doom maps in the late 90's and the jaw-dropping isometric beauty of playing Crystal Castles at the arcade in the early 80's. Everything from the simple heart-based life meter to the highly vertical isometric environments speak to how this project wears those influences on its metaphorical sleeve.

The palette of elements that make up a quest is relatively small but by no means limiting. Part of the purpose of the project was to find a way to combine simple elements like switches, banners, torches, and a few simple actions such as changing the height of a map cell to create something varied and interesting. Development of the game's engine and editor went hand-in-hand with creating the initial 8 quests for the game, and I don't think I've come close to exhausting the possibilities of this set of tools. That said, development continues, and there's no telling what new element will come along to open up whole new avenues to explore.

![Danger and adventure!](https://ik.imagekit.io/cfoxkhvjb/posts/20260608-02.jpg)

The lighting mechanic is often the first thing players notice. Since it's a point-to-go interface, you soon realize that you can only move so far in the dark, and once you find a way to light some torches, you'll be able to move much more freely. This comes in handy when you need to get away from enemies. In speaking of combat, the mechanics here are deliberately simple. No need to equip a weapon, the best one will automatically be used. Defense buffs like a Ring of Protection is passive and stackable. If the quest maker adds more than multiple rings, you can become an invincible beast laying waste to everything in its path, if you're into that sort of thing. I do find the vibe difference between fully puzzle-based quests and more combat-heavy quests interesting. Maybe we can add traps as well down the road.

Some quests also have shops. You can click on the shop to bring up a menu of things to buy or sell. Most of it is optional, but sometimes it's necessary. Hint: In one of the quests, a silver key is required to progress but it is not present anywhere in the map, so you need to buy it at the shop. Also, I tend to collect gold and rubies (to sell back at the shop for 2,000 gold) until I can afford the Sword of Awesomeness, the best weapon in the game, before the Skello King pounds me into dust.

The goal of each quest is entirely up to the quest maker. You can create a quest where you find a magical exit, or you can create multiple exits. You can set events to trigger when you collect X number of a type of item. In other words, each quest can also have multiple ways to complete it.

## Under the Hood

In the future, I may do a code review video going through how the game was developed, how assets were created, etc., but for now just know that the underlying tech stack is super simple: client-side Angular on the frontend and a Typescript Lambda that serves as the backend. Of course, there are other elements like DynamoDB and Cognito User Pools for authentication. If you're curious, you can check out the serverless IaC (infrastructure as code) YAML on [GitHub](https://github.com/markarenz/teeny-quests-angular/tree/main/iac) for more detail on how the AWS elements are configured and wired together.

The display layer depends heavily on SVG, which is just markup anyway, so it's very easy to work with SVG components that use props and classes to style and animate characters. For example, the eyes of the bat and green slime follow you around the room, and the skello will wave its body arms about when it attacks. It's all done with very basic CSS and some logic in the component controller.

![Teeny Quests Level Editor](https://ik.imagekit.io/cfoxkhvjb/posts/20260608-03.jpg)

## Forget the Rest, Quest with the Best

If you're interested in creating your own quests, first of all congrats on being amazing, but also here are some pointers to get you started.

You'll need to log in to access the Quest Editor from the menu. Start up a new quest and give it a description. It will set up a dummy area with "start" as the name and place the player in it. Clicking on a map cell lets you change the cell's floor type (tile, stone, lava etc) and the wall types. You can also set the height, which is really where quest editing gets fun in my opinion. You can also switch to multi-cell editing and even shape tools to sculpt the area to become whatever you want: a rocky field with small buildings in it, a castle exterior or maybe a volcano. The only limit is your imagination and, I suppose, your patience.

You can create several exits as you wish and use exits to link your areas together. There's a "reciprocal" feature by default the links exits in two way relationships, but you can turn it off to make weird, nonsensical maps. You can sprinkle these areas with useful items like gold, weapons like the Pointy Stick and health pickups. Note that health pickups don't trigger when the player picks them up but when they click "use" in the inventory, which makes them much more powerful since the player can be more strategic in their use, ala Duke Nukem 3D.

Props are interactive things on walls such as switches, banners and torches. Props have actions associated with each state, so you can change the height of a map cell in any area with a state change, which is very powerful. You can also set the state of other props, which is how we can easily make light switches and elevators in the editor.

Actors are a generic term for interactive entities like enemies, NPCs or shops. Enemies also have actions when you defeat them, and there is a dedicated slot for dropping an item of your choosing upon death. When you place a shop, you can determine what can be bought or sold. For some quests, you may not want to make keys available in the store since you want the player to hunt for them and run into enemies. Other times, you need the store to stock the Pointy Stick so the player can sell it back when they get a better weapon and buy health potions.

I'm working on a video to help walk you through making quests in Teeny Quests, so you can quest like there is no tomorrow.

## OK. That's it.

If the game is 1/10th as much fun to play as it has been to make, then I envy you and the delightful half hour or so of questing you have in store for you. If not, well, I'm sorry, I guess. I tried.

### Here are some links, etc.

- [Play Teeny Quests](https://teenyquests.ridiculopathy.com/)
- [YouTube Teaser (old)](https://www.youtube.com/watch?v=HRJCfzw76Yc)
- [Check out the source on GitHub](https://github.com/markarenz/teeny-quests-angular)
