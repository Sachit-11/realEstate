import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from "../utils/fetchApi.js";
import Property from "../components/Property.jsx";

const Banner = (p) =>{
  return(
    <Flex flexWrap = "wrap" justifyContent= "center" alignItems = "center" m = {10}>
      <Image src = {p.imageUrl} width = "500" height = "500" alt = "banner" />
      <Box p = "5">

        <Text color = "gray.500" fontSize = "sm" fontWeight = "medium">
          {p.purpose} 
        </Text>

        <Text fontSize = "3xl" fontWeight = "bold">
          {p.title1} 
          <br/>
          {p.title2}
        </Text>

        <Text fontSize = "xl" paddingTop = "3" paddingBottom = "3" color = "gray.700">
          {p.desc1}
          <br/>
          {p.desc2}
        </Text>
        
        <Button fontSize = "xl">
          <Link href = {p.linkName}>
            {p.buttonText}
          </Link>
        </Button>
        
      </Box>
    </Flex>
  );
}

export default function Home({ propertiesForRent, propertiesForSale }) {
  return (
    <Box>
      <Banner
        purpose = 'RENT A HOME'
        title1 = 'Rental Homes for'
        title2 = 'Everyone'
        desc1 = 'Explore from Apartments, builder floors, villas'
        desc2 = 'and more'
        buttonText = 'Explore Renting'
        linkName = '/search?purpose=for-rent'
        imageUrl = 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />

      <Flex flexWrap = "wrap">
        {
          propertiesForRent.map((property) => {
            return(
              // key is for next to identify unique elements
              // https://reactjs.org/docs/lists-and-keys.html
              <Property property = {property} key = {property.id}/>
            );
          })
        }
      </Flex>

      <Banner
        purpose = 'BUY A HOME'
        title1 = 'Find, Buy & Own Your'
        title2 = 'Dream Home'
        desc1 = 'Explore Apartments, Villas, Homes'
        desc2 = 'and more'
        buttonText = 'Explore Buying'
        linkName = '/search?purpose=for-sale'
        imageUrl = 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />

      <Flex flexWrap = "wrap">
        {
          propertiesForSale.map((property) => {
            return(
              // key is for next to identify unique elements
              // https://reactjs.org/docs/lists-and-keys.html
              <Property property = {property} key = {property.id}/>
            );
          })
        }
      </Flex>
      
    </Box>
  )
}

export async function getStaticProps(){
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);

  return {
    props:{
      propertiesForRent: propertyForRent?.hits,
      propertiesForSale: propertyForSale?.hits,
    }
  }
}
