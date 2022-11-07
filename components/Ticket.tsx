/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import ticketImage from "../public/ticket.png";

const Container = styled.div`
  max-width: 800px;

  img {
    width: 100%;
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
