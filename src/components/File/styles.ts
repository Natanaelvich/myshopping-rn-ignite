import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.COLORS.GRAY50};
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 5px;
  padding-bottom: 5px;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 12px;
`;

export const Info = styled.View`
  flex: 1;
`;

export const WrapperImage = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Name = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
  max-width: 90%;
`;

export const Path = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY800};
`;

export const Options = styled.View`
  height: 100%;
  justify-content: space-around;
`;
