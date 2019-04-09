# Background

What problem are you trying to solve? What is the gravity of the problem? What is your solution to this problem?

I wanted an interactive map that is so simple, anyone can use it. The reason for this is that, most of the older 
generation has difficulty in using map applications and would require assistance. It would also be a good starting 
point for young people to start learning about map applications if they are so incilned. I wanted it to be like google 
maps where one can easily view the important bits of information provided by a database, but stripped of most features, 
and purely for that reason alone. I wanted for users to look at the information of a place, and if they find it interesting, 
have them easily save the location for future use. Its important that the UI is stripped to the bare minimum and not 
make it overly complex for the sake of the older generation and to those that are technologically challenged to, in a sense, 
be more inclusive.

# Methods

What workflows did you use? What build processes did you use? What tools did you use to ensure things like browser support and
support for different devices? What tech stack did you use? What deployment methods did you use

The project made use of GitHub for version control, Vue.js for creating the app, and Bootstrap CSS framework for its appearance.
As per the Vue.js website, Vue does not support IE8 and lower because of its use of ECMAScript 5 features that are un-shimmable
in IE8 and below. otherwise, it supports every ECMAScript 5 compliant browsers. 

My workflow is based on the waterfall method where every step of the waterfall is a feature. I complete a feature then move on 
to the next and so forth. Them it repeats for however may times it takes to achieve a satisfactory outcome. The first iteration would be to lay the groundwork for each feature I plan to implement, making changes along the way until the foundation is completely set with placeholders for every feature. This iteration is where the app has all the necessary functions I envisioned but aesthetically would look far from ideal but embodies what it will become. The next iteration would then be to flesh out each of the features until it reaches a presentable degree but not necessarily the ideal. This is where a feature is given an outward appearance that attempts to reach the ideal and also to iron out the internal codes for presentability and ease of use for a third-party. This is also where the use of GitHub for version control showed most of its value. It allowed for plenty of experimentation on each feature because of the time saved from not doing and redoing codes. Once thats done, the subsequent iterations will be to add to the app until it reaches the said ideal, and is ready for deployment.


# Implementation

You will explore:

Deployment to GitHubPages/Firebase
Real Time Databases (e.g. Firebase), and how data is structured
Design patterns
should be considered
Mapping and geolocation, what concepts did you use?
Progressive web applications (Advanced)
Unit Testing (Advanced)

The application has the following features:
* **Routing** - Implemented routing using the Vue router. This application has 3 views in total. The sign-in and sign-up view and the map application view itself. The map application view is the one that requires authentication to actually view by setting its meta data to require athentication to true. The sign-in and sign-up views are made from the same component but modified to fulfill different goals my modifying its appearance using props.
* **Navigation** - The navigation contains links that lead to the views they are named after. Initially, only the sign-up and sign-in views are available since the map view is not shown until a user is signed in. This is done using vue directives to manipulate how it appears based on the "truthiness" of an argument, as per the Vue cheat sheet.
* **Authentication** - Done with Firebase. Used only email and password authentication. Doing this made it so that only the authenicated users are able to view the map as said above. In addition to the user data in the vue instance, the project also made use of a separate JavaScript file to contain similar user data so that other components have access to it easily. The difference from the vue instance user data is that the one inside this separate JavaScript file cannot be directly tampered with. It requires a method set by the developer to change the data inside, making it a more reliable source. This is how the main JavaScript file for the app ascertaines if there is a user signed in before it proceeds to push the user towards the map application.
* **Error handling** - Error handling is present on all views but mostly implemented in the sign-in and sign-up views. Again, these are made using vue directives to show error messages depending on if the supplied argument returns true or false. The error data from the parent components are passed through props so it shows both local errors and parent errors.
* **Mapping** - The map itself is created using the vue2leaflet with tiles using a variation from Thunderforest specifically for transport which, is fitting since the Autoura API shows locations on the premise that the group is in some kind of automobile. The map made use of markers, icons, and popups to show and convey information to users. The data for the markers are taken from the Autoura API using Axios and is executed upon a button press. The location data is then transferred to both the result list component and the map component. The difference is, that the result list is a component used inside the search component to show a list of results therefore, allowing for easy transfer via props. The map component is a different component and is only connected to the search component because it resides in the same view. This would mean that if props are used, the search bar would have to emit the event to the parent view then, passes it onto the map component. To eliminate these extra steps, the concept of an event bus is used. It replicates a similar function to what vue has which, is Vuex but, as this application is only small scale, the event bus is used instead. The main function of the event bus is to emit events to any component and removes all the unnecessary codes for transferring data to components that are not child components.
* **Search component** - The search component requires two inputs from the user to best show them locations fit for their desires. The first being the group context which, describes the size of the company doing the sightseeing. The second input is to decide the stop type which, in summary, are the general category of a location such as food, accommodation, point of interest and so on. At the minimum, the stop type is required to show location results as the group context defaults to "friends", as per the documentation on the Autoura API, otherwise, it shows an error. The searh button upon click sends a GET request using Axios and makes use of the event bus to deliver data to the map component. Before sending, each data is mapped with new information for the purpose of enlarging the icon upon hovering a map marker's counterpart on the result list. These would be icon size and z-index. The icon size is used to change the size of the icon without hard coding it on each marker. The z-index is used to override its default value so that the hovered stop is at the very top for clarity's sake and also without hard coding. 
* **Result component** - This component shows a list of all location results of a search. It is a child component of **Search** and is supplied its location via props as said above. It also contains the code for the information cards for each location which, is created from the location data as well. 
* **Information cards** - The information cards contain only the relevant information from each location object to reduce bloat and information overload. It has three buttons in which, one is used to close the card. The other two are the "Find" and "Save" button. The "Find" button recenters the map and changes the zoom value to focus on the location represented by the card and the "Save" button saves the location address to a list accessible through a button in the navigation.
* **Location saving** - The data for the locations are stored in Firebase. Only authenticated users 
* **Event bus**
