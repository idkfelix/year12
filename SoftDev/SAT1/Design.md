# Design Criteria
| Description                                                                | Satisfactory |
| -------------------------------------------------------------------------- | ------------ |
| Login page design is minimal and intuitive with simple compass login form  |              |
| Documentation Page is accessible from the home page without login          |              |
| Each page shares same navbar with intuitive navigation                     |              |
| All authenticated pages share sidebar with important information           |              |
| Home page allows user to create, view and manage their notes               |              |
| Editor allows users to write markdown or use familiar rich text formatting |              |
| Editor page shows side by side editor and lesson plan                      |              |
| App shares similar theme and branding to compass interface                 |              |
| App uses icons to represent functionality where applicable                 |              |
| App interface shows all relevant data with minimal navigation              |              |
| App is not excessively verbose or complex for users                        |              |
# Designs
## Design 1
![[Alt.png]]

| Description                                                                | Satisfactory |
| -------------------------------------------------------------------------- | ------------ |
| Login page design is minimal and intuitive with simple compass login form  | X            |
| Documentation Page is accessible from the home page without login          | X            |
| Each page shares same navbar with intuitive navigation                     |              |
| All authenticated pages share sidebar with important information           |              |
| Home page allows user to create, view and manage their notes               | X            |
| Editor allows users to write markdown or use familiar rich text formatting | X            |
| Editor page shows side by side editor and lesson plan                      | X            |
| App shares similar theme and branding to compass interface                 |              |
| App uses icons to represent functionality where applicable                 | X            |
| App interface shows all relevant data with minimal navigation              |              |
| App is not excessively verbose or complex for users                        | X            |

## Design 2
![[Editor.png]]

| Description                                                                | Satisfactory |
| -------------------------------------------------------------------------- | ------------ |
| Login page design is minimal and intuitive with simple compass login form  | X            |
| Documentation Page is accessible from the home page without login          | X            |
| Each page shares same navbar with intuitive navigation                     | X            |
| All authenticated pages share sidebar with important information           | X            |
| Home page allows user to create, view and manage their notes               | X            |
| Editor allows users to write markdown or use familiar rich text formatting | X            |
| Editor page shows side by side editor and lesson plan                      | X            |
| App shares similar theme and branding to compass interface                 | X            |
| App uses icons to represent functionality where applicable                 | X            |
| App interface shows all relevant data with minimal navigation              | X            |
| App is not excessively verbose or complex for users                        | X            |
# Final Design
## Justification
Design 2 best fits the criteria discussed with the client. It provides a simplistic and intuitive interface for users and maintains a theme stylistically similar to the Compass website it will integrate with. Compared to design 1, design 2 better provides the user with all useful information and navigation on the websites sidebar minimising context switching and allowing for efficient note taking with the application. 
## Mockup
![[Login.png]]![[Home.png]]![[Editor.png]]
## Components
![[Components.png]]
## Data Dictionary
![[Data-Diagram.png]]
## Pseudocode
```
BEGIN
	*Save note in compass database with metadata*
	FUNCTION saveNote({content, title, lessonId, activityId})
		*Encode content to storable string*
		encoded <- base64Encode(content)
		*Make request to compass api with data to store*
		response <- POST(compassAPI -> saveData, {
			title,
			encoded,
			lessonId,
			activityId,
		})
		*Return response note id*
		RETURN response -> noteId
	END FUNCTION

	*Read note from compass to local client*
	FUNCTION readNote(noteId)
		*Make request to compass api with note id*
		response <- POST(compassAPI -> readData, noteId)
		*Extract data from response*
		data <- response
		*Convert encoded data to readable text*
		content <- base64Decode(data -> encoded)
		*Return note content and metadata*
		RETURN {
			data -> title
			content,
			data -> lessonId,
			data -> activityId,
		}
	END FUNCTION

	*User inputs note title and content*
	localTitle <- INPUT note title
	localNote <- INPUT note markdown content
	*User selects lesson to link note to*
	lesson <- SELECT lesson from schedule
	
	*Save note to compass*
	noteId <- saveNote({
		localTitle,
		localNote,
		lesson -> lessonId,
		lesson -> activityId,
	})

	*Retrive note from compass for viewing and editing*
	noteData <- readNote(noteId)
END
```

# Development Criteria
