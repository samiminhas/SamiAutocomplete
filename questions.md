### `1. What is the difference between Component and PureComponent? Give an example where it might break my app.`
1.	React.PureComponent: It is one of the most significant ways to optimize React applications. By using the pure component, there is no need for shouldComponentUpdate() Lifecycle Method as ReactJS Pure Component Class compares current state and props with new props and states to decide whether the component should re-render or Not.
2.	React.Component: But on the other hand, React.Component re-renders itself every time the props passed to it changes, parent component re-renders or if the shouldComponentUpdate() method is called. It doesn’t optimize the React application. They are easy and fast to implement and also are good for very small UI views where a re-render wouldn’t matter that much. They provide cleaner code and fewer files to deal with.

PureComponent might break the application when it has children as properties. Consider an example:
class MyApp extends React.PureComponent {
  render() {
    console.log('re-render children property')

    return {
       <div>
           {this.props.children}
       </div>
    }
  }
}

const render = () => {
  ReactDOM.render(
    <MyApp>
       <div />
    </MyApp>,
  )
  setTimeout(render, 1000) // 1000 milli-seconds or 1 second
}

render()

The code keeps logging 're-render children property' every 1s. It seems the children(<div />) is the only prop of above MyApp component and never changes so the PureComponent doesn’t work, i.e. shouldComponentUpdate() of PureComponent above returns true since no props seems changed.
In other words, the PureComponent might not work unless all the children component should also be “pure” as React.PureComponent’s shouldComponentUpdate() skips prop updates for the whole component subtree.

Also, the shouldComponentUpdate() implemented byPureComponent only shallowly compares state and props which means if the component’s props and the state has some sort of hierarchy or complex data-structures in them then there would be inconsistencies in the comparison.

### `2. Context + ShouldComponentUpdate might be dangerous. Why is that?`
Context allows you to transfer data down the component tree without manually passing props at each stage. shouldComponentUpdate() on the other hand short circuits the re-rendering of a part of the component tree (including children). Hence, if the state of a component are not modified in a meaningful way shouldComponentUpdate()  might accidentally block context propagation.

### `3. Describe 3 ways to pass information from a component to its PARENT.`
In React, information between components is typically unidirectional, meaning information is passed from parent components to child components. However, there are scenarios where you may need to pass data from a child component back to its parent component.

1.	Using Callback Functions: In this way, a callback function is sent as a prop from the parent component to the child component. After that, the child component can call the callback method and send information back to the parent component.
2.	Using the Context API: React comes with the Context API built-in feature, which lets components share data without having to pass props through each level of the component tree. It allows the creation of a global state accessible to all components within a particular context.
3.	Adding a State Management Library like Redux: Redux is a well-known tool for managing states in React apps. It provides a centralized store to manage the application state, which makes it easier for components to share data and pass data from child components to parent components.

NOTE: Another way to pass data from child to parent is to call the setState() method within the child component, which will update the state in the parent component and trigger it to re-render.

### `4. Give 2 ways to prevent components from re-rendering.`
To avoid unnecessary re-renders in ReactJS, you can follow a few approaches:

1.	Use React.memo to memoize components: React.memo is a higher-order component that can be used to memoize functional components. It prevents re-rendering when the component's props remain the same. By wrapping a component with React.memo, you can ensure that it only renders when its dependencies (props) are changed.
2.	Avoid passing unnecessary props: Be mindful of the props you pass to child components. If a child component does not rely on a prop, avoid passing it to prevent unnecessary re-renders in the child component.
3.	Use useMemo and useCallback hooks: The useMemo hook allows you to memoize values and only recompute them if their dependencies change. The useCallback hook is similar but specifically for memoizing function references. By using these hooks, you can avoid unnecessary re-computation of values or re-creation of function references, which can lead to unneeded re-renders.

### `5. What is a fragment and why do we need it? Give an example where it might break my app.`
Fragments are syntax that allow us to add multiple elements to a React component without wrapping them in an extra DOM node. React fragments serve as a cleaner alternative to using unnecessary divs in our code. These fragments do not produce any extra elements in the DOM, which means that a fragment’s child components will render without any wrapping DOM node.
Fragment does not actually add a DOM node, just a virtual DOM container. The container components in <ui> frameworks deal with arrays of child components like in <StyledMenu /> so the fragment might break the app with how this component works. It does stuff to the immediate child which in this case is a fragment and not an <li> so it applies classes to that and then it is stripped out of the dom because its a fragment.

### `6. Give 3 examples of the HOC pattern.`
Higher Order Components (HOC) are basically functions that take a component as an argument and return a new component.

As you build React applications, you will run into situations where you want to share the same functionality across multiple components.

1.	Management of State: Say you need to manage the state of currently logged in users in your application. Instead of managing that state across all of the components that need that state, you could create a higher-order component to separate the logged in user state into a container component, then pass that state to the components that will make use of it.
2.	Handle Search Functionality: Say you have three JSON files in your application. These files contain different data that will be loaded in your application in three different components. You want to give your users the ability to search the data loaded from these files. You could implement a search feature in all three of the components. This duplication may not be an issue at first, but as your application grows and more components need this functionality, the constant duplication will be cumbersome and prone to problems. A better way forward is to create a higher-order component to handle the search functionality. With it, you can wrap the other components individually in your higher-order component.
3.	Conditional Rendering - Authorization and Feature Toggle: Higher Order Components can also be used to show components only if they meet a condition. For example, a set of components should only be displayed to authorized users or experimental features should be enabled only if the feature flag is set.

Using Higher Order Components we can abstract away the logic to fetch the info if the component should be shown or not and reuse it in multiple components.

### `7. What's the difference in handling exceptions in promises, callbacks and async…await?`
•	Promises are more readable and have built-in error handling, but are less widely supported. It allows you to handle async operations in a more elegant way and avoid callback hell problem.
•	Callbacks are the simplest to understand and widely supported but can lead to callback hell. Callbacks are a way of passing a function as an argument to another function, and it gets executed after the first function has completed.
•	Async/await is the most readable, but only supported in modern environments. It is built on top of Promises.

### `8. How many arguments does setState take and why is it async?`
The setState() method takes up to 2 arguments. We usually pass in only one. The first argument can be an object or a callback that's used to update the state. The second argument that can optionally be passed to setState() is a callback function which gets called immediately after the setState() is completed and the components get re-rendered.

setState actions are asynchronous and are batched for performance gains because it does not immediately mutate this state but creates a pending state transition. Accessing this.state after calling this method can potentially return the existing value. There is no guarantee of synchronous operation of calls to setState and calls may be batched for performance gains.

### `9. List the steps needed to migrate a Class to Function Component.`
Here are the steps:

1.	use function instead of class
2.	remove the constructor
3.	remove the render() method, keep the return
4.	add const before all methods
5.	remove this.state throughout the component
6.	remove all references to ‘this’ throughout the component
7.	Set initial state with useState()
8.	change this.setState() instead, call the function that you named in the previous step to update the state
9.	replace compentDidMount with useEffect
10.	replace componentDidUpdate with useEffect

### `10. List a few ways styles can be used with components.`
There are around 8 different ways to style React components:

1.	Inline CSS
2.	Normal CSS
3.	CSS in JS libraries
4.	Styled Components
5.	CSS module
6.	Sass & SCSS
7.	Less
8.	Stylable

### `11. How to render an HTML string coming from the server?`
Use renderToString() to return HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes

