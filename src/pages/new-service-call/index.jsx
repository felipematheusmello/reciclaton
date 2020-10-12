import React, { useState, useEffect } from "react";
import { Box } from "./new-service.style";
import {
  MainTitle,
  SubTitles,
  StyledLabel,
  StyledInput,
  CheckBox,
  CheckBoxContainerd,
  StyledSubmit,
  Error,
  Notification,
} from "./new-service.style";
import decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { addService, getService } from "../../redux/action/card-informations";
import { useDispatch, useSelector } from "react-redux";
import { inputData } from "./helper";
import { changeInformations } from "../../redux/action/card-informations";
import { requestBusiness } from "../../redux/action/user-service";
import { useHistory } from "react-router-dom";
const materiais = {
  organic: false,
  plastic: false,
  glass: false,
  paper: false,
  metal: false,
  battery: false,
  cloth: false,
  electronic: false,
  rubber: false,
};
const NewServiceCalls = () => {
  const [materialsError, setMaterialsError] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [approved, setApproved] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const services = useSelector((state) => state.card);
  const { brand, id, business } = useSelector((state) => state.userService);
  useEffect(() => {
    dispatch(getService());
    if (!brand) {
      dispatch(requestBusiness(decode(token).sub, token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, dispatch]);

  const token = useSelector((state) => state.login.authen);

  const changeMaterials = (data) => {
    for (let type in materiais) {
      data &&
        data.name === type &&
        data.checked &&
        (materiais[data && data.name] = data && data.checked);
    }
  };
  const onSubmit = (data) => {
    if (!Object.values(materiais).includes(true)) {
      setMaterialsError(true);
    } else {
      setMaterialsError(false);
    }
    if (token && services[0]) {
      addService(
        token,
        inputData(
          { ...data, materiais },
          id,
          services[0] && services[0].length + 1
        )
      );

      changeInformations(id, token, {
        os: { id: services[0].length + 1 },
      });

      setApproved(true);
      setTimeout(() => {
        history.push(`/services/${id}`);
      }, 2000);
    }
    inputData(
      { ...data, materiais },
      id,
      services[0] && services[0].length + 1
    );
  };
  return (
    <Box>
      <MainTitle>{brand ? brand + " / " + business : "Title"}</MainTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SubTitles>Materiais para a coleta</SubTitles>
        <StyledLabel>Valor para a coleta </StyledLabel>
        <StyledInput
          type="number"
          placeholder="Insira um valor para a coleta"
          name="contribuicao"
          ref={register({ required: "true", min: 0 })}
        />
        <Error>
          {errors.contribuicao?.type === "required" &&
            "Esse espaço não pode estar vazio"}
          {errors.contribuicao?.type === "min" &&
            "O valor mínimo é 0, por favor coloque um valor igual ou acima do mínimo"}
        </Error>
        <CheckBoxContainerd>
          <CheckBox
            ref={changeMaterials}
            type="checkbox"
            name="organic"
          ></CheckBox>
          <StyledLabel>Orgânico</StyledLabel>

          <CheckBox
            ref={changeMaterials}
            type="checkbox"
            name="plastic"
          ></CheckBox>
          <StyledLabel>Plástico</StyledLabel>

          <CheckBox
            ref={changeMaterials}
            type="checkbox"
            name="glass"
          ></CheckBox>
          <StyledLabel>Vidro</StyledLabel>

          <CheckBox
            ref={changeMaterials}
            type="checkbox"
            name="paper"
          ></CheckBox>
          <StyledLabel>Papel</StyledLabel>

          <CheckBox
            ref={changeMaterials}
            type="checkbox"
            name="metal"
          ></CheckBox>
          <StyledLabel>Metal</StyledLabel>

          <CheckBox
            ref={changeMaterials}
            type="checkbox"
            name="battery"
          ></CheckBox>
          <StyledLabel>Bateria</StyledLabel>

          <CheckBox
            ref={changeMaterials}
            type="checkbox"
            name="cloth"
          ></CheckBox>
          <StyledLabel>Tecido</StyledLabel>

          <CheckBox
            ref={changeMaterials}
            type="checkbox"
            name="electronic"
          ></CheckBox>
          <StyledLabel>Eletrônico</StyledLabel>

          <CheckBox
            ref={changeMaterials}
            type="checkbox"
            name="rubber"
          ></CheckBox>
          <StyledLabel>Borracha</StyledLabel>
        </CheckBoxContainerd>
        <div>
          <StyledLabel>
            Quantidade do Material para a coleta em sacos/200L{" "}
          </StyledLabel>
          <StyledInput
            type="number"
            placeholder="insira a quantidade aqui"
            name="quantidade_estimada"
            ref={register({ required: "true" })}
          />
        </div>
        <Error>
          {errors.quantidade_estimada?.type === "required" &&
            "Esse espaço não pode estar vazio"}
        </Error>
        {materialsError && (
          <Error>Por favor selecionar pelo menos 1 material</Error>
        )}
        <div>
          <StyledSubmit type="submit" />
        </div>
        {approved && (
          <Notification>Seu cadastro foi efetuado com sucesso!!</Notification>
        )}
      </form>
    </Box>
  );
};

export default NewServiceCalls;
