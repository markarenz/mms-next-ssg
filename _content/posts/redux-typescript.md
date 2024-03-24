---
title: Let's Make Something Cool with Typescript, Redux and Redux Toolbox
datePublished: 2022-10-21
image: posts/46.jpeg
metaDescription: It's a day that ends in "y" so we're making fun stuff in Javascript. Let's make a handy-dandy todo app with Typescript, Redux, and Redux Toolkit.
---

It's a day that ends in "y" so we're making fun stuff in Javascript. Let's make a handy-dandy todo app with Typescript, Redux, and Redux Toolkit. Why a todo app? Well, todo apps are how we teach React these days, I guess. It's the law or something.

In our case, we're going to make a tricked-out todo app so we can practice these patterns. We're going to be building it out completely and deeply because that is how we learn.

"Why Redux?" you're probably asking. "I thought we were done with all that bothersome boilerplate?" Or maybe you said something like, "Do we even still need Redux if we have useContext and useReducer hooks?" Well, in truth Redux isn't going anywhere. Those hooks are very nice, indeed, but for managing global state, especially in use cases where state changes are frequent, Redux is darn handy to have around.

One of the main reasons folks tend to avoid Redux, myself included, is that we assume it's a pain to configure and maintain. Thanks to tools like Redux-Toolkit, that's no longer the case. For the project we're talking about today, the basic setup took about the same amount of time it would take for a typical useContext/useReducer project. It's easier than you might think.

We instantiate our create-react-app project with a typescript template like this.

```
npx create-react-app ts-react --template typescript
```

## Tailwind Setup

I'm using Tailwind for styling. Just install with the command below:

```
npm install -D tailwindcss postcss autoprefixer
```

Then run the init:

```
npx tailwindcss init -p
```

This will create a tailwind.config file where we will need to update the content array to include Javascript and Typescript files.

```
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
```

Then in our index.css, we need to add our tailwind include statements near the top. In my case, I added some simple foundational CSS and a font as well.

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

At this point, you can add a classic tailwind class to your app component, something like 'bg-red-500' to confirm that Tailwind is set up properly.

## Typescript Setup

When we created the project with the typescript template, several type libraries we need were included. For our project, though, we'll need to create a file from which we can pull our project-specific types. Create a new file for our types. I called mine 'type.d.tsx' where we can place the handful of types we will need.

In this first type, we are establishing the data structure of the "meat" of our project, the todo item. Each item will have a title, id, an isComplete boolean and an array of strings for our tags. More on tags later. The dates are not currently being used in our features, but we're capturing this data just in case I need it down the road.

```
export interface Todo {
  title: string;
  id: string;
  dateCreated: string;
  dateCompleted: string;
  isComplete: boolean;
  tags: string[];
}
```

Our TodoAction and DispatchType items are intended for use with our Redux actions. The TodoAction isn't used very much since most often our action payloads are just strings. In some cases we need an ID string and a value.

```
export type TodoAction = {
  type: string;
  title?: string;
  id?: string;
};

export type DispatchType = (args: TodoAction) => TodoAction;

```

## Redux Setup

Now that our types are ready to go, we can install Redux and Redux Toolkit.

```
npm i react-redux @reduxjs/toolkit
```

We can now create our store. We'll create a store directory inside our src directory for our store config. The basic setup is just 3 files: our slice, our store file, and our hooks file. Most of the Redux development we will do will be in the slice file.

What is a slice? It's a slice of state. This is fantastic for large and complex projects with multifaceted global state. If two parts of state don't interact, they can be on separate slices. In our case, we will add another slice down the road that will handle the app's darkmode feature. More on darkmode later.

In our slice file, we establish initial state and our reducers. The main element in our initial state object is our todos array. The other items are used more later when we add the tags & filtering features. We are using the loadFromStorage() helper file to pull in our todos from local storage as a string then parse the JSON. If the item does not exist in local storage, we go with an empty array.

We create the slice with out initial state and our reducers. To start, we just have a single item, saveTodo. This will take in a string from action.payload as our new todo's title and save it to our slice of state and save the array to local storage as well.

When we export our slice's actions, note that we don't have to make action creators when we add a new reducer. We just add the reducer's name to this export. That's handy.

```
const initialState: TodoState = {
  todos: loadFromStorage() || [],
  tags: getTagsFromStorage() || [],
  selectedTodoId: '',
  isTagModalOpen: false,
  isEditingTodoTitle: false,
  isFilterModalOpen: false,
  tagFilter: getTagFilterDefault() || '',
  hideCompleted: false
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    saveTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        title: `${action.payload}`,
        id: getIdHash(),
        dateCreated: `${new Date()}`,
        dateCompleted: '',
        isComplete: false,
        tags: []
      };
      const newTodos = [newTodo, ...state.todos];
      saveToStorage(newTodos);
      state.todos = [newTodo, ...state.todos];
    },
  }
});

export const { saveTodo } = todoSlice.actions;

export default todoSlice.reducer;

```

With our slice created, we can make our store with a file called store.ts. Later on, we'll add our darkmode slice to this file to bind them together.

```
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

export const store = configureStore({
reducer: {
todo: todoReducer,
}
});

export type RootState = ReturnType<typeof store.getState>;
export type TodoDispatch = typeof store.dispatch;
```

Our reactJooks.ts file is even simpler. This takes in our state and dispatch from the store and connects them to our redux useDispatch() and useSelector() hooks. These will be used in the components.

```
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, TodoDispatch } from './store';

export const useTodoDispatch = () => useDispatch<TodoDispatch>();
export const useTodoSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Todo CRUD Features

Now that we have those files in place, we can go to our index.tsx root component and integrate our Redux store into our application. Import your store from your store file and import Provider from react-redux, then wrap your app in your Provider component and include your store in the appropriate prop.

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

If you don't already have the Redux Tools extension for Chrome, go ahead and get that installed and load up your app. Running locally, you should now see your initial state in the Redux tool. It's not much so far, but it's working.

We can now create components that will dispatch actions and consume the data with selectors. Let's create a TodoInput.tsx component to handle the entry of todo items and another TodoList component to map through our todo list items.

TodoInput is going to have an input element and a button to handle the OK or submit function. I added an onKeydown to trigger the function for the OK button when the enter key is hit. We're using a local useState instance to handle the input's value and we pass that value to the dispatch once the user clicks OK or hits enter.

We pull in our useTodoDispatch function from our hooks file and our saveTodo reducer from our slice.

```
import { useTodoDispatch } from '../store/reduxHooks';
import { saveTodo } from '../store/todoSlice';
```

And from that we can get our dispatch() function.

```
const dispatch = useTodoDispatch();
```

In our handleSaveTodo() handler, we can dispatch an action to the saveTodo reducer pretty easily.

```
dispatch(saveTodo(newTodo));
```

Let's set that up and run it. We should now be able to see the changes in the Redux panel in our inspector, but we can't quite see it on screen yet. In our TodoList component, we will import our useTodoSelector to get data from our slice of state.

```
import { useTodoSelector } from '../store/reduxHooks';
```

And we can pull the todos array from our slice easily.

```
const { todos } = useTodoSelector((state) => state.todo);
```

You can map through your todos in the TodoList component, and at last you can now see the todos you create on screen.

If you have the save and load local state helper functions set up, you can refresh the page and the todos will remain in place.

This is a cheap kind of persistence, of course. The todos go away as soon as I clear my browser storage. In my case, this is an app I plan to use for myself on a single machine, so this is a decent trade-off, and it beats having to hassle with standing up the infrastructure of an external database and authentication.

Let's add reducers to toggle the isComplete status on our todos and a function to delete the todos. In my case, the layout for my TodoDisplay component shows a complete button with a checkmark (if complete) the todo text and a delete button on the right. We use the same dispatch pattern as the saveTodo reducer.

```
deleteTodo: (state, action: PayloadAction<string>) => {
  const newTodos = state.todos.filter((t) => t.id !== action.payload);
  saveToStorage(newTodos);
  state.todos = [...newTodos];
},
toggleCompleteTodo: (state, action: PayloadAction<string>) => {
  const newTodos = state.todos.map((t) =>
    t.id === action.payload
      ? {
          ...t,
          isComplete: !t.isComplete,
          dateCompleted: !t.isComplete ? `${new Date()}` : ''
        }
      : t
  );
  saveToStorage(newTodos);
  state.todos = [...newTodos];
},
```

I'm using SVGs for my icons because I love the way SVG works with React components. I use a tool called svg2JSX to do easy conversions, but often it takes no time at all to convert an SVG file to a component by hand.

Now that we are able to create, complete and delete, let's set up inline editing of the todo titles.

Remember when we set up our todo slice's initial state? There were a few items that didn't seem to have a purpose quite yet. Now we are ready to use two of those items: isEditingTodoTitle and selectedTodoId.

We'll use isEditingTodoTitle as a flag to let the UI know when we're in title-editing mode, and the selectedTodoId is used to allow us to pass along the todo ID to the title updating reducer.

In our TodoDisplay component, we'll add some logic to return a new TodoTitleInput component when the isEditingTodoTitle boolean is true. We can just add it above the default version of the component.

We can add an onclick to the default version's title display so that we enable title-editing mode. Our new title-editing component will take over the same space as the default todo display with just an input and a pair of Cancel and OK buttons. Like the other input, we'll listen for OK, and we'll also listen for escape, which we will treat like a click on Cancel. As with the other input, we'll track the input's value with our local useState instance.

And when we save, we'll issue a dispatch to updateTodoTitle with an object of id and value (the new title). Our reducer interprets the payload in this way and updates our slice of state.

```
updateTodoTitle: (state, action: PayloadAction<TodoActionById>) => {
  const { id, value } = action.payload;
  const newTodos = state.todos.map((t) =>
    t.id === id
      ? {
          ...t,
          title: value
        }
      : t
  );
  saveToStorage(newTodos);
  state.todos = [...newTodos];
},
```

## Feature: Tags and Filtering

We can now add tags to our app. This will allow the user to categorize todo items and also filter by tag, so a given todo can belong to several virtual lists of todos. We will create a generic Modal component and two new modals that will use it, one to manage tags and another to select tags for filtering.

We will start with the tag selector. Add a BtnAddTag component to the TodoDisplay below the title. When clicked, this will dispatch to the reducer, setting isTagModalOpen to true and setting that todo's ID as the selectedTodoId.

In our tag selector, we will have an input & todo button for adding custom tags. Like before, we will add an onKeyDown to listen for Enter, and we will dispatch to our reducers when we want to save a new todo. We will list the existing todos below, all buttons that, when clicked, will dispatch to a reducer to unset isTagModalOpen and add the new tag to the selected todo.

In our filter modal, we will have the same list of tags. When clicked they will set the tagFilter prop in our global state. We can also have a checkbox for hiding completed items. Now we can revisit our TodoList component and include the filtering items from our slice in the selector and add some filtering to the todos array.

```
const {
  todos,
  selectedTodoId,
  isEditingTodoTitle,
  hideCompleted,
  tagFilter
} = useTodoSelector((state) => state.todo);
const filteredTodos = todos
  .filter((t) => (hideCompleted && !t.isComplete) || !hideCompleted)
  .filter((t) => tagFilter === '' || t.tags.includes(`${tagFilter}`));
```

## Feature: Dark Mode

For Darkmode we will need three things, each of them fairly simple on their own: a DarkModeSelector component to toggle between darkmode and non-darkmode, a new slice to manage our darkmode state, and updates to our Tailwind config.

The component is fairly simple. In my case, I just made a sun and moon icon in Inkscape. I made my own so I could guarantee they were the same aspect ratio. We're using a selector to pull in the darkmode status from our slice of state. Also, we have a function to dispatch to our reducer to toggle darkmode in our slice.

```
import { useTodoSelector } from '../store/reduxHooks';
import { useTodoDispatch } from '../store/reduxHooks';
import { setDarkMode } from '../store/darkModeSlice';
import IconSun from './icons/IconSun';
import IconMoon from './icons/IconMoon';

const DarkModeSelector = () => {
  const dispatch = useTodoDispatch();
  const { isDarkMode } = useTodoSelector((state) => state.darkMode);
  const handleToggleDarkMode = () => {
    dispatch(setDarkMode(isDarkMode ? 'light' : 'dark'));
  };
  return (
    <button
      data-testid="btn-darkmode"
      type="button"
      onClick={handleToggleDarkMode}
    >
      <div className="rounded-full bg-gray-800 dark:bg-gray-900 border-2 border-white dark:border-gray-300 p-1 relative">
        <div className={`w-6 h-6 bg-primary dark:bg-primaryDark absolute transition-all duration-200 ${
            isDarkMode ? 'left-[calc(100%-1.5rem)]' : 'left-0'
          } top-0 rounded-full`}
        />
        <div className="relative flex">
          <div className={`w-4 h-4 mr-2 transition-opacity duration-200 ${!isDarkMode ? 'opacity-100' : 'opacity-30'}`}>
            <IconSun />
          </div>
          <div className={`w-4 h-4 transition-opacity duration-200 ${isDarkMode ? 'opacity-100' : 'opacity-30'}`}>
            <IconMoon />
          </div>
        </div>
      </div>
    </button>
  );
};

export default DarkModeSelector;
```

Our darkmode slice is very simple compared to our todo slice. We have just one reducer and one item in our state. The getInitialDarkmode() function is a helper function that reads the browser's preferred darkmode setting to use if no setting is found in our local storage.

```
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getInitialDarkmode, processDarkModeChange } from '../helpers';

type DarkModeState = {
  isDarkMode: boolean;
};

const initialState: DarkModeState = {
  isDarkMode: getInitialDarkmode()
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<string>) => {
      const newDarkMode = `${action.payload}` === 'dark';
      processDarkModeChange(newDarkMode);
      state.isDarkMode = newDarkMode;
    }
  }
});

export const { setDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
```

Don't forget to add your darkmode slice to your store's reducer object. In the `processDarkmode` function triggered in our reducer, we add or remove the "dark" class on the HTML element on our page. You should be able to load up the app and see the class come and go as you click on the darkmode selector component.

```
const setDarkModeClass = (isDarkmode: boolean): void => {
  if (isDarkmode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const processDarkModeChange = (newDarkMode: boolean): void => {
  setDarkModeClass(newDarkMode);
  localStorage.setItem('todoDarkmode', JSON.stringify(newDarkMode));
};

export const getInitialDarkmode = (): boolean => {
  const browserDarkmode = window.matchMedia(
    '(prefers-color-scheme: dark)'
    ).matches;
  const str = localStorage.getItem('todoDarkmode');
  if (str && str.length > 0) {
    const initialDarkMode = str === 'true';
    setDarkModeClass(initialDarkMode);
    return initialDarkMode;
  }

  return browserDarkmode;
};
```

This alone won't finish the job, of course. You will need to add a line to your tailwind.config.js to grab onto the "dark" class to enable or disable darkmode classes in Tailwind. Just add "darkMode: 'class'," above the theme.

Now you can go into your components and use the "dark:" prefix for your classes. For example, "bg-gray-500 dark:bg-gray-900" will display a medium gray background normally and in darkmode you will see a very dark background.

## Testing with Redux

When it comes to testing in the Redux world, one piece of advice that I got,
was to test with your actual store rather than a mock store. I can see cases where you would want a mock store to test aspects of your slice, but for unit and integration tests of helper functions and components, it works nicely to use the real store.

So in this case, we are doing a simple integration test with our App component. We're going to wrap the provider around there and use our actual store so we can dispatch to saveTodo with a test title. Then we can assert that the item with a test ID of 'todo-list' should be in the document. We are conditionally rendering the todo list only when the todos array is not empty.

```
it('renders the main App component', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  act(() => {
    store.dispatch(saveTodo('Test Todo Title'));
  });
  await waitFor(() =>
    expect(screen.getByTestId('todo-list')).toBeInTheDocument()
  );
});
```

On a side note, I'm using React test library, and I've really grown to like it. I used enzyme for a really long time, and I'm slowly moving over to using React test Library. And one of the things I really like about it is it makes doing click sequences like this pretty easy. In this case, we're adding 2 todos and then we simulate clicks on the completed button on one and then a click on the delete button. We can make assertions at various points in this sequence about how many todos we expect to see and which ones should be listed as complete. This is more of an integration test than a unit test, but it's very easy to set up and can tell us a lot about how the parts of the application work together.

```
it('updates global state when delete and complete buttons are clicked', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Add 2 new todos
  act(() => {
    store.dispatch(saveTodo('Test Todo Title 1'));
  });
  act(() => {
    store.dispatch(saveTodo('Test Todo Title 2'));
  });
  await waitFor(() =>
    expect(screen.getByTestId('todo-list')).toBeInTheDocument()
  );
  const btnComplete = await screen.findByTestId('todo-complete-0');
  const btnDelete = await screen.findByTestId('todo-delete-0');
  fireEvent.click(btnComplete);
  const stateAfterCompleteClick = store.getState();
  expect(stateAfterCompleteClick.todo.todos[0].isComplete).toBe(true);
  fireEvent.click(btnComplete);
  fireEvent.click(btnDelete);
  const stateAfterDeleteClick = store.getState();
  expect(stateAfterDeleteClick.todo.todos.length).toBe(1);
});
```

In some cases, we need to start with a specific list of todos for our tests. In this case, we can mock the functions that feed our slice's initialState to inject the test conditions we desire. In our case, we are spreading a requireActual() of the main helper functions and adding in our mocks to replace just the ones we need to mess with initialState.

```
jest.mock('../../helpers.ts', () => ({
  ...jest.requireActual('../../helpers.ts'),
  getTagFilterDefault: jest.fn(() => {
    return 'test';
  }),
  loadFromStorage: jest.fn(() => {
    return [
      { ...testTodo },
      { ...testTodo, id: '1' },
      { ...testTodo, id: '2' }
    ];
  })
}));
```

In this example, when we render our Provider-wrapped component, it will receive a slice of state that already has the data we provided. Very sneaky. In the case below, we're testing the removal of a tag from a todo. We make an assertion before the click and after to be sure we observed the removal of the tag.

```
it('removes tag from global state when delete button is clicked', () => {
  render(
    <Provider store={store}>
      <Tag tag="test" id="1" />
    </Provider>
  );
  const element = screen.getByTestId('btn-delete-tag-test-1');
  expect(store.getState().todo.todos[1].tags.includes('test')).toBe(true);
  fireEvent.click(element);
  expect(store.getState().todo.todos[1].tags.includes('test')).toBe(false);
});
```

Redux doesn't have to make testing harder. In fact, this was pretty easy. Within a few hours, I was able to get 100% test coverage on all of these TypeScript components and the helper files with those techniques.

## Conclusion

So there's no reason to be intimidated by our old pals, TypeScript and Redux.

I think of TypeScript like a gruff English teacher, a stickler for commas and whatnot, but in the end you grow to respect them because the feedback you got from them made you better at commas and whatnot.

I think of Redux like Sloth from The Goonies. He could seem scary at first, but especially with this friend Redux toolkit, he's kind of a sweetheart. Plus, it's nice to have a strong friend around who can rip iron chains off of a wall to bring you slices of state or Baby Ruth Bar.

I hope you found this helpful and I hope this prepares you, at least in some small part, to make something interesting on your own.

Go ahead and clone this project and use it as a reference if you want. A link to the Github repo is below.

Check out the [Github Repo]("https://github.com/markarenz/typescript-redux-todo) to see all the code.

Also, here is a [YouTube video](https://youtu.be/C18Pm_PcEhs) walking through the development process.
