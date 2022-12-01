import { useContext } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginRight='1'>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick = {() => {scrollPrev()}}
        fontSize='2xl'
        cursor='pointer'
      />
    </Flex>
  );
}

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginLeft='1'>
      <Icon
        as = {FaArrowAltCircleRight}
        onClick = {() => {scrollNext()}}
        fontSize='2xl'
        cursor='pointer'
    />
    </Flex>
  );
}

const ImageScrollbar = ({ data }) => {
  return (
    <ScrollMenu LeftArrow = {LeftArrow} RightArrow = {RightArrow} >
    {data.map((item) => {
      return(
        // relative position is required for fill to work
        <Box width = '920px' height = "690px" key = {item.id} position = "relative">
        {/* blurDataUrl required Base64 img so it won't work currently*/}
          <Image placeholder = "blur" blurDataURL = {item.url} src = {item.url} fill key = {item.id}/>
        </Box>
      );
    })}
    </ScrollMenu>
  );
}

export default ImageScrollbar;