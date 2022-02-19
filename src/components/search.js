import React, { useState, useEffect } from 'react';
import Result from './result.js';
import Fuse from 'fuse.js';
import { useRecoilValue } from 'recoil';
import { searchedStringState } from '../globalState.js';
import { useLocation } from 'react-router-dom';

export default function Search(props) {
  const location = useLocation();

  const searchedString = useRecoilValue(searchedStringState);

  const [result,setResult] = useState([]);
  const [fuse,setFuse] = useState(null);
  const [allQuestions,setAllQuestions] = useState([]);

  const fetchDataset = async () => {   
    let dataset = await fetch(props.dataset);
    return dataset.json();
  };
    
  const initFuse = () => {
    fetchDataset()
    .then(dataset => {
      setAllQuestions(dataset.questions);
      setFuse(new Fuse(dataset.questions, {
        isCaseSensitive: false,
        includeScore: true,
        minMatchCharLength: 0,
        shouldSort: true,
        findAllMatches: true,
        ignoreLocation: true,
        keys: [{ name: 'question', weight: 2 }, 'answers.correct']
      }));
    })
    
    .catch(function(err) {
      console.log(`Error: ${err}`)
    });
  }

    useEffect(() => {
  
      const Search = async () => {
        if (fuse && allQuestions) {
          if (searchedString === "") {
            let mappedArray = [];
            allQuestions.forEach(question => mappedArray.push({ item: question }));
            setResult(mappedArray);
          } else {
            setResult(fuse.search(searchedString));
          }
  
          props.contentRef.current.scrollTo(0, 0);
        }
      };

      Search();
      
    }, [fuse, searchedString]);

    useEffect(() => {
      initFuse();
    }, [location]);
    
    return (
        <>
        { result && result.map((res, index) => <Result key={index} res={res}/>) }
        </>
    )
}