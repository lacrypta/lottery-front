/* eslint-disable @next/next/no-img-element */
import styled, { keyframes } from "styled-components";
import ticketImage from "../public/ticket.png";

const rotate = keyframes`
0% {
  transform: translateZ(0) rotate3d(-1, 0, 0, 5deg);
}
25% {
  transform: translateZ(160px) rotate3d(-1, -10, 2, -10deg);
}
50% {
  transform: translateZ(0px) rotate3d(-1, 10, -2, 10deg);
}
100% {
  transform: translateZ(160px) rotate3d(-1, 0, 0, 5deg);
}
`;

const Container = styled.div`
  max-width: 800px;

  img {
    width: 100%;
    animation: ${rotate} 4s ease infinite;
  }
`;

const Ticket = () => {
  return (
    <Container>
      <img src={ticketImage.src} alt='Entrada' />
    </Container>
  );
};

export default Ticket;
