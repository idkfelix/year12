## Development Model
The development model I chose for this project consisted of a traditional waterfall model with nested sprints in the design and development stages of the waterfall. This project effectively required the use of a waterfall model to meet assessment dates not possible with a spiral or agile development model due to their core focus on iterative design. The use of this model did suffer restrictions regarding the modification of project scope or requirements as waterfall development features large amounts of planning in the initial evaluation to boost efficiency throughout the project, however due to the fast changing nature of modern software development this proved counter productive throughout the development of my software solution as the clients requirements changed. Thankfully the proactive implementation of sprints throughout the design and development stages, split into three scopes of implementation identified in the initial client meetings, allowed for the required reduction in scope to the project by removing sprints, albeit still creating large unplanned modifications to the production timeline. 

Reflecting on this pitfall of the development model it can be seen the potential loss in effectiveness as the client received a software solution missing proposed requirements as a result of the reducing nature of the waterfall model, compared to the spiral development model that would be better suited to a project of this type as the scope expands throughout the project, allowing for more effective planning leading to an overall gain in efficiency, rivalling that of the waterfall model in perfect conditions.

Although a great deal of time was lost in redundant planning and adjustments to the project throughout the design and development stages, having the project clearly planned out from the initial proposal and only removing tasks from the project plan proved to benefit efficiency in the later stages of development as their related tasks could be easily anticipated and allocated a suitable time frame for completion.
## Key Changes
In discussion with the client throughout development the projects proposed revision tools involving the use of AI will be removed from the scope of the project. This change came as the school had updated to strict policy on the usage of artificial intelligence would have likely come in conflict with the extra functionality of the Notelass tool and therefore was not a change that could be compromised on to preserve the original scope of the project. However as discussed with the chosen development model for the software solution this change was corrected through the reduction of outlined sprints for the development stage. This has been reflected in the modified Gantt project plan.

A large deviation from the initial proposal discussed with the client related to routing requests from the client to the compass API through the websites server rather than have everything be a direct request from the client. This change was made to allow for SSR (server side rendering) to be implemented to provide the end user with a smoother overall experience with Notelass in addition to also allowing the software to comply the Compass API cross site request policy. 

Another critical change to the usage of the website that had to be implemented throughout the second sprint of development after contact with support at compass was a modification the login page to require a user to manually enter their session id for usage, so as to protect the users credentials in compliance with the education departments requirements and allow users to manually terminate old sessions from the compass website.
## Design References
![[Editor.png|500]]
## Development References

![[demo2.png|500]]

![[demo1.png|500]]
## Evaluation References
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