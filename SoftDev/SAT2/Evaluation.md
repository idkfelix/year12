## Evaluation Criteria
- [ ] **Login Page**
	- [ ] Single clearly labelled field for user to enter their compass session Id
	- [ ] Login button located under the field for the user to validate their session Id and continue to app
	- [ ] Clearly branded navigation bar with large format Notelass logo
	- [ ] Button on navigation bar to to access the documentation as a new user
	- [ ] Home button available on navigation bar for already authenticated users to access the main website without logging in once again
	- [ ] Minimal user interface identifiable as a tool for compass
		- [ ] Similar colour scheme to compass
		- [ ] Interface arrangement to that of the compass LMS
- [ ] **Home Page**
	- [ ] Side Panel displaying commonly checked information from compass
		- [ ] Panel Displaying the current days lessons 
		- [ ] Lessons are clickable to open a new note
		- [ ] Date can be incremented back / forwards to see other timetables
		- [ ] Timetable is displayed sequentially
		- [ ] Panel containing the users upcoming / recent learning tasks
		- [ ] Learning tasks display their due date as a reminder
		- [ ] Panel for viewing recently edited notes
		- [ ] Recently edited notes display their date and subject
	- [ ] Panels within the side panel can be toggled on and off by the user
	- [ ] Navigation bar displays a sign out button at all times when authenticated
	- [ ] Main content of the page displays a table with all of the users notes
	- [ ] Notes can be sorted by date, lesson or subject
	- [ ] Notes can be filtered by subject or date
	- [ ] Clicking on a note in the table opens it for editing by the user
- [ ] **Editor Page**
	- [ ] The editor is opened in a side by side view with the selected lesson plan
	- [ ] The lesson plan is formatted correctly with all rich text style as in compass
	- [ ] The plan panel is displayed in read only
	- [ ] The lesson plan panel features a title displaying the subject and lesson date
	- [ ] A user can toggle the lesson plan panel on and of while taking notes
	- [ ] The main editor has live text formatting as the user types
	- [ ] A menu bar is attached to the top of the editor at all times
	- [ ] The bar has familiar buttons for the user
		- [ ] Drop-down to save or delete a document
		- [ ] Options to insert various headings or titles
		- [ ] Formatting drop-down applies to selected text
	- [ ] Common key combinations can be used to apply formatting to text
	- [ ] Markdown syntax can be used to format titles, text, lists, etc.
	- [ ] A user can use LaTeX formatting within their notes
	- [ ] LaTeX is live rendered alongside common rich text / markdown
## Evaluation Strategy
To evaluate my software solution I will create create various criteria tables and surveys for the client and user testing participants, corresponding to the the chosen development model's efficiency and effectiveness in production, the implementation's usability within its intended environment, and its satisfaction of the clients functional and non-functional requirements. 

This evaluation will be conducted over two weeks in individual sessions with the user participants to document user satisfaction and a meeting with the client to discuss the outcome of the project and the satisfactory completion of its requirements. Additionally I will separately conduct further evaluation of the software and its development model to document its practical efficiency and effectiveness.
## User Satisfaction
*The following user satisfaction data was collected from three user testing participants of varying levels of technical literacy, labelled 'amateur', 'novice' and 'advanced', after the completion of their testing as surveys regarding the solutions application in a production environment are not viable given the projects context*

| User     | Satisfaction | Feedback                                                                                                                                                                                                                                                                               |
| -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Amateur  | 7            | The Notelass has a nice design and worked fine once i was logged in but the way of logging in wasn't very easy and the Maths stuff in notes didn't make much sense but I wouldn't personally use it anyways.                                                                           |
| Novice   | 9            | I couldn't figure out the sign in, but I'm sure that can be fixed with some instructions. The actual note taking was super familiar to what I currently use and the integration with Compass was very useful.                                                                          |
| Advanced | 8            | The websites session id login works great as a way to protect user credentials, the integration for compass is seamless and everything loads very fast. I appreciate the support for markdown and LaTeX in notes, but i wish there was some form of key-binds to speed up my workflow. |
| **Mean** | 8            | -                                                                                                                                                                                                                                                                                      |

## Criteria Review
- [x] **Login Page**
	- [x] Single clearly labelled field for user to enter their compass session Id
	- [x] Login button located under the field for the user to validate their session Id and continue to app
	- [x] Clearly branded navigation bar with large format Notelass logo
	- [ ] Button on navigation bar to to access the documentation as a new user
	- [x] Home button available on navigation bar for already authenticated users to access the main website without logging in once again
	- [x] Minimal user interface identifiable as a tool for compass
		- [x] Similar colour scheme to compass
		- [ ] Interface arrangement to that of the compass LMS
- [x] **Home Page**
	- [x] Side Panel displaying commonly checked information from compass
		- [x] Panel Displaying the current days lessons 
		- [x] Lessons are clickable to open a new note
		- [x] Date can be incremented back / forwards to see other timetables
		- [x] Timetable is displayed sequentially
		- [x] Panel containing the users upcoming / recent learning tasks
		- [ ] Learning tasks display their due date as a reminder
		- [x] Panel for viewing recently edited notes
		- [ ] Recently edited notes display their date and subject
	- [x] Panels within the side panel can be toggled on and off by the user
	- [x] Navigation bar displays a sign out button at all times when authenticated
	- [x] Main content of the page displays a table with all of the users notes
	- [x] Notes can be sorted by date, lesson or subject
	- [ ] Notes can be filtered by subject or date
	- [x] Clicking on a note in the table opens it for editing by the user
- [x] **Editor Page**
	- [x] The editor is opened in a side by side view with the selected lesson plan
	- [x] The lesson plan is formatted correctly with all rich text style as in compass
	- [x] The plan panel is displayed in read only
	- [x] The lesson plan panel features a title displaying the subject and lesson date
	- [x] A user can toggle the lesson plan panel on and of while taking notes
	- [x] The main editor has live text formatting as the user types
	- [x] A menu bar is attached to the top of the editor at all times
	- [x] The bar has familiar buttons for the user
		- [x] Drop-down to save or delete a document
		- [x] Options to insert various headings or titles
		- [x] Formatting drop-down applies to selected text
	- [ ] Common key combinations can be used to apply formatting to text
	- [x] Markdown syntax can be used to format titles, text, lists, etc.
	- [x] A user can use LaTeX formatting within their notes
	- [ ] LaTeX is live rendered alongside common rich text / markdown
## Development Model

During the initial proposal of the development for my software solution I committed to a traditional waterfall development model with nested sprints in the design and development stages, a feature typical of the agile development model. This model, although chosen primarily to satisfy the assessment timeline of the project, proved quite beneficial through its iterative design and development, giving the scope and requirements of the project some level of flexibility during critical reviews. However some effectiveness is lost due to the models inherent focus on efficiency through its monolithic planning, drawing a clear path for development and testing with explicitly outlined tasks, the client may see large unexpected changes to requirements or scope of the project as they are adjusted leading into each stage of development. 