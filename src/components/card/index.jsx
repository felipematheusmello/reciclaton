import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { content } from "./helper";
import decode from "jwt-decode";
import {
  changeInformations,
  getServices,
} from "../../redux/action/card-informations";
import { requestBusiness } from "../../redux/action/user-service";
const Card = ({ status }) => {
  const [rating, setRating] = useState(0);
  const [popUp, setPopUp] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.authen);
  const { list } = useSelector((state) => state.card);
  const user = useSelector((state) => state.userService);
  const { brand } = user;
  useEffect(() => {
    dispatch(getServices());
    if (!brand) {
      dispatch(requestBusiness(decode(token).sub, token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, dispatch]);
  return (
    <div>
      {content(status, setRating, rating, list, token, user, popUp, setPopUp)}
    </div>
  );
};

export default Card;
