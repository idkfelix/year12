## Pictures
![[demo1.png|500]]
![[demo2.png|500]]
## Changes Journal
In the process of developing my project for the client from the design to a fully functional website various compromises on the websites functionality had to be altered to ensure the best user experience. The main compromise that was discussed with the client is routing requests from the client to the compass API through the websites server rather than have everything be a direct request from the client. This change was made to allow for SSR (server side rendering) to be implemented to give the end user a smoother experience with Notelass in addition to also giving the project the ability to best comply the compass API cross site request policy. 

A critical change to the usage of the website that had to be implemented throughout the second sprint of the websites development after contact with support at compass was to modify the login page to require a user to manually enter their session id for usage, so as to protect the users credentials in compliance with the education departments requirements and allow users to manually terminate old sessions from the compass website.

The original outline for the project proposed using a dummy or test compass user for the use case and requirements testing to protect user data and privacy. However this practice has proven not possible as all users attendance data from compass is automatically sent to the education department and without the explicit preexisting  functionality to create dummy accounts within compass I have had to conduct testing of the product using my own credentials and therefore have retracted information in the test results for my own privacy.

After discussion with the client the projects proposed revision tools involving the use of AI will be removed from the scope of the project. This change comes as the schools updated strict policy on the usage of artificial intelligence will likely come in conflict with this extra functionality of the Notelass tool and therefore is not a change that can be compromised on to preserve the original scope of the project. However due to my software development methodology's integration of an agile workflow throughout design and development this reduction has been easily corrected for in earlier sprints.
## Updated Evaluation Criteria
*The following evaluation criteria has been documented after further discussion with the client following the aforementioned changes to the projects design and development.*

- [ ] **Login Page**
	- [ ] Single clearly labeled field for user to enter their compass session Id
	- [ ] Login button located under the field for the user to validate their session Id and continue to app
	- [ ] Clearly branded navigation bar with large format Notelass logo
	- [ ] Button on navigation bar to to access the documentation as a new user
	- [ ] Home button available on navigation bar for already authenticated users to access the main website without logging in once again
	- [ ] Minimal user interface identifiable as a tool for compass
		- [ ] Similar color scheme to compass
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
	- [ ] The lesson plan is formate