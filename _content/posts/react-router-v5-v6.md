---
title: Migrating Your Single Page App from React Router v5 to v6
datePublished: 2021-12-22
image: posts/44.jpeg
metaDescription: React-Router's recent update from v5 to v6 will a fair amount of refactoring. Let's walk through the hows and whys of these changes to get you ready to upgrade.
---

Note: You can watch a YouTube video about this on the [MMS YouTube channel](https://www.youtube.com/watch?v=2tIGPQkhm2M).

React Router (along with its cousins React-Router-Dom and React-Router Native) is/are one of the most popular libraries for React. I checked this week, and the library has almost 6 million weekly downloads. It's a big part of the ReactJS ecosystem, and a major .x change of this scale means that it's an event of some consequence.

Let's say you just started doing some updates on an existing app and noticed that moving from 5.x to 6.x in your package.json generated a metric ton of errors in your terminal. Don't panic. For most folks, many of these changes are fairly localized to their App.js or wherever they're keeping their Routes currently. The other changes are, by and large, pretty simple, but it'll take some time to refactor and test everything.

"Pourquoi?" you ask because you are sophisticated and can speak fluent French. Since you asked so elegantly, I'll give you the best answer I can get my hands on. One reason for the changes seems to come down to reflecting the improvements in the React core and making better use of React's hooks. A lot of that is happening under the hood in the library itself. Another apparent motivation for the changes is a desire to better leverage the power of JSX for routes. We'll get into that a bit later.

## Switching Switch

The most noticeable change in v6 is the deprecation of Switch in favor of Routes. At first blush, this part of the refactor seems pretty easy. Just swap out your Switch wrapper component with the new Routes one, but it's not as simple as it might appear. Unlike Switch, Routes is very picky about what it allows as a child element.

A common pattern for authenticated routes is to create a custom Route sub-component such as ProtectedRoute that redirects the user to the homepage or login page if the authentication check, pulled from a useContext instance for example, reports that the user is not logged in.

```
<Switch>
    <ProtectedRoute path="/profile" component={ProfilePage} />
    <Route exact path="/login" component={LoginPage} />
</Switch>
```

In v6, that pattern will no longer work since the Routes wrapper component only allows Route components as children.

Rather than using a ProtectedRoute component, you can make something like a LoggedIn component that wraps around the target page component and redirects to the login route, for example, when the user is not logged in. Since we're using element prop rather than the component prop with v6 routes, we can just use LoggedIn to wrap around our existing page component within the route.

```
<Routes>
    <Route exact path="/profile" element={<LoggedIn><ProfilePage /></LoggedIn>} />
    <Route exact path="/login" element={<LoginPage />} />
</Routes>
```

If we wished, we could add that wrap within the ProfilePage component itself, but personally I like organizing the routes in this way so that it's obvious looking at my App.js that these routes are protected and these other routes are not. For apps of sufficient size, it seems like splitting this out into its own routes file and organizing routes by authentication level would be ideal. What do you think? What is your preferred organization style for routes in React apps?

## Changes to the Route Component

As you may have noticed in the previous example, we're no longer using the component prop in the Route component. Instead, we use the element prop, which allows us to use JSX. The most immediately apparent benefit os this is that it makes passing props a breeze. Previously, you'd need to use the render prop to pass the component and its props or make a constant for the component with its props and pass it in as the component. Neither method was bad or particularly difficult to maintain, but given the choice to use the element prop, I'd definitely go that way.

Here are two example methods we could have used prior to v6:

```
// v5
const ProfilePageWithProps = <ProfilePage someProp={someValue} anotherProp={anotherValue />;

<Switch>
    <Route path="/profile" component={ProfilePageWithProps}
    <Route path="/account" render={(myProp) => <AccountPage someProp={myProp} />}
</Switch>
```

And with v6, the element prop usage appears more readable and, it seems, more maintainable in the long run.

```
// v6
<Routes>
    <Route path="/profile" element={<ProfilePageWithProps someProp={someValue} />}
</Routes>
```

Obviously, these are just a few hacky hypothetical examples. I'm curious about what kind of Routes you had set up prior to v6 and how you feel about this change. The element prop existed prior to v6- I think it appeared in v5.1 - and some folks have been using it for a while. I was mostly using the render prop approach, which worked well enough for me. I do like the element approach better, though.

## Path Formats

Path formats for routes have also changed with v6. This is good news because it brings with it support for a wildcard- as long as that wildcard appears at the end of a path string.

```
/widgets/:id
/widgets/:id/*
/posts/:category/*
```

It looks like some folks have been using regex-style route paths, and these don't seem to be supported any longer. So, this may require more refactoring if you went down that road, but on the bright side this change means the npm package is smaller as a whole.

## "Link To" Consistent Results

In previous versions, Link components without leading slashes in the "to" props could lead to unpredictable results. For example, if you used to="foo" rather than to="/foo" react-router might send you to different pages depending on where you are in the app. If your current path has a trailing slash like "/bar/", you would go to a route nested below such as "/bar/foo" but on another page without a trailing slash, you would be sent to the root level: "/foo." This ambiguity could, and probably did, leave users confused.

In v6, the behavior of these Link to props is consistent across the app and is not dependent on the user's current path within the app. For example, to="foo" would send the user to "/foo."

For nested routes, a path or to prop without a leading slash would lead to a child route. For example "foo" in a nested route under "/bar" would lead to "/bar/foo." In essence, we are ignoring trailing slashes in the behavior of these Links. So you no longer have to comb through your code making sure the trailing slashes are there or not there. They simply no longer matter for this kind of thing.

## History is History, Now We Navigate

One of the most significant changes in v6 is the deprecation of useHistory(). To offer better performance for apps that use suspense, this pattern has been dropped in favor of useNavigate and the Navigate component. Redirecting a user programmatically in your app used to involve pulling in useHistory and pushing the new path onto the history instance.

```
// v5
let history = useHistory();

const handleSubmitClick = () => {
history.push('/confirmation-page');
};
```

Our new-fangled way of doing this is going to look very familiar.

```
// v6
let navigate = useNavigate();

const handleSubmitClick = () => {
    navigate('/confirmation-page');
};
```

Another redirection technique we would employ pre-v6 was to use the Redirect component supplied by the library. Now, we would use the Navigate component to do more or less the same thing.

```
// v6
const [pageStatus, setPageStatus] = useState('default');

const handleSubmitClick = async () => {
    setPageStatus('submitting');
    await saveTheDataToTheBackend(formData);
    setPageStatus('submitted');
};

if (pageStatus === 'submitted') {
  return <Navigate to='/confirmation-page' replace />;
} else {
  return (
    <div>
      // ... Form inputs
      <button onClick={handleSubmitClick}>Submit</button>
    </div>
  )
}
```

## Object Based Routes

You can now create object based routes, a list of routes as an array with optional child elements for nesting. With the useRoutes hook in v6, we can create complex routing fairly easily.

```
const myRoutes = useRoutes([
    {path: '/projects', element: <ProjectsList />},
    {
        path: '/profile',
        element: <UserProfile />,
        children: [
            {path: 'change-email', element: <ChangeEmail />},
            {path: 'change-password', element: <ChangePassword />},
        ]
    },
    {path: '/', element: <Dashboard />},
]);
return myRoutes;
```

This could come in handy for complex dynamic routing. For simple projects, though, it seems like it might be less readable than just a list of Routes. For a simple project that has plans to grow into something more complex, maybe this is a good thing to establish up front. It's up to you.

## Conclusion

For most of us, the changes are fairly straightforward. Of course, if your project is well outside the typical use case, the update may require a bit more work. There are other changes to consider, and for the full list check out React Router.com. I'll put a link to their official v5 to v6 guide in the description.

So far, my experience with this has been positive. I recently updated a few simple Create React App projects, and the whole process took no time at all, but it's clear that for large, complex projects the refactoring and regression testing is not insignificant. Still, it seems like the effort is worth it for the performance tweaks and somewhat thinner library.
