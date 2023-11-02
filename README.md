<img src="./assets/PepperMint.svg" width=25% height=25%>

# Peppermint: Streamlining React Testing For Developers

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

## Future Roadmap/Developer Contributions

If you are interested in contributing to PepperMint, first fork the main repo, and create a feature branch. Once updates are completed, please submit a pull request and the team will review! 

Here are some low-hanging items on our mind:
- Back button to go from Final Draft back to Create Test Page
  - Harder: Persisting the Final Draft data between page toggles, especially after the user manually inputs into the code window
- Better Parsing for input Components → populate existing dropdowns
  - Example: if the user selects “getById”, PepperMint should parse the component and find all corresponding IDs
  - Example: if no placeholders exist in the component, then don’t give the user the option to select “getByPlaceholderText”
- Npm packages are conflicting (currently using --force)
- Indentation throughout the CodeMirror to better follow suit of a test file
- Only “Before All” exists in the existing boilerplate. Need to give the user more options
- Import/export functionality to an existing file structure

Here are some of the larger items on our mind:
- Implementing a better, abstracted code editor (Tip/tap)
- Generating the full range of test scenarios (integration, end-to-end, snapshot, etc.)
- Ability to run test files directly in PepperMint (Terminal emulation)
- Edge-casing: scrubbing component files before entering the application
- Implementation of hotkeys to speed up test-generation
- Redesign existing button/dropdowns. Currently lots of white space

