# Peppermint: Streamlining React Testing For Developers
#PUT PEPPERMINT LOGO HERE

## Introduction
There are many testing frameworks out there but no applications that take away the tedium of creating tests for developers. My team and I realized that if we were to create a tool that could handle this issue, we would be able to save developers a lot of time and boost productivity.

## Solution
Introducing Peppermint! Peppermint is an out of the box tool developed with the aim of streamlining React testing for developers with as little coding as possible:

Automatic Parsing: Peppermint will automatically parse through the component file you choose and generates a boilerplate of all of the necessary test blocks for your component.
Configurable Test Generation: Users will be able to change test parameters and see their changes in real time.
Fine Tuning: If the user really needs to edit the test code manually, there is an opportunity at the end of the workflow for them to write directly into the code window.
CodeMirror: We’ve integrated the CodeMirror API to give us access to a variety of built in tools that would make it easier to create our application.

## How does it work?
After launching the app, the user is prompted to select the component for which they wish to create tests. Upon making their selection, they are directed to a page displaying their component code and the corresponding generated test code side by side, along with a tooling panel where they will be able to configure the test code. Here users can define custom props, add more tests, and specify the events they want to test. Afterwards, they are guided to the final draft page, where they can make direct edits to the test code or export it to their test directory

## Conclusion
If you’re ever tired of creating tests from scratch, give Peppermint a try! As an open source product, we are open to contributions from the community. Please refer to our Github for an up-to-date future roadmap.

## Future Roadmap
