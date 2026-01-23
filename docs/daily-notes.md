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

**2026-01-02**

- Today i started with adding the race card skeleton for when the races are loading so the user can see that it's loading and not frozen. I also did a branch just for fixing small things with the styling, color, font and responsivness and more with the things i'm done with under this sprint.
- I also added sprint-1.md for reflection over what i been done with this sprint. I also merged develop to main.

**2026-01-04**

- Today i finaly discovered the problem i had with deploying my page to Vercel. The problem was that i missed out on a variable so it basiclly used localhost that doesn't exist when deployed. So i added the variable and the value and now the data displays like it should.

**2026-01-05**

- Today i did the home page and also refactored the race display so i can reuse it and doesn't need to duplicate code for it. Went well and now that part is done.

**2026-01-06**

- Todays small session i fixed so the images now is vivble in the race cards. I needed to use img and not nextjs image beacuse then i need to add the url/src what you call it in the nextjs config and that is not going to work in my place if i understood properly. But now it works and also added a fallback if a image doesn't shows.

**2026-01-07**

- Today i finished with the "add race" so now you can add a race (for now directly to db), get help from helpbutton, cancel with popup modal, toasters if it succed or it appears an error and error on inputfield if something goes from. I also added validation that needs for like location so the user writes it correctly and get help if something goes wrong. I also fixed some responsivness and styling issues that appear so i fixed that.
- I also started with the admin pending races small by doing the page and set up.

**2026-01-08**

- Today i did the race pending on admin panel to work so tha new added race appear there first for admin to approve or reject and thet it appears for the users. I also added all races for admin to delete if they want to. I also added so the races disapears from the page if the date is outdated. I also started with the auth for admin and users.

**2026-01-09**

- Today i finished with the auth so it works like it should with both admin and user and error messages, toasters etc. I also fixed the user management that is under admin. This one was the hard one of the project and i think it went well for the first time, it works like it should at least.

**2026-01-10**

- In todays session i fixed some styling on race cards so they allign with each other. I also added characters to description text from 75 to 80 after if fixed the design. I also added a line in cards if they are in admin to seperate the race card from the admin buttons that is attached.
- I also merged develop to main.

**2026-01-12**

- I started of todays session by doing some fixes mostly small devices style issues that i discouved by looking at the page on my phone. I also fixed so when a user goes to another page it starts from the top and not from the button like it did before (if the "go to another page" button was in the middle or buttom of the page then the page the user goes to starts at the buttom.) I fixed that issue by adding a component and then added it to layout.
- I also fixed the explore race page by adding title, filter and so the page only load 12 races at each time so it has an end.

**2026-01-13**

- Today i worked with the implementation of bucketlist so the user that are signed in can add a race to their bucketlist by checking the heart icon and delete it from bucketlist by unchecking it or use the remove button. Also added error or succeed toaster if someone wants to add a race to bucket list but isn't signed in there will be a error toaster but if someone is signed in there will be a succeedtoaster. Also if someone remove a race from bucketlist there will be a succeed toaster.

**2026-01-14**

- Mission of today was to implement the race match page where user can fill out a form and based on what the user choose the page will calculate and then show matched races based on % match. It went well, was hard to do the calculation but i it worked out. I choose to only have the options that i have to start with and if i have time over maybe i will add more options to choose.

**2026-01-15**

- Today i have fixed so if the user is signed in it has to logout before it can login to another account or sign up. I did that to prevent from misunderstanding when bucketlist isn't still there for someone who changed account and didn't realize you loged out from one and signed in to another.
- Another thing i did today was to add tooltip bar so when you hover over for example the icon button in header to open navigation or close there is now a popup that says "open navigation" or close and so on. I also added it to the icon button for saving a race to bucketlist.
- One more thing i did was to add searchbar for explore races and bucket list pages so the user can search for race title or location.
- Everything went well today beside some issues/bug after adding tooltip because some things stopped working or disapeard, but i solved it and now everything works.

**2026-01-19**

- Today i worked with my branch that is like a fix branch with small changes here and there. So i checked a11y tests, fixed color when secondarybutton is active, center toast on small devices, fixed user name in header to only be one row, helperbutton content sometimes was outside of screen, bucketlist cards was not clickble and fixed so @2026 in footer updates automaticly. Went well and was nice to fix small things so now most of the page is done (for now).
- I also added meta tags and favicon.
- I also added vitest and v8 and wrote tests for race matching page to see so it works like it should and ddoesn't have any errors. Went well even if it feels like a lot of time since i did tests with vitest.

**2026-01-20**

- Today i fixed so only 12 races shows to begin with in admin all races like it is in races page. So when you press load more button 12 more races shows. Thats so the page doesn't overload and crashes when it starts and also for users usability.

**2026-01-21**

- Today i updated readme with relevant information about this project.

**2026-01-23**

- Today i wrote my sprint 3 summary and are done with the coding for now. What's left is preparing for presentation and finalize the report.
