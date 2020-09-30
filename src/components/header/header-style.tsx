import styled from "styled-components";

export const BaseHeader = styled.div`
  background-color: #e1f3ce;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  width: 100%;
  height: 46px;
  top: 0;
  @media screen and (max-width: 540px) {
    text-align: center;
  }
`;
