# Unifolio (Fall 2025 CS180 Project) - Resume Generator with Linkedin

## Presented by Team A.B.A.A.

#### Members:

- Aryan Tah
- Benedict Ignacio
- Advaith Tontalapur
- Arjun M

## Guide

app/
api/ # For API routes using Next.js Route Handlers
lib/ # For shared utilities and services
services/ # Business logic and service layer
db/ # Database connections and models
utils/ # Helper functions
types/ # TypeScript type definitions

## Architecture and Design

#### Model-View-Controller Architecture

The main architectural pattern we are modeling Unifolio after is Model-View-Controller. Below is an example of how the MVC design interacts with our system when a user wants to generate a resume.

<img width="501" height="271" alt="ModelViewArchitecture drawio" src="https://github.com/user-attachments/assets/73b6f35a-43b9-477c-a4a1-ee320c932d42" />

As mentioned in our project proposal, one main feature we want to implement within Unifolio is being able to automatically generate resumes based on the user info found within their LinkedIn and GitHub profiles. Once a user fills out all the information they are willing to provide for their resume, they request the app to generate a resume. Here, the controller will fetch their information from the app’s database. The model module will help with sorting the information by relevance. Then, the controller can send all that sorted info to the view module, where it will work on formatting the resume information accordingly and display it to the user.

In general, this is the kind of procedure that will be performed by the MVC design once a user requests something. The most involved a user will have to be while interacting with Unifolio is adding (or autofilling) their resume information onto our website. Here, the controller will take all the user input and send it to the model module, where it will be parsed, sorted, and put into resume “sections”.

#### UML Class Diagram

The class diagram below describes how user information will be represented and used within Unifolio’s model module. It is also important to note that this is a high-level representation of the data, and is also subject to change as we add more features to Unifolio.

<img width="1331" height="598" alt="CS180 Class Diagram drawio (2)" src="https://github.com/user-attachments/assets/d56baffe-7089-4513-a305-4f6d737430f2" />

Here, the Unifolio database will contain all user information, including login info, passwords, and their resume information. Each user will have exactly one resume object to hold all their information (though different resumes may be generated from this object due to wanting to prioritize certain info over others). The resume class itself is made up of three components: the Header, the Sections, and SkillTypes. 
- The Header will work with basic identifying info, contacts, and links to a user’s profiles. 
- The Section class is a general (but not abstract) class that contains the section title and associated Listings. The Listing is also a general class that specifies its title, start and end dates, and descriptions.
- The SkillType is a special part of the resume that can hold a list of associated skills. The resume itself holds a vector of SkillTypes that make up the Skills section of any typical resume.
- Another detail to mention is the Education class, which inherits from Listing but also includes academic information such as the degree, major, and GPA.

One issue to address while handling user data is figuring out how to create instances of these classes. This is where the Builder design pattern comes into play. When we obtain a user’s LinkedIn data, we cannot assume that all the possible sections are filled out. Not everyone will have all the info, not to mention that the quality of user’s profile data varies drastically. We must ensure that Unifolio can create the appropriate sections of the portfolio/resume without having to write every single possible constructor method.

#### Use Case Diagram

Below is a use case diagram that describes how Unifolio works from a user’s perspective.

<img width="631" height="687" alt="CS180 Use Case Diagram drawio" src="https://github.com/user-attachments/assets/1721cb1c-dbf6-4ed5-aa4c-54369b493d44" />

A user can sign-up, login, add resume information (using the app’s form), and generate a resume. The sign-up feature involves adding and linking user’s profiles. Unifolio also enhances adding resume information by including autofilling from user data. Finally, generating the resume comes with PDF downloading, sorting info, and resume customization.

## Testing Scenario

Testing our web app in its entirety comes with several complications, including having to rely on obtaining user information in order to generate resumes. To simplify things, we plan to unit test with dummy data first, then integrate user inputted data as we finish the front-end of the application.

Although we will be using dummy data for unit testing, we must also make sure to account for varying cases. As mentioned earlier while describing the design of Unifolio, the quality and content of user data is not uniform. For example, one user could have an Achievements section (created as a general Section object), and another user could have an Extracurriculars section. Although we mostly account for different sections by generalizing Section objects, there could be listings that don’t have an end date, or descriptions of varying quality (and keywords), not to mention bad input.

The general plan for writing test cases for Unifolio will be to start from the simplest units and work our way up. In this case, Listing tests will come before Section tests, which will come before Resume tests, and so on. For each class, we can write a typical case, a fringe case, and then edge cases. Because we have a clear hierarchy of objects, making sure that unit tests for smaller objects pass is essential.

## Additional Notes

During our development process, one major problem we encountered was finding a way to scrape data from user’s LinkedIn profiles directly. The solution we plan to implement is to integrate a “Sign in with LinkedIn” feature, as well as build a form within our web app that can be autofilled with the info from a user’s profile. Making a form to add resume information directly on our app also allows users to generate resumes even if they don’t have a LinkedIn or GitHub account. This extra step also allows users to verify that the info that they put in is correct.

Finally, as mentioned in our proposal, our implementation process prioritizes having our minimum viable product done first, then moving on to quality-of-life features. We expect to update our UML and use case diagrams as we expand the amount of features we have.
