# Introduction
## Project Description
Notelass will be a tool for students at Mullauna College to efficiently and effectively take organised notes for their classes and provide revision tools for students to retain and apply information from their notes. The solution will seamlessly integrate with the schools current online management software, Compass, this will allow students to attach notes to subjects and classes for easy organisation, view class resources within the tool to avoid context switching hindering the users train of thought and store all user generated data within Compass to ensure proper security.
# Client
## Details
Name: Joel Porter
Position: System Admin
Company: Mullauna College
## Needs
Currently Mullauna College has no standard system for note taking or revision, leaving students to implement their own systems or adopt various products not specifically designed for an education environment.
## End User
Notelass is primarily intended to be used by VCE students at Mullauna College as they will gain the most value from the product, however its design will make it accessible to all students at the college.
# Project Scope
## Includes
## Excludes
## Operating Environment
# Requirements
## Constraints

| ID  | Type         | Notes                                                  |
| --- | ------------ | ------------------------------------------------------ |
| PC1 | Economic     | Time available for the project is 24 weeks             |
| PC2 | Economic     | Project should only utilise free products and services |
| PC3 | Technical    | Needs to be easy to deploy as an instance              |
| PC4 | Availability | Must run in a serverless enviroment                    |
| PC5 | Legal        | End User will have full control of their data          |
| PC6 | Technical    | Runs without any errors or bugs                        |
| PC7 | Social       | Easy and Intuitive to use for a student                |
## Functional

| ID   | Requirement                                        | Notes                                                                                                              |
| ---- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| FR1  | User can login with Compass                        | Login page makes request to Compass to authenticate details and returns user details in a JWT for further requests |
| FR2  | Only authenticated users can access tools and data | JWT verification on all routes to only be used by authenticated users                                              |
| FR3  | Unauthorised users can access documentation        | Open route for viewing documentation that allows unauthenticated users                                             |
| FR4  | Requests to compass API are authorised             | Compass API requests are properly authenticated with data from the JWT without errors                              |
| FR5  | Functional note editor with markdown and LaTeX     | WYSIWYG editor works seamlessly live rendering markdoen                                                            |
| FR6  | Notes are stored in and retrieved from Compass     |                                                                                                                    |
| FR7  | Class resources can be viewed                      |                                                                                                                    |
| FR8  | Notes can be filtered by class, date and period    |                                                                                                                    |
| FR9  | User can view upcoming tasks from Compass          |                                                                                                                    |
| FR10 |                                                    |                                                                                                                    |