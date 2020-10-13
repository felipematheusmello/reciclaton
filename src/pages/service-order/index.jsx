import React, { useState, useEffect } from "react";
import { StyledButton, ContainerButton } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { requestBusiness } from "../../redux/action/user-service";
import { loginAction } from "../../redux/action/login";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import Card from "../../components/card";
const ServiceOrder = () => {
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { business, os } = useSelector((state) => state.userService);
  const { authen } = useSelector((state) => state.login);
  const state = useSelector((state) => state);
  const history = useHistory();
  useEffect(() => {
    authen && setUserId(jwt_decode(authen));
    authen && dispatch(requestBusiness(userId.sub, authen));
  }, [dispatch, authen, userId.sub]);

  return (
    <>
      <ContainerButton>
        {business !== "Coleta" && ( // empresa
          <StyledButton
            onClick={() => history.push(`/new-service-order/${userId.sub}`)}
          >
            Chamado
          </StyledButton>
        )}

        {business === "Coleta" && ( // coletador
          <StyledButton
            onClick={() => {
              setStatus("Aceito");
            }}
          >
            Aceito
          </StyledButton>
        )}

        <StyledButton
          onClick={() => {
            setStatus("Em Andamento");
          }}
        >
          Em Andamento
        </StyledButton>

        <StyledButton onClick={() => setStatus("Finalizado")}>
          Finalizado
        </StyledButton>

        <StyledButton
          onClick={() => {
            setStatus("Cancelado");
          }}
        >
          Cancelado
        </StyledButton>
      </ContainerButton>
      <Card status={status} />
    </>
  );
};

export default ServiceOrder;
