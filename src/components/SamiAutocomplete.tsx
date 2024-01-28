import React, { useState, useEffect }  from 'react';
import axios from 'axios';

const DeelAutocomplete = () => {
  const [country, setCountry] = useState({ activeCountry: 0, filteredCountries: [], showCountries: false, userInput: '' });
 
  const [data, setData] = useState<string[]>([])

  const GetData = async () => {
    //const reqUrl: string = 'http://localhost:3000/json/Data.json'
    const reqUrl: string = './json/Data.json'

    await axios.get(reqUrl)
      .then(response => {
        setData(response.data)
      }).catch(error => { 
        console.log(error); 
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  const onChange = (event: { currentTarget: { value: any; }; }) => {
    //console.log('onChanges');
    
    const userInput = event.currentTarget.value;

    const filteredCountry : any = data.filter(
      (optionName: string) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setCountry({activeCountry: 0, filteredCountries: filteredCountry, showCountries: true, userInput: event.currentTarget.value});
  };

  const onClick = (event: { currentTarget: { innerText: any; }; }) => {
    setCountry({activeCountry: 0, filteredCountries: [], showCountries: false, userInput: event.currentTarget.innerText});
  };

  const onKeyDown = (e: { keyCode: number; }) => {
    const { activeCountry, filteredCountries } = country;

    if (e.keyCode === 13) {
      setCountry({activeCountry: 0, filteredCountries: [], showCountries: false, userInput: filteredCountries[activeCountry]});
    } else if (e.keyCode === 38) {
      if (activeCountry === 0) {
        return;
      }
      
      setCountry({activeCountry: activeCountry-1, filteredCountries: [], showCountries: false, userInput: ''});
    } else if (e.keyCode === 40) {
      if (activeCountry === filteredCountries.length - 1) {
        console.log(activeCountry);
        return;
      }
      
      setCountry({activeCountry: activeCountry+1, filteredCountries: [], showCountries: false, userInput: ''});
    }
  };

  let optionList : any;

  if (country.showCountries && country.userInput) {
    if (country.filteredCountries.length) {
      optionList = (
        <ul className="options">
          {
            country.filteredCountries.map((countryName, index) => {
              let className;
              if (index === country.activeCountry) {
                className = 'option-active';
              }

              const countryNameString : string = String(countryName)

              const countryNameLower : string = countryNameString.toLowerCase();

              const searchStringLower : string = country.userInput.toLowerCase();

              const startIndex : number = countryNameLower.indexOf(searchStringLower)
              const endIndex : number = country.userInput.length

              const startString = countryNameString.substring(0, startIndex);

              const highlightString = countryNameString.substring(startIndex, startIndex+endIndex);

              const endString = countryNameString.substring(startIndex+endIndex);
          
              return (
                <li className={className} key={countryName} onClick={onClick}>
                  {startString}
                    <b>
                      {highlightString}
                    </b>
                    {endString}
                </li>
              );
            })
          }
        </ul>
      );
    } else {
      optionList = (
        <div className="no-options">
          <b>No data found!</b>
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <div className="search">
        <input
          title="Search"
          type="text"
          className="search-box"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={country.userInput}
        />
      </div>
      {optionList}
    </React.Fragment>
  );
};

export default DeelAutocomplete;