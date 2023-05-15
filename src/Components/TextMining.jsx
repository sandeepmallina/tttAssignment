import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiHide, BiShow } from "react-icons/bi";
import { Histogram } from "./Histogram";
import "./TextMining.css";
import { Showbutton } from "./Showbutton";

const TextMining = () => {
  const [word, setwords] = useState(" ");
  const [show, setShow] = useState(false);
  const wordToDelete = "";

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
    // Transform the frequencyOfWords array into an array of [frequency, word] pairs.
    const frequencyPairs = frequencyOfWords().map(([word, frequency]) => [
      frequency,
      word
    ]);

    // Sort the frequency pairs in descending order.
    frequencyPairs.sort((a, b) => b[0] - a[0]);

    return frequencyPairs;
  }

  function cleanArray() {
    const newArray = sortFrequencyArray().filter(
      (pair) => pair[1] !== wordToDelete
    );
    return newArray;
  }
  function showViz() {
    removeNonAlphabeticCharacters();
    frequencyOfWords();
    sortFrequencyArray();
    cleanArray();
    setShow(!show);
  }
  return (
    <div className="">
      <button
        className={show ? "show__vizz" : "show__vizzoff"}
        onClick={showViz}
      >
        {show ? "HideViz" : "ShowViz"}
        {show ? <BiHide size="1.5rem" /> : <BiShow size="1.5rem" />}
      </button>
      {show ? <Histogram Data={cleanArray()} /> : <Showbutton />}
    </div>
  );
};

export default TextMining;
