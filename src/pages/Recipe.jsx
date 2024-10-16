import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from 'react'

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');
  
  useEffect(() => {
     fetchDetails(params.name);
  }, [params.name])

  const fetchDetails = async (id) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData);
  }

  return (
    <DetailWrapper>
      <TopSection>
        <ImageWrapper>
          <img src={details.image} alt={details.title} />
        </ImageWrapper>
        <ButtonWrapper>
          <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>
            Instructions
          </Button>
          <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>
            Ingredients
          </Button>
        </ButtonWrapper>
      </TopSection>

      <Info>
        <h2>{details.title}</h2>
        {activeTab === "instructions" && (
          <Content>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </Content>
        )}

        {activeTab === "ingredients" && (
          <Content>
            <ul>
              {details.extendedIngredients?.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </Content>
        )}
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
  }

  .active {
    background: #313131;
    color: white;
    transition: background 0.3s ease;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  margin-bottom: 2rem;
`;

const ImageWrapper = styled.div`
  max-width: 60%;
  display: flex;
  justify-content: center;
  
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.05);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  color: #313131;
  background: #f8f8f8;
  border: 2px solid #313131;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #313131;
    color: white;
  }
`;

const Info = styled.div`
  max-width: 800px;
  margin-top: 2rem;
  text-align: center;

  h3 {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: square;
    padding-left: 1.5rem;

    li {
      font-size: 1.1rem;
      line-height: 2;
    }
  }
`;

const Content = styled.div`
  margin-top: 2rem;
  text-align: left;
`;

export default Recipe;
