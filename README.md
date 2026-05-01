# CS208 Full Stack Final Project - Donut Shop Application

- Name: Evan Bullwinkle
- GitHub: [https://github.com/Mogi83](https://github.com/Mogi83)
- Term: Spring 2026

## Project Description

This is my full-stack application for CS208, built with node.js. I built a web
application for a small donut shop that allows users to view and order donuts
online. The application uses Express for the backend and MariaDB (MySQL) for the
database. Please read the following instructions carefully because some of the
setup only needs to be done once.

## Setup:

Note this is a brief setup instructions. A more in depth set of instructions can be read at ./docs/SETUP.md

### Install the Database

To set up the database, run the `install_db.sh` script in the setup_scripts
directory. This script will install MariaDB and start the server running. You
only need to run this script once per Codespace.

```bash
./setup_scripts/install_db.sh
```

### Create the Database Tables

Create the initial tables by running the following command:

```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

### Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### Run the Application

Start the application using the following command:

```bash
npm start
```

### Access the Application

On Codespaces, you can access the application by forwarding port 3000. Open the
forwarded port in your browser to view the application. If running locally visit
http://{your local ip}:3000/


## Design Decisions
Each page was carefully designed to fit client specifications and for the most part inline with the inital hand drawn project mockups. 
You can view the mockups in ./mockups to see how the design stayed true to form. In terms of a few specific design elements made, I think
the following are the most notable:

### Interactive Unlocking Splash Screen

I built a custom splash screen that takes the clients logo and upon swiping the page upwards (with a mouse or finger) or holding spacebar (for accessiblity) 
will do an unlocking animation before revealing the site underneath. I did not plan for this in the mockups but when I reviewed the project files and saw 
their logo it seemed like a good way to make the website have a interactive and modern feel. 

### Simple boxes methodology (Card-based UI)

Throughout the development of each page, I chose a "card-based" layout using rounded corners and subtle drop shadows. This methodology was selected because
it mirrors the clean, intuitive feel of modern mobile applications. This choice allows for a robust and flexible design that can house various content types
as seen on the menu page, and testimonial page.

### Swipe-ability
On the Story page, I made a very satisfying swiping image to scrub from past to present. This design choice was made as a responsive way to present the information 
and reminds me of popular app design concepts. While I am proud of the technical handling of this page, its design in my opinion is the least interesting. 

## Edgecase handling

- What happens if the server/API is unreachable? (The UI should display a friendly message, not break.)
    A js alert box pops up informing the user that the comment system is unavailable. 

- What happens if a user submits a comment with only whitespace?
    The user is restricted from posting a whitespaced comment.

- What happens if a user submits extremely long input (e.g., 10,000 characters)?
    The user can only post a review up to 500 characters. A longer review would not get submitted.

- What happens if the user rapidly double-clicks the submit button?
    The button is disabled after the first submit click until submission is completed regardless of the sucess of that submission. It is then renabled after.

## Challenges and Learnings

During development (commits b7377d7 and 6039f6f) I was fighting a phantom nav bar gap that I could not for the life of me figure out what line of CSS was causing the gap. 
In the b7377d7 commit I didn't even realize I still had a nav bar issue for the next 3 commits. I tried going line by line in my pug. Tried removing any css call alltogether.
Tried reseting margins and padding to no avail. What ended up working was realizing that I had made my nav bar twice. Once in my layout.pug and in index.pug, and the gaps
were coming from a rogue CSS tag that I mistakenly applied in the wrong order of appearance.

I ran into small challenges throughout development but I wanted to use my other technical bullet to talk a bit about overall learning I had now that I am at the end of the
project. Right off the bat there are somethings I would absolutely do differently:

- Build my own database setup script. I currently have very little understanding of how my database works outside of the additions I made for the comment system. 

- Reuse more CSS. As of writing this project is 34.1% CSS which all lives in one singular file. I considered making individual CSS files for each page but this felt at the
time like a silly option. In reality I wrote every piece of CSS for each page (except *some* overlap in index and testimonials) standalone and it was a poor choice.

- Missing a dark mode. Early in the project I intended on using the green/gold color pallete for a site wide dark mode but never got around to implementing it.

- Code consistency. This project was not *entirely* vibe coded but significantly so. I solved the bugs, asked for feedback, and used AI as a tool not a shortcut.This however 
has left some code quality artifacts that I am not necessarily proud of. I suppose no single page on the web is truly perfect but I could have spent more time refactoring
AI code.

- Unnecessary hardcoding. I would have preferred to make the menu items and their prices database objects but doing so would require a login and auth system which is out of scope in my opinion.

- Using more prebuilt things. I absolutely had the option to use premade designs and widgets but opted against it instead suffering against my own code when I could have spent more time
with the design and polish of the website.

## Citations

Google Gemini

Images:
- Homepage:
    - Image 1: Nick Souza https://www.pexels.com/photo/close-up-of-donuts-in-a-bakery-24960960/

- Our Story 
    - Image 1: https://www.flickr.com/photos/southbeachcars/15779992015
    - Image 2: https://commons.wikimedia.org/wiki/File:Dunkin%27_Donuts_products_at_a_shop_in_Taiwan_20120505.jpg 