---
title: Text Adventure Game Engine in ReactJS
datePublished: 2022-02-26
image: posts/45.jpeg
metaDescription: I grew up playing text adventure games (aka interactive fiction) and recently, I reverse engineered a game engine from 1978 to work in React and made 2 new games.
---

As a nerd coming of age in the late 70's, the personal computer revolution hit me hard. I was simply not ready. We lived in a world with just 4 TV channels (if you were lucky) and no Internet. Phones were enormous and connected to wires. When my dad brought home our TRS-80, a sleek grey-and-black number with a CRT monitor and delightfully chunky keyboard, I could feel the world rotating around us like the meet-cute scene in a romantic comedy.

I still remember those late nights learning BASIC, the 60 hertz hum of the monitor and the smell of warm plastics (most likely outgassing something that will surely shorten my life expectancy). All of it comes back to me as if it just happened, as if it's still happening anew every day when some dumb new project pops into my manic brain. Some folks pine for the simplicity and raw excitement of their first experience with a PS1 or an NES, but for me the most beautiful game I've ever played had no graphics at all. I am, of course, talking about text adventure games.

## Arg, Matey! Pirate Adventure

I played loads of them growing up, but the one I still think about fairly often is Pirate Adventure by Alexis and Scott (not the Dilbert guy) Adams. Very early on in that game, you need to climb out onto a ledge of a high building to say a magic phrase. If you go out there without non-skid sneakers in your inventory, you may fall to your death. In case the player was wondering, "Is this game messing around?" the game was there to remind you repeatedly that no, it was not.

Coming as it did after Colossal Cave and its many imitators, Pirate Adventure played with your expectations. The navigation from area to area was not entirely dependent on the "exits" list. Often you needed to GO SHACK or GO STAIRS to get to advance the plot. They pushed the boundaries of what you could do with two word VERB NOUN statements, including a method for catching synonyms and a clever way of triggering conditional actions and randomized events.

And they did all of this on a TRS-80, sometimes affectionately referred to as the "Trash 80" due to its lack of color display and embarrassingly tiny 16k of RAM. For comparison, the contents of a email chain of moderate length would be too much for this thing to handle. A small-ish JPG file would be simply too enormous- if the thing could display such files at all, which it absolutely could not. The fact that Scott and Alexis Adams got all of this to run on a machine with 16K of memory and a cassette drive is simply incredible. Not only that, the code was in highly readable BASIC rather than assembly.

As a kid in the Elkhart Public library I found an issue of Byte magazine with the source code. Most of its highly efficient syntax was new to my young eyes, but I could see that this was not the morass of nested "if" statements I had expected to see. The game data and the interpreter code were essentially separate. They had created a game engine, one of the first of its kind, that could be used repeatedly, allowing the team to quickly develop a dozen games if they wished. And that is precisely what they did.

If you were an underhanded little kid (like I was) you might take a sneaky peek at the game data to find out where to go next when you got stuck. Surprisingly, this did not work. Due to the nature of the engine, scouring the the data did no good at all. It was just a forest of integers followed by lines of disconnected strings. I would push my chair away from the desk and sip my grape Nehi with a wry grid of appreciation. "You got me again, Scott and Alexis Adams! Well played."

## Rebuilding an Engine

Fast forward several decades and in 2004, I made a simple PHP and Javascript interpreter for the original games with the permission of the developer. It worked well enough, but I took it down in 2010 when I shuttered the old Flash content. Now that nearly two further decades have passed, I created a new version of the engine in ReactJS, diving deeper into the original engine's twists and turns than I ever had before. The intent here is to combine the old with the new, a modern interpreter that runs in the browser and saves your game using local storage while preserving many of the same innovative methodologies of the original.

A side note for folks who are genuinely interested in text adventures (aka interactive fiction), this genre is still very much a thing, and people are making interesting stuff for it right now. Most folks these days are using Inform, a very nifty language for interactive fiction. You should definitely check out what the community is doing look into making something yourself. It's very fun, and I know that from personal experience. I made a game in Inform v6 back in 2004 called Eric the Power Mad Dungeon Master, an attempt at a game-within-a-game text adventure. It's fine. It did prompt someone to write a multi-paragraph review, which was enormously exciting even if it wasn't entirely positive. We live and we learn. End of side note.

Since I can't include the original Adams games in the Git repo for copyright reasons, it didn't make sense to tether myself to the original feature set. So, I made several improvements, most notably we're using good ol' JSON rather than the .DAT files used in the original. Like a fool, I made this decision after sinking several days into making an interpreter for the .DAT files. It was fun, but there was no way I was going to write new content using that method. Also, we're not limited to 16k here, so the game content can expand to fit the underlying concept.

One weird convention I kept from the original is the first person storytelling. As players, we are not experiencing the game directly. We are telling our in-game avatar what to do. The avatar will report back what it sees and its impressions along with the occasional, "I have tripped in the dark. I am now dead..."

I like this approach when playing the games, but it's quite difficult to remember to always use first person. I end up mistakenly writing the messages and descriptions in second person (i.e. "You have fallen into a pit" rather than "I have fallen into a pit"). Somehow it's funnier to me that the player is causing a person inside the computer to do something it knows is ill-advised. At certain points, I have the avatar say snarky things like, "that sounds like a good idea, but you'll get me killed. I refuse." Behind the scenes, of course, we say this because we need to gate that action. It seems to make more sense than just saying, "the game isn't equipped to let you do that yet."

## Nuts and Bolts

At the core of the original engine is the idea of a VERB NOUN command structure: GO NORTH, TAKE CAT, SPIN PLATE, etc. Verbs and nouns exist as arrays in the game file, so each word gets a numerical value based on its index. The numbers are combined to create a vocab value.

During the playerTurn() function, the game will check an array of vocab objects for a match of that number. If there is a match, the system checks a variety of conditions in that vocab object (are we in the right room, is the right item in the room or carried, is a bit-flag set or unset). We also use conditions to pass parameters to the actions portion of the turn. These are just numbers that, based on the action, take on different roles such as room numbers, item numbers or bit-flag indexes. The original engine had slots for 5 conditions. Some of the transactions in my games were complex enough to require up to 7, so I expanded the condition arrays a bit. If the conditions are met, the action is carried out. We allow for up to 4 actions. These are often text messages that appear on screen, commands to drop and item or swap its position with another item, etc.

In addition to the vocab array, the gameData object also has a list of events. Events have conditions and actions like vocab, but they trigger at certain points in the game. In one game, we check a bit-flag when you enter a specific room, and if the flag is set, we trigger an event. We can set the event to trigger at any percentage of randomness you want. In the previous case, we used 100% because as soon as you enter that room, we want the event to occur. In the other game, we use a car radio and the mall's PA system to deliver content or clues, and we use a fairly low random threshold to make sure the messages feel sporadic.

## Game Saves

Surprisingly, this was probably the easiest feature to implement. The game's turn-based system keeps track of everything ephemeral in a gameState object. This includes item locations and bit-flags. When you save your game with a command like SAVE GAME 1, we simply save the JSON blob of the gameData object to a local-storage record with a name based on the game's filename and the number indicated. That way you have unlimited save slots. You can load a game by number easily with a command like LOAD GAME 2.

## Synonyms

One of the most frustrating things about text adventures for most people, including myself, is that often you have the right idea but you aren't expressing it in the exact VERB NOUN combination that the game wants. The original engine had a nice technique for mitigating this. The list of verbs and nouns allowed for asterisks at the start of certain words to indicate that they are synonyms for an earlier word. For example, you may have a disco ball as an item in the game. The list of nouns would include "BAL","\*DIS" in the list. If you try a command like "TAKE DISCO BALL" the interpreter will pick up DISCO as the noun and then, seeing the asterisk, fall back to BALL.

You'll notice that the code only cares about the first 3 letters. This simplifies things enormously and adds some forgiveness for bad spellers (guilty as charged). It does, however, create some potential conflicts if you have 2 words of the same type (noun or verb) that share the same 3 letters. Of course, the vocab objects check for a variety of conditions, so in several cases in the games I made, I end up reusing words with different conditions. Call it inelegant if you must, but it works.

Adding on to the synonyms of the original engine, I turned the vocab matches into an array so we can have phrases as synonyms. This is enormously helpful for creating game content. When you have two ways of saying something, you only need one vocab object to handle it. For example, you might decide that the user could try a command like TURN CRANK or they could try USE CRANK or USE WINCH since, in context, they all mean the same thing. We can find the numerical values for those phrases and add them to an array in the vocab object. It's easy to manage and makes the game less frustrating for players.

## Perilous Objects

In some ways, the version of the original vanilla engine I built in the early 2000's was easier to manage. For turn-based games that need to pass game state objects back and forth, the properties of objects as function parameters can become tricky in React. If you're not careful, you can end up mutating the original object. In most cases, this is fine, but in my case I needed a copy of the old gameState to compare against the new gameState as actions took place. Using a typical method of passing the object, I ended up mutating both. To resolve this, I passed in portions of the object or restructured objects to avoid mutating the original.

## Creating Games

Making games for the engine was enormously fun. At first, I had only planned on doing one game, but the process was so enjoyable I was bristling with ideas by the time the first one was halfway finished. The second one also took a fraction of the time of the first because I knew the tricks of the trade: make a map first and list out all the words and items I wanted to include.

The first game, You Can Have It All At The Caperville Mall is set in 1978, the year the original game engine was created. We explore a local mall and try to discover why so many local residents have been disappearing recently. Risk life and limb to get coffee and donuts, bring two lovebirds together, create a splash in the art world, and chase down a cat. You know, adventure game stuff.

The second one, Greetings from Squalor Holler, is an idea I have been trying to get off the ground for well over a decade. The idea of taking characters from Greek mythology and placing them in everyday situations intrigued me, but after several failed attempts to make it work in other game formats, I had all but given up. While working on the first game, I found some old sketches of the town from a previous attempt, and it dawned on me that this might be the best way to bring the idea to life at last.

## Content Development Tools

By default, the content development tools are available to anyone who plays the game. Once you load up a game, click on the + sign below the text input and you'll have access to a very odd looking control panel. You can use this to create content for your very own game if you wish. Go to the GIT repo and clone it locally, then create a new game JSON file and add it to the index.js. Once you load it up, access the dev panel and start creating a game.

You'll probably want to copy the example game file and add some rooms and items as well as some words for the nouns and verbs arrays. Once you have the basics in place, you can use the dev tools to create the vocab and event conditions you need to create the actual game.

## Conclusion

I have spent decades chasing that feeling I had when I first loaded the cassette for Pirate Adventure. Along the way, I think I've realized that writing code is kind of a text adventure in and of itself. Is that an incredibly cheesy thing to say? Yes. It is. But I'm sticking with it because I'm incredibly grateful to folks like Scott Adams (not the Dilbert Guy) for inspiring little nerds like me back in the day.

If you want to play the games, check out adventure.ridiculopathy.com, link in the description because who wants to spell all that? Also, the link for the Git repo is in the description as well. Go ahead and clone it so you can make your own games. Or look up the original Pirate Adventure BASIC code (link in the description) and make your own version of the engine. Go nuts. Have fun. Make stuff.

- Play The Games: [adventure.ridiculopathy.com](https://adventure.ridiculopathy.com)
- Watch the Video on [YouTube](https://www.youtube.com/watch?v=V8_UnTnrn_g)
- Source Code on [GitHub](https://github.com/markarenz/mms-text-adventure)
