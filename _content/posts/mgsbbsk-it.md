---
title: Just Mgsbbsk It - Getting Started in the Industry
datePublished: 2020-11-23
image: posts/38.jpeg
metaDescription: Getting a foot in the proverbial door of the development industry can be tricky. Trickier still, the advice offered to these new developers can be unhelpful.
---

As an enthusiastic nerd, I love coding meetups. Before the Great Quarantine of 2020, I was attending up to three of them each month. Now that we're doing them virtually, it's easier than ever to learn and hang out with fellow developers and engineers. In our local Javascript group, we usually have a handful of young developers looking for that first job out of college or code school. These folks are in a particularly difficult position due to Covid-related hiring freezes and the limitations of interviewing over Zoom. Even without a global pandemic standing in the way, getting a foot in the proverbial door of the development industry can be tricky. Trickier still, it seems, because the advice offered to these new developers can be decidedly unhelpful, a bit like the replies you'll find on a game subreddit when someone complains that Dark Souls is too hard. "Get good," they say, but getting good is only part of the task at hand. It's more about getting good, getting relevant, and getting in front of the right people.

My purpose here is to offer some brief, actionable advice for those seeking entry into this industry. And because this is the Internet, I'll put this in list format, and I'll present some of this information in the form of pseudocode because we all know that's the first thing you look for on Stack Overflow. I even have an easily-pronounced mnemonic device for the sections below to make them easy to remember: MGSBBSK. Like we always say: when in doubt, mgsbbsk!

## Make Stuff

The number one issue most graduates have is that their portfolios or their GitHub repos lack the depth and variety that employers may be looking for. You know your resume isn't going to blow a hiring manager's mind at this stage, so the one thing you have the most control over is your nascent body of work. This is where practice projects come into play. Think about all the skills an employer might be looking for and make sure your practice project includes them. For example, build a backend API with GraphQL consumed by a frontend that uses modern React hooks. Include authentication just for fun.

Bring in stakeholders, people who will ask you to do or try things you don't yet know how to do. This will stretch your skills and serve as a great source of anecdotes for interviews. An ideal practice project has real world stakeholders, a project for a specific end-user, but you can also just show the code to a friend or post it online asking for feedback. It's important to learn how to show your work, defend your choices, and implement necessary changes.

And when that project is done, what do you do? Start a new one!

```
const workOnPracticeProject = async (id) => {
  const proj = await new ProjectRepo().getProjectById(id)
  proj.incrementProgress()
  if proj.complete {
    practiceProjectCompleted()
  }
  return proj
}

const practiceProjectCompleted = () => {
  const proj = startNewPracticeProject()
  return proj
}
```

## Get Relevant

It's often difficult to learn what's important to a potential employer from the job posting itself. You'll see a list of needed skills that will probably be much wider and deeper than what is really necessary. In truth, it's all about the stack. The specific libraries and methods being used by the company are the real coin of the realm.

If the company is committed to GraphQL, for example, there's not much point in building a practice project using only REST endpoints. What kind of styling system do they use? Again, focus your practice projects based on the libraries and patterns you know companies in your target group are using. So, ask about the specifics of their stack and have cogent follow-ups ready to go (see "be direct" below).

A few roles ago, I was managing a digital group in an agency, and an interviewee asked me a great question: "What skill are you looking for that you don't see on my resume?" What you're saying is this: I can become what you need, and I can adapt to continue being what your organization needs. It also results in a handy list of needed skills that you can use to focus your practice projects. Ask for their listing ruleset. Practice with it.

```
// Update project instantiation for optimized relevance
const practiceProjectCompleted = () => {
  const proj = startNewPracticeProject()
  proj.featuresToInclude = {
    graph: true,
    rest: false,
    express: true,
    jest: true,
  }
  return proj
}
```

## Spin Your Own Yarn

If you've been through interviews before, you know the sorts of questions you will be asked. Many of them begin with the phrase "tell me about a time when." Tell me about a time when you identified and resolved a problem through lateral thinking. Tell me about the last time you innovated a novel coding pattern that improved efficiency or performance. You need to get used to the practice of telling your story, spinning your own yarn.

This can be tough to do, but the good news is that since the questions are largely predictable you can have your answers ready to go. It just takes preparation and practice. Coding meetups are a great way to prepare for this kind of thing. You'll be asked what you do, what you've done, and how you work repeatedly. After a while you'll get accustomed to pulling out anecdotes about previous projects, successes and failures. Be ready to talk about what you learned. Practice it. You should feel comfortable telling your own story.

And if you're lucky, through the process some small amount of the imposter syndrome that haunts everyone will fade away.

```
const onCodingMeetup = async (conversation, listener) => {
  const topic = conversation[-1].topic
  const anecdote = await new AnecdoteRepository().getStoryByTopic(topic)
  if (anecdote){
    const resp = listener.current.push(anecdote)
    anecdote.refine(resp)
  }
  return listener
}
```

## Be Direct

I think it's a gross generalization to say that developers tend to be less outgoing than non-developers. However, it is true that communicating in a direct and clear manner can be a struggle for most people, regardless of their chosen field. The truth is that you're not likely to get an answer to an unasked question. You have questions. Ask them. If you don't get a direct answer, note that.

Our brains' tendency to fill in the gaps with inferences and assumptions has been great at assuring the survival of the human species, but it's not so great when it comes to securing gainful employment.

Asking yourself what you want can be difficult and a bit annoying. Make a list. Better yet, make a spreadsheet. Create metrics or attributes for every potential employer and compare them. A spreadsheet can be a great way to identify gaps in your knowledge about a particular opportunity. If you find yourself making assumptions about those items that are important to you, find the answers you need one way or the other. This is difficult since we want to continue assuming good things. The best way to fight this is to aggressively seek negative information. Check out employee reviews of the company on GlassDoor. Read their Yelp reviews.

When you buy something on Amazon, you probably check out the 1 star reviews just to see what the cranks have to say. Some of my best purchases have had scathing reviews, but it's easy to see which is a genuine bad review and which is just someone having a very bad day. You can do the same here.

## Buy One or Grow One?

When organizations need to fill a highly-skilled role, they have two options: they can buy an experienced developer or they can grow one. The former is expensive but could be the only option if a major deadline is looming. The latter is a good long-term strategy if the candidate can demonstrate an ability to learn quickly, good teamwork, and the right attitude. The job description may be written as if they are looking for someone with a decade or more on the job, but in reality they might be open to growing you as a developer, which may be an ideal situation for you. It never hurts to ask. Again, being direct has its rewards.

```
const hiringManager = (company) => {
  let experienceNeeded = 0
  if (company.team.size > MIN_SIZE){
    experienceNeeded++
  } else {
    experienceNeeded--
  }
  if (company.roadmap.includes(MAJOR_PROJECT)){
    experienceNeeded++
  } else {
    experienceNeeded--
  }
  if (experienceNeeded < 0) {
    return GROW
  }
  return BUY
}
```

## Small or Big?

When prospecting for that first job, folks have a tendency to stick with companies they already know about. These tend to be large, established companies where competition for entry is high. This limits your field of view enormously and ignores opportunities that might be right for you at this stage of your career.

Working with a large team of devs is a fantastic way to work. Having worked as the sole developer or managing a handful of devs, I can say that working with a team of developers is amazing. However, working for a smaller company like an ad agency could be a good first step. Smaller companies are often working within a limited scope, so the list of required skills is smaller and more manageable. The person interviewing you is less likely to grill you on technical issues and more likely to ask about general troubleshooting skills.

Larger companies tend to have larger teams and more resources, but smaller companies give you an opportunity to have a direct impact on the company's operations and bottom line. So, when prospecting it's a good idea to widen your net as much as possible and consider small companies as well as large ones, recognizing the relative plusses and minuses of each.

```
const checkBigOrSmall = (company, applicant) => {
  let desiredSize = 0
  if (applicant.wants.includes(IMPACT)){
    desiredSize--
  }
  if (applicant.wants.includes(RESOURCES)){
    desiredSize++
  }
  if (desiredSize > 0 && company.size > MIN_SIZE){
    return true
  }
  if (desiredSize < 0 && company.size < MIN_SIZE){
    return true
  }
  return false
}
```

## Keep Up the Hustle

Remember in little league when your coach told you to run <i>through</i> the base and not <i>to</i> the base? The same is true when you're looking for a gig. When you get an interview, don't stop prospecting other potential employers. Even when you're down to your last couple of options, assume that it could all fall apart like a house of Magic the Gathering cards (because it could) and keep on hustling your process until the very last day. And even after you accept a position, keep up your contacts. Keep networking.

```
const process = async () => {
  workOnPracticeProject()
  network.expand()
  const prospects = await new ProspectsRepo().getActiveProspects()
  const progress = await prospects.map(p => {
    const resp = p.followUp()
    return resp.progress
  })
  logger.debug(progress.id, progress.status)
  prospects = prospects.filter(p => {p.status !== DEAD_END})
  return prospects
}
```

The truth is that imposter syndrome is real. And, no, it never really goes away. The one's I worry about are the devs who act like they already know it all. This means they see nothing new for them to learn, which is either a failure of imagination or, more likely, a failure of work ethic. In either case, it's not a good sign. It's OK to have doubts about your current skillset, but by continuing to apply effort you'll grow those skills over time. This can be the source of your confidence.

Stay curious. Stay busy. Keep hustling.
