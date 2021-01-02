import styled from "styled-components";
const greenBoxShadow = `box-shadow: 0px 0px 4px 2px #007FFF`;
const subtleBoxShadow = `box-shadow: 0px 0px 5px 1px #061a44`;
const lightBlueBackground = `background-color: #E5F5FF`;

export const Tile = styled.div`
  padding: 10px;
  ${subtleBoxShadow};
  ${lightBlueBackground};
`;

export const SelectableTile = styled(Tile)`
  &:hover {
    cursor: pointer;
    ${greenBoxShadow};
  }
`;

export const DeleteButton = styled.div`
  justify-self: right;
  display: block;
  color: red;
`;

export const GridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

export const GridHeaderStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  background-color: #c6e8ff;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

export const RowStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  padding: 0.5rem;
  background-color: #87ceff;
  font-size: 16px;
  font-weight: normal;
  margin-top: 8px;
`;
