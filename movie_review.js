// Name : Thiri Lae Win
// Class: DDCITP/1A/04
// Adm  : 2340739

var input = require("readline-sync");

//to validate the user's name which would allow only alphabets and numbers.
const nameRegex = /[^a-zA-Z0-9]/;


//class made for the existing movies

class Movie {
    constructor(name, genre, runningTime, releaseDate, rating) {
        this.name = name;
        this.genre = genre;
        this.runningTime = runningTime;
        this.releaseDate = releaseDate;
        this.rating = rating;
    }

    //creating a class method called "detail" which would return the movie details as in display.

    detail() {
        //Name and Genre will appear.
        console.log("Name\t\t: " + this.name);
        console.log("Genre\t\t: " + this.genre);

        //For running time, if...else is used to make sure the output does not show unnecessary parts. 
        // The hour part is hidden if the movie is a few minutes long.
        // The minute is hidden if the movie is 2 or 3 hrs sharp long. 
        // And the last part is the normal running time displayed. 

        if (Math.floor(this.runningTime / 60) == 0) {
            console.log("Running Time\t: " + this.runningTime % 60 + "m")
        } else if (this.runningTime % 60 == 0) {
            console.log("Running Time\t: " + this.runningTime / 60 + "h")
        } else {
            console.log("Running Time\t: " + Math.floor(this.runningTime / 60) + "h " + this.runningTime % 60 + "m")
        };

        //Release Date;
        console.log("Release Date\t: " + this.releaseDate);

        // this is for the rating;
        // this.rating[0] = number of users who have rated;
        // this.rating[1] = total rating;
        // total rating is divided by number of users to get the rating of the movie. 
        // if there is no rate given, the number of user will be zero and so as the rate;
        if (this.rating[1] == 0) {
            console.log("Rating\t\t: " + this.rating[1] + " (" + this.rating[0] + " voters)")
        } else {
            const ratingValue = this.rating[1] / this.rating[0];
            console.log("Rating\t\t: " + ratingValue.toFixed(1) + " (" + this.rating[0] + " voters)");
        }
    }
}

// creating objects

const movie1 = new Movie("Black Panther: Wakanda Forever 2022", "Adventure, Action, Drama, Fantasy, Sci-Fi, Thriller", "161", "11 Nov 2022", [9, 42]);
const movie2 = new Movie("Avatar: The Way of Water", "Adventure, Sci-Fi", 192, "16 Dec 2022", [4, 15]);
const movie3 = new Movie("Fast X", "Crime, Action, Mystery, Thriller", 43, "19 May 2023", [28, 60]);
const movie4 = new Movie("Ant-Man and the Wasp: Quantumania", "Adventure, Action", 120, "16 Feb 2023", [18, 80]);
const movie5 = new Movie("M3GAN", "Horror, Mystery, Thriller", 102, "6 Jan 2023", [20, 70]);

// creating an array for the genre;
var genre = new Array("Action", "Adventure", "Crime", "Drama", "Fantasy", "Horror", "Mystery", "Sci-Fi", "Thriller");


// creating an Array to make the loop;

let movieList = new Array();
movieList.push(movie1);
movieList.push(movie2);
movieList.push(movie3);
movieList.push(movie4);
movieList.push(movie5);

//genreList shown using a for...loop;
var genreRegex = /^[1-9](, [1-9])*$/;
var genre = new Array("Action", "Adventure", "Crime", "Drama", "Fantasy", "Horror", "Mystery", "Sci-Fi", "Thriller");
var genreList = "";
for (var a = 0, b = 1; a < genre.length, b <= genre.length; a++, b++) {
    genreList += "\t" + b + ") " + genre[a] + "\n";
}

// do...while loop for the user to enter the name and nameRegex is used here to validate;

do {
    var userName = input.question("Welcome to Silver vintage Movie Review Program\nPlease enter you name: ");
    if (nameRegex.test(userName) || userName == "") {
        console.log("\nPlease enter the valid username.\nThank you.\n");
    }
} while (nameRegex.test(userName) || userName == "");

console.log("\n");

// userChoice starts from here. 

// validating the user input as it have to be the number (1 to 6 inclusive) only. 
do {
    var userChoice = input.question("Hi " + userName + ", please select your choice: \n\t1. Display All Movies\n\t2. Add Movie\n\t3. Add Rating\n\t4. Lastest 3 Release Date\n\t5. Filter by Genre\n\t6. Exit\n\t>> ");
    console.log("\n")
    if (userChoice < 0 || userChoice > 7 || userChoice == "" || isNaN(userChoice) || userChoice.includes(".")) {
        console.log("Please enter a valid input.");
        console.log("\n");

        // the user's choice to display the whole movie list.;
        // 1 = Display All Movie;

    } else if (userChoice == 1) {

        for (var i = 0; i < movieList.length; i++) {
            movieList[i].detail();
            console.log("\n");
        }

        // to add new movie. 
    } else if (userChoice == 2) {
        // this variable is declared to ma
        var isMatch;

        // creating a new movie object just like the previous movies.
        var userInput = new Movie();

        do {
            userInput.name = input.question("Please enter Movie's name: ");
            // changing the movie's name into lower case 
            userInput.name = userInput.name.toLowerCase();

            // some() method is used to go through all the movie names in the array to check.;
            // both new movie and previous movies are changed into lowercase; 

            isMatch = movieList.some((Movie) => Movie.name.toLowerCase() == userInput.name);
            if (isMatch) {
                console.log("Please enter a unique movie name!");
                console.log("\n");
                endloop = true;
            } else {
                endloop = false;
                var genreNumbers = [];
                var uniqueGenres = new Set();
                do {
                    userInput.genre = input.question(console.log("Please enter Movie's genre: \n" + genreList + "\t>> "));
                    genreNumbers = userInput.genre.split(", ").map(numStr => parseInt(numStr));
                    uniqueGenres = new Set(genreNumbers);
                    if (!genreRegex.test(userInput.genre) || uniqueGenres.size != genreNumbers.length) {
                        console.log("Please enter valid genre option(s)\n");
                        console.log("( in this format: 1, 2, 3, ... )\n")
                    }

                } while (!genreRegex.test(userInput.genre) || uniqueGenres.size != genreNumbers.length);
                userInput.genre = genreNumbers.map(num => genre[num - 1]);
                userInput.genre = userInput.genre.join(", ");
                do {
                    userInput.releaseDate = input.question("Please enter Movie's release date: ");
                    if (userInput.releaseDate == "") {
                        console.log("Please enter the release date.\nThank you.")
                    }
                } while (userInput.releaseDate == "");
                do {
                    userInput.runningTime = input.question(console.log("Please enter Movie's running time(mins): "));
                    if (isNaN(userInput.runningTime) || userInput.runningTime < 10 || userInput.runningTime > 300) {
                        console.log("Please enter valid running time!\n")
                    }
                } while (isNaN(userInput.runningTime) || userInput.runningTime < 10 || userInput.runningTime > 300);
                //this is default for rating of the newly added movies.
                userInput.rating = [0, 0];
            }

        } while (endloop);
        // here the loop for userChoice 2 has ended. and the movie details that the user has been entered are put into a movieList.
        movieList.push(userInput);

    } else if (userChoice == 3) {
        //function made for movie names;
        function movieNameList() {

            for (var i = 0, j = 1; i < movieList.length, j <= movieList.length; i++, j++) {
                console.log(j + ") " + movieList[i].name);
            }
        }

        do {
            console.log("Select the movie to rate: ");
            movieNameList();
            console.log(movieList.length + 1 + ") Back to Main Menu")
            var movieSelection = input.question(">> ");
            if (isNaN(movieSelection) || movieSelection < 1 || movieSelection > (movieList.length + 1) || movieSelection == "" || movieSelection.includes(".")) {
                console.log("Kindly enter a valid input!")
                console.log("\n");
            }
        } while (isNaN(movieSelection) || movieSelection < 1 || movieSelection > (movieList.length + 1) || movieSelection == "" || movieSelection.includes("."))
        movieSelection = parseInt(movieSelection);
        
        do {
            if (isNaN(addRating) || !(1 <= addRating && addRating <= 5) || addRating.includes(".")) {
            var addRating = input.question(console.log("Enter your rating for \"" + movieList[movieSelection - 1].name + "\" (1 to 5 inclusive): "));
            
                console.log("Enter a valid rating!");
            } else {

            };
        } while (isNaN(addRating) || !(1 <= addRating && addRating <= 5) || addRating.includes("."));
        //changing addRating (string) to integer.
        var addRating = parseInt(addRating);
        // add 1 into number of users;
        movieList[movieSelection - 1].rating[0]++;
        // adding the rating to the existing rating;
        movieList[movieSelection - 1].rating[1] += addRating;

    } else if (userChoice == 4) {
        function convertToDate(dateString) {
            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            const [day, month, year] = dateString.split(' ');
            const monthIndex = months.indexOf(month);
            return new Date(year, monthIndex, day);
        }

        // the movieList based on the releaseDate in descending order
        movieList.sort((a, b) => convertToDate(b.releaseDate) - convertToDate(a.releaseDate));

        // Display the sorted movieList
        console.log("The lastest 3 movies are:");
        for (let i = 0; i < 3; i++) {
            console.log(i + 1 + ") " + movieList[i].releaseDate + " - " + movieList[i].name);
        } console.log("\n");
    } else if (userChoice == 5) {
        do {
            var selectGenre;
            var selectGenre = input.question("Please select the genre: \n" + genreList + "\t>> ");
            // Convert user input to a number
            // selectGenre = parseInt(selectGenre);
            if (isNaN(selectGenre) || !(1 <= selectGenre && selectGenre <= 9) || selectGenre.includes(".")) {
                console.log("Please enter a valid genre input!");
                console.log("\n");
            } else {

                var filterGenre = genre[selectGenre - 1];
                var moviesWithGenre = [];

                for (i = 0; i < movieList.length; i++) {
                    if (movieList[i].genre.includes(filterGenre)) {
                        moviesWithGenre.push(movieList[i]);
                    }
                }

                console.log("\nYou have selected \"" + genre[selectGenre - 1] + "\" genre: ")

                for (var j = 0; j < moviesWithGenre.length; j++) {
                    console.log((j + 1) + ") " + moviesWithGenre[j].name);
                }
                console.log("\n");
            };
        } while (isNaN(selectGenre) || !(selectGenre >= 1 && selectGenre <= 9) || selectGenre.includes("."));
    }
} while (userChoice != 6);
