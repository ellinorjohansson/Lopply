**2025-12-14**

- Today i installed Nextjs using the standard installation by Nextjs. Also installed Prettier and made it work with eslint and connected it to github repo. Went well.
- Next time i will add develop branch and connect working branch to develop so main keeps clean and safe. Then i will continue with the todo list.

**2025-12-17**

- Today i added a readme structure and added things that i can add at this time like tech stack and summery of project.
- I also moved around in project beacuse i relized that i want a todo folder for next thing to do. I also moved the auth and database related things to the first sprint because i relized that would be nice to get done now in the beginning.

**2025-12-20**

- Today i added common.json for reusble text. Open up for adding more language like swedish, but started with only english. Went well and next thing todo is to install auth.js.

**2025-12-22**

- Installed basic auth.js. I just followed thru the docs of the installation. (not connected to login/signup or mongodb yet)
- Deploy to Vercel (deployed but db dont show)
- Added tailwind config and fixed with font, colors and icons. Struggled a lot with tailwind but now it works (don't really know if its truly the right way to do it tho)
- Added the header and fixed so the tailwind classes for color works properly because it didnt work like it should before. The thing was that i use tailwind v4 and there for i need to use @theme and not :root. So that was why it didnt work. Took a lot of time to figure it out but hopfully this works (it does but i hope it stays this way)

* Next thing todo is to fix vercel deploy, becuse now the data from mongodb dosent show.

**2025-12-23**

- Fixed the hover bg in the menu, font size, bugs and small style changes. So now the menu works like it should and i can do a pr.
- Started with the footer, added the coponent to the layout structure and started with adding some information in footer.

**2025-12-26**

- Done with the footer. Added style and things that was left to do with it like "all right reserved" thing. Also did style for mobile footer so it looks good on every device.
- Did the error page so if something goes wrong the error appear.
- Did the 404 page if something is wrong with the page or routing this will show up.

**2025-12-29**

- Did the card component, it's basic for now and will implement more stuff like the trash button and so on when the time is.
- Also connected races db to card to see how it looked and if it worked like i should. Before when developing i used temporary hard coded races.
- Did the buttons, primary, secondary and accent that is used in different purpose and with different style. Went well, was easy to implement because of the reuse and only needed some tweeks.
- I also did the toasters for succed and error that is going to be used when for example a user logged in succesfully or if something went wrong the error toaster is going to show up.
- I also added the primary buttons to error page and 404/not found page

**2025-12-30**

- Added input field component to use where needed.
- Added input field and other components to build the admin login, for now it's only front end and dosen't work.
- I also added error message to input field if something goes wrong to display it to the user what and where.
- Today i also did and being done with the login and signup form as well. It's also just front end like the admin login, but more will come.
