import { useState, useEffect, React } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

function Searched() {
  let params = useParams();
  const [searchedItems, setSearchedItems] = useState([]);

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  const getSearched = async (search) => {
    const data = await fetch(`https://api.spoonacular.com/food/search?query=${search}&number=10&apiKey=${process.env.REACT_APP_API_KEY}`);
    const resultData = await data.json();
    
    // Combine all search results (Recipes, Products, Menu Items, etc.) into one array
    const combinedResults = [
      ...(resultData.searchResults[0]?.results.slice(0, 5) || []),  // Take max 5 from each category
      ...(resultData.searchResults[1]?.results.slice(0, 5) || []),
      ...(resultData.searchResults[2]?.results.slice(0, 5) || []),
      ...(resultData.searchResults[3]?.results.slice(0, 5) || []),
      ...(resultData.searchResults[4]?.results.slice(0, 5) || []),
      ...(resultData.searchResults[5]?.results.slice(0, 5) || []),
    ];

    // Ensure you only take at least 10 items
    setSearchedItems(combinedResults.slice(0, 10));
  };

  return (
    <Grid>
      {searchedItems.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image || "https://via.placeholder.com/312x231"} alt={item.name} />
              <h4>{item.name}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
