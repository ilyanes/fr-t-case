import styled from "styled-components";

export const DivStyle = styled.div`
  padding-top: 5%;
  display: flex;
  flex-direction: column;
`;

export const TableStyle = styled.table`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px solid grey;
  overflow-wrap: anywhere;
`;

export const TrHead = styled.tr`
  display: flex;
  border: 1px solid grey;
`;

export const TdBody = styled.td`
  width: 120px;
  padding: 10px;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ThHead = styled.th`
  width: 120px;
  padding: 10px;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TableBtn = styled.button`
  display: flex;
  background-color: yellow;
  border-radius: 50%;
  border-style: none;
  color: blue;
`;
