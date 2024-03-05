import React, { useEffect, useState } from "react";
import API from "../redux/API"

import AdminTable from "../components/AdminTable";

const Admin = () => {
  const [sports, setSports] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);

  const testCreate = {
    name: "Erika",
    password: "Password101",
    profilePic: "erika.png",
  };

  const testUpdate = {
    name: "Teddi",
    password: "32423",
  };

  useEffect(() => {
    getData("sports");
    getData("divisions");
    getData("teams");
    getData("games");
  }, []);

  const getData = (collectionName) => {
    API.getItems(collectionName).then(async (items) => {
      const tdata = await items.data;
      const theaders = await Object.keys(tdata[0]);

      // ternary operation to set data depending on collection name
      collectionName === "sports"
        ? setSports({ tdata: tdata, theaders: theaders })
        : collectionName === "divisions"
        ? setDivisions({ tdata: tdata, theaders: theaders })
        : collectionName === "teams"
        ? setTeams({ tdata: tdata, theaders: theaders })
        : collectionName === "games"
        ? setGames({ tdata: tdata, theaders: theaders })
        : console.log("Other data");
    });
  };

  const getItemById = (collectionName, id) => {
    API.getItemById(collectionName, id).then((item) => console.log(item.data));
  };

  const createItem = (collectionName, item) => {
    API.createItem(collectionName, item).then(
      console.log("Item created: ", item)
    );
  };

  const updateItem = (collectionName, id, update) => {
    API.updateItem(collectionName, id, update).then(
      console.log("Item updated: ", id, update)
    );
  };

  const deleteItem = (collectionName, id) => {
    API.deleteItemById(collectionName, id).then(
      console.log("Item deleted: ", id)
    );
  };

  return (
    <div className="admin">
      <AdminTable data={sports} title="Sports" />
      <AdminTable data={divisions} title="Divisions" />
      <AdminTable data={teams} title="Teams" />
      <AdminTable data={games} title="Games" />
    </div>
  );
};

export default Admin;
