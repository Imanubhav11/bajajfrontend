import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      // Validate JSON input
      const parsedData = JSON.parse(jsonInput);

      // Call the API
      const result = await axios.post('https://bajajbackend-khuk.onrender.com/bfhl', parsedData);
      setResponse(result.data);

    } catch (error) {
      alert('Invalid JSON format or API error');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    const options = {
      Alphabets: response.alphabets,
      Numbers: response.numbers,
      'Highest lowercase alphabet': response.highest_lowercase_alphabet,
    };

    let filteredData = [];
    selectedOptions.forEach(option => {
      filteredData = [...filteredData, ...(options[option.value] || [])];
    });

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  const multiSelectOptions = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
  ];

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows="4"
        cols="50"
        placeholder='Enter JSON e.g., {"data": ["A","C","z"]}'
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <Select
          options={multiSelectOptions}
          isMulti
          onChange={handleSelectChange}
          placeholder="Select options"
        />
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
