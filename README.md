# Terribly Tiny Tales
### Libraries Used
 Chart js,
 react-icons
## Data Fetching from api

```
const [word, setwords] = useState(" ");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://www.terriblytinytales.com/test.txt"
        );
        setwords(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  ```
  
 I Have used  useEffect to fecth the data once when components mount by using this empty dependency array.
 Used Axios to Make HTTP GET request used asynchronous function named fetchData.This is an asynchronous function named fetchData that will be executed when the effect runs. It is responsible for fetching data from the specified URL.
 Once the response is received, the setwords function is called to update the word state variable with the data obtained from the response. This will trigger a re-render of the component with the updated data.
 
 
## Cleaning The Data
```
  const wordToDelete = "";
  function removeNonAlphabeticCharacters() {
    return word.replace(/[^a-zA-Z]/g, " ").toLowerCase();
  }

  function frequencyOfWords() {
    const frequency = removeNonAlphabeticCharacters()
      .split(" ")
      .reduce((accumulator, word) => {
        accumulator[word] = (accumulator[word] || 0) + 1;
        return accumulator;
      }, {});
    return Object.entries(frequency);
  }

  function sortFrequencyArray() {
    const frequencyPairs = frequencyOfWords().map(([word, frequency]) => [
      frequency,
      word
    ]);

    frequencyPairs.sort((a, b) => b[0] - a[0]);

    return frequencyPairs;
  }

  function cleanArray() {
    const newArray = sortFrequencyArray().filter(
      (pair) => pair[1] !== wordToDelete
    );
    return newArray;
  }
```
**removeNonAlphabeticCharacters():** This function removes non-alphabetic characters from the word string using a regular expression (/[^a-zA-Z]/g). It replaces any non-alphabetic character with a space and converts the resulting string to lowercase.

**frequencyOfWords():** This function splits the cleaned word string into an array of words using the space as a delimiter. It then uses the reduce() method to iterate over the array and create an object that stores the frequency of each word. The accumulator object is used to track the word frequencies, and for each word encountered, its frequency is incremented by 1. The function returns the result as an array of entries, where each entry is a pair of [word, frequency].

**sortFrequencyArray():** This function takes the array of word-frequency pairs from frequencyOfWords() and transforms it into an array of [frequency, word] pairs. It then sorts the pairs in descending order based on the frequency (b[0] - a[0]). The function returns the sorted array.

**cleanArray():** This function filters the sorted frequency array obtained from sortFrequencyArray(). It removes any pair where the word (pair[1]) matches the wordToDelete variable. The filtered array is then returned.

```
function showViz() {
    removeNonAlphabeticCharacters();
    frequencyOfWords();
    sortFrequencyArray();
    cleanArray();
    setShow(!show);
  }
  ```
 **showViz():**
 This function is called when the button is clicked. It performs the following actions:

Calls the removeNonAlphabeticCharacters() function to clean the input word string.
Calls the frequencyOfWords() function to calculate the frequency of each word.
Calls the sortFrequencyArray() function to sort the word-frequency pairs.
Calls the cleanArray() function to filter out any undesired words.
Toggles the value of the show state variable using setShow(!show).
 ```
 <button
        className={show ? "show__vizz" : "show__vizzoff"}
        onClick={showViz}
      >
        {show ? "HideViz" : "ShowViz"}
        {show ? <BiHide size="1.5rem" /> : <BiShow size="1.5rem" />}
      </button>
      {show ? <Histogram Data={cleanArray()} /> : <Showbutton />}
  ```
The button text and icon: The text of the button is conditionally rendered based on the show state variable (show ? "HideViz" : "ShowViz"). It displays either "HideViz" or "ShowViz"

### Histogram Data filtering

```
const [showCommonWords, setShowCommonwords] = useState(false);
  function NoCommonWords() {
    setShowCommonwords(!showCommonWords);
  }
  const filteredData = showCommonWords
    ? Data.Data.filter(
        (pair) =>
          pair[1].length > 2 &&
          ![
            "who","are","you","com","can","the","and","ttt","where","your","for","our","how","get","from","all","have","with","yes"
          ].includes(pair[1])
      )
    : Data.Data;
  for (let index = 0; index < filteredData.length; index++) {
    words.push(filteredData[index][1]);
    frq.push(filteredData[index][0]);
  }
```
showCommonWords state variable: It is initialized as false using the useState hook and is used to determine whether common words should be filtered out or not.

**NoCommonWords() function:** This function is called when a certain action occurs (e.g., a button click). It toggles the value of showCommonWords by using setShowCommonwords(!showCommonWords). This means if showCommonWords is false, it will be set to true, and vice versa.

**filteredData variable:** It holds the filtered array based on the value of showCommonWords. If showCommonWords is true, the array is filtered using the filter() method. The filtering criteria are:
The word length should be greater than 2.
The word should not be included in the given common words list.
words and frq arrays: These arrays are used to collect the filtered word-frequency pairs. The loop iterates over the filteredData array and pushes the word and frequency values to their respective arrays.

**For Displaying the Chart .I used chart.js Bar Compnents and incresed the bar width to display it aa a histogram**
 
 ## Exporting csv file
 ```
 import React from "react";
import { TbFileDownload } from "react-icons/tb";
import "./Export.css";
const Export = ({ data }) => {
  const [words, frq] = data;
  const downloadCSV = () => {
    const data = frq.map((val, i) => [words[i], val]);
    const header = ["Word", "Frequency"];

    // Generate CSV content
    const csvContent = `${header.join(",")}\n${data
      .map((row) => row.join(","))
      .join("\n")}`;

    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(
      new Blob([csvContent], { type: "text/csv" })
    );
    downloadLink.download = "histogram_data.csv";

    document.body.appendChild(downloadLink);

    downloadLink.click();
  };

  return (
    <button className="export__btn" onClick={downloadCSV}>
      Download CSV
      <TbFileDownload size="2rem" />
    </button>
  );
};

export default Export;

 ```
 The Export component receives a data prop, which is an array containing two arrays: words and frq. These arrays represent the words and their corresponding frequencies.

The downloadCSV function is called when the button is clicked. It performs the following steps to generate and download the CSV file:

It maps over the frq array and creates a new array data where each element is an array [word, frequency] based on the corresponding values in words and frq.
It defines a header array with the column names for the CSV file.
It generates the CSV content by joining the header array with a comma separator and then joining each row in the data array with a comma separator and a new line character.
It creates a <a> element, sets its href attribute to a URL representing the CSV content, and sets its download attribute to specify the filename of the downloaded file.
It appends the <a> element to the document body.
It triggers a click event on the <a> element, which initiates the file download.
The return statement renders a button with a CSS class export__btn. When clicked, it invokes the downloadCSV function. The button text is set to "Download CSV" and the TbFileDownload component from the "react-icons/tb" library is used to render an icon indicating the download action.
  
## Deployed using netlify
  here is the Deployed Link  [Deployed Site](https://textanalysis101.netlify.app/).

  
  
  
  

 
  
  
  


