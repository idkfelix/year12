# Introduction
Notelass is a note taking application that integrates with the LMS software 'Compass' commonly used among Australian secondary schools and students. The application allows students to take notes in class using markdown syntax and the LaTeX notation language within a real time WYSIWYG editor linked to each lesson instance within compass for easy organisation. Notelass additionally features tools for viewing class resources, upcoming tasks and a calendar of the users lessons.

As the user base of Compass and inherently Notelass is primarily composed of secondary school students the usability testing has been conducted on three students currently using compass with varying levels of self recognized technical literacy in order to cover the widest range of potential end users. To gather data from this testing observed completion of task and a short questionnaire have been utilized to time the execution of tasks, monitor user errors, judge perceived difficulty and measure user satisfaction with the application.
# Demographic
Tests were conducted on three fellow students with no prior knowledge of the application or its development, selected after a brief interview of their technical literacy and current note taking methodology. The tests were conducted within ten minute blocks individually within a quiet library space to allow for thorough observation and without assistance from other users.

Throughout the testing the participating users are referred to by their self recognized skill level, frequency of Compass use and current note taking methods:

| Name          | Technical Literacy                                                                                                                         | Current Note Taking                                                                    | Use of Compass                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Amateur User  | Rarely uses laptop or computer outside of school and mostly exclusively for web browsing and social media.                                 | Mostly pen and paper note taking, however occasionally uses google docs to take notes. | Basic viewing of lesson plans, uploading assignments and access of class resources                                          |
| Novice User   | Daily use of personal laptop or computer and self proclaimed proficient in Microsoft office word.                                          | Recently adopted Obsidian as a note taking application (markdown WYSIWYG editor).      | Often use of Compass website and mobile application for schedule, assignments and class information                         |
| Advanced User | Daily drives Debian based operating system for 4 years, casually develops programs with python and takes software development VCE subject. | Uses LaTeX language to generate PDF notes from the Vi / Vim editor.                    | Only uses compass website for assignment submission and access to class resources, uses synced calendar to access schedule. |
# Tasks
All participants were required to complete the following tasks representative of Notelass' core functionality and user interface throughout their usability testing:
- \[1] Login to Notelass using your session id from compass
- \[2] Open a new note for a lesson in your schedule from one week ago
- \[3] Write a note with two types of headings, a list and if familiar a latex equation
- \[4] View the selected lesson's associated lesson plan side by side to the editor
- \[5] Navigate to the home page before re-opening the previous note
- \[6] Delete the previously created note 

After observed completion / attempt of each of the outlined tasks the participant was required to complete a questionnaire with a multiple choice question about the difficulty of each task, an overall satisfaction score out of 10 for the applications usability and a written section for any addition feedback. The difficulty options provided were as follows:
- Easy (1)
- Moderate (2)
- Challenging (3)
- Difficult (4)
- Hard (5)
# Results
> \* indicates did not finish
## Difficulty

| Task #     | 1           | 2        | 3           | 4    | 5    | 6        |
| ---------- | ----------- | -------- | ----------- | ---- | ---- | -------- |
| Amateur    | 3           | 2        | 4*          | 1    | 2    | 2        |
| Novice     | 5*          | 1        | 3*          | 1    | 1    | 1        |
| Advanced   | 1           | 2        | 2           | 1    | 1    | 2        |
| **Mean**   | 3           | 1.67     | 3           | 1    | 1.34 | 1.67     |
| **Rating** | Challenging | Moderate | Challenging | Easy | Easy | Moderate |
Overall the most difficult task for users to complete was the sign in with a session id as most users would not be familiar with the process of getting a session id from a websites cookies. The Novice user did require some assistance to complete this task in order to complete the remaining testing. Additionally the rating for the note styling task was quite high as all besides the advanced user were not familiar with the LaTeX language and had to skit over that section of the task. These indicated that further tool tips and instructions will be required within the applications user interface.
## Time Taken

| Task #   | 1      | 2      | 3      | 4   | 5     | 6   |
| -------- | ------ | ------ | ------ | --- | ----- | --- |
| Amateur  | 53s    | 29s    | 95s*   | 5s  | 22s   | 34s |
| Novice   | 114s*  | 22s    | 63s*   | 7s  | 14s   | 15s |
| Advanced | 24s    | 32s    | 41s    | 3s  | 16s   | 29s |
| **Mean** | 63.67s | 27.67s | 66.34s | 5s  | 17.34 | 26  |
The time taken on the first task further reinforces the need to add some extra instruction to this step as indicated from the mean although two of the three users were able to complete the task it still required an average of 63.67 seconds to figure out. Besides this the rest of the time recorded for each task across the board shows the application being fast and simple to use in accordance with the project requirements. 
## Observations

| Task #   | 1                                                                                                                                                                                                      | 2                                                                                                                                           | 3   | 4   | 5   | 6   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | --- | --- | --- | --- |
| Amateur  | took a short time to understand what the input field required but was able to locate the session id on their own and submit the login form, this is potentially the case from their heavy browser use. | user took some time navigating through their daily schedule to find a class to open a new note for, but knew how to navigate through dates. |     |     |     |     |
| Novice   | user was not able to complete the task on their own after 90s and required assistance with the login process to continue with testing                                                                  | user took some time navigating through their daily schedule to find a class to open a new note for, but knew how to navigate through dates. |     |     |     |     |
| Advanced | user immediately understood the required input for login and fetched their session id from compass to fill out the form.                                                                               | user took some time navigating through their daily schedule to find a class to open a new note for, but knew how to navigate through dates. |     |     |     |     |

