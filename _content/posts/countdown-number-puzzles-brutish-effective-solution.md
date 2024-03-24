---
title: 'Countdown Number Puzzles: A Brutish But Effective Solution'
datePublished: 2018-02-11
image: posts/25.jpeg
metaDescription: For fans of the UK quiz show Countdown, the number puzzles are always a treat. They're often quite challenging, and if you're slow at pen-and-paper math like most folks...
---

For fans of the UK quiz show Countdown (or it's funnier companion Series 8 out of 10 Cats Does Countdown), the number puzzles are always a treat. They're often quite challenging, and if you're slow at pen-and-paper math like most folks, you can sometimes scratch your head as to how they pull it off.

Here's how it works: the host pulls six random numbers ranging from single to triple digits. The host then pulls another random number, usually of 3 digits, referred to as the target number. Contestants must use basic operators (addition, subtraction, multiplication, and division) as well as grouping (parentheses like these) to hit (or come as close as is possible) to the target number. Contestants have 30 seconds to come up with the answer.

It all sounds quite difficult, but in truth, this type of puzzle is simpler, and in some ways more complex, than you might imagine.

I grew up playing a card game called Krypto, which has many of the same rules. I even made a multiplayer Flash game years ago out of my love for the game.

There are some basic rules of thumb that make it easier when using pen & paper. The first task is to pair your larger & smaller numbers together- for example dividing a large number by 2 to get a more usable number. Also, apply what you remember from your times tables to find divisors that you can use.

I was bored on a Saturday when I should have been doing something more productive and it occurred to me that I'd like to solve these puzzles algorithmically. I enjoy the 8ooTC episodes, but when the number puzzles come on I always play along and, if I can't get it in the time limit I'm still going to crunch on it for longer than I should. So, let software do it, right?

Turns out, this problem is very likely an NP-hard problem, which means that it's got so many permutations of possible answers that an algorithm can't even solve whether a set of puzzles is solvable, let alone the task of solving specific puzzles in one algorithmic iteration.

But we don't need that, do we? If all we want to do is beat the game on the show, there's a far easier way. And it's such a dumb solution, it will probably infuriate you.

Use the tool below to enter in the numbers from any episode you can find on YouTube. Leave spaces between the numbers. Enter the target number and hit "submit."

It's a brute force approach, clearly, but unlike brute force password guessers, this one isn't iterating through all possible solutions.

When you break down the problem, you have the order of the numbers, the operators, and the groupings. Each of these have an incredible number of possible iterations. The weak link, it seems, is the groupings because if you don't care about the order of the numbers, there are only a handful of possible combinations relative to everything else.

So, we run a solving loop that shuffles the array of 6 numbers and runs them through all of the possible groupings (again, a limited number) and applies random operators in each of the 5 join points. Running a simple javascript eval command on the resulting mess gives us a number that we can compare against the target. If the variance is lower than ones we've seen before, it becomes the best solution- and so on and so on until the max_attempts runs out or the puzzle is legitimately solved.

It doesn't always come up with a solution, it times out around 100,000 iterations, but when it does it's very fun. It often comes up with different solutions than I thought up, and better ones than I've seen on the show.

[Give it a whirl.](https://thing.ridiculopathy.com/countdown_form.html)
