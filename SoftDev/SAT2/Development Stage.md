## Pictures
![[demo1.png|500]]
![[demo2.png|500]]
## Changes
In the process of developing my project for the client from the design to a fully functional website various compromises on the websites functionality had to be altered to ensure the best user experience. The main compromise that was discussed with the client is routing requests from the client to the compass API through the websites server rather than have everything be a direct request from the client. This change was made to allow for SSR (server side rendering) to be implemented to give the end user a smoother experience with Notelass in addition to also giving the project the ability to best comply the compass API cross site request policy. 

One critical change to the usage of the website that had to be implemented throughout the second sprint of the websites development after contact with support at compass was to modify the login page to require a user to manually enter their session id for usage, so as to protect the users credentials in compliance with the education departments requirements and allow users to manually terminate old sessions from the compass website.

The original outline for the project proposed using a dummy or test compass user for the use case and requirements testing to protect user data and privacy. However this practice has proven not possible as all users attendance data from compass is automatically sent to the education department and without the explicit preexisting  functionality to create dummy accounts within compass I have had to conduct testing of the product using my own credentials and therefore have retracted information in the test results for my own privacy.
## Testing

