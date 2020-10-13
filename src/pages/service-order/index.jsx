import React, { useState, useEffect } from "react";
import { StyledButton, ContainerButton, StyledSelct } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { requestBusiness } from "../../redux/action/user-service";
import { loginAction } from "../../redux/action/login";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import Card from "../../components/card";
const ServiceOrder = () => {
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Chamado");
  const business = useSelector((state) => state.userService.business);
  const os = useSelector((state) => state.userService.os);
  const token = useSelector((state) => state.authentication);
  const history = useHistory();
  const teste = useSelector((state) => console.log("teste" + state.userService));
  useEffect(() => {
    token && setUserId(jwt_decode(token));
    token && dispatch(requestBusiness(userId.sub, token));
  }, [dispatch, token, userId.sub]);

  return (
    <>
      <ContainerButton>
        {business !== "Coleta" && ( // empresa
          <StyledButton onClick={() => setStatus("Chamado")}>
            {status === "Chamado" ? <StyledSelct>Chamado</StyledSelct> : "Chamado"}
          </StyledButton>
        )}

        {business === "Coleta" && ( // coletador
          <StyledButton
            onClick={() => {
              setStatus("Aceito");
            }}
          >
            {status === "Aceito" ? <StyledSelct>Aceito</StyledSelct> : "Aceito"}
          </StyledButton>
        )}

        <StyledButton
          onClick={() => {
            setStatus("Em Andamento");
          }}
        >
          {status === "Em Andamento" ? <StyledSelct>Em Andamento</StyledSelct> : "Em Andamento"}
        </StyledButton>

        <StyledButton onClick={() => setStatus("Finalizado")}>
          {status === "Finalizado" ? <StyledSelct>Finalizado</StyledSelct> : "Finalizado"}
        </StyledButton>

        <StyledButton
          onClick={() => {
            setStatus("Cancelado");
          }}
        >
          {status === "Cancelado" ? <StyledSelct>Cancelado</StyledSelct> : "Cancelado"}
        </StyledButton>
      </ContainerButton>
      <Card status={status} />
    </>
  );
};

export default ServiceOrder;
