# Background

This project covers the creation of an interactive map provided by Leaflet that shows available locations around the United Kingdom related to food acquisition taken from the Autoura API. The features to be included are as follows:

* Interactive map - Provided by [Leaflet](https://github.com/KoRiGaN/Vue2Leaflet) with map tiles coming from [Thunderforest](https://www.thunderforest.com/maps/transport/)
* Account creation
* Account log in
* Inter


generation has difficulty in using map applications and would require assistance. It would also be a good starting
point for young people to start learning about map applications if they are so inclined. I wanted it to be like google
maps where one can easily view the important bits of information provided by a database, but stripped of most features,
and purely for that reason alone. I wanted users to look at the information of a place, and if they find it interesting,
have them easily save the location for future use. It is important that the UI is stripped to the bare minimum and not
make it overly complex for the sake of the older generation and to those that are technologically challenged to, in a sense,
be more inclusive.

# Wireframe for Version 1

![Wireframe](https://github.com/ralgr/autora-a1/blob/master/dsasdawearqwasda.PNG)

# Methods

## [Version 1](https://github.com/ralgr/autora-a1)

## [Version 2](https://github.com/ralgr/a-better-autoura)


## General Information
There are 2 versions of the app created for this project. The workflows for both instances are based on the waterfall method where every step of the waterfall is a feature. Each feature is worked upon until it reaches completion before moving to the next while, fixing compatibility issues in between.

Version 1 made use of GitHub for version control, Vue.js for creating the app, and Bootstrap CSS framework for the appearance. Both apps were created using the Vue CLI-3, however, Version 1 used the default creation options, meaning there is no PWA support and VueX. It did, however, made use of the Vue Router. Version 2, in addition to making use of the Vue Router, is created with PWA support for offline functionality and VueX enabled for the app to have a centralized store to make it easier for components to use data. As per the Vue.js website, Vue does not support IE8 and lower because of its use of ECMAScript 5 features that are un-shimmable in IE8 and below. Otherwise, it supports every ECMAScript 5 compliant browsers. To ensure the ideal appearance is achieved on different devices, Version 1 made use of Bootstrap classes to make each page adhere to Responsive Web Design. Version 2 made use of Vuetify to achieve this goal and made it easier to implement overall than Bootstrap.

For the app itself, Axios was used to consume the Autoura API and make use of the data to create a result list and to build map markers. The map markers are part of the map component for both versions which, used Leaflet. The result list as mentioned above, is available on both versions and clicking a result will open a card that contains more data on the clicked result. The card for the said result also displayed an image of the location. The source for this image came with every data from the Autoura API and displaying this image required Cloudinary-vue to be used.

Both Versions also has authentication and save features. The authentication feature used Firebase to create user and sign them in. Currently, both versions only support Username/Password authentication. The saving feature is available on both versions but is more functionally ideal in Version 1 as, Version 2 is currently unfinished due to time restrictions. To explain further, Version 1 requires an authentication to view the Map component and the save feature as, it is tied to the map component. This makes saving allowed only if a user is signed in. The saving feature itself saves the location details and the user who made the saving action. Doing this allowed for the save list to show only the saved locations of the current user by filtering the data.  The complication of filtering the save results depending on the user stems from the use of VueX. The filtering method depends on a user variable in the store, which is populated asynchronously, therefore it requires time to show the actual user signed in. The actual Firebase call to the database to populate the array in which the save list will use to create the saved data is in the Mounted lifecycle hook. This creates a bug where the database call uses the previous data inside the user variable in the VueX store to filter the results, thereby showing the saved locations by the previous user.

## Summary
Version 1 made use of:
* Bootstrap - For the appearance of components and their responsiveness for multiple devices.

Version 2 made use of:
* PWA support - For offline functionality.
* VueX - For a centralized store.
* Vuetify - For the appearance of components and their responsiveness for multiple devices.

Both versions made use of:
* GitHub - For version control.
* Vue and Vue CLI version 3.x - To create the app with the option for VueX and PWA support.
* Vue Router - To mimic multi-page applications and show different component "Views" depending on the route.
* Axios - For consuming the Autoura API
* Cloudinary-vue - For the images that come with the data inside the Autoura database.
* Firebase - For authentication and storage of data.
* Leaflet - For the map application

# Implementation

Version 1 features:
* **Routing** - Implemented routing using the Vue router. This application has 3 views in total. The sign-in and sign-up view and the map application view itself. The map application view is the one that requires authentication to view by setting its meta data to require authentication to true. The sign-in and sign-up views are made from the same component but modified to fulfil different goals my modifying its appearance using props.
* **Navigation** - The navigation contains links that lead to the views they are named after. Initially, only the sign-up and sign-in views are available since the map view is not shown until a user is signed in. This is done using vue directives to manipulate how it appears based on the "truthiness" of an argument, as per the Vue cheat sheet.
* **Authentication** - Done with Firebase. Used only email and password authentication. Doing this made it so that only the authenticated users can view the map as said above. In addition to the user data in the vue instance, the project also made use of a separate JavaScript file to contain similar user data so that other components have access to it easily. The difference from the vue instance user data is that the one inside this separate JavaScript file cannot be directly tampered with. It requires a method set by the developer to change the data inside, making it a more reliable source. This is how the main JavaScript file for the app ascertains if there is a user signed in before it proceeds to push the user towards the map application.
* **Error handling** - Error handling is present on all views but mostly implemented in the sign-in and sign-up views. Again, these are made using vue directives to show error messages depending on if the supplied argument returns true or false. The error data from the parent components are passed through props so it shows both local errors and parent errors.
* **Mapping** - The map itself is created using the vue2leaflet with tiles using a variation from Thunderforest specifically for transport which, is fitting since the Autoura API shows locations on the premise that the group is in an automobile or similar mode of transportation. The map made use of markers, icons, and popups to show and convey information to users. The data for the markers is taken from the Autoura API using Axios and is executed upon a button press. The location data is then transferred to both the result list component and the map component. The difference is, that the result list is a component used inside the search component to show a list of results therefore, allowing for easy transfer via props. The map component is a different component and is only connected to the search component because it resides in the same view. This would mean that if props are used, the search bar would have to emit the event to the parent view then, passes it onto the map component. To eliminate these extra steps, the concept of an event bus is used. It replicates a similar function to what vue has which, is Vuex but, as this application is only small scale, the event bus is used instead. The main function of the event bus is to emit events to any component and removes all the unnecessary codes for transferring data to components that are not child components.
* **Search component** - The search component requires two inputs from the user to best show them locations fit for their desires. The first being the group context which, describes the size of the company doing the sightseeing. The second input is to decide the stop type which, in summary, are the general category of a location such as food, accommodation, point of interest and so on. At the minimum, the stop type is required to show location results as the group context defaults to "friends", as per the documentation on the Autoura API, otherwise, it shows an error. The search button upon click sends a GET request using Axios and makes use of the event bus to deliver data to the map component. Before sending, each data is mapped with new information for the purpose of enlarging the icon upon hovering a map marker's counterpart on the result list. These would be icon size and z-index. The icon size is used to change the size of the icon without hard coding it on each marker. The z-index is used to override its default value so that the hovered stop is at the very top for clarity's sake and without hard coding.
* **Result component** - This component shows a list of all location results of a search. It is a child component of **Search** and is supplied its location via props as said above. It also contains the code for the information cards for each location which, is created from the location data as well.
* **Information cards** - The information cards contain only the relevant information from each location object to reduce bloat and information overload. It has three buttons in which, one is used to close the card. The other two are the "Find" and "Save" button. The "Find" button re-centres the map and changes the zoom value to focus on the location represented by the card and the "Save" button saves the location address to a list accessible through a button in the navigation.
* **Location saving** - The data for the locations are stored in Firebase. The database is set up so that only authenticated users can save by modifying the rules in Firestore. Saving a location stores its name, address, and its latitude and longitude. To sort out the saved locations for each user, saving also sends in the user email so that only the locations saved by the user is shown. The save lists contain information cards for each location that shows the information said above excluding the username and the latitude and longitude. On this card, there are two buttons where one is used to delete the card and the data on Firestore. The other button is like the "Find" button on the information cards on how it centres the map to the location using the stored coordinates.

# Reflections

## Version 1
I had originally wanted to have the search component and the result list component as separate from each other with the idea that each can be placed wherever in the screen and still be connected. The problem comes when I wanted a feature where upon clicking a location on the result list, the information card would pop up. Transferring the data was possible albeit, a bit long winded. However, I did not have a way for the event to be detected on the result list to open the information card. Initially, the solution I came up with is to emit the event to the parent component, store the data, then pass it on as a prop. Afterwards, I used watch to watch for the changes in props to trigger the information card. It worked but, only once on each location and if a user opened the information card of the same location again, it would not work. This is because watch detects a change before doing anything, therefore, opening the same information card twice using this method would fail as there would be no change on the data inside the prop to trigger it. It does work if another location is selected, however, but this is not how I wanted the application to behave.
To counter this, I tried to create a store, like the store for containing the user state for other components but, for the selected location in the result list instead and build the information card off of it. This provided to  be futile, as my attempts to use the information stored within was met with errors I failed to understand. Then, I gave up on the original idea of having the search and result list components as separate and made the result list a child component of search instead, as this way, it would be more straightforward to detect the event. As I was working towards this solution, I remembered what I learned when I studied the beginner course of the Vue website called the Event Bus. Initially, I dismissed this bit of information as it sounded like how the user state store and thought that it was the Event Bus which, as it turned out, I was misremembering some bits. This mishap of information was mostly because I understood the Vuex description stated on the Vue website that Vuex is like a combination of the "store" method and the Event Bus which, stated that using Vuex would allow every component to access data as it is only in one data pool and would have a function similar to the Event Bus for bigger and more complex applications. For smaller applications, the Event Bus is a viable technique for circumventing this problem. Thus, I used the Event Bus but left the result list as a child of the search component as, at this point, there is no real reason for them to be separate.

## Version 2
This version was created as an upgrade to Version 1. Due to time limitations, it was left unfinished but is mostly functional. I would have liked to fix the bug stated above by trying to put the database call for the save list on the VueX store to only be fired after the user variable is repopulated with new data. I think this would work because of how actions are suited for asynchronous task. Another problem which could have been solved with more time is the save function's appearance. Currently, its appearance is not ideal for any device size and could have been fixed with a bit more tweaking. Other than that, however, Version 2 improved upon the features presented in Version 1. Finally, the navigation bar component could have been better by separating some features into new components as currently, even the save list resides in this component.
