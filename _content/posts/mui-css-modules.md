---
title: Material UI and SCSS Modules - Why not Both?
datePublished: 2020-02-22
image: posts/33.jpeg
metaDescription: Material UI is great. I have only one gripe - I don't like JSON syntax for CSS. Thankfully, you can use node-sass and SCSS modules just by naming your SCSS modules correctly in a create-react-app app. Here's how.
---

Material UI is great. I had been using Bootstrap for about 7 years before switching, and for React projects Material is a solid choice. The components in the library are robust, and theming is comprehensive, though it can require some trial and error when it comes to finding the right parameter to deliver the desired effect.

I just have one gripe. Actually, it's more of a gripe about how React generally handles styling. This is going to sound like a hot take, but it's really more of a luke warm take: not everything desperately needs to be a JSON object.

Some things, like WC3-compliant CSS3, are just fine as they are. In fact, by forcing developers to refactor parameter names in camel case (e.g. "background-size" becomes "backgroundSize") and requiring string delimiters in many cases, you are essentially asking a developer to think of CSS with two syntaxes. Nesting becomes a bit of a nightmare and pseudo-classes like :before (or &:before if you're nesting) require new rules that linters often do not catch.

In short, I don't like it.

Material-UI's makeStyles feature is a great example of exactly what I don't want coupled with something I do want. With MakeStyles you can create CSS modules that will obfuscate your classes so you no longer have to worry about scope conflicts in your monolithic CSS file. Instead, only one CSS module is loaded with each component. You no longer have to worry about using standardized class names that are often too vague to be useful. You can give your classes names that make sense for the component with as much detail as you require. Let the module do the work for you.

The only trouble with makeStyles is that you're stuck with the bastardized JSON-driven CSS syntax, which isn't CSS at all.

![Why not Both?](https://media.giphy.com/media/3o85xIO33l7RlmLR4I/source.gif)

This is where we bring in the girl from the Ortega commercial. "Why not both?" she asks. Why not both, indeed. Using a Material UI theme along with SASS/SCSS is ideal if you're already fluent in CSS3. Use JSON to control all Material-specific elements such as buttons, text inputs, etc. and use tried and true SCSS modules for everything else.

Just install node-sass and make some minor edits to your webpack config. That's it. In fact, if you're working with an app you initialized with a script like create-react-app, you are in luck. No webpack edits necessary. Just give your module a name that ends with ".module.scss" and you are in business. You can then import your module with a name then use that to refer to your classes when writing your fancy JSX.

On top of all that, you get all the great features you've come to love SASS/SCSS for: nesting, mixins, variables, functions, and much more.

Here is an example of setting up a theme within Material UI:

```
import { createMuiTheme } from '@material-ui/core/styles';
const palette = {
  primary: { main: '#CE1126', contrastText: '#fff' },
  secondary: { main: '#FFCC00', contrastText: '#333' },
  white: {main: '#fff', contrastText: '#fff'}
};

const typography = {
  &quot;body1&quot;: {
    &quot;color&quot;: &quot;#e6e6e6&quot;,
    &quot;fontFamily&quot;: &quot;'Proxima Nova', helvetica, sans-serif&quot;,
    &quot;lineHeight&quot;: 1.3,
    &quot;fontSize&quot;: 18,
    &quot;fontWeight&quot;: 400,
    &quot;marginTop&quot;: 0,
    &quot;marginBottom&quot;: 16,
  }
}
const overrides = {
  MuiButton: {
    root: {
  },
    outlined: {
      borderWidth: 2,
    },
    outlinedSecondary: {
      borderWidth: 2,
    },
  },
  MuiAppBar: {
    root: {
      zIndex: 1,
    },
  },
};
const themeName = 'MyTheme v1';
export default createMuiTheme({ overrides, palette, typography, themeName });
```

And here is how you implement it within the root App component:

```
import React from &quot;react&quot;;
import &quot;./css/app.scss&quot;;
import { CssBaseline, ThemeProvider } from &quot;@material-ui/core&quot;;
import theme from &quot;./css/mui-theme&quot;;
import Header from &quot;./components/common/Header&quot;;
import Home from &quot;./containers/Home&quot;;
import Test from &quot;./containers/Test&quot;;

const App = () =&gt; {
  const [menuActive, setMenuActive] = React.useState([]);
  return (
    &lt;ThemeProvider theme={theme}&gt;
      &lt;div className=&quot;App&quot;&gt;
        &lt;CssBaseline /&gt;
        &lt;BrowserRouter&gt;
          &lt;Header
        menuActive={menuActive}
        /&gt;
          &lt;Switch&gt;
            &lt;Route path=&quot;/&quot; component={Home} /&gt;
            &lt;Route path=&quot;/test&quot; component={Test} /&gt;
          &lt;/Switch&gt;
        &lt;/BrowserRouter&gt;
      &lt;/div&gt;
    &lt;/ThemeProvider&gt;
  );
}
export default App;
```

Here is an example of a very simply component using modules:

```
import React from 'react';
import { Grid, Container, Typography } from '@material-ui/core';
import css from &quot;../css/modules/MyComponent.module.scss&quot;;
const MyComponent = () =&gt; {
  return (
    &lt;Grid container spacing={3} className={css.root}&gt;
      &lt;Grid item xs={12} sm={6} className={css.leftCol}&gt;
      Your Title
  &lt;/Grid&gt;
  &lt;Grid item xs={12} sm={6} className={css.rightCol}&gt;
    &lt;Typography className={css.bodyCopy}&gt;
      Lorem ipsum dolor sit amet.
      &lt;/Typography&gt;
    &lt;/Grid&gt;
  &lt;/Grid&gt;)
}
export default MyComponent;
```

And in your module, you could do something like this:

```
@import &quot;./config/font-sizes.scss&quot;
@import &quot;./config/fonts.scss&quot;
@import &quot;./config/colors.scss&quot;
.root{
  .leftCol{
    background-color: $branded-red;
    padding:30px 0;
    .title{
      font-size: $font-size-lg;
      margin:0;
    }
  }
  .rightCol{
    background-color: $default-grey;
    .bodyCopy{
      font-size: $font-size-default;
      line-height: 1;
      font-family:
    }
  }
}
```

You don't always have to nest the code the way we're doing here, but in some cases the extra specificity can help if you're fighting the Material UI theming for control of your selectors.
